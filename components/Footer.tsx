
import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  const lPath = (path: string) => `/${lang.toLowerCase()}${path}`;

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Plze%C5%88sk%C3%A1+968+Rokycany";

  return (
    <footer className="w-full text-white overflow-hidden">
      {/* MAIN FOOTER GRID */}
      <div className="bg-[#0a0a0a] pt-24 pb-20 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
          
          {/* COL 1: LOGO */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tighter font-heading uppercase mb-8">BBCARS</h2>
            <p className="text-[12px] font-light text-white/30 leading-relaxed tracking-wide">
              {lang === 'CZ' 
                ? 'Kurátorský výběr luxusních vozů. Zakládáme si na transparentnosti a osobním přístupu.' 
                : 'Curated selection of luxury cars. We pride ourselves on transparency and personal approach.'}
            </p>
          </div>

          {/* COL 2: INVENTORY */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">{t.nav_inventory}</h4>
            <nav className="flex flex-col space-y-4">
              <Link to={lPath("/inventory")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Všechny vozy</Link>
              <Link to={lPath("/inventory")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">PORSCHE</Link>
              <Link to={lPath("/inventory")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">BMW M</Link>
              <Link to={lPath("/inventory")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">FERRARI</Link>
            </nav>
          </div>

          {/* COL 3: SERVICES */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">{t.footer_nav_services}</h4>
            <nav className="flex flex-col space-y-4">
              <Link to={lPath("/buyout")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">{t.nav_buyout}</Link>
              <Link to={lPath("/services")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">{t.nav_services}</Link>
              <Link to={lPath("/rent")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">{t.nav_rent}</Link>
              <Link to={lPath("/custom-order")} className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">{t.nav_custom_order}</Link>
            </nav>
          </div>

          {/* COL 4: CONTACT INFO */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">{lang === 'CZ' ? 'KONTAKT' : 'CONTACT'}</h4>
            <div className="flex flex-col space-y-4">
              <a href="tel:+420605034911" className="group flex items-center space-x-3">
                <svg className="w-4 h-4 text-white/20 group-hover:text-[#dbad1e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-[12px] font-bold tracking-widest">+420 605 034 911</span>
              </a>
              <a href="mailto:info@bbcars.eu" className="group flex items-center space-x-3">
                <svg className="w-4 h-4 text-white/20 group-hover:text-[#dbad1e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-[12px] font-light text-white/50 group-hover:text-white transition-colors tracking-widest">INFO@BBCARS.EU</span>
              </a>
            </div>
          </div>

          {/* COL 5: ADDRESS */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">{lang === 'CZ' ? 'KDE NÁS NAJDETE' : 'LOCATION'}</h4>
            <div className="flex flex-col space-y-8">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col space-y-2">
                <span className="text-[12px] font-light text-white/80 group-hover:text-[#dbad1e] transition-colors leading-relaxed uppercase tracking-widest">
                  Plzeňská 968,<br/>337 01 Rokycany
                </span>
              </a>
              
              <div className="flex space-x-6">
                <a href="https://instagram.com/bbcars.eu" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#dbad1e] transition-all" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/bbcars.eu" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#dbad1e] transition-all" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#050505] py-10 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">© {new Date().getFullYear()} BBCARS S.R.O. | ALL RIGHTS RESERVED</p>
          <div className="flex space-x-8">
            <Link to={lPath("/terms")} className="text-[9px] uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">{t.footer_terms}</Link>
            <Link to={lPath("/privacy")} className="text-[9px] uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">{t.footer_privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;