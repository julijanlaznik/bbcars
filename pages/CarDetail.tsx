
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { cars } from '../data/cars';

interface CarDetailProps {
  lang: Language;
}

const CarDetail: React.FC<CarDetailProps> = ({ lang }) => {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);
  const t = translations[lang];
  const inquiryFormRef = useRef<HTMLDivElement>(null);
  const lPath = (path: string) => `/${lang.toLowerCase()}${path}`;
  
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [key, setKey] = useState(0); 

  // Filter 4 other cars for the bottom section
  const otherCars = cars.filter(c => c.id !== id).slice(0, 4);

  const nextImg = useCallback(() => {
    setActiveImgIndex((prev) => (prev + 1) % (car?.images.length || 1));
    setKey(prev => prev + 1);
  }, [car?.images.length]);

  const prevImg = useCallback(() => {
    setActiveImgIndex((prev) => (prev - 1 + (car?.images.length || 1)) % (car?.images.length || 1));
    setKey(prev => prev + 1);
  }, [car?.images.length]);

  const goToImg = (index: number) => {
    setActiveImgIndex(index);
    setKey(prev => prev + 1);
  };

  // AUTO SLIDESHOW for the main Hero
  useEffect(() => {
    const timer = setInterval(() => {
      nextImg();
    }, 6000); 
    return () => clearInterval(timer);
  }, [nextImg]);

  const scrollToInquiry = () => {
    inquiryFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!car) {
    return <Navigate to={lPath("/")} />;
  }

  return (
    <div className="fade-in bg-[#050505]">
      
      {/* 1. HERO GALLERY (The emotional hook) */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 select-none">
          {car.images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${car.model} view ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activeImgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>

        {/* Gallery Controls */}
        <div className="absolute bottom-12 left-8 md:left-20 z-20 flex flex-col items-start space-y-6">
           <div className="flex items-center space-x-3">
              <button 
                onClick={prevImg} 
                className="flex items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-[#dbad1e] hover:border-[#dbad1e]/40 transition-all duration-300 rounded-full"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
              <button 
                onClick={nextImg} 
                className="flex items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-[#dbad1e] hover:border-[#dbad1e]/40 transition-all duration-300 rounded-full"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
           </div>
           
           <div className="flex space-x-2">
              {car.images.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => goToImg(i)} 
                  className="relative h-[2px] w-8 bg-white/10 overflow-hidden transition-all hover:bg-white/20"
                >
                  {i === activeImgIndex && <div key={key} className="absolute inset-0 progress-bar-active" />}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* 2. HEADER: BRAND, MODEL & CTA */}
      <section className="pt-24 pb-16 px-8 md:px-20 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-baseline gap-12 lg:gap-20 border-b border-white/5 pb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase font-heading leading-none">
              <span className="opacity-20 mr-4 font-normal">{car.brand}</span>
              <span>{car.model}</span>
            </h1>
          </div>
          <div className="w-full lg:w-auto text-left lg:text-right">
             <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">{car.price}</p>
             <p className="text-[9px] text-white/20 font-light italic tracking-[0.2em] uppercase mt-4">{t.label_vat_deductible}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap lg:justify-end gap-3">
            <a href="tel:+420605034911" className="flex-1 md:flex-none flex items-center justify-center space-x-3 border border-white/10 text-white py-4 px-12 text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#dbad1e] hover:text-black transition-all duration-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>ZAVOLAT</span>
            </a>
            <button onClick={scrollToInquiry} className="flex-1 md:flex-none bg-white text-black py-4 px-12 text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#dbad1e] transition-all duration-300">
              MÁM ZÁJEM O VŮZ
            </button>
        </div>
      </section>

      {/* 3. TECHNICAL DATA */}
      <section className="bg-[#080808] py-20 px-8 md:px-20 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-12">
            {[
              { label: t.label_odometer, value: car.km },
              { label: t.label_in_service, value: car.inServiceFrom },
              { label: t.label_power, value: car.powerKw },
              { label: t.label_engine, value: car.engineCapacity },
              { label: t.label_fuel, value: car.specs.fuel },
              { label: t.label_drivetrain, value: car.drivetrain },
            ].map((spec, i) => (
              <div key={i}>
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 mb-4 font-bold">{spec.label}</p>
                <p className="text-[14px] font-bold tracking-widest uppercase">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EQUIPMENT SECTION */}
      <section className="py-24 px-8 md:px-20 max-w-screen-2xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-24">
          {[
            { label: '360° KAMERA', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
            { label: 'VZDUCH. PODVOZEK', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'INTELLIGENT CRUISE', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
            { label: 'KEYLESS GO', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
            { label: 'HEAD-UP DISPLAY', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 flex items-center justify-center border border-white/5 bg-white/[0.02]">
                <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={item.icon}/></svg>
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/40">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="pt-20">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-20">
              {car.equipment.map((item, idx) => (
                <div key={idx} className="flex items-center group py-1">
                  <div className="w-1 h-1 bg-[#dbad1e]/20 mr-4 group-hover:bg-[#dbad1e] transition-colors" />
                  <p className="text-[11px] font-light text-white/30 group-hover:text-white/80 transition-colors tracking-[0.05em] uppercase leading-tight">{item}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. UNIFIED GRID GALLERY */}
      <section className="bg-black">
        
        {/* CATEGORY: INTERIOR */}
        <div className="flex flex-col border-b border-white/5">
          <div className="relative h-[50vh] md:h-[75vh] overflow-hidden group">
            <img 
              src={car.interiorImages[0] || car.image} 
              alt="Interior hero" 
              className="w-full h-full object-cover transition-all duration-[2000ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
            <div className="absolute bottom-10 left-10">
               <span className="text-[11px] uppercase tracking-[0.8em] font-bold text-white/50 group-hover:text-[#dbad1e] transition-colors">INTERIÉR</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white/5 border-t border-white/5">
             {car.interiorImages.slice(1, 5).map((img, idx) => (
               <div key={idx} className="relative aspect-video md:aspect-square overflow-hidden group">
                  <img src={img} alt={`Interior detail ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
               </div>
             ))}
          </div>
        </div>
        
        {/* CATEGORY: EXTERIOR */}
        <div className="flex flex-col border-b border-white/5">
          <div className="relative h-[50vh] md:h-[75vh] overflow-hidden group">
            <img 
              src={car.exteriorImages[0] || car.image} 
              alt="Exterior hero" 
              className="w-full h-full object-cover transition-all duration-[2000ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
            <div className="absolute bottom-10 left-10">
               <span className="text-[11px] uppercase tracking-[0.8em] font-bold text-white/50 group-hover:text-[#dbad1e] transition-colors">EXTERIÉR</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white/5 border-t border-white/5">
             {car.exteriorImages.slice(1, 5).map((img, idx) => (
               <div key={idx} className="relative aspect-video md:aspect-square overflow-hidden group">
                  <img src={img} alt={`Exterior detail ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
               </div>
             ))}
          </div>
        </div>

      </section>

      {/* 6. CONVERSION FORM */}
      <section ref={inquiryFormRef} className="py-40 px-8 md:px-20 bg-[#080808] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.8em] text-white/40 mb-8 font-bold">ZAUJAL VÁS TENTO VŮZ?</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-heading leading-none mb-10">
              Mám zájem o tento vůz
            </h2>
            <p className="text-white/40 font-light text-lg leading-relaxed max-md mb-8">
              Vyplňte formulář a naši specialisté vás budou kontaktovat s kompletní nabídkou a kalkulací.
            </p>
          </div>
          <div className="relative">
            {submitted ? (
              <div className="p-12 text-center border border-[#dbad1e]/20 bg-black/20 animate-in fade-in zoom-in duration-700">
                <svg className="w-8 h-8 text-[#dbad1e]/50 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-2xl font-bold uppercase font-heading mb-4">Poptávka odeslána</h3>
                <p className="text-white/30 text-lg font-light">Děkujeme za váš zájem. Budeme vás kontaktovat.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold group-focus-within:text-[#dbad1e] transition-colors">EMAIL</label>
                    <input required type="email" placeholder="vas@email.cz" className="w-full bg-transparent outline-none text-xl font-light placeholder:text-white/10 py-1" />
                  </div>
                  <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                    <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold group-focus-within:text-[#dbad1e] transition-colors">TELEFON</label>
                    <input required type="tel" placeholder="+420 000 000 000" className="w-full bg-transparent outline-none text-xl font-light placeholder:text-white/10 py-1" />
                  </div>
                </div>
                <div className="group border-b border-white/20 pb-2 focus-within:border-[#dbad1e] transition-all duration-500">
                  <label className="block text-[11px] uppercase tracking-[0.4em] text-white/60 mb-3 font-bold group-focus-within:text-[#dbad1e] transition-colors">POZNÁMKA</label>
                  <textarea rows={2} placeholder="Vaše dotazy..." className="w-full bg-transparent outline-none text-xl font-light placeholder:text-white/10 resize-none pt-1" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-7 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-[#dbad1e] transition-all duration-500 shadow-2xl">
                  ODESLAT POPTÁVKU
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. CROSS-SELL */}
      <section className="py-32 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase font-heading mb-16">Mohlo by vás zajímat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5 mb-20">
            {otherCars.map((oc) => (
              <Link key={oc.id} to={lPath(`/auto/${oc.id}`)} className="group relative bg-[#050505] overflow-hidden flex flex-col p-8">
                <div className="aspect-video overflow-hidden mb-6"><img src={oc.image} alt={oc.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"/></div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2 font-bold">{oc.brand}</p>
                <h3 className="text-xl font-bold tracking-tight uppercase font-heading mb-4">{oc.model}</h3>
                <p className="mt-auto text-lg font-bold tracking-tighter">{oc.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CarDetail;