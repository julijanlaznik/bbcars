
import React, { useState, useMemo, useEffect, useRef } from 'react';
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

interface InventoryProps {
  lang: Language;
}

type SortOption = 'newest' | 'price_asc' | 'price_desc';

const Inventory: React.FC<InventoryProps> = ({ lang }) => {
  const t = translations[lang];
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedBody, setSelectedBody] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const formatPrice = (val: number) => new Intl.NumberFormat('cs-CZ').format(val) + ' Kč';

  const brands = useMemo(() => Array.from(new Set(cars.map(c => c.brand))).sort(), []);
  const models = useMemo(() => {
    const relevantCars = selectedBrand ? cars.filter(c => c.brand === selectedBrand) : cars;
    return Array.from(new Set(relevantCars.map(c => c.model))).sort();
  }, [selectedBrand]);
  const bodyTypes = useMemo(() => Array.from(new Set(cars.map(c => c.bodyType))).sort(), []);
  const yearOptions = useMemo(() => {
    const years = [];
    for (let y = 2025; y >= 1990; y--) years.push(y.toString());
    return years;
  }, []);
  const priceOptions = useMemo(() => {
    const prices = [];
    for (let p = 100000; p <= 15000000; p += 100000) {
      prices.push({ value: p.toString(), label: formatPrice(p) });
    }
    return prices;
  }, []);

  const displayCars = useMemo(() => {
    let filtered = cars.filter(car => {
      if (selectedBrand && car.brand !== selectedBrand) return false;
      if (selectedModel && car.model !== selectedModel) return false;
      if (selectedBody && car.bodyType !== selectedBody) return false;
      const carPriceNum = parseInt(car.price.replace(/\s/g, '').replace('Kč', ''));
      if (priceFrom && carPriceNum < parseInt(priceFrom)) return false;
      if (priceTo && carPriceNum > parseInt(priceTo)) return false;
      if (yearFrom && car.year < parseInt(yearFrom)) return false;
      if (yearTo && car.year > parseInt(yearTo)) return false;
      return true;
    });
    filtered.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s/g, '').replace('Kč', ''));
      const priceB = parseInt(b.price.replace(/\s/g, '').replace('Kč', ''));
      if (sort === 'price_asc') return priceA - priceB;
      if (sort === 'price_desc') return priceB - priceA;
      return 0;
    });
    return filtered;
  }, [selectedBrand, selectedModel, selectedBody, priceFrom, priceTo, yearFrom, yearTo, sort]);

  useEffect(() => {
    setSelectedModel('');
  }, [selectedBrand]);

  return (
    <div className="pt-40 pb-20 px-8 md:px-12 lg:px-20 max-w-[1920px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 lg:mb-20 gap-8 reveal-up">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-heading mb-4 leading-none">
            {t.nav_inventory}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.5em] text-white/40 font-bold tabular-nums">
            {displayCars.length} {lang === 'CZ' ? 'VOZŮ V AKTUÁLNÍ NABÍDCE' : 'VEHICLES IN CURRENT SELECTION'}
          </p>
        </div>
        
        <div className="flex items-center space-x-8 text-[11px] uppercase tracking-[0.3em] font-bold">
          <span className="text-white/10 hidden sm:inline">{lang === 'CZ' ? 'SEŘADIT PODLE:' : 'SORT BY:'}</span>
          <button onClick={() => setSort('price_asc')} className={`hover:text-white transition-colors ${sort === 'price_asc' ? 'text-[#dbad1e]' : 'text-white/40'}`}>
            {lang === 'CZ' ? 'NEJLEVNĚJŠÍ' : 'CHEAPEST'}
          </button>
          <button onClick={() => setSort('price_desc')} className={`hover:text-white transition-colors ${sort === 'price_desc' ? 'text-[#dbad1e]' : 'text-white/40'}`}>
            {lang === 'CZ' ? 'NEJDRAŽŠÍ' : 'MOST EXPENSIVE'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <aside className="w-full lg:w-80 flex-shrink-0 reveal-up delay-200">
          <button 
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="w-full lg:hidden flex items-center justify-between border border-white/10 px-6 py-5 hover:bg-white/5 transition-all mb-4"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em]">
              {isFilterExpanded ? (lang === 'CZ' ? 'ZAVŘÍT FILTR' : 'CLOSE FILTER') : (lang === 'CZ' ? 'FILTROVAT NABÍDKU' : 'FILTER INVENTORY')}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-500 ${isFilterExpanded ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`${isFilterExpanded ? 'max-h-[1000px] opacity-100 mb-12' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'} overflow-hidden lg:overflow-visible transition-all duration-700 ease-in-out lg:sticky lg:top-40 space-y-10`}>
            <InventorySelect value={selectedBrand} onChange={setSelectedBrand} options={brands} placeholder="ZNAČKA" />
            <InventorySelect value={selectedModel} onChange={setSelectedModel} options={models} placeholder="MODEL" />
            <InventorySelect value={selectedBody} onChange={setSelectedBody} options={bodyTypes} placeholder="KAROSERIE" />
            <div className="grid grid-cols-2 gap-4">
              <InventorySelect value={yearFrom} onChange={setYearFrom} options={yearOptions} placeholder="ROK OD" />
              <InventorySelect value={yearTo} onChange={setYearTo} options={yearOptions} placeholder="ROK DO" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InventorySelect value={priceFrom} onChange={setPriceFrom} options={priceOptions} placeholder="CENA OD" />
              <InventorySelect value={priceTo} onChange={setPriceTo} options={priceOptions} placeholder="CENA DO" />
            </div>
            <button 
              onClick={() => {
                setSelectedBrand(''); setSelectedModel(''); setSelectedBody('');
                setPriceFrom(''); setPriceTo(''); setYearFrom(''); setYearTo('');
              }}
              className="w-full border border-white/5 text-white/20 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white/5 hover:text-white transition-all duration-500"
            >
              RESET FILTRŮ
            </button>
          </div>
        </aside>

        <div className="flex-grow">
          {displayCars.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-[10px]">
              {displayCars.map((car, idx) => (
                <CarItem key={car.id} car={car} index={idx} t={t} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 opacity-30 reveal-fade">
              <p className="text-xl uppercase tracking-[0.5em] font-light">Žádné vozy neodpovídají filtrům</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CarItem: React.FC<{ car: any, index: number, t: any }> = ({ car, index, t }) => {
  const { ref, isVisible } = useReveal();
  return (
    <Link 
      ref={ref}
      to={`/auto/${car.id}`} 
      className={`group relative flex flex-col bg-[#080808] pb-10 border border-transparent hover:border-white/5 transition-all duration-[1.2s] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a] mb-8">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
      </div>
      <div className="flex flex-col px-8 md:px-12 relative overflow-hidden">
        <div className="mb-2 flex flex-nowrap justify-between items-baseline gap-2 sm:gap-4">
          <h3 className="text-[15px] sm:text-xl lg:text-2xl font-bold tracking-tighter uppercase font-heading group-hover:text-[#dbad1e] transition-colors duration-500 leading-tight truncate">
            {car.brand} {car.model}
          </h3>
          <p className="text-[15px] sm:text-xl lg:text-2xl font-bold tracking-tighter text-[#dbad1e] whitespace-nowrap flex-shrink-0">
            {car.price}
          </p>
        </div>
        <div className="flex items-center gap-3 mb-10">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-white/30 truncate">
            {car.km} / {car.equipment[0] || 'Exclusive'} / {car.bodyType}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-y-8 border-t border-white/5 pt-8">
          <div>
            <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 mb-1.5 font-bold">{t.label_in_service}</p>
            <p className="text-[11px] font-bold tracking-widest text-white/80">{car.inServiceFrom}</p>
          </div>
          <div>
            <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 mb-1.5 font-bold">{t.label_odometer}</p>
            <p className="text-[11px] font-bold tracking-widest text-white/80">{car.km}</p>
          </div>
          <div>
            <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 mb-1.5 font-bold">ROK</p>
            <p className="text-[11px] font-bold tracking-widest text-white/80">{car.year}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700 flex-shrink-0">
            <svg className="w-8 h-8 text-[#dbad1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const InventorySelect = ({ value, onChange, options, placeholder }: any) => (
  <div className="group border-b border-white/10 pb-4 focus-within:border-white transition-all duration-500 relative">
    <div className="relative">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-transparent outline-none text-[13px] font-bold appearance-none cursor-pointer uppercase tracking-[0.2em] text-white/40 focus:text-white"
      >
        <option value="" className="bg-black">{placeholder}</option>
        {options.map((opt: any) => {
          const isObj = typeof opt === 'object';
          const val = isObj ? opt.value : opt;
          const label = isObj ? opt.label : opt;
          return <option key={val} value={val} className="bg-black text-white">{label}</option>;
        })}
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  </div>
);

export default Inventory;
