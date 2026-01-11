
import React from 'react';
import { Language } from '../types';

const Privacy: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="fade-in pt-40 pb-40 px-8 md:px-20 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/30 mb-8 block font-bold">PRIVACY POLICY</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-heading leading-tight">
            {lang === 'CZ' ? 'Ochrana osobních údajů' : 'Privacy Policy'}
          </h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none text-white/60 font-light leading-relaxed space-y-16">
          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">1. Správce údajů</h2>
            <p>
              Správcem vašich osobních údajů je společnost BBCars s.r.o., se sídlem Plzeňská 968, 337 01 Rokycany, IČO: [DOPLNIT]. Vaše soukromí je pro nás prioritou.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">2. Rozsah zpracování</h2>
            <p>
              Zpracováváme údaje, které nám poskytnete prostřednictvím poptávkových formulářů (jméno, e-mail, telefon) a údaje nezbytné pro uzavření kupní nebo nájemní smlouvy.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">3. Účel zpracování</h2>
            <p>
              Vaše údaje využíváme výhradně pro:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Vybavení vaší poptávky po konkrétním vozidle.</li>
              <li>Přípravu smluvní dokumentace.</li>
              <li>Zajištění financování a pojištění u našich partnerů (v případě vašeho zájmu).</li>
              <li>Zasílání novinek v naší nabídce (pokud jste se přihlásili k odběru).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">4. Zabezpečení</h2>
            <p>
              Aplikujeme moderní technická a organizační opatření, abychom vaše údaje chránili před neoprávněným přístupem nebo zneužitím. Vaše údaje nikdy neprodáváme třetím stranám.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">5. Vaše práva</h2>
            <p>
              Máte právo na přístup ke svým údajům, jejich opravu, výmaz nebo omezení zpracování. Kdykoliv nás můžete kontaktovat na e-mailu info@bbcars.eu pro uplatnění svých práv.
            </p>
          </section>
        </article>

        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Datum vydání: 1. března 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
