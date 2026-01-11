
import React from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  return (
    <div className="fade-in pt-40 px-8 md:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-32">
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-8 block font-bold">Spojte se s námi</span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase font-heading leading-none mb-12">
            {lang === 'CZ' ? 'Kontakt' : 'Contact'}
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 border-t border-white/10">
          <div className="space-y-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6 font-bold">Showroom</p>
              <p className="text-2xl font-light">BBCars s.r.o.</p>
              <p className="text-2xl font-light">Rokycany, Plzeňský kraj</p>
              <p className="text-2xl font-light">Česká republika</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6 font-bold">Osobní kontakt</p>
              <p className="text-2xl font-light">info@bbcars.cz</p>
              <p className="text-2xl font-light">+420 000 000 000</p>
            </div>

            <div className="flex space-x-12 pt-10">
              <a href="#" className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>

          <div className="h-[600px] bg-[#111] relative overflow-hidden flex items-center justify-center grayscale opacity-50">
             <img src="https://images.unsplash.com/photo-1517733948473-efec634333da?auto=format&fit=crop&q=80&w=2400" className="w-full h-full object-cover" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black p-10 border border-white/20 text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] mb-4">Navštivte nás</p>
                    <p className="text-lg font-bold uppercase font-heading">Sjednat schůzku</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
