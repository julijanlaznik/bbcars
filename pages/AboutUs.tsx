
import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AboutUsProps {
  lang: Language;
}

const useIntersectionReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, ...options });

    const currentRef = elementRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return { elementRef, isVisible };
};

const AboutUs: React.FC<AboutUsProps> = ({ lang }) => {
  const t = translations[lang];
  
  const heroReveal = useIntersectionReveal();
  const visionReveal = useIntersectionReveal();
  const teamReveal = useIntersectionReveal();
  const pillarsReveal = useIntersectionReveal();
  const quoteReveal = useIntersectionReveal();

  return (
    <div className="fade-in bg-[#050505] selection:bg-white selection:text-black">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=90&w=2400" 
            className="w-full h-full object-cover grayscale opacity-20 scale-110 transition-transform duration-[10s] ease-out hover:scale-100"
            alt="BBCars Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]" />
        </div>
        
        <div ref={heroReveal.elementRef} className={`relative z-10 text-center px-8 max-w-5xl transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) ${heroReveal.isVisible ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-20 blur-xl scale-95'}`}>
           <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase font-heading leading-[0.85] mb-12">
             {lang === 'CZ' ? 'Vášeň pro' : 'Passion for'} <br/>
             <span className="text-white/20 italic font-light">{lang === 'CZ' ? 'preciznost' : 'precision'}</span>
           </h1>
           <div className="flex justify-center">
             <div className="w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent animate-bounce mt-10" />
           </div>
        </div>
      </section>

      {/* 2. THE STORY */}
      <section className="py-40 px-8 md:px-20 max-w-screen-2xl mx-auto border-t border-white/5">
        <div ref={visionReveal.elementRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-start transition-all duration-[1500ms] ${visionReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-95'}`}>
          <div>
            <p className="text-4xl md:text-7xl font-bold font-heading uppercase tracking-tighter leading-[1] text-white">
              {lang === 'CZ' 
                ? 'Neprodáváme auta. Kurátorsky vybíráme investice do radosti.' 
                : 'We don’t just sell cars. We curate investments in joy.'}
            </p>
          </div>
          <div className="space-y-10 pt-4">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/40">
              {lang === 'CZ'
                ? 'Naše cesta začala v roce 2009 s jednoduchou myšlenkou: trh s luxusními vozy nepotřebuje dalšího prodejce, ale partnera, který rozumí hodnotě důvěry. Za patnáct let jsme se stali místem, kde se setkává vášeň pro automotive s nekompromisním standardem kvality.'
                : 'Our journey began in 2009 with a simple idea: the luxury car market doesn’t need another dealer, but a partner who understands the value of trust. Over fifteen years, we have become a place where automotive passion meets uncompromising standards of quality.'}
            </p>
            <p className="text-xl font-light leading-relaxed text-white/30">
              {lang === 'CZ'
                ? 'Každý vůz v našem showroomu prošel mým osobním výběrem. Pokud bych s ním nechtěl sám jezdit, nenajdete ho u nás. To je slib, na kterém jsme BBCars postavili.'
                : 'Every car in our showroom has passed my personal selection. If I wouldn\'t want to drive it myself, you won\'t find it here. That is the promise BBCars was built upon.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE TEAM */}
      <section className="py-40 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div ref={teamReveal.elementRef} className="px-8 md:px-20 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/5 max-w-5xl mx-auto">
            <div className={`bg-[#050505] p-12 flex flex-col items-center text-center group transition-all duration-[1200ms] delay-100 cubic-bezier(0.34, 1.56, 0.64, 1) ${teamReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-75'}`}>
              <div className="w-56 h-56 rounded-full overflow-hidden mb-10 grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/10 relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Jakub Buršík" />
                <div className="absolute inset-0 bg-[#dbad1e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
              <h3 className="text-3xl font-bold font-heading uppercase tracking-tight mb-4 group-hover:text-[#dbad1e] transition-colors">Jakub Buršík</h3>
              <p className="text-lg font-light text-white/40 leading-relaxed max-w-xs">
                {lang === 'CZ' ? 'Vizionář a strategický mozek BBCars, který dohlíží na kurátorský výběr každého vozu v nabídce.' : 'Visionary and strategic brain of BBCars, overseeing the curated selection of every vehicle in the inventory.'}
              </p>
            </div>

            <div className={`bg-[#050505] p-12 flex flex-col items-center text-center group transition-all duration-[1200ms] delay-300 cubic-bezier(0.34, 1.56, 0.64, 1) ${teamReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-75'}`}>
              <div className="w-56 h-56 rounded-full overflow-hidden mb-10 grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/10 relative">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Jan Buršík" />
                <div className="absolute inset-0 bg-[#dbad1e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
              <h3 className="text-3xl font-bold font-heading uppercase tracking-tight mb-4 group-hover:text-[#dbad1e] transition-colors">Jan Buršík</h3>
              <p className="text-lg font-light text-white/40 leading-relaxed max-w-xs">
                {lang === 'CZ' ? 'Expert na klientské vztahy a individuální dovoz exkluzivních vozů na míru vašim snům.' : 'Expert in client relations and individual import of exclusive vehicles tailored to your dreams.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PILLARS */}
      <section className="py-40 px-8 md:px-20 max-w-screen-2xl mx-auto">
        <div ref={pillarsReveal.elementRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              title: lang === 'CZ' ? 'Kurátorství' : 'Curation',
              text: lang === 'CZ' ? 'Nevybíráme auta podle tabulek, ale podle jejich stavu, duše a potenciálu. Každý kus je unikát.' : 'We don’t select cars by spreadsheets, but by their condition, soul, and potential. Each piece is unique.',
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            },
            {
              title: lang === 'CZ' ? 'Transparentnost' : 'Transparency',
              text: lang === 'CZ' ? 'Jasný původ a kompletní servisní historie jsou u nás absolutním standardem. Nic neskrýváme.' : 'Clear origin and full service history are our absolute standards. We hide nothing.',
              icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
            },
            {
              title: lang === 'CZ' ? 'Kontinuita' : 'Continuity',
              text: lang === 'CZ' ? 'Prodejem to nekončí. O naše klienty a jejich vozy se staráme dlouhodobě jako o součást rodiny.' : 'It doesn’t end with the sale. We care for our clients and their cars long-term as part of the family.',
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            }
          ].map((pillar, i) => (
            <div 
              key={i} 
              className={`group transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) ${pillarsReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-90'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 mb-8 flex items-center justify-center border border-white/5 bg-white/[0.02] group-hover:border-[#dbad1e] group-hover:bg-[#dbad1e]/5 group-hover:scale-110 transition-all duration-700">
                <svg className="w-6 h-6 text-white/30 group-hover:text-[#dbad1e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={pillar.icon}/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold font-heading uppercase tracking-tight mb-4 group-hover:text-[#dbad1e] transition-colors">{pillar.title}</h3>
              <p className="text-white/40 text-lg font-light leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ATMOSPHERIC QUOTE */}
      <section className="relative py-60 bg-[#050505] overflow-hidden">
        <div ref={quoteReveal.elementRef} className={`max-w-screen-2xl mx-auto px-8 md:px-20 text-center relative z-10 transition-all duration-[2000ms] ${quoteReveal.isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-2xl translate-y-20'}`}>
           <blockquote className="text-4xl md:text-7xl font-light tracking-tight italic opacity-40 mb-20 leading-tight">
             {lang === 'CZ' 
               ? '"Kvalita není náhoda; je to vždy výsledek vysokého záměru a upřímného úsilí."' 
               : '"Quality is never an accident; it is always the result of high intention and sincere effort."'}
           </blockquote>
           
           <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <a href="mailto:info@bbcars.eu" className="text-[10px] uppercase tracking-[0.6em] font-bold py-5 px-16 border border-white hover:bg-white hover:text-black transition-all duration-500">
                {lang === 'CZ' ? 'NAPIŠTE NÁM' : 'WRITE TO US'}
              </a>
              <a href="tel:+420605034911" className="text-[10px] uppercase tracking-[0.6em] font-bold py-5 px-16 bg-white text-black hover:bg-[#dbad1e] transition-all duration-500">
                {lang === 'CZ' ? 'ZAVOLEJTE' : 'CALL US'}
              </a>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
