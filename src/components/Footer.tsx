import React from 'react';

interface SiteData {
  bandName: string;
  tagline: string;
  facebookUrl: string;
  instagramUrl: string;
  spotifyUrl: string;
}

const Footer: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  return (
    <footer className="relative z-10 bg-neutral-950 py-16 mt-24 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-500">
        <div className="flex justify-center space-x-8 mb-8">
          {siteData.facebookUrl && (
            <a href={siteData.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Facebook</a>
          )}
          {siteData.instagramUrl && (
            <a href={siteData.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Instagram</a>
          )}
          {siteData.spotifyUrl && (
            <a href={siteData.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Spotify</a>
          )}
        </div>
        <p className="font-header uppercase tracking-tighter text-xl text-stone-200">&copy; {new Date().getFullYear()} {siteData.bandName}</p>
        <p className="text-xs mt-2 uppercase tracking-[0.4em] font-light mb-12">{siteData.tagline}</p>
        <div className="pt-4 border-t border-white/5">
          <a href="https://RoboSouthLA.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-sans uppercase tracking-[0.4em] text-brand-gold/60 hover:text-brand-gold transition-all duration-500">
            Built by RoboSouthLA.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;