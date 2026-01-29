
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { cars } from '../data/cars';
import { articles } from '../data/articles';

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

const QuickSearchPanel: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const brands = useMemo(() => Array.from(new Set(cars.map(c => c.brand))).sort(), []);
  const models = useMemo(() => {
    if (!selectedBrand) return [];
    return Array.from(new Set(cars.filter(c => c.brand === selectedBrand).map(c => c.model))).sort();
  }, [selectedBrand]);

  const handleSearch = () => {
    if (selectedBrand && selectedModel) {
      const car = cars.find(c => c.brand === selectedBrand && c.model === selectedModel);
      if (car) navigate(`/auto/${car.id}`);
      else navigate('/nabidka');
    } else {
      navigate('/nabidka');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-black/50 backdrop-blur-2xl border border-white/10 p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 shadow-2xl transform translate-z-0">
      <div className="flex-1 relative group">
        <select 
          value={selectedBrand}
          onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); }}
          className="w-full bg-transparent text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] py-4 px-6 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-black">{lang === 'CZ' ? 'Značka' : 'Brand'}</option>
          {brands.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
      <div className="hidden md:block w-[1px] h-8 bg-white/10" />
      <div className="flex-1 relative group">
        <select 
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedBrand}
          className="w-full bg-transparent text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] py-4 px-6 outline-none appearance-none cursor-pointer disabled:opacity-30 hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-black">{lang === 'CZ' ? 'Model' : 'Model'}</option>
          {models.map(m => <option key={m} value={m} className="bg-black">{m}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
      <button 
        onClick={handleSearch}
        className="bg-[#dbad1e] hover:bg-white text-black py-4 px-8 md:px-12 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500"
      >
        <span>{lang === 'CZ' ? 'HLEDAT' : 'SEARCH'}</span>
      </button>
    </div>
  );
};

const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [currentHeroImg, setCurrentHeroImg] = useState(0);
  const t = translations[lang];
  const featuredCars = cars.slice(0, 6);
  const journalArticles = articles.slice(0, 3);
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=B%26B+Cars+4You+s.r.o.%2C+Plze%C5%88sk%C3%A1+968%2C+337+01+Rokycany+1";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2582.479507817088!2d13.5855263!3d49.7423018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ae9a9c7382f71%3A0x8892f3d242699042!2sPlze%C5%88sk%C3%A1%20968%2C%20337%2001%20Rokycany!5e1!3m2!1scs!2scz!4v1715600000000!5m2!1scs!2scz&maptype=satellite";

  const heroImages = [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const philReveal = useReveal();
  const statReveal = useReveal();
  const journalReveal = useReveal();

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-end pb-24 md:pb-32 px-6 md:px-20 overflow-hidden bg-black">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <img key={idx} src={img} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ${idx === currentHeroImg ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} alt={`Hero slide ${idx}`} />
          ))}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent z-10" />
        </div>
        <div className="relative z-20 w-full max-w-screen-2xl mx-auto">
          <div className="max-w-5xl">
            <h1 className="mb-8 md:mb-12 uppercase leading-tight">
              <span className={`block text-[9px] md:text-base tracking-[0.3em] font-[200] text-white/80 mb-1 md:mb-4 transition-all duration-1000 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {lang === 'CZ' ? 'Prodej luxusních a prémiových vozů' : 'Luxury and premium car sales'}
              </span>
              <span className={`block text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter font-heading text-white transition-all duration-1000 delay-200 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                B<span className="text-[0.85em]">&</span>b CARS
              </span>
            </h1>
            <QuickSearchPanel lang={lang} />
          </div>
        </div>
      </section>

      {/* FILOZOFIE SEKCE */}
      <section className="py-24 md:py-40 px-6 md:px-20 border-b border-white/5" ref={philReveal.ref}>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className={`md:col-span-10 lg:col-span-8 transition-all duration-[1.5s] ${philReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <p className="text-xl md:text-4xl font-light leading-relaxed tracking-tight text-white/70">{t.philosophy_text}</p>
          </div>
        </div>
      </section>

      {/* INVENTORY GRID */}
      <section className="bg-black pt-2 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] w-full">
          {featuredCars.map((car, idx) => (
            <Link key={car.id} to={`/auto/${car.id}`} className="group relative bg-[#080808] pb-10 overflow-hidden border border-white/5">
              <div className="aspect-video overflow-hidden"><img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" /></div>
              <div className="px-6 md:px-20 pt-10">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl md:text-2xl font-bold uppercase font-heading group-hover:text-[#dbad1e] transition-colors">{car.brand} {car.model}</h3>
                  <p className="text-xl md:text-2xl font-bold text-[#dbad1e] tracking-tighter">{car.price}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">{car.km} / {car.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / STATS */}
      <section className="py-24 md:py-40 px-6 md:px-20 bg-black border-y border-white/5" ref={statReveal.ref}>
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

      {/* NOVINKY SECTION */}
      <section className="py-24 md:py-40 px-6 md:px-20 bg-[#050505]" ref={journalReveal.ref}>
        <div className="max-w-screen-2xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${journalReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase font-heading leading-none">Novinky</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {journalArticles.map((article, idx) => (
              <Link key={article.id} to={`/journal/${article.id}`} className={`group transition-all duration-1000 ${journalReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="aspect-[4/3] overflow-hidden mb-8 border border-white/5">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-4 font-bold">{article.date}</p>
                <h3 className="text-xl md:text-2xl font-bold uppercase font-heading mb-4 group-hover:text-[#dbad1e] transition-colors leading-tight">{article.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/journal" className="inline-block text-[10px] uppercase tracking-[0.5em] font-bold border-b border-[#dbad1e] pb-2">Všechny články</Link>
          </div>
        </div>
      </section>

      {/* VŮZ NA PŘÁNÍ */}
      <section className="py-24 md:py-40 bg-[#080808] border-y border-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-8xl font-bold font-heading uppercase tracking-tighter mb-8 leading-none">Vůz na přání</h2>
              <p className="text-white/50 text-xl font-light leading-relaxed mb-12 max-w-md">Nenašli jste v naší nabídce přesně to, co hledáte? Vyhledáme pro vás ideální specifikaci napříč celou Evropou.</p>
              <Link to="/vuz-na-prani" className="inline-block text-[10px] uppercase tracking-[0.5em] font-bold py-5 px-16 bg-white text-black hover:bg-[#dbad1e] transition-all duration-500">ZJISTIT VÍCE</Link>
            </div>
            <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden border border-white/5">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=90&w=1200" alt="Detail" className="w-full h-full object-cover grayscale opacity-40 hover:scale-105 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOM MAPA */}
      <section className="bg-black">
        <div className="flex flex-col lg:flex-row h-auto lg:min-h-[600px]">
          <div className="w-full lg:w-1/2 p-20 flex flex-col justify-center">
            <h2 className="text-3xl md:text-6xl font-bold uppercase font-heading mb-8">Showroom</h2>
            <p className="text-white/50 text-lg font-light mb-12 max-w-md">Najdete nás v srdci Rokycan. Osobní přístup, diskrétní prostředí a ty nejlepší vozy pod jednou střechou.</p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-fit text-[10px] uppercase tracking-[0.5em] font-bold py-5 px-16 bg-[#dbad1e] text-black">NAVIGOVAT</a>
          </div>
          <div className="w-full lg:w-1/2 min-h-[400px]">
            <iframe src={mapEmbedUrl} className="w-full h-full border-0 grayscale invert opacity-50" allowFullScreen={true} title="Mapa" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
