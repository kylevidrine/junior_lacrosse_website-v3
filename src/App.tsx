import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Music from './pages/Music';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Videos from './pages/Videos';

const STRAPI_URL = 'https://admin.robosouthla.com';
const ARTIST = 'Junior Lacrosse';

interface SiteData {
  bandName: string;
  tagline: string;
  artist: string;
}

const App: React.FC = () => {
  const [siteData, setSiteData] = React.useState<SiteData>({
    bandName: '',
    tagline: '',
    artist: '',
  });

  React.useEffect(() => {
    fetch(`${STRAPI_URL}/api/homepages?filters[artist][$eq]=${ARTIST}`)
      .then(res => res.json())
      .then(json => {
        const d = json.data[0];
        setSiteData({
          bandName: d?.artist || '',
          tagline: d?.tagline || '',
          artist: d?.artist || '',
        });
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 font-sans text-stone-50 selection:bg-emerald-500 selection:text-neutral-950">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-neutral-950 to-neutral-950 pointer-events-none"></div>

      <Header bandName={siteData.bandName} />

      <main className="relative z-10 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-900/40 backdrop-blur-2xl p-6 sm:p-12 rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact artist={siteData.artist} />} />
          </Routes>
        </div>
      </main>

      <Footer siteData={siteData} />
    </div>
  );
};

export default App;