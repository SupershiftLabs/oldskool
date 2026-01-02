import React from 'react';
import { useStore } from '@/store/useStore';
import { MapPin, Calendar } from 'lucide-react';

// Last updated: Labels completely removed - no duration badges
const ToursPage: React.FC = () => {
  const { setSelectedTour, setBookingModalOpen } = useStore();

  const signatureTours = [
    {
      id: 'brew-skool',
      icon: '🍺',
      name: 'Brew Skool',
      subtitle: 'Quad Cities Craft Beer Bus',
      description: 'A rolling craft beer tour across the QC. Zero driving, maximum tasting.',
      tagline: '"Skip class. Drink craft."',
      stops: [
        'Front Street Brewery (Davenport)',
        'Wake Brewing',
        'Bent River Brewing',
        'Five Cities Brewing'
      ],
      color: 'from-amber-500 to-orange-600',
      image: '/brew skool.jpg'
    },
    {
      id: 'hike-skool',
      icon: '🌲',
      name: 'Hike Skool',
      subtitle: 'Trails, Forests & River Views',
      description: 'Laid-back outdoor adventures to the best nearby nature spots.',
      tagline: '"Nature is totally rad!"',
      stops: [
        'Loud Thunder Forest Preserve',
        'Illiniwek Forest Preserve',
        'Sunderbruch Park',
        'Mississippi Riverfront trails'
      ],
      color: 'from-green-600 to-emerald-700',
      image: '/hike skool.jpg'
    },
    {
      id: 'sport-skool',
      icon: '🏈',
      name: 'Sport Skool',
      subtitle: 'Your VIP Pass to Quad Cities Sports',
      description: 'Skip the traffic and tailgate like a pro with Sport Skool—our rolling party bus for die-hard fans and casual spectators alike.',
      tagline: '"Game on. Ride home."',
      stops: [
        'Iowa City Hawkeyes matchups',
        'QC River Bandits at Modern Woodmen Stadium',
        'Pre-game tailgating onboard',
        'Easy trips to Iowa City, Davenport, Rock Island & beyond'
      ],
      color: 'from-blue-600 to-green-600',
      image: '/sport skool.jpg'
    },
    {
      id: 'culture-skool',
      icon: '🎶',
      name: 'Culture Skool',
      subtitle: 'Music, Art & Local Flavor',
      description: 'Art districts, live music, murals, and local stories.',
      tagline: '"Learn the city. Feel the city."',
      stops: [
        'Downtown Davenport',
        'Village of East Davenport',
        'Rock Island Arts District'
      ],
      color: 'from-purple-500 to-pink-600',
      image: '/culture skool.jpg'
    },
    {
      id: 'picnic-skool',
      icon: '🧺',
      name: 'Picnic Skool',
      subtitle: 'Retro River Picnic Road Trip',
      description: 'A nostalgic road trip + curated picnic experience.',
      tagline: '"Recess, reimagined."',
      stops: [
        'Sylvan Island',
        'Riverside Park',
        'Lake George (Muscatine area)'
      ],
      color: 'from-red-500 to-rose-600',
      image: '/picnic skool.jpg'
    },
    {
      id: 'foodie-skool-galena',
      icon: '🍽️',
      name: 'Foodie Skool – Galena Edition',
      subtitle: 'Historic Eats & Hidden Gems',
      description: 'A culinary adventure to Galena. Eat your way through one of the Midwest\'s best food towns—without worrying about parking or timing.',
      tagline: '"Extra credit for good taste."',
      stops: [
        'Handpicked restaurants & bakeries',
        'Local chocolate, cheese, or wine stops',
        'Free time to explore Main Street',
        'Bus vibe: food passports, curated playlists, nap-friendly ride home'
      ],
      color: 'from-yellow-500 to-orange-600',
      image: '/foodie skool.jpg'
    },
    {
      id: 'foodie-skool-river',
      icon: '🍔',
      name: 'Foodie Skool – River Towns Edition',
      subtitle: 'Muscatine, LeClaire & Beyond',
      description: 'Shorter foodie runs to nearby river towns with serious flavor.',
      tagline: '"Eat local. Travel smart."',
      stops: [
        'Muscatine – classic diners, riverfront eats, local bakeries',
        'LeClaire – boutique dining, coffee, sweets, Antique Archaeology stop',
        'Fulton / Clinton – comfort food, historic spots, river views',
        'Bus vibe: local food trivia, shared tasting stops, chill cruise back'
      ],
      color: 'from-blue-500 to-cyan-600',
      image: '/foodie skool.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/skool bus hero.jpg"
            alt="Old Skool Bus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black text-[#F5F3E7] mb-6 leading-none uppercase tracking-tighter">
              SKOOL'S <span className="text-[#CCFF00]">IN SESSION</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F3E7] mb-8 font-medium">
              Craft beer, killer views, and bomb food. 🍺🌅 Pick your adventure below! 👇
            </p>
          </div>
        </div>
      </section>

      {/* Signature Tours Section */}
      <section className="py-12 md:py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black text-[#F5F3E7] mb-4 uppercase tracking-tight">
              <span className="text-[#CCFF00]">Signature</span> Skool Tours
            </h2>
            <p className="text-[#F5F3E7] text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Epic adventures 🎯 and awesome experiences 🚌. VIP upgrades for Honor Roll treatment! ⭐
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureTours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-[#F5F3E7]/5 rounded-2xl overflow-hidden border border-[#F5F3E7]/10 hover:border-[#CCFF00]/30 transition-all hover:scale-105 duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-[#0A0A0A]">
                  <img 
                    src={tour.image} 
                    alt={tour.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#F5F3E7] mb-1">{tour.name}</h3>
                  <p className="text-[#CCFF00] text-sm font-medium mb-3">{tour.subtitle}</p>
                  <p className="text-[#F5F3E7]/70 text-sm mb-4">{tour.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-[#F5F3E7]/50 mb-2 font-medium">Possible Stops/Destinations:</p>
                    <div className="space-y-1">
                      {tour.stops.slice(0, 3).map((stop, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#F5F3E7]/60">
                          <MapPin className="w-3 h-3 text-[#CCFF00] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{stop}</span>
                        </div>
                      ))}
                      {tour.stops.length > 3 && (
                        <p className="text-xs text-[#CCFF00] pl-5">+{tour.stops.length - 3} more</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-[#CCFF00]/10 rounded-lg border border-[#CCFF00]/20">
                    <p className="text-[#CCFF00] text-sm font-medium text-center italic">{tour.tagline}</p>
                  </div>

                  <button
                    onClick={() => {
                      // Create a temporary tour object for booking
                      const tourObj: any = {
                        id: tour.id,
                        name: tour.name,
                        short_description: tour.subtitle,
                        description: tour.description,
                        price: 75, // Default price, can be customized
                        duration: '4-8 hours',
                        max_guests: 14
                      };
                      setSelectedTour(tourObj);
                      setBookingModalOpen(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#CCFF00] via-[#FF6B35] to-[#FF1493] text-white font-black rounded-lg hover:from-[#FF1493] hover:via-[#FF6B35] hover:to-[#CCFF00] transform hover:scale-105 transition-all uppercase tracking-wider shadow-lg"
                  >
                    🎟️ Book This Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/30 backdrop-blur-sm border-4 border-[#CCFF00] rounded-2xl p-8 md:p-12">
            <div className="text-6xl mb-4">🤘</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              Need a Custom Ride?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-6 max-w-lg mx-auto font-medium">
              Got something totally radical in mind? Corporate gig? Birthday bash? Bachelor(ette) party? We got you! 🎉
            </p>
            <button
              onClick={() => {}}
              className="px-10 py-4 bg-gradient-to-r from-[#CCFF00] via-[#FF6B35] to-[#FF1493] text-white font-black rounded-lg hover:from-[#FF1493] hover:via-[#FF6B35] hover:to-[#CCFF00] shadow-xl transform hover:scale-105 transition-all uppercase tracking-wider text-lg shadow-xl"
            >
              🚀 Let's Talk Custom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;

