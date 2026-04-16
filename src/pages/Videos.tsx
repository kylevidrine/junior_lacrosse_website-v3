import React, { useState, useEffect } from 'react';

const STRAPI_URL = 'https://admin.robosouthla.com';

interface StrapiVideo {
  id: number;
  documentId: string;
  title: string;
  url: string;
  createdAt: string;
}

interface StrapiResponse {
  data: StrapiVideo[];
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<StrapiVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/videos?sort=createdAt:desc`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load videos (${res.status})`);
        return res.json();
      })
      .then((json: StrapiResponse) => {
        setVideos(json.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('[Videos] Error loading from Strapi:', err);
        setError(err.message || 'Failed to load videos.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-header text-stone-50 uppercase italic tracking-tighter">Live Sessions</h1>
        <p className="text-brand-gold font-header uppercase tracking-[0.4em] text-sm mt-4 font-light">Performance Archive</p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-brand-gold mb-4"></div>
            <p className="text-stone-500 font-header uppercase tracking-widest">Loading Media...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 border border-dashed border-red-500/30 rounded-3xl bg-red-500/5 px-6 max-w-2xl mx-auto">
            <div className="inline-block p-3 rounded-full bg-red-500/10 mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-500 font-header text-2xl uppercase tracking-widest mb-2">
              Sync Connectivity Error
            </p>
            <p className="text-sm text-stone-400 uppercase tracking-widest">
              Details: {error}
            </p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videos.map((video) => (
              <div key={video.documentId} className="group bg-neutral-900/50 border border-white/5 rounded-[32px] overflow-hidden hover:border-brand-gold/30 transition-all duration-500 flex flex-col">
                <div className="p-6">
                  {video.createdAt && (
                    <p className="text-brand-gold font-header text-sm tracking-widest mb-2 uppercase">
                      {new Date(video.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                  <h2 className="text-2xl font-header text-stone-50 uppercase tracking-tight group-hover:text-brand-gold transition-colors truncate">
                    {video.title}
                  </h2>
                </div>
                
                <div className="bg-black aspect-video w-full">
                  <iframe 
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false&width=500`}
                    width='100%' 
                    height='100%'
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling='no' 
                    allowFullScreen={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px] max-w-2xl mx-auto">
            <p className="text-stone-500 font-header uppercase tracking-widest text-xl">
              No videos found.
            </p>
            <p className="text-xs text-stone-600 uppercase mt-4 tracking-widest">Check back soon for new performance footage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;