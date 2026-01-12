
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { cars } from '../data/cars';

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const CountingNumber = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const t = translations[lang];
  const featuredCars = cars.slice(0, 6);
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=B%26B+Cars+4You+s.r.o.%2C+Plze%C5%88sk%C3%A1+968%2C+337+01+Rokycany+1";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.479507817088!2d13.5855263!3d49.7423018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ae9a9c7382f71%3A0x8892f3d242699042!2sPlze%C5%88sk%C3%A1%20968%2C%20337%2001%20Rokycany!5e1!3m2!1scs!2scz!4v1715600000000!5m2!1scs!2scz&maptype=satellite";

  const philReveal = useReveal();
  const customReveal = useReveal();
  const statReveal = useReveal();

  return (
    <div className="overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center px-6 md:px-20 overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000" 
            className={`w-full h-full object-cover transition-all duration-[2s] ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
            alt="Porsche 911 GT3" 
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
        </div>
        <div className="relative z-20 w-full max-w-screen-2xl mx-auto pt-20">
          <div className="max-w-5xl">
            <h1 className={`mb-8 md:mb-10 uppercase leading-tight transition-all duration-1000 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <span className="block text-xs md:text-xl tracking-[0.3em] font-[100] text-white/80 mb-2 md:mb-4 reveal-up delay-200">
                {lang === 'CZ' ? 'Prodej luxusních a prémiových vozů' : 'Luxury and premium car sales'}
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter font-heading text-white reveal-up delay-400">BB CARS</span>
            </h1>
            <div className={heroLoaded ? 'reveal-up delay-700' : 'opacity-0'}>
              <Link to="/nabidka" className="inline-flex items-center group">
                <span className="text-[10px] uppercase tracking-[0.6em] font-bold py-4 md:py-5 px-10 md:px-14 bg-white text-black group-hover:bg-[#dbad1e] transition-all">
                  {lang === 'CZ' ? 'Zobrazit nabídku' : 'View inventory'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-40 px-6 md:px-20 border-b border-white/5" ref={philReveal.ref}>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className={`md:col-span-10 lg:col-span-8 transition-all duration-[1.5s] ${philReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <p className="text-xl md:text-5xl font-light leading-[1.3] md:leading-[1.1] tracking-tight text-white/80">{t.philosophy_text}</p>
          </div>
        </div>
      </section>

      <section className="bg-black pt-2 md:pt-10 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] md:gap-[10px] w-full">
          {featuredCars.map((car, idx) => (
            <CarCard key={car.id} car={car} index={idx} />
          ))}
        </div>
      </section>

      <section className="relative flex flex-col lg:flex-row min-h-[50vh] md:min-h-[70vh] border-t border-white/5 bg-black" ref={customReveal.ref}>
        <div className="w-full lg:w-1/2 relative h-[35vh] md:h-[40vh] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2400" 
            className={`w-full h-full object-cover grayscale transition-all duration-[2s] ${customReveal.isVisible ? 'scale-100 opacity-40' : 'scale-110 opacity-0'}`} 
            alt="Custom order" 
          />
        </div>
        <div className={`w-full lg:w-1/2 p-10 md:p-20 flex items-center transition-all duration-1000 ${customReveal.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-6xl font-bold uppercase font-heading mb-6 md:mb-8 leading-none tracking-tighter">{t.custom_order_card_title}</h2>
            <Link to="/vuz-na-prani" className="inline-block text-[9px] uppercase tracking-[0.6em] font-bold py-4 md:py-5 px-10 md:px-16 border border-white hover:border-[#dbad1e] hover:text-[#dbad1e] transition-all">{t.custom_order_card_cta}</Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-20 bg-black border-t border-white/5" ref={statReveal.ref}>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0">
          {[
            { end: 15, suffix: "", label: lang === 'CZ' ? 'Let na trhu' : 'Years on market' },
            { end: 500, suffix: "+", label: lang === 'CZ' ? 'Prodaných vozů' : 'Cars sold' },
            { end: 100, suffix: "%", label: lang === 'CZ' ? 'Garance původu' : 'Origin guarantee' }
          ].map((stat, i) => (
            <div key={i} className={`text-center md:border-r border-white/5 last:border-0 transition-all duration-1000`} style={{ transitionDelay: `${i * 200}ms`, opacity: statReveal.isVisible ? 1 : 0, transform: statReveal.isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
              <p className="text-5xl md:text-7xl font-bold font-heading text-[#dbad1e] mb-4 tabular-nums">
                <CountingNumber end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#080808] border-t border-white/5">
        <div className="flex flex-col lg:flex-row h-auto lg:min-h-[700px]">
          <div className="relative w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-auto flex items-center justify-center">
            <div className="absolute inset-0">
              <img src="/showroom.png" className="w-full h-full object-cover opacity-10 grayscale" alt="Showroom" />
            </div>
            <div className="relative z-10 px-6 text-center reveal-up">
              <h2 className="text-3xl md:text-6xl font-bold uppercase font-heading mb-6 md:mb-8 leading-none tracking-tighter">Navštivte náš showroom</h2>
              <p className="text-[11px] md:text-[13px] text-white/50 tracking-[0.2em] uppercase mb-8 md:mb-12">Plzeňská 968, 337 01 Rokycany 1</p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.6em] font-bold py-4 md:py-5 px-10 md:px-16 bg-[#dbad1e] text-black hover:bg-white transition-all">NAVIGOVAT</a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[350px] md:h-[450px] lg:h-auto border-l border-white/5 reveal-fade delay-500">
            <iframe src={mapEmbedUrl} className="w-full h-full border-0" allowFullScreen={true} title="Mapa" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

const CarCard = ({ car, index }: { car: any, index: number }) => {
  const { ref, isVisible } = useReveal();
  return (
    <Link 
      ref={ref}
      to={`/auto/${car.id}`} 
      className={`group relative flex flex-col bg-[#080808] pb-10 transition-all duration-[1.2s] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${(index % 2) * 200}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a] mb-6 md:mb-10">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
      </div>
      <div className="flex flex-col px-6 md:px-20">
        <h3 className="text-xl md:text-2xl font-bold uppercase font-heading group-hover:text-[#dbad1e] transition-colors leading-tight">
          <span className="block opacity-20 text-[0.45em] tracking-[0.3em] mb-2 font-bold">{car.brand}</span>
          {car.model}
        </h3>
        <p className="text-lg md:text-xl font-bold mt-4 tabular-nums text-white/90">{car.price}</p>
      </div>
    </Link>
  );
};

export default Home;
