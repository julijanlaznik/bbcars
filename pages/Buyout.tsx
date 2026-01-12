
import React, { useState } from 'react';
import { Language } from '../types';

const Buyout: React.FC<{ lang: Language }> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fade-in bg-[#050505] min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* --- FOTO: HLAVNÍ OBRÁZEK VÝKUPU (PENÍZE/ATMOSFÉRA) --- */}
          <img src="/vykup-vozu.png" className="w-full h-full object-cover grayscale opacity-30" alt="Buyout background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505]" />
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-none">
            {lang === 'CZ' ? 'Výkup luxusních vozů' : 'Luxury Car Buyout'}
          </h1>
        </div>
      </section>

      <section className="py-32 px-8 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-12">Vaše investice v nejlepších rukou</h2>
            <div className="space-y-12">
              {[
                { title: 'RYCHLOST', text: 'Okamžité ocenění a vyplacení finančních prostředků do 24 hodin.' },
                { title: 'TRANSPARENTNOST', text: 'Žádné skryté poplatky. Nabízíme reálnou tržní cenu odpovídající stavu a specifikaci.' },
                { title: 'SERVIS', text: 'Zajistíme veškerou administrativu spojenou s převodem vozidla.' }
              ].map((step, i) => (
                <div key={i} className="group">
                  <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-[#FACC15] mb-4">{step.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {submitted ? (
              <div className="bg-[#080808] p-12 md:p-24 text-center border border-[#FACC15]/20">
                <h3 className="text-3xl font-bold uppercase font-heading mb-6">Poptávka přijata</h3>
                <p className="text-white/40 font-light">Děkujeme. Naši specialisté vás budou kontaktovat ohledně ocenění.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-12 bg-[#080808] p-10 md:p-16 border border-white/5">
                <div className="group border-b border-white/20 pb-2 focus-within:border-[#FACC15] transition-all">
                  <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold">ZNAČKA A MODEL</label>
                  <input required type="text" placeholder="Např. Ferrari 296 GTB" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group border-b border-white/20 pb-2 focus-within:border-[#FACC15] transition-all">
                    <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold">ROK VÝROBY</label>
                    <input required type="text" placeholder="2023" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                  </div>
                  <div className="group border-b border-white/20 pb-2 focus-within:border-[#FACC15] transition-all">
                    <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold">NAJETÉ KM</label>
                    <input required type="text" placeholder="5 000 km" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                  </div>
                </div>
                <div className="group border-b border-white/20 pb-2 focus-within:border-[#FACC15] transition-all">
                  <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold">TELEFONNÍ ČÍSLO</label>
                  <input required type="tel" placeholder="+420" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-7 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-[#FACC15] transition-all shadow-2xl">
                  ODESLAT K OCENĚNÍ
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buyout;
