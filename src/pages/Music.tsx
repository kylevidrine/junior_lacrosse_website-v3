import React, { useState, useEffect } from 'react';

const STRAPI_URL = 'https://admin.robosouthla.com';
const ARTIST = 'Junior Lacrosse';

interface StrapiAlbum {
  id: number;
  documentId: string;
  title: string;
  year: string;
  spotifyId: string;
  type: string;
}

const Music: React.FC = () => {
  const [albums, setAlbums] = useState<StrapiAlbum[]>([]);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/albums?filters[artist][$eq]=${ARTIST}&sort=year:asc`)
      .then(res => res.json())
      .then(json => setAlbums(json.data));
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-header text-stone-50 uppercase italic tracking-tighter">The Sound</h1>
        <p className="text-brand-gold font-header uppercase tracking-[0.4em] text-sm mt-4 font-light">Official Discography</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {albums.map((album) => (
          <div
            key={album.documentId}
            className="flex flex-col bg-neutral-900/50 border border-white/5 rounded-[32px] overflow-hidden hover:border-brand-gold/30 transition-all duration-500 group"
          >
            <div className="p-6 pb-0">
              <p className="text-brand-gold font-header text-sm tracking-widest mb-2 uppercase">{album.year} {album.type}</p>
              <h2 className="text-2xl md:text-3xl font-header text-stone-50 uppercase leading-tight group-hover:text-brand-gold transition-colors">{album.title}</h2>
            </div>
            <div className="bg-black overflow-hidden h-[380px] mt-4">
              <iframe
                src={`https://open.spotify.com/embed/${album.type?.toLowerCase() || 'album'}/${album.spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;