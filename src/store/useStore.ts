import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MerchProduct, Tour } from '@/types';

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (product: MerchProduct, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  selectedTour: Tour | null;
  setSelectedTour: (tour: Tour | null) => void;
  
  // Active page/section
  activePage: string;
  setActivePage: (page: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity, size, color) => {
        const cart = get().cart;
        const existingIndex = cart.findIndex(
          item => item.product.id === product.id && item.size === size && item.color === color
        );
        
        if (existingIndex >= 0) {
          const newCart = [...cart];
          newCart[existingIndex].quantity += quantity;
          set({ cart: newCart });
        } else {
          set({ cart: [...cart, { product, quantity, size, color }] });
        }
      },
      removeFromCart: (productId, size, color) => {
        set({
          cart: get().cart.filter(
            item => !(item.product.id === productId && item.size === size && item.color === color)
          )
        });
      },
      updateCartQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => {
          const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price);
          return total + price * item.quantity;
        }, 0);
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // UI State
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isBookingModalOpen: false,
      setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),
      selectedTour: null,
      setSelectedTour: (tour) => set({ selectedTour: tour }),
      
      // Active page
      activePage: 'home',
      setActivePage: (page) => set({ activePage: page }),
    }),
    {
      name: 'old-skool-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
