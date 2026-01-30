
import React from 'react';
import { Language } from '../types';

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const partners = ['ČSOB', 'MONETA', 'UNI CREDIT', 'HOMECREDIT', 'KOOPERATIVA', 'GENERALI'];

  return (
    <div className="fade-in bg-[#050505] min-h-screen pb-40">
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=90&w=2400" className="w-full h-full object-cover grayscale opacity-20" alt="Services background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505]" />
        </div>
        <div className="relative z-10 text-center pt-48 md:pt-64">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase font-heading leading-tight">{lang === 'CZ' ? 'Služby' : 'Services'}</h1>
          <div className="w-10 h-[1px] bg-[#dbad1e] mx-auto mt-6 opacity-30" />
        </div>
      </section>

      {/* ODTAH & LOGISTIKA */}
      <section className="py-24 md:py-40 px-8 md:px-20 max-w-screen-2xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-10 leading-none">Odtah & Dovoz</h2>
            <div className="space-y-8 text-white/50 font-light">
              <p className="text-xl md:text-2xl text-white">Zajišťujeme profesionální přepravu vašich vozů s maximální péčí.</p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Dovoz vozidel ze zahraničí</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Odtah poškozených a nepojízdných vozidel</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-[#dbad1e] mr-4" /> Pojištění přepravovaného nákladu</li>
              </ul>
              <div className="pt-10 border-t border-white/5">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">Cena od 15 Kč/km <span className="text-sm font-normal text-white/40">bez DPH</span></p>
                <div className="mt-8 space-y-2">
                  <p className="text-xl font-bold tracking-widest">+420 605 034 911</p>
                  <p className="text-lg opacity-60">bursikja@seznam.cz</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] overflow-hidden border border-white/5">
             <img src="https://images.unsplash.com/photo-1517733948473-efec634333da?auto=format&fit=crop&q=80&w=2400" className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000" alt="Towing truck" />
          </div>
        </div>
      </section>

      {/* FINANCOVÁNÍ & POJIŠTĚNÍ */}
      <section className="py-24 md:py-40 px-8 md:px-20 max-w-screen-2xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] bg-white/5 opacity-60">
              {partners.map(p => (
                <div key={p} className="flex items-center justify-center p-8 md:p-12 bg-black border border-transparent text-[10px] md:text-[12px] font-bold tracking-widest hover:text-[#dbad1e] hover:opacity-100 transition-all uppercase text-white/40">
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-10 leading-none">Financování</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase font-heading text-white/90">Individuální platební řešení</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed">Díky spolupráci s předními českými finančními institucemi dokážeme nabídnout individuální splátkové kalendáře a výhodné úrokové sazby pro soukromé i firemní účely.</p>
              </div>
              <div className="pt-10 border-t border-white/5">
                <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase font-heading text-white/90">Komplexní pojistný servis</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-8">Zajišťujeme kompletní pojistný servis, aby váš vůz byl chráněn od prvního kilometru.</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-8 bg-[#080808] border border-white/5 flex items-center justify-center group hover:border-[#dbad1e] transition-colors">
                    <p className="font-bold text-lg uppercase font-heading tracking-widest group-hover:text-[#dbad1e]">Povinné ručení</p>
                  </div>
                  <div className="flex-1 p-8 bg-[#080808] border border-white/5 flex items-center justify-center group hover:border-[#dbad1e] transition-colors">
                    <p className="font-bold text-lg uppercase font-heading tracking-widest group-hover:text-[#dbad1e]">Havarijní pojištění</p>
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
