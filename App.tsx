
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import CarDetail from './pages/CarDetail';
import CustomOrder from './pages/CustomOrder';
import Buyout from './pages/Buyout';
import Services from './pages/Services';
import Rent from './pages/Rent';
import Contact from './pages/Contact';
import Inventory from './pages/Inventory';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import { Language } from './types';
import { translations } from './i18n/translations';
import { cars } from './data/cars';

const SEOManager: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    let title = "BBCars | Prodej luxusních a prémiových vozů";
    let description = "Specializovaný prodejce luxusních vozů v ČR. Kurátorský výběr Porsche, Ferrari, Bentley a dalších exkluzivních značek. Showroom Rokycany.";
    
    const carMatch = pathname.match(/\/auto\/([^\/]+)/);
    const isCarDetail = carMatch && carMatch[1];

    if (isCarDetail) {
      const car = cars.find(c => c.id === carMatch[1]);
      if (car) {
        title = `${car.brand} ${car.model} (${car.year}) | BBCars`;
        description = `${car.brand} ${car.model} na prodej. Nájezd ${car.km}, výkon ${car.powerKw}. Prověřený původ a špičkový stav v BBCars Rokycany.`;
        
        const schema = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": `${car.brand} ${car.model}`,
          "image": car.image,
          "description": car.story.CZ,
          "brand": { "@type": "Brand", "name": car.brand },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "CZK",
            "price": car.price.replace(/\s/g, '').replace('Kč', ''),
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "BBCars" }
          }
        };
        updateJSONLD(schema);
      }
    } else {
      if (pathname === '/nabidka') {
        title = "Nabídka luxusních vozů | Kurátorský výběr | BBCars";
      } else if (pathname === '/o-nas') {
        title = "O nás | Příběh a filozofie BBCars";
      } else if (pathname === '/kontakt') {
        title = "Kontakt | Navštivte náš showroom v Rokycanech";
      }
      removeJSONLD();
    }

    document.title = title;
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', window.location.href);
    updateCanonical();
  }, [pathname]);

  const updateMetaTag = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      if (name.startsWith('og:')) el.setAttribute('property', name);
      else el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const updateCanonical = () => {
    let el = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    el.setAttribute('rel', 'canonical');
    el.setAttribute('href', window.location.origin + pathname);
    if (!document.querySelector('link[rel="canonical"]')) document.head.appendChild(el);
  };

  const updateJSONLD = (data: object) => {
    let script = document.getElementById('json-ld-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  };

  const removeJSONLD = () => {
    document.getElementById('json-ld-data')?.remove();
  };

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  const filteredCars = useMemo(() => {
    if (!query.trim()) return [];
    return cars.filter(c => 
      c.brand.toLowerCase().includes(query.toLowerCase()) || 
      c.model.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center px-8 animate-in fade-in duration-500">
      <button onClick={onClose} className="absolute top-6 right-6 md:top-12 md:right-12 text-white/40 hover:text-white transition-colors">
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      
      <div className="w-full max-w-4xl reveal-up">
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hledat vůz..."
          className="w-full bg-transparent border-b border-white/10 py-6 md:py-8 text-2xl md:text-6xl font-bold uppercase tracking-tighter outline-none placeholder:text-white/10 focus:border-[#dbad1e] transition-all text-center"
        />

        <div className="mt-8 md:mt-12 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredCars.map((car, idx) => (
            <button 
              key={car.id} 
              onClick={() => {
                navigate(`/auto/${car.id}`);
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 md:p-6 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-left reveal-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="w-16 md:w-24 aspect-video overflow-hidden border border-white/10">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">{car.brand}</p>
                   <p className="text-base md:text-xl font-bold uppercase tracking-tight">{car.model}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm md:text-lg font-bold tracking-tighter">{car.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <SEOManager />
      <header className={`fixed top-0 left-0 w-full z-[80] p-6 md:p-12 flex justify-between items-center transition-transform duration-500 ${showHeader || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => setIsMenuOpen(true)} className="group flex items-center space-x-4 focus:outline-none reveal-down delay-200">
          <div className="flex flex-col items-start space-y-2">
            <span className="w-10 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
            <span className="w-6 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
          </div>
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em]">MENU</span>
        </button>

        {!isHome && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Link to="/" className="flex items-center justify-center group pointer-events-auto reveal-down">
               <img src="/logo.png" alt="BBCars" className="h-4 md:h-8 w-auto object-contain transition-transform group-hover:scale-110" onError={(e) => { (e.target as any).style.display='none'; (e.target as any).nextSibling.style.display='block'; }} />
               <span className="hidden font-heading font-extrabold text-2xl tracking-tighter">BBCARS</span>
            </Link>
          </div>
        )}

        <button onClick={() => setIsSearchOpen(true)} className="group reveal-down delay-400 relative flex items-center h-12 w-12 justify-center focus:outline-none bg-white/0 hover:bg-white/5 rounded-full transition-all">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-all transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <aside className={`fixed top-0 left-0 h-full w-full md:w-[500px] bg-black z-[110] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-8 md:p-16 flex flex-col border-r border-white/5 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="mb-12 flex items-center space-x-4 opacity-30 hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">ZAVŘÍT</span>
        </button>
        <nav className="flex flex-col space-y-7 items-start">
          {[
            { to: "/", label: "Úvod" },
            { to: "/nabidka", label: "Nabídka vozů" },
            { to: "/pujcovna", label: "Pronájem vozů" },
            { to: "/vykup", label: "Výkup vozů" },
            { to: "/vuz-na-prani", label: "Vůz na objednávku" },
            { to: "/o-nas", label: "O nás" },
            { to: "/sluzby", label: "Služby" },
            { to: "/kontakt", label: "Kontakt" },
          ].map((link, idx) => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setIsMenuOpen(false)} 
              className={`text-3xl font-bold tracking-tight uppercase font-heading hover:text-[#dbad1e] transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${isMenuOpen ? idx * 50 : 0}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang="CZ" />} />
          <Route path="/nabidka" element={<Inventory lang="CZ" />} />
          <Route path="/auto/:id" element={<CarDetail lang="CZ" />} />
          <Route path="/o-nas" element={<AboutUs lang="CZ" />} />
          <Route path="/kontakt" element={<Contact lang="CZ" />} />
          <Route path="/vuz-na-prani" element={<CustomOrder lang="CZ" />} />
          <Route path="/vykup" element={<Buyout lang="CZ" />} />
          <Route path="/sluzby" element={<Services lang="CZ" />} />
          <Route path="/pujcovna" element={<Rent lang="CZ" />} />
          <Route path="/podminky" element={<Terms lang="CZ" />} />
          <Route path="/soukromi" element={<Privacy lang="CZ" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer lang="CZ" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
};

export default App;
