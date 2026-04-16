import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="relative mb-24 rounded-[40px] overflow-hidden h-[500px] md:h-[700px] border border-white/5 shadow-2xl">
        <img
          src="/images/junior-hero.jpg"
          alt="Junior Lacrosse performing live"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[70%] contrast-110"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
          {/* Text overlay hidden — logo image already contains band name */}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-20 items-center px-4">
        <div className="space-y-8">
          <h2 className="text-5xl font-header text-stone-100 uppercase tracking-tighter italic">We Bringin' the Party</h2>
          <p className="text-xl text-stone-400 leading-relaxed font-light">
            The Junior Lacrosse Band has been lighting up dance floors across South Louisiana and the Gulf Coast with high-energy Swamp Pop that'll get you out of your seat. From The Music Cove in Houma to Cowboys in Lafayette to Archie's in Bay St. Louis — if there's a dance floor, we're filling it.
          </p>
          <p className="text-lg text-stone-500 leading-relaxed font-light">
            Catch us on the Easter Swamp Pop Cruise 2026 aboard the Carnival Liberty — three themed performances, cold beer, and a huge dance floor on the open sea.
          </p>
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
            src="/images/schedule.jpg"
            alt="Junior Lacrosse schedule"
            className="rounded-[32px] shadow-2xl w-full h-auto border border-white/5"
          />
        </div>
      </div>

      {/* Venues Section */}
      <div className="mt-32 text-center px-4">
        <h2 className="text-4xl font-header text-stone-100 uppercase tracking-tighter mb-12">Where We Play</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'The Music Cove', location: 'Houma, LA' },
            { name: "Cowboys Nightclub", location: 'Lafayette, LA' },
            { name: "Archie's", location: 'Bay St. Louis, MS' },
            { name: "Pat's Atchafalaya Club", location: 'Henderson, LA' },
          ].map((venue) => (
            <div key={venue.name} className="p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
              <p className="font-header text-xl text-brand-gold uppercase tracking-wider">{venue.name}</p>
              <p className="text-stone-500 text-sm mt-2">{venue.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
