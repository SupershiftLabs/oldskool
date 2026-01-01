import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { MerchProduct } from '@/types';
import { ShoppingBag, Filter, X, QrCode, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const MerchPage: React.FC = () => {
  const { addToCart, setCartOpen } = useStore();
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tshirt', label: 'T-Shirts' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'cap', label: 'Caps' },
    { id: 'sticker', label: 'Stickers' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase.from('merch_products').select('*').eq('is_active', true);
        
        if (activeCategory !== 'all') {
          query = query.eq('category', activeCategory);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    if (selectedProduct.sizes && selectedProduct.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (selectedProduct.colors && selectedProduct.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart(selectedProduct, quantity, selectedSize || undefined, selectedColor || undefined);
    toast.success(`${selectedProduct.name} added to cart!`);
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setCartOpen(true);
  };

  const handleQuickAdd = (product: MerchProduct) => {
    if ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0)) {
      setSelectedProduct(product);
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    } else {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
      setCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#1B4332]/30 to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F3E7] mb-4">
              Official <span className="text-[#CCFF00]">Merch</span>
            </h1>
            <p className="text-lg text-[#F5F3E7]/70">
              Rep the Old Skool lifestyle with our premium collection of apparel and accessories.
            </p>
          </div>
        </div>
      </section>

      {/* QR Payment Info */}
      <section className="py-6 bg-[#CCFF00]/10 border-y border-[#CCFF00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-[#CCFF00]" />
              <div>
                <p className="text-[#F5F3E7] font-semibold">On the bus? Scan to pay!</p>
                <p className="text-[#F5F3E7]/60 text-sm">Apple Pay, Google Pay, or tap-to-pay cards accepted</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#F5F3E7]/50" />
              <span className="text-[#F5F3E7]/50 text-sm">No cash needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#F5F3E7]/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-[#F5F3E7]/50 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#CCFF00] text-[#0A0A0A]'
                    : 'bg-[#F5F3E7]/10 text-[#F5F3E7]/70 hover:bg-[#F5F3E7]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-[#F5F3E7]/5 rounded-2xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#F5F3E7]/50 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#F5F3E7]/5 rounded-2xl overflow-hidden border border-[#F5F3E7]/10 hover:border-[#CCFF00]/30 transition-all"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.stock < 20 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-[#FF006E] text-white text-xs font-medium rounded">
                        Low Stock
                      </div>
                    )}
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-3 left-3 right-3 py-2.5 bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#CCFF00] font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-[#F5F3E7] font-medium mt-1 truncate">{product.name}</h3>
                    <p className="text-[#CCFF00] font-bold text-lg mt-1">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</p>
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {product.colors.slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-[#F5F3E7]/20"
                            style={{ 
                              backgroundColor: 
                                color.toLowerCase() === 'cream' ? '#F5F3E7' :
                                color.toLowerCase() === 'forest green' ? '#1B4332' :
                                color.toLowerCase() === 'black' ? '#0A0A0A' :
                                color.toLowerCase() === 'navy' ? '#1e3a5f' :
                                color.toLowerCase() === 'orange' ? '#f97316' :
                                color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-[#0A0A0A] rounded-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-6 flex flex-col">
                <span className="text-xs text-[#CCFF00] font-medium uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-2xl font-bold text-[#F5F3E7] mt-1">{selectedProduct.name}</h2>
                <p className="text-[#F5F3E7]/60 text-sm mt-2">{selectedProduct.description}</p>
                <p className="text-3xl font-bold text-[#CCFF00] mt-4">${typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : parseFloat(selectedProduct.price).toFixed(2)}</p>

                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mt-6">
                    <label className="text-sm text-[#F5F3E7]/70 mb-2 block">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'bg-[#CCFF00] text-[#0A0A0A]'
                              : 'bg-[#F5F3E7]/10 text-[#F5F3E7] hover:bg-[#F5F3E7]/20'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="text-sm text-[#F5F3E7]/70 mb-2 block">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedColor === color
                              ? 'bg-[#CCFF00] text-[#0A0A0A]'
                              : 'bg-[#F5F3E7]/10 text-[#F5F3E7] hover:bg-[#F5F3E7]/20'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <label className="text-sm text-[#F5F3E7]/70 mb-2 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-[#F5F3E7]/10 rounded-lg text-[#F5F3E7] hover:bg-[#F5F3E7]/20 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-[#F5F3E7] w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-[#F5F3E7]/10 rounded-lg text-[#F5F3E7] hover:bg-[#F5F3E7]/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-gradient-to-r from-[#CCFF00] via-[#FF6B35] to-[#FF1493] text-white font-bold rounded-lg hover:from-[#FF1493] hover:via-[#FF6B35] hover:to-[#CCFF00] shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MerchPage;
