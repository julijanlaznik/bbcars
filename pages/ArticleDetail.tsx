
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Language } from '../types';
import { articles } from '../data/articles';

const ArticleDetail: React.FC<{ lang: Language }> = ({ lang }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) return <Navigate to="/journal" />;

  return (
    <div className="bg-[#050505] min-h-screen pt-40 pb-40">
      <div className="max-w-screen-xl mx-auto px-6">
        <header className="max-w-4xl mb-24">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#dbad1e] mb-8 font-bold">{article.date}</p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase font-heading leading-none text-white">
            {article.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p className="text-2xl text-white font-medium leading-snug">
              {article.excerpt}
            </p>
            
            <div className="space-y-8">
              <p>
                Každý nový model v naší nabídce je výsledkem pečlivého hledání a prověřování. V BBCars věříme, že automobil 
                není jen dopravní prostředek, ale investice do zážitků a precizního inženýrství. V tomto článku se podíváme pod 
                kapotu nejnovějších trendů v našem segmentu.
              </p>
              
              {/* Secondary Image for Newspaper look */}
              <div className="py-8">
                <img src={article.image} alt="Detail" className="w-full aspect-video object-cover border border-white/5" />
                <p className="text-[10px] uppercase tracking-widest text-white/20 mt-4 italic text-center">Foto: Archiv BBCars</p>
              </div>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                V rámci našich služeb se zaměřujeme na to, aby každý klient odcházel s pocitem, že našel přesně to, co hledal.
              </p>
              
              <h2 className="text-3xl font-bold uppercase font-heading text-white pt-10">Závěrem</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Sidebar / Secondary Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-12">
            <div className="border-l border-[#dbad1e]/30 pl-10 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Autor</p>
                <p className="text-xl font-bold font-heading uppercase">{article.author}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Téma</p>
                <p className="text-xl font-bold font-heading uppercase text-[#dbad1e]">Exkluzivita</p>
              </div>
            </div>
            
            <div className="p-8 bg-white/[0.03] border border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Máte dotaz k tomuto tématu?</h4>
              <p className="text-sm text-white/40 mb-8">Naši experti jsou vám k dispozici pro konzultaci jakéhokoliv vozu.</p>
              <Link to="/kontakt" className="inline-block text-[9px] uppercase tracking-[0.5em] font-bold py-4 px-10 bg-white text-black">KONTAKTOVAT</Link>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/5">
           <Link to="/journal" className="group flex items-center space-x-4 text-[10px] uppercase tracking-[0.5em] font-bold">
             <span className="text-[#dbad1e] transition-transform group-hover:-translate-x-2">←</span>
             <span>Zpět na Aktuality</span>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
