
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { cars } from '../data/cars';

const Rent: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaValue.trim() !== '84') {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setSubmitted(true);
  };

  return (
    <div className="fade-in bg-[#050505]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=90&w=2400" 
            className="w-full h-full object-cover grayscale opacity-40 scale-105"
            alt="Luxury interior"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-8">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-none">
            {lang === 'CZ' ? 'Pronájem vozidel' : 'Vehicle Rental'}
          </h1>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="pb-40 px-8 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tighter mb-8 leading-none">
              {lang === 'CZ' ? 'Rezervace vozidla' : 'Vehicle Reservation'}
            </h2>
            <p className="text-white/50 font-light leading-relaxed mb-10 text-lg">
              {lang === 'CZ' 
                ? 'Náš tým pracovníků vám vždy ochotně poradí nebo zodpoví vaše dotazy. Vyberte si konkrétní vůz z naší nabídky.' 
                : 'Our team is always ready to advise you. Please select a specific vehicle from our inventory.'}
            </p>
            <div className="h-[2px] w-20 bg-[#dbad1e]/40" />
          </div>

          <div className="lg:col-span-8 relative">
            {submitted ? (
              <div className="bg-[#080808] p-12 md:p-24 text-center border border-[#dbad1e]/10 animate-in fade-in duration-1000">
                <div className="w-16 h-16 border border-[#dbad1e]/20 flex items-center justify-center mx-auto mb-10">
                   <svg className="w-7 h-7 text-[#dbad1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold uppercase font-heading mb-6">Děkujeme za rezervaci</h3>
                <p className="text-white/30 text-lg font-light leading-relaxed mb-12 max-w-sm mx-auto">
                  Vaše poptávka byla úspěšně odeslána. Budeme vás kontaktovat ohledně dostupnosti zvoleného vozu.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] uppercase tracking-[0.5em] font-bold text-[#dbad1e]/40 hover:text-[#dbad1e] transition-colors"
                >
                  ZPĚT K FORMULÁŘI
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="group border-b border-white/20 pb-3 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">JMÉNO *</label>
                    <input required type="text" placeholder="Jan Novák" className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 py-1" />
                  </div>
                  <div className="group border-b border-white/20 pb-3 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">FIRMA</label>
                    <input type="text" placeholder="Název společnosti (volitelné)" className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 py-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="group border-b border-white/20 pb-3 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">E-MAIL *</label>
                    <input required type="email" placeholder="vas@email.cz" className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 py-1" />
                  </div>
                  <div className="group border-b border-white/20 pb-3 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">TELEFON</label>
                    <input type="tel" placeholder="+420" className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 py-1" />
                  </div>
                </div>

                {/* VEHICLE SELECT */}
                <div className="group border-b border-white/20 pb-5 focus-within:border-[#dbad1e] transition-all duration-500">
                  <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-5 font-bold group-focus-within:text-[#dbad1e] transition-colors">VŮZ K PRONÁJMU</label>
                  <div className="relative">
                    <select className="w-full bg-transparent outline-none text-xl text-white font-light appearance-none cursor-pointer uppercase tracking-widest focus:text-[#dbad1e]">
                      <option className="bg-[#080808] text-white/20" value="">Vyberte vůz</option>
                      {cars.map(car => (
                        <option key={car.id} className="bg-[#080808] text-white" value={car.id}>
                          {car.brand} {car.model} ({car.year})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>

                <div className="group border-b border-white/20 pb-3 focus-within:border-[#dbad1e] transition-all duration-500">
                  <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">DALŠÍ POŽADAVKY</label>
                  <textarea rows={3} placeholder="Délka pronájmu, specifické přání..." className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 resize-none pt-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center">
                  <div className={`group border-b pb-3 transition-all duration-500 ${captchaError ? 'border-red-500' : 'border-white/20 focus-within:border-[#dbad1e]'}`}>
                    <label className="block text-[12px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold group-focus-within:text-[#dbad1e] transition-colors">KONTROLNÍ KÓD * (80 + 4)</label>
                    <input 
                      required 
                      type="text" 
                      value={captchaValue}
                      onChange={(e) => setCaptchaValue(e.target.value)}
                      placeholder="Výsledek" 
                      className="w-full bg-transparent outline-none text-2xl font-light text-white placeholder:text-white/10 py-1" 
                    />
                  </div>
                  <div className="text-sm text-white/40 italic font-light leading-relaxed">
                    Odesláním zprávy souhlasíte se zpracováním Vašich osobních údajů v souladu s našimi podmínkami.
                  </div>
                </div>

                <div className="pt-10">
                  <button type="submit" className="w-full bg-white text-black py-8 text-[12px] uppercase tracking-[0.7em] font-bold hover:bg-[#dbad1e] transition-all duration-500 shadow-2xl">
                    ODESLAT REZERVACI
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rent;