import React, { useState, useEffect } from 'react';
import { Event } from '../types';

const Events: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load events (${res.status})`);
        return res.json();
      })
      .then((data: Event[]) => {
        setUpcomingEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('[Events] Error loading events.json:', err);
        setError(err.message || 'Failed to load events.');
        setIsLoading(false);
      });
  }, []);

  const formatEventDateTime = (event: Event): string => {
    if (!event.startDate) return "TBA";
    if (!event.endDate || event.startDate === event.endDate) {
      return event.startDate;
    }
    const endTimePart = event.endDate.split(' at ')[1];
    const startTimePart = event.startDate.replace(' at ', ' from ');
    return `${startTimePart} - ${endTimePart}`;
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-header text-stone-50 uppercase mb-12 text-center tracking-tighter italic">Live & Loud</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-brand-gold mb-4"></div>
            <p className="text-stone-500 font-header uppercase tracking-widest">Accessing Schedule...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 border border-dashed border-red-500/30 rounded-3xl bg-red-500/5 px-6">
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
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event.id} className="group relative bg-white/5 border border-white/5 hover:border-brand-gold/50 p-10 flex flex-col items-center justify-center text-center transition-all duration-500 rounded-[32px]">
              <div className="mb-0">
                <span className="block text-brand-gold font-header text-3xl tracking-tighter mb-2">
                  {formatEventDateTime(event)}
                </span>
                <h2 className="text-4xl font-header text-stone-100 uppercase tracking-tight group-hover:text-white transition-colors">
                  {event.venue}
                </h2>
                {event.city && (
                  <p className="text-brand-gold text-lg mt-1 uppercase tracking-widest">{event.city}</p>
                )}
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-brand-gold/20 group-hover:bg-brand-gold transition-colors rounded-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-brand-gold/20 group-hover:bg-brand-gold transition-colors rounded-full"></div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
            <p className="text-stone-500 font-header uppercase tracking-widest text-xl">
              No upcoming dates at this moment.
            </p>
            <p className="text-xs text-stone-600 uppercase mt-4 tracking-widest">Check back soon for the next session.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;