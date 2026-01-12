
import React, { useEffect, useRef, useState, useMemo } from 'react';
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

const SEOManager: React.FC<{ lang: Language }> = ({ lang }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    let title = "BBCars | Luxury Digital Showroom";
    let description = lang === 'CZ' 
      ? "Specializovaný prodejce luxusních a prémiových vozů. Kurátorský výběr Porsche, Ferrari, Bentley a dalších exkluzivních značek v ČR."
      : "Specialized dealer of luxury and premium cars. Curated selection of Porsche, Ferrari, Bentley and other exclusive brands in CZ.";
    
    // Check if we are on a car detail page
    const carDetailMatch = pathname.match(/\/(cs|en)\/auto\/([^\/]+)/i);
    if (carDetailMatch) {
      const carId = carDetailMatch[2];
      const car = cars.find(c => c.id === carId);
      if (car) {
        title = `${car.brand} ${car.model} (${car.year}) | BBCars`;
        description = lang === 'CZ' 
          ? `${car.brand} ${car.model} na prodej. Nájezd ${car.km}, výkon ${car.powerKw}. Prověřený původ a špičkový stav v BBCars Rokycany.`
          : `${car.brand} ${car.model} for sale. Mileage ${car.km}, power ${car.powerKw}. Verified origin and top condition at BBCars.`;
        
        // Inject JSON-LD Product Schema
        const schema = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": `${car.brand} ${car.model}`,
          "image": car.image,
          "description": car.story[lang],
          "brand": {
            "@type": "Brand",
            "name": car.brand
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "CZK",
            "price": car.price.replace(/\s/g, '').replace('Kč', ''),
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "BBCars"
            }
          }
        };
        const existingScript = document.getElementById('json-ld-schema');
        if (existingScript) existingScript.remove();
        
        const script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    } else {
      document.getElementById('json-ld-schema')?.remove();
      
      if (pathname.includes('/inventory')) {
        title = lang === 'CZ' ? "Nabídka luxusních vozů | BBCars" : "Luxury Car Inventory | BBCars";
      } else if (pathname.includes('/about')) {
        title = lang === 'CZ' ? "O nás | Příběh BBCars" : "About Us | The BBCars Story";
      } else if (pathname.includes('/contact')) {
        title = lang === 'CZ' ? "Kontaktujte nás | Showroom Rokycany" : "Contact Us | Rokycany Showroom";
      }
    }

    document.title = title;
    
    const updateMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:')) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', window.location.href);
    
    let canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.origin + pathname);
    if (!document.querySelector('link[rel="canonical"]')) document.head.appendChild(canonical);

  }, [pathname, lang]);
  
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WhatsAppSticky = () => (
  <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[50]">
    <a href="https://wa.me/420605034911" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-all duration-500">
      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
    </a>
  </div>
);

const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void; lang: Language }> = ({ isOpen, onClose, lang }) => {
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
      
      <div className="w-full max-w-4xl">
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === 'CZ' ? "Hledat vůz..." : "Search..."}
          className="w-full bg-transparent border-b border-white/10 py-6 md:py-8 text-2xl md:text-6xl font-bold uppercase tracking-tighter outline-none placeholder:text-white/10 focus:border-[#dbad1e] transition-all text-center"
        />

        <div className="mt-8 md:mt-12 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredCars.map(car => (
            <button 
              key={car.id} 
              onClick={() => {
                navigate(`/${lang.toLowerCase()}/auto/${car.id}`);
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 md:p-6 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-left"
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

const Layout: React.FC<{ lang: Language; setLang: (l: Language) => void }> = ({ lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = translations[lang];
  const { pathname } = useLocation();
  const lPath = (path: string) => `/${lang.toLowerCase()}${path}`;

  // Fix home page detection for subpaths
  const isHomePage = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length === 1; // e.g. /cs or /en
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white overflow-x-hidden">
      <SEOManager lang={lang} />
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-[80] p-6 md:p-12 flex justify-between items-center transition-transform duration-500 ${showHeader || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => setIsMenuOpen(true)} className="group flex items-center space-x-4 focus:outline-none">
          <div className="flex flex-col items-start space-y-1.5 md:space-y-2">
            <span className="w-7 md:w-10 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
            <span className="w-4 md:w-6 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
          </div>
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em] group-hover:text-[#dbad1e] transition-colors">MENU</span>
        </button>

        {!isHomePage && (
           <Link 
            to={lPath("")} 
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center group"
          >
            <img 
              src="/logo.png" 
              alt="BBCars Logo" 
              className="h-6 md:h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as any).style.display = 'none';
                (e.target as any).nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden font-heading font-extrabold text-white text-2xl md:text-3xl tracking-tighter scale-y-90 select-none">BB CARS</span>
          </Link>
        )}

        <button onClick={() => setIsSearchOpen(true)} className="group relative flex items-center h-12 w-12 justify-center focus:outline-none bg-white/0 hover:bg-white/5 rounded-full transition-all">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-all transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </header>

      {/* SEARCH OVERLAY */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} lang={lang} />

      {/* SIDE MENU */}
      <aside className={`fixed top-0 left-0 h-full w-full md:w-[500px] bg-black z-[110] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-8 md:p-16 flex flex-col border-r border-white/5 will-change-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 opacity-30 hover:opacity-100 transition-opacity z-[120] mb-12 group">
          <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">ZAVŘÍT</span>
        </button>

        <div className="flex-grow flex flex-col justify-center items-start">
          <nav className="flex flex-col space-y-6 md:space-y-7 items-start text-left w-full">
            {[
              { to: "", label: t.nav_home },
              { to: "inventory", label: t.nav_inventory },
              { to: "rent", label: t.nav_rent },
              { to: "buyout", label: t.nav_buyout },
              { to: "custom-order", label: t.nav_custom_order },
              { to: "about", label: t.nav_about },
              { to: "services", label: t.nav_services },
              { to: "contact", label: t.nav_contact },
            ].map((link, idx) => (
              <Link 
                key={link.to} 
                to={lPath(`/${link.to}`)} 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-3xl md:text-3xl font-bold tracking-tight uppercase font-heading hover:text-[#dbad1e] transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${isMenuOpen ? idx * 40 : 0}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto pt-12 text-left opacity-10">
          <span className="text-[8px] uppercase tracking-[1em] font-bold">BBCARS SHOWROOM</span>
        </div>
      </aside>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="inventory" element={<Inventory lang={lang} />} />
          <Route path="buyout" element={<Buyout lang={lang} />} />
          <Route path="services" element={<Services lang={lang} />} />
          <Route path="rent" element={<Rent lang={lang} />} />
          <Route path="about" element={<AboutUs lang={lang} />} />
          <Route path="auto/:id" element={<CarDetail lang={lang} />} />
          <Route path="custom-order" element={<CustomOrder lang={lang} />} />
          <Route path="contact" element={<Contact lang={lang} />} />
          <Route path="terms" element={<Terms lang={lang} />} />
          <Route path="privacy" element={<Privacy lang={lang} />} />
        </Routes>
      </main>
      <Footer lang={lang} />
      <WhatsAppSticky />
    </div>
  );
};

const LanguageWrapper = () => {
  const { lang: langParam } = useParams<{ lang: string }>();
  const [lang, setLang] = React.useState<Language>('CZ');
  useEffect(() => {
    if (langParam?.toLowerCase() === 'en') setLang('EN');
    else setLang('CZ');
  }, [langParam]);
  return <Layout lang={lang} setLang={setLang} />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/:lang/*" element={<LanguageWrapper />} />
        <Route path="*" element={<Navigate to="/cs" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
