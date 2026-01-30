
import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { articles } from '../data/articles';

const Journal: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="pt-40 pb-40 px-6 md:px-20 bg-[#050505] min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase font-heading leading-none">Aktuality</h1>
          <p className="text-white/30 text-sm tracking-widest uppercase mt-8">Zprávy ze světa BBCars a exkluzivních automobilů</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              to={`/journal/${article.id}`}
              className="group block"
            >
              <div className="aspect-[16/9] overflow-hidden mb-10 border border-white/5">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="max-w-xl">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-bold">{article.date}</p>
                <h2 className="text-3xl md:text-4xl font-bold uppercase font-heading leading-tight mb-6 group-hover:text-[#dbad1e] transition-colors">
                  {article.title}
                </h2>
                <p className="text-white/40 text-base font-light leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-8 flex items-center space-x-4">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold">ČÍST DÁLE</span>
                  <div className="w-12 h-[1px] bg-[#dbad1e] group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
