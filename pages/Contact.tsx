
import React from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  return (
    <div className="fade-in bg-[#050505] min-h-screen">
      {/* 1. SIMPLE HERO */}
      <section className="pt-48 md:pt-64 pb-20 px-6 md:px-20 text-center border-b border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase font-heading leading-none mb-8">
            Kontakt
          </h1>
          <div className="w-12 h-[2px] bg-[#dbad1e] mx-auto opacity-40" />
        </div>
      </section>

      {/* 2. CONTACT GRID */}
      <section className="py-24 md:py-40 px-6 md:px-20 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
          
          {/* LEFT: ESSENTIAL INFO */}
          <div className="lg:col-span-6 space-y-24">
            
            {/* LOCATION */}
            <div className="space-y-10">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#dbad1e] font-bold">Showroom & Adresa</p>
              <div className="space-y-4">
                 <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tight">B&B CARS 4YOU S.R.O.</h2>
                 <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed">
                   Plzeňská 968<br/>
                   337 01 Rokycany
                 </p>
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=B%26B+Cars+4You+s.r.o.%2C+Plze%C5%88sk%C3%A1+968%2C+337+01+Rokycany+1" 
                target="_blank" 
                className="inline-block bg-white text-black py-4 px-12 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#dbad1e] transition-all duration-500"
              >
                NAVIGOVAT →
              </a>
            </div>

            {/* DIRECT CONTACTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#dbad1e] font-bold">Prodej & Dotazy</p>
                <div className="space-y-4">
                  <div className="group">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Telefon</p>
                    <a href="tel:+420605034911" className="text-xl md:text-2xl font-bold font-heading hover:text-[#dbad1e] transition-colors tracking-tight">+420 605 034 911</a>
                  </div>
                  <div className="group">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Email</p>
                    <a href="mailto:info@bbcars.cz" className="text-xl md:text-2xl font-bold font-heading hover:text-[#dbad1e] transition-colors tracking-tight">info@bbcars.cz</a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#dbad1e] font-bold">Sociální sítě</p>
                <div className="flex flex-col space-y-3">
                  <a href="https://instagram.com/bbcars.eu" target="_blank" className="text-lg font-light text-white/50 hover:text-white transition-colors">Instagram</a>
                  <a href="https://facebook.com/bbcars.eu" target="_blank" className="text-lg font-light text-white/50 hover:text-white transition-colors">Facebook</a>
                  <a href="https://wa.me/420605034911" target="_blank" className="text-lg font-light text-white/50 hover:text-white transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SHOWROOM IMAGE / ATMOSPHERE */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square overflow-hidden border border-white/5">
               <img 
                 src="https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=80&w=2400" 
                 className="w-full h-full object-cover grayscale opacity-40" 
                 alt="Showroom atmosphere" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               <div className="absolute bottom-12 left-12 right-12 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading uppercase mb-2 tracking-tight">Osobní prohlídka</h3>
                  <p className="text-white/40 font-light text-base max-w-sm">Jsme vám k dispozici každý pracovní den, individuální schůzky o víkendech po domluvě.</p>
               </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* 3. MAP - FULL COLOR */}
      <section className="bg-black py-20 border-t border-white/5">
        <div className="px-6 md:px-20 max-w-screen-2xl mx-auto">
          <div className="h-[400px] md:h-[650px] w-full transition-opacity duration-1000">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.479507817088!2d13.5855263!3d49.7423018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ae9a9c7382f71%3A0x8892f3d242699042!2sPlze%C5%88sk%C3%A1%20968%2C%20337%2001%20Rokycany!5e1!3m2!1scs!2scz!4v1715600000000!5m2!1scs!2scz&maptype=satellite" 
              className="w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
