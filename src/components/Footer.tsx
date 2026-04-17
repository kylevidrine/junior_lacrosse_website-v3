import React, { useState, useEffect } from 'react';

const STRAPI_URL = 'https://admin.robosouthla.com';

interface SiteData {
  bandName: string;
  tagline: string;
  artist: string;
}

interface Social {
  id: number;
  platform: string;
  url: string;
}

const Footer: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    if (!siteData.artist) return;
    fetch(`${STRAPI_URL}/api/socials?filters[artist][$eq]=${siteData.artist}&filters[active][$eq]=true`)
      .then(res => res.json())
      .then(json => setSocials(json.data));
  }, [siteData.artist]);

  return (
    <footer className="relative z-10 bg-neutral-950 py-16 mt-24 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-500">
        <div className="flex justify-center space-x-8 mb-8">
          {socials.map((social) => (
            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">
              {social.platform}
            </a>
          ))}
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