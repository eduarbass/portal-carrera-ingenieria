import React from 'react';
import { Award, Calendar, GraduationCap, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function OfertaAcademica() {
  const details = [
    { title: 'Título Otorgado', desc: 'Ingeniero/a en Internet de las Cosas y Conectividad', icon: Award },
    { title: 'Duración', desc: '5 Semestres (2.5 Años de Estudios)', icon: Calendar },
    { title: 'Modalidad', desc: 'Presencial / Híbrida (Con Prácticas de Campo)', icon: GraduationCap },
  ];

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Oferta Académica</h1>
          <p className="text-slate-655 text-base">
            Conoce el perfil, la modalidad de estudios y el plan curricular diseñado para formarte como un líder tecnológico.
          </p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {details.map((d, index) => (
          <div key={index} className="glass p-6 rounded-2xl flex items-start gap-4 bg-white/60 border border-slate-200 shadow-sm">
            <div className="p-3 rounded-xl bg-teal-50 text-teal-650 shrink-0 border border-teal-100">
              <d.icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">{d.title}</h4>
              <p className="text-sm font-bold text-slate-800 mt-1">{d.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Requirements & Info */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Admission */}
        <div className="glass p-8 rounded-3xl bg-white/60 border border-slate-250/60 shadow-sm space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-950 flex items-center gap-2">
            <Layers className="h-5 w-5 text-teal-650" /> Requisitos de Ingreso
          </h3>
          <ul className="space-y-4 text-xs font-semibold text-slate-650 list-none pl-0">
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span>Título de Bachiller refrendado por el Ministerio de Educación.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span>Haber aprobado el examen de asignación de cupos de la Universidad.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span>Cédula de Identidad o Pasaporte vigente (para extranjeros).</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span>Foto digital tamaño carné, fondo blanco.</span>
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="glass p-8 rounded-3xl bg-white/60 border border-slate-250/60 shadow-sm space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-950 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-650" /> Beneficios de la Carrera
          </h3>
          <ul className="space-y-4 text-xs font-semibold text-slate-650 list-none pl-0">
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span><strong>Laboratorios Especializados:</strong> Acceso a laboratorios de IoT, Redes, Robótica y Electrónica equipados con tecnología de punta.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span><strong>Docentes Ph.D y M.Sc:</strong> Fichas de instructores con trayectoria investigadora internacional e indexada.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
              <span><strong>Proyectos de Campo Reales:</strong> Prácticas directas en comunidades rurales mediante el monitoreo IoT en "Los Vergeles".</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
