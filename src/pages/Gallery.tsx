import React, { useState, useEffect } from 'react';

interface Flyer {
  url: string;
  title: string;
  date?: string;
  endDate?: string;
}

interface BandPhoto {
  url: string;
  title: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flyers' | 'photos'>('flyers');
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [bandPhotos, setBandPhotos] = useState<BandPhoto[]>([]);

  useEffect(() => {
    const today = new Date();

    fetch('https://admin.robosouthla.com/api/flyers?populate=*&filters[active][$eq]=true')
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter((f: any) => {
          if (!f.expiresDate) return true;
          return new Date(f.expiresDate) >= today;
        });

        const mapped = filtered.map((f: any) => ({
          url: 'https://admin.robosouthla.com' + f.image?.url,
          title: f.title,
          date: f.eventDate,
          endDate: f.expiresDate,
        }));

        setFlyers(mapped);
      });

    fetch('https://admin.robosouthla.com/api/band-photos?populate=*&sort=createdAt:desc')
      .then(res => res.json())
      .then(data => {
        const mapped = data.data.map((p: any) => ({
          url: 'https://admin.robosouthla.com' + p.image?.url,
          title: p.title,
          description: p.description,
        }));
        setBandPhotos(mapped);
      });
  }, []);

  const activeImages = activeTab === 'flyers' ? flyers : bandPhotos;

  return (
    <div className="animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-header uppercase tracking-tighter text-stone-50 mb-4">
          Gallery
        </h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
      </div>

      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab('flyers')}
          className={`font-header text-lg uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300 ${
            activeTab === 'flyers'
              ? 'bg-brand-gold text-neutral-950 border-brand-gold'
              : 'border-stone-700 text-stone-400 hover:border-brand-gold hover:text-brand-gold'
          }`}
        >
          Flyers
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`font-header text-lg uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300 ${
            activeTab === 'photos'
              ? 'bg-brand-gold text-neutral-950 border-brand-gold'
              : 'border-stone-700 text-stone-400 hover:border-brand-gold hover:text-brand-gold'
          }`}
        >
          Band Photos
        </button>
      </div>

      {activeImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900"
            >
              <img
                src={image.url}
                alt={image.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-stone-50 font-header text-xl uppercase tracking-widest">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
          <p className="text-stone-500 font-header uppercase tracking-widest text-xl">
            {activeTab === 'flyers' ? 'Flyers Coming Soon' : 'Photos Coming Soon'}
          </p>
          <p className="text-xs text-stone-600 uppercase mt-4 tracking-widest">
            {activeTab === 'flyers' ? 'Check back for upcoming event flyers.' : 'Check back for band photos from the road.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;