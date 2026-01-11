
import React from 'react';
import { Language } from '../types';

const Terms: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="fade-in pt-40 pb-40 px-8 md:px-20 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/30 mb-8 block font-bold">PRÁVNÍ INFORMACE</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-heading leading-tight">
            {lang === 'CZ' ? 'Obchodní podmínky' : 'Terms & Conditions'}
          </h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none text-white/60 font-light leading-relaxed space-y-16">
          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">1. Úvodní ustanovení</h2>
            <p>
              Tyto obchodní podmínky (dále jen „podmínky“) upravují práva a povinnosti mezi společností BBCars s.r.o. a zákazníkem při prodeji vozidel, zprostředkování dovozu a poskytování souvisejících služeb.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">2. Rezervace a prodej vozidel</h2>
            <p>
              Všechny ceny vozidel v naší nabídce jsou uvedeny včetně DPH, pokud není výslovně uvedeno jinak. Rezervace vozu je platná po dobu 48 hodin, není-li smluvně dohodnuto složení rezervační zálohy.
            </p>
            <p>
              Kupní smlouva je považována za uzavřenou okamžikem podpisu oběma stranami a zaplacením dohodnuté kupní ceny nebo její části určené pro financování.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">3. Dovoz vozu na zakázku</h2>
            <p>
              V případě individuálního dovozu vozu na přání zákazníka je vyžadována záloha ve výši minimálně 10 % z předpokládané kupní ceny. Tato záloha slouží k pokrytí nákladů na prověrku vozu v zahraničí a logistiku.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">4. Odpovědnost a záruky</h2>
            <p>
              Garantujeme pravost najetých kilometrů a jasný původ všech vozů v naší nabídce. Na ojetá vozidla poskytujeme zákonnou odpovědnost za skryté vady v souladu s platným občanským zákoníkem ČR.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">5. Závěrečná ustanovení</h2>
            <p>
              BBCars s.r.o. si vyhrazuje právo na změnu těchto obchodních podmínek. Aktuální znění je vždy dostupné na našich webových stránkách a v showroomu v Rokycanech.
            </p>
          </section>
        </article>

        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Poslední aktualizace: 1. března 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
