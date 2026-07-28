import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Users, BookOpen, Layers, Newspaper, ArrowRight, Activity, MapPin } from 'lucide-react';

export default function Home() {
  const [newsFilter, setNewsFilter] = useState('all');

  const stats = [
    { id: 1, name: 'Estudiantes Activos', value: '450+', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 2, name: 'Laboratorios Especializados', value: '5', icon: Layers, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 3, name: 'Proyectos Comunitarios', value: '12', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 4, name: 'Publicaciones Científicas', value: '80+', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
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
              Ingeniería en <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">IoT y Conectividad</span>
            </h1>
            <p className="text-slate-650 text-lg leading-relaxed max-w-xl">
              Domina la tecnología detrás del hardware inteligente, la adquisición de datos ambientales y las comunicaciones en tiempo real. Diseña soluciones que conecten dispositivos físicos para mejorar comunidades e industrias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/los-vergeles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold hover:opacity-95 transition-all shadow-md shadow-teal-500/10"
              >
                <span>Ver Monitoreo en Vivo</span>
                <Activity className="h-5 w-5 animate-pulse" />
              </Link>
              <Link
                to="/carrera"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-55 transition-all"
              >
                <span>Explorar la Carrera</span>
                <ArrowRight className="h-5 w-5 text-slate-400" />
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

      {/* Focus Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-display font-bold text-slate-900">Ecosistema Tecnológico</h2>
          <p className="text-slate-600">
            Nuestra malla combina electrónica práctica, comunicaciones inalámbricas, y desarrollo web/cloud. A continuación, accede a los módulos principales de la demo interactiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Los Vergeles */}
          <div className="glass p-8 rounded-2xl glass-hover flex flex-col justify-between h-96 relative overflow-hidden group bg-white/60">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-150 flex items-center justify-center text-cyan-600">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-display">Micrositio Los Vergeles</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Descubre el mapa inteligente interactivo con Leaflet y el dashboard de monitoreo ambiental en tiempo real. Monitorea sensores de producción solar y recursos hídricos.
              </p>
            </div>
            <Link to="/los-vergeles" className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm hover:underline mt-6">
              <span>Ingresar al Micrositio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: Repositorio */}
          <div className="glass p-8 rounded-2xl glass-hover flex flex-col justify-between h-96 relative overflow-hidden group bg-white/60">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-150 flex items-center justify-center text-purple-650">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-display">Repositorio Académico</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accede a nuestro motor de búsqueda de tesis, proyectos integradores, y artículos de investigación indexados desarrollados por nuestros docentes y estudiantes.
              </p>
            </div>
            <Link to="/repositorio" className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm hover:underline mt-6">
              <span>Buscar Publicaciones</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 3: Reportes Comunidad */}
          <div className="glass p-8 rounded-2xl glass-hover flex flex-col justify-between h-96 relative overflow-hidden group bg-white/60">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-display">Reporte Comunitario</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Formulario interactivo para que líderes y miembros de la comunidad reporten incidencias de agua potable, electricidad o redes de forma directa al centro de monitoreo.
              </p>
            </div>
            <Link to="/comunidad" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:underline mt-6">
              <span>Reportar Incidencia</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
