import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Shield, Zap, Activity, ArrowRight, Layers } from 'lucide-react';

export default function Investigacion() {
  const lines = [
    { title: 'Internet de las Cosas (IoT)', desc: 'Desarrollo de hardware embebido de ultra bajo consumo energético para redes de sensores.', icon: Cpu },
    { title: 'Telemática Verde', desc: 'Protocolos de comunicación de eficiencia energética e impacto ambiental reducido.', icon: Activity },
    { title: 'Inteligencia Artificial', desc: 'Modelos predictivos aplicados a datos ambientales e infraestructura de sensorizado.', icon: Shield },
    { title: 'Smart Cities & Smart Villages', desc: 'Integración tecnológica en áreas urbanas y rurales para mejorar calidad de vida y servicios.', icon: Zap },
  ];

  const projects = [
    {
      title: 'Proyecto Los Vergeles',
      desc: 'Monitoreo ambiental, hídrico y fotovoltaico en tiempo real en la comunidad agrícola Los Vergeles.',
      link: '/los-vergeles',
      tag: 'IoT Ambiental'
    },
    {
      title: 'Smart Campus',
      desc: 'Optimización de consumo energético y control de accesos en los laboratorios de la carrera.',
      link: '#',
      tag: 'Smart Buildings'
    },
    {
      title: 'Redes LoRa Regionales',
      desc: 'Estudio de propagación de enlaces LoRaWAN sub-GHz en topografías montañosas rurales.',
      link: '#',
      tag: 'Telecomunicaciones'
    }
  ];

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Investigación</h1>
          <p className="text-slate-655 text-base">
            Generamos nuevo conocimiento a través del desarrollo de prototipos tecnológicos orientados a solventar necesidades reales del entorno rural y productivo.
          </p>
        </div>
      </section>

      {/* Lines of Research */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-display text-slate-950 flex items-center gap-2">
          <Layers className="h-6 w-6 text-teal-650" /> Líneas de Investigación
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {lines.map((line, index) => (
            <div key={index} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex gap-4">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-650 border border-teal-100 shrink-0">
                <line.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">{line.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{line.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Projects */}
      <section className="space-y-6 border-t border-slate-100 pt-10">
        <h2 className="text-2xl font-bold font-display text-slate-950 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-cyan-650" /> Proyectos Activos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between h-64">
              <div className="space-y-3">
                <span className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-150 shadow-sm">
                  {project.tag}
                </span>
                <h4 className="font-bold text-slate-800 text-base leading-snug">{project.title}</h4>
                <p className="text-xs text-slate-600 leading-normal">{project.desc}</p>
              </div>
              {project.link !== '#' ? (
                <Link to={project.link} className="inline-flex items-center gap-1.5 text-xs text-teal-650 font-bold hover:underline self-start">
                  <span>Ir al Micrositio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Próximamente</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
