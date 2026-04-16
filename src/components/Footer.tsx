import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-neutral-950 py-16 mt-24 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-500">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://www.facebook.com/JuniorLacrosseBand" target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Facebook</a>
          <a href="#" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Instagram</a>
          <a href="https://open.spotify.com/artist/4cZ6AdaOgsH9Fgvv3NArgL" target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Spotify</a>
        </div>
        <p className="font-header uppercase tracking-tighter text-xl text-stone-200">&copy; {new Date().getFullYear()} Junior Lacrosse Band</p>
        <p className="text-xs mt-2 uppercase tracking-[0.4em] font-light mb-12">Louisiana Swamp Pop &bull; Live &amp; Loud</p>
        
        <div className="pt-4 border-t border-white/5">
          <a 
            href="https://RoboSouthLA.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-sans uppercase tracking-[0.4em] text-brand-gold/60 hover:text-brand-gold transition-all duration-500"
          >
            Built by RoboSouthLA.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
