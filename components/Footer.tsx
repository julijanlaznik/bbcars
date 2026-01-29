
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Plze%C5%88sk%C3%A1+968+Rokycany";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Font stack pro SF Pro Display (Apple system font)
  const sfProStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif'
  };

  return (
    <footer className="w-full text-white overflow-hidden bg-[#050505] border-t border-white/5">
      {/* 1. NEWSLETTER SECTION */}
      <div className="py-20 px-8 md:px-20 border-b border-white/5 bg-[#080808]/50">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-heading uppercase tracking-tighter mb-4">
              {lang === 'CZ' ? 'Odběr exkluzivních novinek' : 'Subscribe to exclusive news'}
            </h3>
            <p className="text-white/40 text-sm md:text-base font-light tracking-wide">
              {lang === 'CZ' 
                ? 'Buďte první, kdo se dozví o nově naskladněných vozech a neveřejných nabídkách přímo do vašeho e-mailu.' 
                : 'Be the first to know about newly stocked vehicles and private offers directly to your email.'}
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="py-4 px-8 border border-[#dbad1e]/30 bg-[#dbad1e]/5 text-[#dbad1e] text-[11px] uppercase tracking-[0.3em] font-bold animate-in fade-in duration-700">
                {lang === 'CZ' ? 'Děkujeme za odběr novinek' : 'Thank you for subscribing to our news'}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 w-full lg:w-[450px]">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'CZ' ? 'ZADEJTE VÁŠ E-MAIL' : 'ENTER YOUR EMAIL'}
                  className="flex-grow bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-white/30 transition-all text-sm tracking-widest"
                />
                <button 
                  type="submit" 
                  className="bg-[#dbad1e] hover:bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500 flex-shrink-0"
                >
                  {lang === 'CZ' ? 'ODEBÍRAT' : 'SUBSCRIBE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="pt-24 pb-16 px-8 md:px-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-10">
              <img 
                src="/logo.png" 
                alt="B&b CARS" 
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as any).style.display = 'none';
                  (e.target as any).nextSibling.style.display = 'block';
                }}
              />
              <h2 className="hidden text-3xl font-bold tracking-tighter font-heading uppercase">B<span className="text-[#dbad1e]">&</span>B CARS</h2>
            </Link>
            <p className="text-[12px] font-light text-white/30 leading-relaxed tracking-wide mb-10">
              Specializovaný prodejce luxusních vozů. Zakládáme si na transparentnosti, prověřeném původu a osobním přístupu ke každému klientovi.
            </p>
            <div className="flex space-x-6">
              <a href="https://instagram.com/bbcars.eu" target="_blank" className="text-white/20 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com/bbcars.eu" target="_blank" className="text-white/20 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
            </div>
          </div>

          {/* Brands Quick Filter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">VÝBĚR ZNAČEK</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">PORSCHE</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">FERRARI</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">LAMBORGHINI</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">BENTLEY</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">MERCEDES-BENZ</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">BMW M</Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">NAŠE SLUŽBY</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Prodej vozů</Link>
              <Link to="/vuz-na-prani" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Vůz na objednávku</Link>
              <Link to="/vykup" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Výkup vozidel</Link>
              <Link to="/sluzby" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Financování</Link>
              <Link to="/sluzby" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Odtah & Dovoz</Link>
              <Link to="/pujcovna" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Pronájem</Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">SPOLEČNOST</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/o-nas" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">O nás</Link>
              <Link to="/o-nas" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Naše filozofie</Link>
              <Link to="/kontakt" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Kontakt</Link>
              <Link to="/kontakt" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Showroom Rokycany</Link>
              <Link to="/podminky" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Obchodní podmínky</Link>
            </nav>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">KONTAKT</h4>
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">PRODEJ & INFO</p>
                <a href="tel:+420605034911" className="text-[14px] font-bold tracking-widest hover:text-[#dbad1e] transition-colors">+420 605 034 911</a>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">E-MAIL</p>
                <a href="mailto:info@bbcars.eu" className="text-[13px] font-light text-white/80 hover:text-white transition-colors tracking-widest uppercase">info@bbcars.eu</a>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">SHOWROOM</p>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-light text-white/80 hover:text-[#dbad1e] transition-colors leading-relaxed uppercase tracking-widest">
                  Plzeňská 968,<br/>337 01 Rokycany
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-FOOTER */}
      <div className="bg-[#030303] py-8 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
              © {new Date().getFullYear()} BBCARS S.R.O. | IČO: [DOPLNIT]
            </p>
            <span className="hidden md:block text-white/10 text-[10px]">|</span>
            <p 
              className="text-[10px] uppercase tracking-[0.2em] text-white/30"
              style={sfProStyle}
            >
              <span className="font-thin">Created by </span>
              <span className="font-bold">Smart digital</span>
            </p>
          </div>
          <div className="flex space-x-8">
            <Link to="/soukromi" className="text-[9px] uppercase tracking-[0.2em] text-white/10 hover:text-white transition-colors">OCHRANA OSOBNÍCH ÚDAJŮ</Link>
            <Link to="/soukromi" className="text-[9px] uppercase tracking-[0.2em] text-white/10 hover:text-white transition-colors">COOKIES</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
