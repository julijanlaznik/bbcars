
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface CustomOrderProps {
  lang: Language;
}

const CustomOrder: React.FC<CustomOrderProps> = ({ lang }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fade-in bg-[#050505]">
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=100&w=2400" 
          alt="Luxury car detail"
          className="w-full h-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </section>

      <div className="px-8 md:px-20 -mt-20 relative z-10 pb-40">
        <div className="max-w-screen-2xl mx-auto">
          
          <header className="mb-24">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-none mb-8">
              {t.nav_custom_order}
            </h1>
            <p className="text-lg md:text-3xl font-light tracking-tight text-white/40 max-w-3xl leading-relaxed">
              {lang === 'CZ' 
                ? 'Pokud váš vysněný vůz v naší aktuální nabídce chybí, vyhledáme jej pro vás napříč celou Evropou. S garantovaným původem i stavem.'
                : 'If your dream car is missing from our current inventory, we will find it for you across all of Europe. With guaranteed origin and condition.'}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 py-24 border-t border-white/5">
            
            <div className="space-y-20">
              <div className="space-y-12 pt-8">
                {[
                  { id: '01', title: 'Konzultace', text: 'Společně definujeme přesnou specifikaci, rozpočet a vaše priority. Každý detail je pro nás klíčový.' },
                  { id: '02', title: 'Vyhledávání', text: 'Využíváme naše evropské sítě a neveřejné nabídky prověřených partnerů.' },
                  { id: '03', title: 'Prověrka', text: 'Každý vůz osobně prověřujeme na místě. Kontrolujeme historii, autenticitu a technickou integritu.' },
                  { id: '04', title: 'Předání', text: 'Zajistíme dovoz, administrativu a vůz vám předáme v našem showroomu v perfektním stavu.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-8 group">
                    <span className="text-2xl font-heading font-medium opacity-20 group-hover:opacity-100 group-hover:text-[#dbad1e] transition-all duration-500 tabular-nums">{step.id}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 uppercase tracking-tighter font-heading">{step.title}</h3>
                      <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="lg:sticky lg:top-40">
                {submitted ? (
                  <div className="bg-[#080808] p-12 md:p-16 text-center border border-[#dbad1e]/10 animate-in fade-in duration-1000 shadow-[0_0_50px_-12px_rgba(219,173,30,0.05)]">
                    <div className="w-12 h-12 border border-[#dbad1e]/20 flex items-center justify-center mx-auto mb-8">
                      <svg className="w-5 h-5 text-[#dbad1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold uppercase font-heading mb-4">Poptávka přijata</h3>
                    <p className="text-white/40 text-lg font-light leading-relaxed mb-8">
                      Děkujeme za důvěru. Naši specialisté vás budou kontaktovat během následujících 24 hodin.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#dbad1e]/40 hover:text-[#dbad1e] transition-colors"
                    >
                      ODESLAT DALŠÍ POPTÁVKU
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#080808] p-8 md:p-14 border border-white/5">
                    <h2 className="text-3xl font-bold tracking-tighter mb-12 font-heading uppercase leading-none">Váš vysněný vůz</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                          <input required type="email" placeholder="E-MAIL" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                        </div>
                        <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                          <input required type="tel" placeholder="TELEFON" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                        </div>
                      </div>

                      <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                        <input required type="text" placeholder="ZNAČKA A MODEL" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                      </div>

                      <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                        <textarea 
                          rows={3} 
                          placeholder="POZNÁMKA K VÝBAVĚ" 
                          className="w-full bg-transparent outline-none text-xl font-light resize-none pt-1"
                        />
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" 
                          className="w-full bg-white text-black py-7 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-[#dbad1e] transition-all duration-500 shadow-2xl"
                        >
                          ODESLAT POPTÁVKU
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;
