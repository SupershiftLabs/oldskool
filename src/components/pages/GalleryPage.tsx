import React, { useState } from 'react';
import { X, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299374606_5684ef0f.png',
    caption: 'Party vibes on the Old Skool bus',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299362290_ba06f9bf.jpg',
    caption: 'Wine country adventure',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299365426_8866f5e7.jpg',
    caption: 'Sunset cruise memories',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299366177_a11fcaa6.jpg',
    caption: 'Birthday celebration',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299225566_f5e50591.jpg',
    caption: 'Vineyard views',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299219370_25cecdf3.jpg',
    caption: 'Coastal drive',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299231865_7bccd01a.png',
    caption: 'City lights tour',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299239720_cb0f83f5.png',
    caption: 'BYOB party bus',
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6956d8036df1a038b170009f_1767299202124_62d93cee.png',
    caption: 'The iconic Old Skool bus',
  },
];

const GalleryPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? GALLERY_IMAGES.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === GALLERY_IMAGES.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#1B4332]/30 to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F3E7] mb-4">
              <span className="text-[#CCFF00]">#OldSkool</span> Gallery
            </h1>
            <p className="text-lg text-[#F5F3E7]/70">
              Real moments from real riders. Tag us @oldskool.tours to be featured!
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#CCFF00]" />
                    <span className="text-[#F5F3E7] text-sm font-medium">{image.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Instagram className="w-12 h-12 text-[#CCFF00] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F3E7] mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-[#F5F3E7]/70 mb-6 max-w-lg mx-auto">
            Stay updated with our latest tours, behind-the-scenes content, and community highlights.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            @oldskool.tours
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <>
          <div 
            className="fixed inset-0 bg-black/95 z-50"
            onClick={() => setSelectedIndex(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={GALLERY_IMAGES[selectedIndex].url}
                alt={GALLERY_IMAGES[selectedIndex].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <p className="text-center text-[#F5F3E7] mt-4 text-lg">
                {GALLERY_IMAGES[selectedIndex].caption}
              </p>
              <p className="text-center text-[#F5F3E7]/50 text-sm mt-1">
                {selectedIndex + 1} / {GALLERY_IMAGES.length}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryPage;
