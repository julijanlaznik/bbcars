
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const EngagementPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const location = useLocation();

  const handleClose = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem('concierge_closed', 'true');
  }, []);

  useEffect(() => {
    // Sledování kliknutí na auta (ukládáme do session)
    if (location.pathname.startsWith('/auto/')) {
      const clicks = parseInt(sessionStorage.getItem('car_interactions') || '0');
      sessionStorage.setItem('car_interactions', (clicks + 1).toString());
    }

    const wasClosed = sessionStorage.getItem('concierge_closed');
    const hasShown = sessionStorage.getItem('concierge_shown');
    
    if (wasClosed || hasShown) return;

    // Popup se aktivuje pouze v sekci Nabídka
    if (location.pathname === '/nabidka') {
      const timer = setTimeout(() => {
        const interactions = parseInt(sessionStorage.getItem('car_interactions') || '0');
        // Zobrazíme pouze pokud uživatel už aspoň na jedno auto kliknul (nebo tam prostě dlouho "leží")
        if (interactions >= 1) {
          showPopup();
        }
      }, 30000); // 30 sekund v nabídce

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const showPopup = () => {
    setIsVisible(true);
    sessionStorage.setItem('concierge_shown', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('concierge_closed', 'true');
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-24 right-6 md:bottom-32 md:right-10 z-[90] w-[calc(100vw-48px)] sm:w-[380px] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
      }`}
    >
      <div className="relative bg-white/[0.05] backdrop-blur-[40px] border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#dbad1e]" />
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {!isExpanded ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h3 className="text-lg font-bold font-heading uppercase tracking-tighter mb-3 leading-tight text-white">
                Hledáte konkrétní specifikaci?
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                Víme, že v tomto segmentu rozhodují detaily. Pokud náš showroom momentálně nenabízí přesně to, co hledáte, využijte naši síť kontaktů.
              </p>
              <button 
                onClick={() => setIsExpanded(true)}
                className="w-full bg-[#dbad1e] text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500"
              >
                KONZULTOVAT VÝBĚR
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 border border-[#dbad1e]/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-[#dbad1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#dbad1e] text-[10px] font-bold uppercase tracking-widest">Děkujeme, brzy se ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-white/20 pb-1 focus-within:border-[#dbad1e] transition-all">
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 font-bold">KONTAKT (TEL/EMAIL)</label>
                    <input required type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Váš kontakt..." className="w-full bg-transparent outline-none text-sm font-light py-1 text-white placeholder:text-white/10" />
                  </div>
                  <div className="border-b border-white/20 pb-1 focus-within:border-[#dbad1e] transition-all">
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 font-bold">CO VÁM CHYBÍ V NABÍDCE?</label>
                    <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Značka, model..." className="w-full bg-transparent outline-none text-sm font-light resize-none py-1 text-white placeholder:text-white/10" />
                  </div>
                  <button type="submit" className="w-full bg-[#dbad1e] text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500">
                    ODESLAT DOTAZ
                  </button>
                  <button type="button" onClick={() => setIsExpanded(false)} className="w-full text-white/20 hover:text-white/40 text-[8px] uppercase tracking-widest transition-colors font-bold mt-2">
                    ZPĚT
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementPopup;
