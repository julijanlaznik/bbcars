
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [key, setKey] = useState(0); 

  const displayGridImages = useMemo(() => {
    if (!car) return [];
    const combined = [...car.images, ...car.interiorImages, ...car.exteriorImages];
    const unique = Array.from(new Set(combined));
    const result = unique.slice(0, 6);
    const placeholders = [
      'https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=40&w=1200', 
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=40&w=1200', 
      'https://images.unsplash.com/photo-1493238507124-132b13c02ca9?auto=format&fit=crop&q=40&w=1200', 
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=40&w=1200', 
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=40&w=1200', 
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=40&w=1200'
    ];
    while (result.length < 6) {
      result.push(placeholders[result.length]);
    }
    return result;
  }, [car]);

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
    return <Navigate to="/" />;
  }

  return (
    <div className="fade-in bg-[#050505] overflow-x-hidden">
      <section className="relative h-[65vh] md:h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 select-none">
          {car.images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${car.model} view ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${idx === activeImgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            />
          ))}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </div>
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-20 z-20 flex flex-col items-start space-y-4">
           <div className="flex items-center space-x-2 md:space-x-3">
              <button onClick={prevImg} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#dbad1e] transition-all rounded-full group">
                <svg className="w-4 h-4 -rotate-180 group-active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
              <button onClick={nextImg} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#dbad1e] transition-all rounded-full group">
                <svg className="w-4 h-4 group-active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
           </div>
           <div className="flex space-x-1.5 md:space-x-2">
              {car.images.map((_, i) => (
                <button key={i} onClick={() => goToImg(i)} className="relative h-[2px] w-6 md:w-10 bg-white/10 overflow-hidden">
                  {i === activeImgIndex && <div key={key} className="absolute inset-0 progress-bar-active" />}
                </button>
              ))}
           </div>
        </div>
      </section>

      <section className="pt-12 md:pt-24 pb-8 md:pb-16 px-6 md:px-20 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-12 border-b border-white/5 pb-10 md:pb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-[0.9]">
              <span className="opacity-20 block text-base md:text-3xl mb-2 font-normal tracking-widest">{car.brand}</span>
              {car.model}
            </h1>
          </div>
          <div className="w-full lg:w-auto text-left lg:text-right">
             <p className="text-4xl md:text-7xl font-bold tracking-tighter leading-none text-white">{car.price}</p>
             <p className="text-[10px] text-white/20 font-light italic tracking-widest uppercase mt-2 md:mt-4">{t.label_vat_deductible}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row lg:justify-end gap-3 md:gap-4">
            <a href="tel:+420605034911" className="flex items-center justify-center space-x-3 border border-white/10 text-white py-4 md:py-6 px-12 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-white/5 transition-all">
              <span>TELEFON</span>
            </a>
            <button onClick={scrollToInquiry} className="bg-white text-black py-4 md:py-6 px-12 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-[#dbad1e] transition-all duration-500">
              MÁM ZÁJEM
            </button>
        </div>
      </section>

      <section className="bg-[#080808] py-12 md:py-20 px-6 md:px-20 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { label: t.label_odometer, value: car.km },
              { label: t.label_in_service, value: car.inServiceFrom },
              { label: t.label_power, value: car.powerKw },
              { label: t.label_engine, value: car.engineCapacity },
              { label: t.label_fuel, value: car.specs.fuel },
              { label: t.label_drivetrain, value: car.drivetrain },
            ].map((spec, i) => (
              <div key={i} className="group">
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 mb-3 font-bold group-hover:text-[#dbad1e] transition-colors">{spec.label}</p>
                <p className="text-base md:text-xl font-bold tracking-widest uppercase text-white/80">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {car.detailedDescription && (
        <section className="py-20 md:py-32 px-6 md:px-20 bg-black">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase font-heading leading-tight">Charakteristika a výbava</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-6">
              {car.detailedDescription[lang].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 group border-b border-white/5 py-4 hover:border-white/20 transition-all">
                  <div className="w-1.5 h-1.5 bg-[#dbad1e] rounded-full mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <p className="text-white/60 text-lg font-light leading-snug group-hover:text-white transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-black w-full">
        <div className="grid grid-cols-2 gap-0">
           {displayGridImages.map((img, idx) => (
             <div key={idx} className="relative aspect-[4/3] md:aspect-square overflow-hidden group border-r border-b border-white/5">
                <img 
                  src={img} 
                  alt={`${car.model} detail ${idx}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0" 
                />
             </div>
           ))}
        </div>
      </section>

      <section ref={inquiryFormRef} className="py-20 md:py-40 px-6 md:px-20 bg-[#050505]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div>
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-none mb-10">
              Udělejte první krok
            </h2>
            <p className="text-white/40 font-light text-xl md:text-2xl leading-relaxed max-w-md">
              Máte dotazy k technickému stavu nebo chcete sjednat osobní prohlídku v našem showroomu? Jsme tu pro vás.
            </p>
          </div>
          <div className="relative">
            {submitted ? (
              <div className="p-12 text-center border border-[#dbad1e]/20 bg-white/[0.02]">
                <h3 className="text-3xl font-bold uppercase font-heading mb-4">Poptávka přijata</h3>
                <p className="text-white/40 font-light text-xl">Brzy se vám ozveme zpět.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group border-b border-white/10 pb-2 focus-within:border-[#dbad1e] transition-all">
                    <input required type="email" placeholder="VÁŠ E-MAIL" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                  </div>
                  <div className="group border-b border-white/10 pb-2 focus-within:border-[#dbad1e] transition-all">
                    <input required type="tel" placeholder="TELEFON" className="w-full bg-transparent outline-none text-xl font-light py-1" />
                  </div>
                </div>
                <div className="group border-b border-white/10 pb-2 focus-within:border-[#dbad1e] transition-all">
                  <textarea rows={2} placeholder="ZPRÁVA" className="w-full bg-transparent outline-none text-xl font-light resize-none py-1" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-8 text-[11px] uppercase tracking-[0.8em] font-bold hover:bg-[#dbad1e] transition-all duration-500 shadow-2xl">
                  ODESLAT ZPRÁVU
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetail;
