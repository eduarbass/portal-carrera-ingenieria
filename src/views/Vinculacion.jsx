import React from 'react';
import { ShieldAlert, BookOpen, Compass, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function Vinculacion() {
  const sections = [
    {
      title: 'Proyectos de Desarrollo',
      desc: 'Implementación de redes comunitarias y estaciones telemétricas fotovoltaicas en zonas desatendidas del cantón.',
      items: ['Electrificación Básica Solar', 'Sistemas de Bombeo de Agua Inteligente']
    },
    {
      title: 'Capacitaciones y Talleres',
      desc: 'Cursos de alfabetización digital, IoT básico y autogestión energética solar dirigidos a comuneros.',
      items: ['Curso: Uso Básico de Redes e Internet', 'Taller: Mantenimiento Preventivo de Paneles Solares']
    },
    {
      title: 'Prácticas Preprofesionales',
      desc: 'Espacio de aprendizaje práctico para estudiantes vinculados a problemáticas reales de campo.',
      items: ['Prácticas de Sensorizado en Los Vergeles', 'Asistencia Técnica en el Aula Tecnológica']
    }
  ];

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Vinculación con la Sociedad</h1>
          <p className="text-slate-655 text-base">
            Conectamos el conocimiento técnico con las necesidades de desarrollo social y tecnológico de las comunidades locales.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((sec, index) => (
          <div key={index} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between h-96">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-lg leading-snug">{sec.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
              <div className="space-y-2 pt-2">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Actividades Clave:</span>
                {sec.items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-teal-650 font-bold uppercase tracking-wider mt-4">Activo</span>
          </div>
        ))}
      </section>
    </div>
  );
}
