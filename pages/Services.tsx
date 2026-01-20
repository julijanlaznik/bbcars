
import React from 'react';
import { Language } from '../types';

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const partners = ['ČSOB', 'MONETA', 'UNI CREDIT', 'HOMECREDIT', 'KOOPERATIVA', 'GENERALI'];

  return (
    <div className="fade-in bg-[#050505] min-h-screen pb-40">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=90&w=2400" className="w-full h-full object-cover grayscale opacity-20" alt="Services background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505]" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-heading">{lang === 'CZ' ? 'Komplexní služby' : 'Our Services'}</h1>
        </div>
      </section>

      {/* ODTAH & LOGISTIKA */}
      <section className="py-24 px-8 md:px-20 max-w-screen-2xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#dbad1e] mb-8 block font-bold">LOGISTIKA</span>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter mb-12">Odtah & Dovoz</h2>
            <div className="space-y-8 text-white/50 font-light">
              <p className="text-xl text-white">Zajišťujeme profesionální přepravu vašich vozů s maximální péčí.</p>
              <ul className="space-y-4">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Dovoz vozidel ze zahraničí</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Odtah poškozených a nepojízdných vozidel</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Pojištění přepravovaného nákladu</li>
              </ul>
              <div className="pt-8 border-t border-white/5">
                <p className="text-2xl font-bold text-white mb-2">Cena od 15 Kč/km <span className="text-sm font-normal text-white/40">bez DPH</span></p>
                <div className="mt-8 space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-white/20">Kontakt na dispečink</p>
                  <p className="text-xl font-bold">+420 605 034 911</p>
                  <p className="text-lg opacity-60">bursikja@seznam.cz</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
             <img src="/odtah-vozidla.png" className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000" alt="Towing truck" />
          </div>
        </div>
      </section>

      {/* FINANCOVÁNÍ & POJIŠTĚNÍ */}
      <section className="py-24 px-8 md:px-20 max-w-screen-2xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 opacity-40">
              {partners.map(p => (
                <div key={p} className="flex items-center justify-center p-8 border border-white/5 text-[12px] font-bold tracking-widest hover:text-[#dbad1e] hover:opacity-100 transition-all">
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#dbad1e] mb-8 block font-bold">FINANCE & SAFE</span>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter mb-12">Financování & Pojištění</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Poskytujeme financování vozidel</h3>
                <p className="text-white/40 font-light leading-relaxed">Díky spolupráci s předními českými finančními institucemi dokážeme nabídnout individuální splátkové kalendáře a výhodné úrokové sazby pro soukromé i firemní účely.</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                <h3 className="text-2xl font-bold mb-4">Komplexní pojištění</h3>
                <p className="text-white/40 font-light leading-relaxed mb-6">Zajišťujeme kompletní pojistný servis, aby váš vůz byl chráněn od prvního kilometru.</p>
                <div className="flex gap-10">
                  <div className="flex-1 p-6 bg-[#080808] border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-[#dbad1e] mb-2">POV</p>
                    <p className="font-bold">Povinné ručení</p>
                  </div>
                  <div className="flex-1 p-6 bg-[#080808] border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-[#dbad1e] mb-2">HAV</p>
                    <p className="font-bold">Havarijní pojištění</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;