import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { Bus, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const { setActivePage } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          toast.info('You\'re already subscribed!');
        } else {
          throw error;
        }
      } else {
        toast.success('Welcome to the Old Skool family!');
        setEmail('');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1B4332]/30">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#0A0A0A] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#F5F3E7]">
                Join the <span className="text-[#CCFF00]">Old Skool</span> Crew
              </h3>
              <p className="text-[#F5F3E7]/70 mt-2">
                Get exclusive deals, tour updates, and merch drops straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F3E7]/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A]/50 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] placeholder-[#F5F3E7]/50 focus:outline-none focus:border-[#CCFF00] transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#9EFF00] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#CCFF00] to-[#1B4332] rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-[#0A0A0A]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#F5F3E7]">OLD SKOOL</h4>
                <p className="text-[10px] text-[#CCFF00] tracking-[0.15em]">TOURS & TRANSFERS</p>
              </div>
            </div>
            <p className="text-[#F5F3E7]/60 text-sm mb-4">
              Experience the city like never before aboard our iconic vintage school bus.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-[#F5F3E7]/10 rounded-lg flex items-center justify-center text-[#F5F3E7]/70 hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-[#CCFF00] font-semibold mb-4 text-sm tracking-wider">EXPERIENCES</h5>
            <ul className="space-y-2">
              {['Signature Tours', 'Custom Tours', 'Event Transfers', 'Party Bus'].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setActivePage(i === 3 ? 'party' : 'tours')}
                    className="text-[#F5F3E7]/70 hover:text-[#CCFF00] text-sm transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[#CCFF00] font-semibold mb-4 text-sm tracking-wider">COMPANY</h5>
            <ul className="space-y-2">
              {[
                { label: 'About Us', page: 'home' },
                { label: 'Gallery', page: 'gallery' },
                { label: 'Merch Store', page: 'merch' },
                { label: 'Contact', page: 'contact' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setActivePage(item.page)}
                    className="text-[#F5F3E7]/70 hover:text-[#CCFF00] text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[#CCFF00] font-semibold mb-4 text-sm tracking-wider">CONTACT</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CCFF00] mt-0.5 flex-shrink-0" />
                <span className="text-[#F5F3E7]/70 text-sm">123 Retro Lane, Downtown District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CCFF00] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] text-sm transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CCFF00] flex-shrink-0" />
                <a href="mailto:hello@oldskool.tours" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] text-sm transition-colors">
                  hello@oldskool.tours
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#F5F3E7]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F3E7]/50 text-sm">
            © 2026 Old Skool Tours & Transfers. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, i) => (
              <button key={i} className="text-[#F5F3E7]/50 hover:text-[#CCFF00] text-sm transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
