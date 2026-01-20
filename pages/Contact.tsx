
import React from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  return (
    <div className="fade-in pt-32 md:pt-40 px-6 md:px-20 overflow-x-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20 md:mb-32">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-white/30 mb-6 md:mb-8 block font-bold">Spojte se s námi</span>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase font-heading leading-none mb-8 md:mb-12">
            {lang === 'CZ' ? 'Kontakt' : 'Contact'}
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 py-16 md:py-20 border-t border-white/10">
          <div className="space-y-12 md:space-y-20">
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 md:mb-6 font-bold">Showroom</p>
              <p className="text-xl md:text-2xl font-light">BBCars s.r.o.</p>
              <p className="text-xl md:text-2xl font-light">Rokycany, Plzeňský kraj</p>
              <p className="text-xl md:text-2xl font-light">Česká republika</p>
            </div>

            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 md:mb-6 font-bold">Osobní kontakt</p>
              <p className="text-xl md:text-2xl font-light">info@bbcars.cz</p>
              <p className="text-xl md:text-2xl font-light">+420 605 034 911</p>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-12 pt-6 md:pt-10">
              <a href="https://www.instagram.com/bbcars_4you/" target="_blank" className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">Instagram</a>
              <a href="https://www.facebook.com/100030982372648/about/" target="_blank" className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">Facebook</a>
              <a href="https://wa.me/420605034911" target="_blank" className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>

          <div className="h-[400px] md:h-[600px] bg-[#111] relative overflow-hidden flex items-center justify-center grayscale opacity-50 border border-white/5">
             <img src="/showroom.png" className="w-full h-full object-cover" alt="Contact decor" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-sm p-8 md:p-10 border border-white/20 text-center">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-4">Navštivte nás</p>
                    <p className="text-base md:text-lg font-bold uppercase font-heading">Sjednat schůzku</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
