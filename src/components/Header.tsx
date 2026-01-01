import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Menu, X, Bus, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activePage, setActivePage, setCartOpen, getCartCount } = useStore();
  const cartCount = getCartCount();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tours', label: 'Tours' },
    { id: 'party', label: 'Party Bus' },
    { id: 'merch', label: 'Merch' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1B4332]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#CCFF00] to-[#1B4332] rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6 md:w-7 md:h-7 text-[#0A0A0A]" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-[#F5F3E7] tracking-tight">
                OLD SKOOL
              </h1>
              <p className="text-[10px] md:text-xs text-[#CCFF00] tracking-[0.2em] -mt-1">
                TOURS & TRANSFERS
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activePage === item.id
                    ? 'text-[#CCFF00] bg-[#1B4332]/30'
                    : 'text-[#F5F3E7]/80 hover:text-[#F5F3E7] hover:bg-[#F5F3E7]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Admin Button (hidden on mobile) */}
            <button
              onClick={() => setActivePage('admin')}
              className={`hidden md:flex p-2 md:p-3 transition-colors ${
                activePage === 'admin' ? 'text-[#CCFF00]' : 'text-[#F5F3E7]/50 hover:text-[#F5F3E7]'
              }`}
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 md:p-3 text-[#F5F3E7] hover:text-[#CCFF00] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF006E] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Now CTA */}
            <button
              onClick={() => setActivePage('tours')}
              className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-[#0A0A0A] font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/20 transform hover:scale-105 transition-all"
            >
              Book Now
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F3E7]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-t border-[#1B4332]/30">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all ${
                  activePage === item.id
                    ? 'text-[#CCFF00] bg-[#1B4332]/30'
                    : 'text-[#F5F3E7]/80 hover:text-[#F5F3E7] hover:bg-[#F5F3E7]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all flex items-center gap-2 ${
                activePage === 'admin'
                  ? 'text-[#CCFF00] bg-[#1B4332]/30'
                  : 'text-[#F5F3E7]/80 hover:text-[#F5F3E7] hover:bg-[#F5F3E7]/5'
              }`}
            >
              <Settings className="w-5 h-5" />
              Admin
            </button>
            <button
              onClick={() => {
                setActivePage('tours');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-[#0A0A0A] font-bold text-base rounded-lg"
            >
              Book Your Ride
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
