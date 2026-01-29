
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
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
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import Footer from './components/Footer';
import EngagementPopup from './components/EngagementPopup';
import { Language } from './types';
import { translations } from './i18n/translations';
import { cars } from './data/cars';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800); // Wait for slide up animation
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[300] bg-black flex items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="relative">
        <img src="/logo.png" alt="BBCars" className="h-12 md:h-16 w-auto object-contain animate-pulse" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-white/10 overflow-hidden">
          <div className="h-full bg-[#dbad1e] animate-[slideProgress_1.5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};

const SEOManager: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    let title = "B&b Cars | Prodej luxusních a prémiových vozů";
    const carMatch = pathname.match(/\/auto\/([^\/]+)/);
    if (carMatch && carMatch[1]) {
      const car = cars.find(c => c.id === carMatch[1]);
      if (car) title = `${car.brand} ${car.model} | B&b Cars`;
    } else if (pathname === '/nabidka') title = "Nabídka luxusních vozů | B&b Cars";
    document.title = title;
  }, [pathname]);
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
      <div className="w-full max-w-4xl">
        <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Hledat vůz..." className="w-full bg-transparent border-b border-white/10 py-6 md:py-8 text-2xl md:text-6xl font-bold uppercase tracking-tighter outline-none placeholder:text-white/10 focus:border-[#dbad1e] transition-all text-center" />
        <div className="mt-8 md:mt-12 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {filteredCars.map((car) => (
            <button key={car.id} onClick={() => { navigate(`/auto/${car.id}`); onClose(); }} className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-left">
              <div className="flex items-center space-x-4">
                <div className="w-16 md:w-24 aspect-video overflow-hidden border border-white/10">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                </div>
                <div><p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{car.brand}</p><p className="text-base md:text-xl font-bold uppercase">{car.model}</p></div>
              </div>
              <p className="text-sm md:text-lg font-bold">{car.price}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhatsAppButton: React.FC = () => (
  <a href="https://wa.me/420605034911" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform">
    <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
);

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 100) setShowHeader(true);
      else if (current < lastScrollY) setShowHeader(true);
      else setShowHeader(false);
      setLastScrollY(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuLinks = [
    { to: "/", label: "Úvod" },
    { to: "/nabidka", label: "Nabídka vozů" },
    { to: "/journal", label: "Novinky" },
    { to: "/vuz-na-prani", label: "Vůz na přání" },
    { to: "/vykup", label: "Výkup" },
    { to: "/sluzby", label: "Služby" },
    { to: "/pujcovna", label: "Půjčovna" },
    { to: "/o-nas", label: "O nás" },
    { to: "/kontakt", label: "Kontakt" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <SEOManager />
      
      {!isLoading && (
        <>
          <header className={`fixed top-0 left-0 w-full z-[80] p-6 md:p-12 flex justify-between items-center transition-all duration-500 ${showHeader || isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <button onClick={() => setIsMenuOpen(true)} className="group flex items-center space-x-4 focus:outline-none z-50">
              <div className="flex flex-col items-start space-y-2">
                <span className="w-10 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
                <span className="w-6 h-[1.5px] bg-white group-hover:bg-[#dbad1e] transition-all"></span>
              </div>
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em]">MENU</span>
            </button>

            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-700 ${isHome ? 'opacity-0' : 'opacity-100'}`}>
              <Link to="/"><img src="/logo.png" alt="BBCars" className="h-7 md:h-9 w-auto object-contain" /></Link>
            </div>

            <button onClick={() => setIsSearchOpen(true)} className="group flex items-center h-12 w-12 justify-center bg-white/0 hover:bg-white/5 rounded-full transition-all z-50">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </header>

          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          <aside className={`fixed top-0 left-0 h-full w-full md:w-[500px] bg-black z-[110] transition-transform duration-700 p-8 md:p-16 flex flex-col border-r border-white/5 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={() => setIsMenuOpen(false)} className="mb-12 flex items-center space-x-4 opacity-30 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">ZAVŘÍT</span>
            </button>
            <nav className="flex flex-col space-y-5 overflow-y-auto pr-4 custom-scrollbar flex-grow">
              {menuLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="text-2xl md:text-3xl font-bold uppercase font-heading hover:text-[#dbad1e] transition-all tracking-tighter">
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Socials at the bottom of the menu */}
            <div className="pt-12 flex items-center space-x-8 border-t border-white/5 mt-auto">
              <a href="https://instagram.com/bbcars.eu" target="_blank" className="text-white/30 hover:text-white transition-colors group">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com/bbcars.eu" target="_blank" className="text-white/30 hover:text-white transition-colors group">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
            </div>
          </aside>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home lang="CZ" />} />
              <Route path="/nabidka" element={<Inventory lang="CZ" />} />
              <Route path="/auto/:id" element={<CarDetail lang="CZ" />} />
              <Route path="/journal" element={<Journal lang="CZ" />} />
              <Route path="/journal/:id" element={<ArticleDetail lang="CZ" />} />
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
          <WhatsAppButton />
          <EngagementPopup />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    <Layout />
  </HashRouter>
);

export default App;
