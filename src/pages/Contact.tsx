import React, { useState, useEffect } from 'react';

const STRAPI_URL = 'https://admin.robosouthla.com';

interface ContactData {
  bookingEmail: string;
  phone: string;
  contactIntro: string;
  contactConfirmation: string;
  siteSource: string;
}

interface Social {
  id: number;
  platform: string;
  url: string;
}

const Contact: React.FC<{ artist: string }> = ({ artist }) => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [socials, setSocials] = useState<Social[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

  useEffect(() => {
    if (!artist) return;
    fetch(`${STRAPI_URL}/api/contacts?filters[artist][$eq]=${artist}`)
      .then(res => res.json())
      .then(json => setContactData(json.data[0]));
    fetch(`${STRAPI_URL}/api/socials?filters[artist][$eq]=${artist}&filters[active][$eq]=true`)
      .then(res => res.json())
      .then(json => setSocials(json.data));
  }, [artist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPlaceholder = !webhookUrl || webhookUrl.includes("your-n8n-instance.com") || webhookUrl === "";
    if (isPlaceholder) {
      setError('System Configuration Required: VITE_WEBHOOK_URL is missing in the environment.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      siteSource: contactData?.siteSource || '',
      formType: 'Booking Inquiry'
    };
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        if (response.status === 404 && webhookUrl.includes('webhook-test')) {
          throw new Error('The n8n test-mode is not active. Please open your n8n workflow and click "Execute Workflow" to listen for this message.');
        }
        throw new Error(`The signal was rejected (HTTP ${response.status}). Check your n8n credentials or CORS settings.`);
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'The connection to our booking office was interrupted. Please reach out via Facebook while we fix the lines.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in text-center py-24 space-y-8">
        <div className="inline-block p-6 rounded-full bg-brand-gold/10 border border-brand-gold/30 mb-4 animate-pulse">
          <svg className="w-16 h-16 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-7xl font-header uppercase tracking-tighter text-stone-50 mb-4">Message Received</h1>
        <p className="text-xl text-stone-400 uppercase tracking-[0.2em] font-light max-w-md mx-auto leading-relaxed">
          {contactData?.contactConfirmation}
        </p>
        <button onClick={() => setSubmitted(false)} className="text-brand-gold font-header uppercase tracking-[0.3em] text-sm hover:text-white transition-colors border-b border-brand-gold/30 py-2">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-header uppercase tracking-tighter text-stone-50 mb-4">Book Us</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-header uppercase tracking-widest text-brand-gold mb-4">Booking Inquiry</h2>
            <p className="text-stone-400 text-lg leading-relaxed">{contactData?.contactIntro}</p>
          </div>
          <div>
            <h2 className="text-2xl font-header uppercase tracking-widest text-brand-gold mb-4">Contact Information</h2>
            <p className="text-stone-400 text-lg leading-relaxed">
              Email: {contactData?.bookingEmail}<br />
              Phone: {contactData?.phone}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-header uppercase tracking-widest text-brand-gold mb-4">Social</h2>
            <div className="flex space-x-6">
              {socials.map((social) => (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="text-stone-400 font-header text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
          <div>
            <label className="block text-stone-500 uppercase tracking-widest font-header text-sm mb-2">Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-stone-500 uppercase tracking-widest font-header text-sm mb-2">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-brand-gold transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-stone-500 uppercase tracking-widest font-header text-sm mb-2">Message</label>
            <textarea name="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-brand-gold transition-colors" placeholder="Tell us about your event — venue, date, and any details..."></textarea>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-brand-gold hover:bg-brand-gold/80 text-neutral-950 font-header uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3">
            {isLoading ? <div className="h-6 w-6 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div> : 'Submit Booking Inquiry'}
          </button>
          {error && (
            <div className="mt-6 border border-red-500/30 bg-red-500/5 p-4 rounded-lg">
              <div className="flex items-start gap-3 text-red-400 mb-3">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs uppercase tracking-widest font-bold leading-relaxed">{error}</p>
              </div>
              <button type="button" onClick={() => setShowDebug(!showDebug)} className="text-[10px] text-white/40 uppercase tracking-widest underline hover:text-brand-gold">
                {showDebug ? 'Hide Diagnostics' : 'Show Debug Information'}
              </button>
              {showDebug && (
                <div className="mt-4 p-4 bg-black/60 rounded border border-white/10 font-mono text-[10px] text-brand-gold overflow-x-auto">
                  <p className="mb-2 text-white/60">// TARGET URL:</p>
                  <p className="mb-4 text-white break-all">{webhookUrl}</p>
                  <p className="mb-2 text-white/60">// CURRENT JSON PAYLOAD:</p>
                  <pre className="whitespace-pre-wrap">{JSON.stringify({ ...formData, submittedAt: 'GENERATED_ON_SUBMIT', siteSource: contactData?.siteSource || '' }, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;