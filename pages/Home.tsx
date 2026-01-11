
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { cars } from '../data/cars';

const CountingNumber = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

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

  return <span ref={countRef}>{count}{suffix}</span>;
};

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];
  const featuredCars = cars.slice(0, 4);
  const lPath = (path: string) => `/${lang.toLowerCase()}${path}`;
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=B%26B+Cars+4You+s.r.o.%2C+Plze%C5%88sk%C3%A1+968%2C+337+01+Rokycany+1";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.479507817088!2d13.5855263!3d49.7423018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ae9a9c7382f71%3A0x8892f3d242699042!2sPlze%C5%88sk%C3%A1%20968%2C%20337%2001%20Rokycany!5e1!3m2!1scs!2scz!4v1715600000000!5m2!1scs!2scz&maptype=satellite";

  return (
    <div className="fade-in">
      {/* --- FOTO: HLAVNÍ HRDINSKÝ OBRÁZEK (ÚVODNÍ STRANA) --- */}
      <section className="relative h-screen flex items-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=100&w=2400" className="w-full h-full object-cover" alt="Porsche 911 GT3" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-0" />
        </div>
        <div className="relative z-20 w-full max-w-screen-2xl mx-auto pt-20">
          <div className="max-w-5xl">
            <h1 className="mb-10 uppercase leading-tight">
              <span className="block text-lg md:text-2xl tracking-[0.3em] font-[100] text-white/80 mb-4">Prodej luxusních vozů</span>
              <span className="block text-5xl md:text-7xl font-extrabold tracking-tighter font-heading text-white">BB CARS</span>
            </h1>
            <Link to={lPath("/inventory")} className="inline-flex items-center group">
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold py-4 px-12 bg-white text-black group-hover:bg-[#dbad1e] transition-all">Zobrazit nabídku</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 md:px-20 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-10 lg:col-span-8">
            <p className="text-2xl md:text-4xl font-light leading-[1.2] tracking-tight text-white/80">{t.philosophy_text}</p>
          </div>
        </div>
      </section>

      <section className="bg-black pt-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] w-full">
          {featuredCars.map((car) => (
            <Link key={car.id} to={lPath(`/auto/${car.id}`)} className="group relative flex flex-col bg-[#080808] pb-10">
              <div className="relative aspect-video overflow-hidden bg-[#0a0a0a] mb-10">
                {/* --- FOTO: NÁHLEDY VOZŮ V SEZNAMU (data/cars.ts) --- */}
                <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
              </div>
              <div className="flex flex-col px-8 md:px-20">
                <h3 className="text-xl md:text-2xl font-bold uppercase font-heading group-hover:text-[#dbad1e] transition-colors leading-tight">
                  <span className="block opacity-20 text-[0.45em] tracking-[0.3em] mb-2 font-bold">{car.brand}</span>
                  {car.model}
                </h3>
                <p className="text-xl font-bold mt-4 tabular-nums">{car.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOTO: SEKCE VŮZ NA OBJEDNÁVKU (POZADÍ) --- */}
      <section className="relative flex flex-col lg:flex-row min-h-[70vh] border-t border-white/5 bg-black">
        <div className="w-full lg:w-1/2 relative h-[40vh] lg:h-auto">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2400" className="w-full h-full object-cover grayscale opacity-40" alt="Custom order" />
        </div>
        <div className="w-full lg:w-1/2 p-10 md:p-20 flex items-center">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-6xl font-bold uppercase font-heading mb-8">{t.custom_order_card_title}</h2>
            <Link to={lPath("/custom-order")} className="inline-block text-[9px] uppercase tracking-[0.6em] font-bold py-5 px-16 border border-white hover:border-[#dbad1e] hover:text-[#dbad1e] transition-all">{t.custom_order_card_cta}</Link>
          </div>
        </div>
      </section>

      {/* --- FOTO: SEKCE SHOWROOM (POZADÍ ZA TEXTEM) --- */}
      <section className="bg-[#080808] border-t border-white/5">
        <div className="flex flex-col lg:flex-row h-auto lg:min-h-[700px]">
          <div className="relative w-full lg:w-1/2 h-[450px] lg:h-auto flex items-center justify-center">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=90&w=2400" className="w-full h-full object-cover opacity-30 grayscale" alt="Showroom" />
            </div>
            <div className="relative z-10 px-8 text-center">
              <h2 className="text-4xl md:text-6xl font-bold uppercase font-heading mb-8">Navštivte náš showroom</h2>
              <p className="text-[13px] text-white/50 tracking-[0.2em] uppercase mb-12">Plzeňská 968, 337 01 Rokycany 1</p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase tracking-[0.6em] font-bold py-5 px-16 bg-[#dbad1e] text-black hover:bg-white transition-all">NAVIGOVAT</a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[400px] lg:h-auto border-l border-white/5">
            <iframe src={mapEmbedUrl} className="w-full h-full border-0 grayscale invert contrast-[1.2]" allowFullScreen={true} loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
