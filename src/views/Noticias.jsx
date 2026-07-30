import React, { useState } from 'react';
import { Newspaper, Calendar, Search, ArrowRight } from 'lucide-react';

export default function Noticias() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const articles = [
    {
      id: 1,
      category: 'semilleros',
      title: 'Apertura del nuevo Semillero de Investigación en Smart Farming',
      date: 'Julio 25, 2026',
      excerpt: 'Se invita a los estudiantes de 4to nivel en adelante a formar parte del semillero enfocado en IoT agrícola para Los Vergeles.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      category: 'los-vergeles',
      title: 'Monitoreo de telemetría solar optimizado para Los Vergeles',
      date: 'Julio 18, 2026',
      excerpt: 'Nuevos sensores de corriente y voltaje instalados en el banco de baterías comunitarias ya transmiten en tiempo real.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      category: 'eventos',
      title: 'Hackathon IoT 2026: Soluciones Tecnológicas de Impacto Social',
      date: 'Agosto 12, 2026',
      excerpt: 'Tres días de desarrollo de prototipos y retos enfocados en resolver problemas de agua y energía. Registros abiertos.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      category: 'cpt',
      title: 'Convenio de Manufactura de Circuitos Impresos con el CPT',
      date: 'Junio 30, 2026',
      excerpt: 'El Centro de Producción Tecnológica habilitará descuentos especiales para estudiantes en la fabricación de PCBs.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'investigacion', name: 'Investigación' },
    { id: 'cpt', name: 'CPT' },
    { id: 'semilleros', name: 'Semilleros' },
    { id: 'eventos', name: 'Eventos' },
    { id: 'los-vergeles', name: 'Los Vergeles' },
    { id: 'congresos', name: 'Congresos' }
  ];

  const filtered = articles.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Noticias & Comunicados</h1>
          <p className="text-slate-655 text-base">
            Mantente al día con los logros académicos, proyectos de vinculación y el desarrollo tecnológico regional.
          </p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === c.id ? 'bg-teal-650 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <article key={item.id} className="glass rounded-2xl overflow-hidden glass-hover flex flex-col justify-between bg-white/60">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-white/95 text-teal-700 border border-teal-200/50 shadow-sm">
                    {categories.find(c => c.id === item.category)?.name || item.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </span>
                  <h4 className="text-lg font-bold text-slate-800 hover:text-teal-650 transition-colors leading-snug">{item.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Cargando noticia completa..."); }} className="inline-flex items-center gap-1.5 text-xs text-teal-650 font-bold uppercase hover:underline">
                  <span>Leer Artículo</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-slate-500 text-sm font-semibold">
            No se encontraron noticias que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
