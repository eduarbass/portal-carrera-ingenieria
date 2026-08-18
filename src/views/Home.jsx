import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Users, BookOpen, Layers, Newspaper, ArrowRight, Activity, MapPin, Award, ExternalLink } from 'lucide-react';

export default function Home() {
  const [newsFilter, setNewsFilter] = useState('all');

  const stats = [
    { id: 1, name: 'Docentes', value: '18', icon: Users, color: 'text-teal-650', bg: 'bg-teal-50' },
    { id: 2, name: 'Estudiantes', value: '450+', icon: Users, color: 'text-cyan-650', bg: 'bg-cyan-50' },
    { id: 3, name: 'Graduados', value: '85', icon: Award, color: 'text-emerald-650', bg: 'bg-emerald-50' },
    { id: 4, name: 'Laboratorios', value: '5', icon: Layers, color: 'text-violet-650', bg: 'bg-violet-50' },
    { id: 5, name: 'Proyectos', value: '12', icon: Activity, color: 'text-indigo-650', bg: 'bg-indigo-50' },
    { id: 6, name: 'Semilleros', value: '2', icon: BookOpen, color: 'text-amber-655', bg: 'bg-amber-50' },
    { id: 7, name: 'Publicaciones', value: '80+', icon: Newspaper, color: 'text-rose-650', bg: 'bg-rose-50' },
    { id: 8, name: 'Comunidades Beneficiadas', value: '4', icon: MapPin, color: 'text-blue-650', bg: 'bg-blue-50' },
  ];

  const news = [
    {
      id: 1,
      category: 'academic',
      title: 'Apertura del nuevo Semillero de Investigación en Smart Farming',
      date: 'Julio 25, 2026',
      excerpt: 'Se invita a los estudiantes de 4to nivel en adelante a formar parte del semillero enfocado en IoT agrícola para Los Vergeles.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      category: 'iot',
      title: 'Monitoreo de telemetría solar optimizado para Los Vergeles',
      date: 'Julio 18, 2026',
      excerpt: 'Nuevos sensores de corriente y voltaje instalados en el banco de baterías comunitarias ya transmiten en tiempo real.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      category: 'event',
      title: 'Hackathon IoT 2026: Soluciones Tecnológicas de Impacto Social',
      date: 'Agosto 12, 2026',
      excerpt: 'Tres días de desarrollo de prototipos y retos enfocados en resolver problemas de agua y energía. Registros abiertos.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const filteredNews = newsFilter === 'all' ? news : news.filter(item => item.category === newsFilter);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-24 lg:pb-20">
        {/* Glow Effects (Light Pastels) */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-teal-100/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-250 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Cpu className="h-3 w-3 animate-spin" /> Carrera de Vanguardia
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              Ingeniería <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Telemática</span>
            </h1>
            <p className="text-slate-655 text-lg leading-relaxed max-w-xl">
              Domina la tecnología detrás del hardware inteligente, la adquisición de datos ambientales y las comunicaciones en tiempo real. Diseña soluciones que conecten dispositivos físicos para mejorar comunidades e industrias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/carrera"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold hover:opacity-95 transition-all shadow-md shadow-teal-500/10"
              >
                <span>Conoce la Carrera</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/investigacion"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-55 transition-all"
              >
                <span>Proyectos de Investigación</span>
                <Activity className="h-5 w-5 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Visual tech stack presentation */}
            <div className="w-full aspect-square max-w-[450px] mx-auto relative flex items-center justify-center">
              {/* Background rotating border circles */}
              <div className="absolute inset-0 border border-dashed border-teal-200/50 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-8 border border-dashed border-cyan-200/50 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="absolute inset-16 border border-slate-200 rounded-full"></div>

              {/* Core Device Glass Card */}
              <div className="w-64 h-64 glass rounded-3xl flex flex-col items-center justify-center p-6 relative z-10 shadow-xl bg-white/90">
                <Cpu className="h-16 w-16 text-teal-600 mb-4 animate-pulse" />
                <span className="font-display font-bold text-slate-800 text-lg text-center leading-tight">HARDWARE + CLOUD</span>
                <span className="text-teal-600 text-xs font-mono font-bold mt-1">Status: Conectado</span>
                <div className="flex gap-2 mt-4">
                  <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute top-8 right-8 glass p-3 rounded-xl flex items-center gap-2 shadow-md bg-white/90 animate-bounce duration-1000">
                <div className="h-8 w-8 rounded-lg bg-cyan-50 flex items-center justify-center border border-cyan-100 text-cyan-600 font-bold">
                  24°C
                </div>
                <span className="text-xs text-slate-700 font-bold">Temperatura</span>
              </div>

              <div className="absolute bottom-10 left-4 glass p-3 rounded-xl flex items-center gap-2 shadow-md bg-white/90 animate-[bounce_1.2s_infinite]">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600 font-bold">
                  85%
                </div>
                <span className="text-xs text-slate-700 font-bold">Humedad Suelo</span>
              </div>

              <div className="absolute bottom-32 right-2 glass p-3 rounded-xl flex items-center gap-2 shadow-md bg-white/90 animate-[bounce_1.4s_infinite]">
                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100 text-amber-600 font-bold">
                  12V
                </div>
                <span className="text-xs text-slate-700 font-bold">Voltaje Solar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="glass p-6 rounded-2xl text-center glass-hover flex flex-col items-center justify-center bg-white/60">
              <div className={`p-3 rounded-xl ${stat.bg} mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">{stat.value}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">{stat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accesos rápidos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl font-display font-bold text-slate-900">Accesos Rápidos</h2>
          <p className="text-slate-600">
            Encuentra y accede ágilmente a los servicios, micrositios y recursos de la Carrera de Ingeniería Telemática.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. CPT */}
          <a
            href="https://ctpunesum.com/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Enlace Externo</span>
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                Centro de Producción Tecnológica <ExternalLink className="h-3.5 w-3.5 text-teal-600" />
              </h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </a>

          {/* 2. Proyecto Los Vergeles */}
          <Link
            to="/los-vergeles"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-teal-650 uppercase tracking-wider font-mono">Micrositio</span>
              <h4 className="font-bold text-slate-800 text-sm">Proyecto Los Vergeles</h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </Link>

          {/* 3. Semilleros */}
          <Link
            to="/semilleros"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-655 uppercase tracking-wider font-mono">Investigación</span>
              <h4 className="font-bold text-slate-800 text-sm">Semilleros Académicos</h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </Link>

          {/* 4. Laboratorios */}
          <Link
            to="/laboratorios"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-violet-650 uppercase tracking-wider font-mono">Infraestructura</span>
              <h4 className="font-bold text-slate-800 text-sm">Laboratorios Especializados</h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </Link>

          {/* 5. Repositorio */}
          <Link
            to="/repositorio"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-650 uppercase tracking-wider font-mono">Publicaciones</span>
              <h4 className="font-bold text-slate-800 text-sm">Repositorio Digital</h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </Link>

          {/* 6. Convocatorias */}
          <Link
            to="/noticias"
            className="glass p-6 rounded-2xl glass-hover flex justify-between items-center bg-white/60 border border-slate-200"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-650 uppercase tracking-wider font-mono">Novedades</span>
              <h4 className="font-bold text-slate-800 text-sm">Convocatorias & Noticias</h4>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          </Link>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="h-7 w-7 text-teal-600" /> Noticias & Eventos
            </h2>
            <p className="text-slate-650">Mantente al día con los logros académicos, proyectos de vinculación e hitos de investigación.</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 bg-slate-100 p-1 border border-slate-200 rounded-xl self-start">
            <button
              onClick={() => setNewsFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                newsFilter === 'all' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setNewsFilter('academic')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                newsFilter === 'academic' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Académicos
            </button>
            <button
              onClick={() => setNewsFilter('iot')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                newsFilter === 'iot' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IoT
            </button>
            <button
              onClick={() => setNewsFilter('event')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                newsFilter === 'event' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Eventos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="glass rounded-2xl overflow-hidden glass-hover flex flex-col justify-between bg-white/60">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/95 text-teal-700 border border-teal-200/50 shadow-sm">
                    {item.category === 'academic' ? 'Academia' : item.category === 'iot' ? 'IoT' : 'Evento'}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs text-slate-500 font-bold">{item.date}</span>
                  <h4 className="text-lg font-bold text-slate-800 hover:text-teal-650 transition-colors leading-snug">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href="#" className="inline-flex items-center gap-1.5 text-xs text-teal-650 font-bold uppercase hover:underline">
                  <span>Leer Artículo</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
