import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { Tour, MerchProduct } from '@/types';
import { ArrowRight, Clock, Users, Star, ChevronRight, Sparkles, Bus, Wine, Sunset, PartyPopper } from 'lucide-react';

const HERO_IMAGE = '/skool bus hero.jpg';
const GALLERY_IMAGES = [
  'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299374606_5684ef0f.png',
  'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299362290_ba06f9bf.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299365426_8866f5e7.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299366177_a11fcaa6.jpg',
];

const HomePage: React.FC = () => {
  const { setActivePage, setSelectedTour, setBookingModalOpen, addToCart, setCartOpen } = useStore();
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const signatureTours = [
    {
      id: 'brew-skool',
      name: 'Brew Skool',
      subtitle: 'Quad Cities Craft Beer Bus',
      tagline: '"Skip class. Drink craft."',
      image: '/brew skool.jpg'
    },
    {
      id: 'hike-skool',
      name: 'Hike Skool',
      subtitle: 'Trails, Forests & River Views',
      tagline: '"Nature is totally rad!"',
      image: '/hike skool.jpg'
    },
    {
      id: 'sport-skool',
      name: 'Sport Skool',
      subtitle: 'Your VIP Pass to QC Sports',
      tagline: '"Game on. Ride home."',
      image: '/sport skool.jpg'
    },
    {
      id: 'culture-skool',
      name: 'Culture Skool',
      subtitle: 'Music, Art & Local Flavor',
      tagline: '"Learn the city. Feel the city."',
      image: '/culture skool.jpg'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from Supabase...');
        const productsRes = await supabase.from('merch_products').select('*').eq('is_active', true).limit(4);
        
        console.log('Products response:', productsRes);
        
        if (productsRes.data) setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBookTour = (tourId: string, tourName: string) => {
    const tourObj: any = {
      id: tourId,
      name: tourName,
      price: 75,
      duration: '4-8 hours',
      max_guests: 14
    };
    setSelectedTour(tourObj);
    setBookingModalOpen(true);
  };

  const handleQuickAdd = (product: MerchProduct) => {
    const defaultSize = product.sizes?.[0];
    const defaultColor = product.colors?.[0];
    addToCart(product, 1, defaultSize, defaultColor);
    setCartOpen(true);
  };

  const features = [
    { icon: Bus, title: '🚌 Groovy Wheels', desc: 'Authentic 70s-style converted school bus' },
    { icon: Wine, title: '🍺 Rad Routes', desc: 'Handpicked spots & local legends' },
    { icon: Sunset, title: '📸 Insta-Worthy', desc: 'Snap pics that\'ll blow up your feed' },
    { icon: PartyPopper, title: '🎉 BYOB Parties', desc: 'Private rides for your crew' },
  ];

  const stats = [
    { value: '5,000+', label: 'Cool Cats Served' },
    { value: '150+', label: 'Epic Adventures' },
    { value: '4.9★', label: 'Stellar Reviews' },
    { value: '100%', label: 'Gnarly Vibes' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#CCFF00] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Old Skool Bus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black leading-none mb-6 tracking-tight opacity-70">
              OLD SKOOL
              <span className="block text-[#CCFF00] mt-2">ADVENTURES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#F5F3E7]/80 mb-16 md:mb-8 max-w-lg font-medium">
              Hop on the coolest ride in town. 🚌 Retro vibes, rad destinations, zero hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-14 sm:mt-0">
              <button
                onClick={() => setActivePage('tours')}
                className="px-8 py-4 bg-gradient-to-r from-[#CCFF00] via-[#FF6B35] to-[#FF1493] text-white font-black text-lg rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/30 transform hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                🎟️ Book a Tour
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePage('gallery')}
                className="hidden sm:flex px-8 py-4 bg-[#FF6B35]/90 text-white font-bold text-lg rounded-lg hover:bg-[#FF6B35] transition-all border-2 border-[#FF6B35] uppercase tracking-wide"
              >
                📸 See the Vibes
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#F5F3E7]/50 text-xs tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-[#F5F3E7]/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-[#CCFF00] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] py-8 md:py-12 border-y-4 border-[#CCFF00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">{stat.value}</p>
                <p className="text-white/90 text-sm md:text-base mt-1 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black text-[#F5F3E7] mb-4 uppercase tracking-tight">
              Why Go <span className="text-[#CCFF00]">Old Skool</span>?
            </h2>
            <p className="text-[#F5F3E7] text-lg md:text-xl max-w-2xl mx-auto font-medium">
              We're not just transportation – we're a totally tubular experience! 🤙
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-6 bg-gradient-to-b from-[#F5F3E7]/5 to-transparent border border-[#F5F3E7]/10 rounded-2xl hover:border-[#CCFF00]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#CCFF00]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#CCFF00]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3E7] mb-2">{feature.title}</h3>
                <p className="text-[#F5F3E7]/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#F5F3E7] mb-2 uppercase tracking-tight">
                <span className="text-[#CCFF00]">Skool</span> Tours
              </h2>
              <p className="text-[#F5F3E7] text-lg font-medium">Hop on for rad adventures! 🚌</p>
            </div>
            <button
              onClick={() => setActivePage('tours')}
              className="hidden md:flex items-center gap-2 text-[#CCFF00] font-bold hover:gap-3 transition-all uppercase tracking-wide"
            >
              All Tours
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureTours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-[#F5F3E7]/5 rounded-2xl overflow-hidden border border-[#F5F3E7]/10 hover:border-[#CCFF00]/30 transition-all hover:scale-105 duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#F5F3E7] mb-1 group-hover:text-[#CCFF00] transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-[#F5F3E7]/70 text-sm mb-3">{tour.subtitle}</p>
                  <p className="text-[#CCFF00] text-xs mb-4 italic font-medium">{tour.tagline}</p>
                  <button
                    onClick={() => handleBookTour(tour.id, tour.name)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#CCFF00] via-[#FF6B35] to-[#FF1493] text-white font-black rounded-lg hover:from-[#FF1493] hover:via-[#FF6B35] hover:to-[#CCFF00] transition-all uppercase tracking-wide text-sm"
                  >
                    🎟️ Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActivePage('tours')}
            className="md:hidden w-full mt-6 py-3 bg-[#FF6B35] text-white font-bold rounded-lg hover:bg-[#FF8C42] transition-all uppercase tracking-wide"
          >
            See All Skool Tours 🚌
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3E7] mb-2">
              <span className="text-[#CCFF00]">#OldSkool</span> Moments
            </h2>
            <p className="text-[#F5F3E7]/60">Real riders, real vibes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#CCFF00]" />
                    <span className="text-[#F5F3E7] text-sm font-medium">@oldskool.tours</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setActivePage('gallery')}
              className="px-8 py-3 bg-[#F5F3E7]/10 text-[#F5F3E7] font-medium rounded-lg hover:bg-[#F5F3E7]/20 transition-colors"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Merch Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3E7] mb-2">
                Official <span className="text-[#CCFF00]">Merch</span>
              </h2>
              <p className="text-[#F5F3E7]/60">Rep the Old Skool lifestyle</p>
            </div>
            <button
              onClick={() => setActivePage('merch')}
              className="hidden md:flex items-center gap-2 text-[#CCFF00] font-medium hover:gap-3 transition-all"
            >
              Shop All
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#F5F3E7]/5 rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-3 left-3 right-3 py-2 bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      Quick Add
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-[#F5F3E7] truncate">{product.name}</h3>
                    <p className="text-[#CCFF00] font-bold mt-1">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setActivePage('merch')}
            className="md:hidden w-full mt-6 py-3 bg-[#F5F3E7]/10 text-[#F5F3E7] font-medium rounded-lg flex items-center justify-center gap-2"
          >
            Shop All Merch
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#1B4332]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F3E7] mb-4">
            Ready to Ride?
          </h2>
          <p className="text-[#F5F3E7]/70 text-lg mb-8 max-w-2xl mx-auto">
            Book your Old Skool experience today and create memories that'll last a lifetime. Private events, group tours, or solo adventures – we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActivePage('tours')}
              className="px-8 py-4 bg-[#CCFF00] text-[#0A0A0A] font-bold text-lg rounded-xl hover:bg-[#9EFF00] transition-colors"
            >
              Browse Tours
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-4 bg-[#F5F3E7]/10 text-[#F5F3E7] font-semibold text-lg rounded-xl hover:bg-[#F5F3E7]/20 transition-colors border border-[#F5F3E7]/20"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
