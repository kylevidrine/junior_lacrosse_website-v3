import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STRAPI_URL = 'https://admin.robosouthla.com';

interface Homepage {
  heroTitle: string;
  heroSubtitle: string;
  sectionHeading: string;
  paragraph1: string;
  paragraph2: string;
  bio: string;
  heroImage: { url: string };
  bioImage: { url: string };
}

const Home: React.FC = () => {
  const [data, setData] = useState<Homepage | null>(null);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/homepages?populate=*&filters[artist][$eq]=Junior Lacrosse`)
      .then(res => res.json())
      .then(json => setData(json.data[0]));
  }, []);

  if (!data) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="relative mb-24 rounded-[40px] overflow-hidden h-[500px] md:h-[700px] border border-white/5 shadow-2xl">
        <img
          src={`${STRAPI_URL}${data.heroImage.url}`}
          alt="Junior Lacrosse performing live"
          className="w-full h-full object-cover brightness-[70%] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-center px-4">
        <div className="space-y-8">
          <h2 className="text-5xl font-header text-stone-100 uppercase tracking-tighter italic">{data.sectionHeading}</h2>
          <p className="text-xl text-stone-400 leading-relaxed font-light">{data.paragraph1}</p>
          <p className="text-lg text-stone-500 leading-relaxed font-light">{data.paragraph2}</p>
          <div className="pt-8 flex flex-col sm:flex-row gap-8">
            <Link to="/music" className="bg-brand-gold text-neutral-950 font-header text-2xl py-5 px-12 uppercase tracking-widest hover:bg-stone-50 transition-all shadow-xl text-center rounded-full">
              Listen Now
            </Link>
            <Link to="/events" className="border border-stone-700 text-stone-300 font-header text-2xl py-5 px-12 uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all text-center rounded-full">
              Live Dates
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={`${STRAPI_URL}${data.bioImage.url}`}
            alt="Junior Lacrosse schedule"
            className="rounded-[32px] shadow-2xl w-full h-auto border border-white/5"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;