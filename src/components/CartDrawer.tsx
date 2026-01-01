import React from 'react';
import { useStore } from '@/store/useStore';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    getCartTotal,
    clearCart 
  } = useStore();

  const total = getCartTotal();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // For now, show a toast - in production this would integrate with Stripe
    toast.success('Redirecting to checkout...', {
      description: 'Stripe Checkout integration ready'
    });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F5F3E7]/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#CCFF00]" />
            <h2 className="text-lg font-bold text-[#F5F3E7]">Your Cart</h2>
            <span className="px-2 py-0.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-bold rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-[#F5F3E7]/70 hover:text-[#F5F3E7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-[#F5F3E7]/20 mb-4" />
              <p className="text-[#F5F3E7]/70 text-lg">Your cart is empty</p>
              <p className="text-[#F5F3E7]/50 text-sm mt-1">Add some awesome merch!</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 px-6 py-2 bg-[#1B4332] text-[#F5F3E7] rounded-lg hover:bg-[#1B4332]/80 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                className="flex gap-4 p-3 bg-[#F5F3E7]/5 rounded-xl"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F5F3E7] font-medium truncate">{item.product.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {item.size && (
                      <span className="px-2 py-0.5 bg-[#1B4332]/50 text-[#F5F3E7]/70 text-xs rounded">
                        {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="px-2 py-0.5 bg-[#1B4332]/50 text-[#F5F3E7]/70 text-xs rounded">
                        {item.color}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                        className="w-7 h-7 flex items-center justify-center bg-[#F5F3E7]/10 rounded text-[#F5F3E7] hover:bg-[#F5F3E7]/20 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[#F5F3E7] font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                        className="w-7 h-7 flex items-center justify-center bg-[#F5F3E7]/10 rounded text-[#F5F3E7] hover:bg-[#F5F3E7]/20 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[#CCFF00] font-bold">
                      ${((typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price)) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  className="p-1 text-[#F5F3E7]/50 hover:text-[#FF006E] transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#F5F3E7]/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#F5F3E7]/70">Subtotal</span>
              <span className="text-xl font-bold text-[#F5F3E7]">${total.toFixed(2)}</span>
            </div>
            <p className="text-[#F5F3E7]/50 text-xs">Shipping calculated at checkout</p>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-[#0A0A0A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/20 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-[#F5F3E7]/50 hover:text-[#FF006E] text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
