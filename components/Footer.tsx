
import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Plze%C5%88sk%C3%A1+968+Rokycany";

  return (
    <footer className="w-full text-white overflow-hidden bg-[#0a0a0a] border-t border-white/5">
      <div className="pt-24 pb-20 px-8 md:px-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tighter font-heading uppercase mb-8">BBCARS</h2>
            <p className="text-[12px] font-light text-white/30 leading-relaxed tracking-wide">
              Kurátorský výběr luxusních vozů. Zakládáme si na transparentnosti a osobním přístupu k prodeji ikonických automobilů.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">NABÍDKA</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Všechny vozy</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">PORSCHE</Link>
              <Link to="/nabidka" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">FERRARI</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">SLUŽBY</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/vykup" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Výkup vozů</Link>
              <Link to="/sluzby" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Služby</Link>
              <Link to="/pujcovna" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Pronájem vozů</Link>
              <Link to="/vuz-na-prani" className="text-[11px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">Vůz na objednávku</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">KONTAKT</h4>
            <div className="flex flex-col space-y-4">
              <a href="tel:+420605034911" className="text-[12px] font-bold tracking-widest">+420 605 034 911</a>
              <a href="mailto:info@bbcars.eu" className="text-[12px] font-light text-white/50 hover:text-white transition-colors tracking-widest uppercase">info@bbcars.eu</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#dbad1e] mb-8 font-bold">LOKALITA</h4>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] font-light text-white/80 hover:text-[#dbad1e] transition-colors leading-relaxed uppercase tracking-widest">
              Plzeňská 968,<br/>337 01 Rokycany
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] py-10 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">© {new Date().getFullYear()} BBCARS S.R.O. | ALL RIGHTS RESERVED</p>
          <div className="flex space-x-8">
            <Link to="/podminky" className="text-[9px] uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">OBCHODNÍ PODMÍNKY</Link>
            <Link to="/soukromi" className="text-[9px] uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">OCHRANA ÚDAJŮ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
