import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { Tour } from '@/types';
import { Music, Sparkles, Users, Clock, Check, Wine, Mic2, Lightbulb, Calendar } from 'lucide-react';

const PartyBusPage: React.FC = () => {
  const { setSelectedTour, setBookingModalOpen } = useStore();
  const [partyTour, setPartyTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartyTour = async () => {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('category', 'party')
          .eq('is_active', true)
          .single();

        if (error) throw error;
        setPartyTour(data);
      } catch (error) {
        console.error('Error fetching party tour:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartyTour();
  }, []);

  const handleBookParty = () => {
    if (partyTour) {
      setSelectedTour(partyTour);
      setBookingModalOpen(true);
    }
  };

  const features = [
    { icon: Music, title: 'Premium Sound System', desc: 'Bluetooth-enabled speakers with subwoofer' },
    { icon: Lightbulb, title: 'LED Party Lights', desc: 'Customizable RGB lighting throughout' },
    { icon: Mic2, title: 'Karaoke Setup', desc: 'Wireless mics and song library' },
    { icon: Wine, title: 'BYOB Friendly', desc: 'Bring your own drinks - we provide coolers & ice' },
  ];

  const occasions = [
    'Bachelor/Bachelorette Parties',
    'Birthday Celebrations',
    'Corporate Team Events',
    'Graduation Parties',
    'Pub Crawls',
    'Concert Transportation',
    'Sports Game Days',
    'Holiday Celebrations',
  ];

  const packages = [
    {
      name: 'Standard Party',
      duration: '4 hours',
      price: 599,
      guests: 'Up to 25',
      features: ['Sound system', 'LED lights', 'Ice & coolers', 'Professional driver'],
    },
    {
      name: 'VIP Experience',
      duration: '6 hours',
      price: 899,
      guests: 'Up to 35',
      features: ['Everything in Standard', 'Karaoke setup', 'Red carpet arrival', 'Custom playlist'],
      popular: true,
    },
    {
      name: 'Ultimate Party',
      duration: '8 hours',
      price: 1199,
      guests: 'Up to 40',
      features: ['Everything in VIP', 'Fog machine', 'Photo booth props', 'Dedicated host'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299374606_5684ef0f.png"
            alt="Party Bus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF006E]/20 border border-[#FF006E]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#FF006E]" />
              <span className="text-[#FF006E] text-sm font-medium">BYOB Party Bus</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#F5F3E7] leading-tight mb-6">
              Your Party,
              <span className="block text-[#CCFF00]">Our Wheels</span>
            </h1>
            
            <p className="text-xl text-[#F5F3E7]/70 mb-8">
              Turn any celebration into an unforgettable mobile party. Bring your own drinks, we'll bring the vibes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookParty}
                className="px-8 py-4 bg-gradient-to-r from-[#FF006E] to-[#FF4D94] text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#FF006E]/30 transform hover:scale-105 transition-all"
              >
                Book Party Bus
              </button>
              <a
                href="#packages"
                className="px-8 py-4 bg-[#F5F3E7]/10 text-[#F5F3E7] font-semibold text-lg rounded-xl hover:bg-[#F5F3E7]/20 transition-all border border-[#F5F3E7]/20 text-center"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3E7] mb-4">
              Party <span className="text-[#CCFF00]">Features</span>
            </h2>
            <p className="text-[#F5F3E7]/60 max-w-2xl mx-auto">
              Everything you need for the ultimate mobile celebration
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-6 bg-[#F5F3E7]/5 border border-[#F5F3E7]/10 rounded-2xl hover:border-[#FF006E]/30 transition-all group text-center"
              >
                <div className="w-14 h-14 bg-[#FF006E]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF006E]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#FF006E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3E7] mb-2">{feature.title}</h3>
                <p className="text-[#F5F3E7]/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3E7] mb-4">
              Party <span className="text-[#CCFF00]">Packages</span>
            </h2>
            <p className="text-[#F5F3E7]/60 max-w-2xl mx-auto">
              Choose the perfect package for your celebration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div 
                key={i}
                className={`relative p-6 md:p-8 rounded-2xl border transition-all ${
                  pkg.popular 
                    ? 'bg-gradient-to-b from-[#FF006E]/10 to-[#0A0A0A] border-[#FF006E]/50 scale-105' 
                    : 'bg-[#F5F3E7]/5 border-[#F5F3E7]/10 hover:border-[#CCFF00]/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF006E] text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[#F5F3E7] mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-[#CCFF00]">${pkg.price}</span>
                  <span className="text-[#F5F3E7]/50">/ {pkg.duration}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-[#F5F3E7]/60 mb-6">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pkg.guests}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#F5F3E7]/70">
                      <Check className="w-4 h-4 text-[#CCFF00] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={handleBookParty}
                  className={`w-full py-3 font-semibold rounded-lg transition-colors ${
                    pkg.popular
                      ? 'bg-[#FF006E] text-white hover:bg-[#FF4D94]'
                      : 'bg-[#CCFF00] text-[#0A0A0A] hover:bg-[#9EFF00]'
                  }`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3E7] mb-4">
              Perfect For <span className="text-[#CCFF00]">Any Occasion</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {occasions.map((occasion, i) => (
              <span
                key={i}
                className="px-5 py-2.5 bg-[#F5F3E7]/5 border border-[#F5F3E7]/10 rounded-full text-[#F5F3E7]/80 text-sm hover:border-[#CCFF00]/30 hover:text-[#CCFF00] transition-all cursor-default"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#FF006E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Party?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Book your party bus today and create memories that'll last a lifetime. Limited dates available!
          </p>
          <button
            onClick={handleBookParty}
            className="px-10 py-4 bg-white text-[#FF006E] font-bold text-lg rounded-xl hover:bg-[#F5F3E7] transition-colors"
          >
            Book Your Party Bus
          </button>
        </div>
      </section>
    </div>
  );
};

export default PartyBusPage;
