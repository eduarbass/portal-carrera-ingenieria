import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function Transparencia() {
  const documents = [
    { title: 'Plan Estratégico de Desarrollo Institucional (PEDI)', year: '2024-2028', code: 'PEDI-UNESUM-02', size: '2.4 MB' },
    { title: 'Plan Operativo Anual (POA)', year: '2026', code: 'POA-CARRERA-2026-V1', size: '1.8 MB' },
    { title: 'Informe de Rendición de Cuentas', year: '2025', code: 'IRC-CARRERA-2025', size: '3.1 MB' },
    { title: 'Estatuto Orgánico de Gestión Organizacional', year: '2024', code: 'EST-UNESUM-2024', size: '4.2 MB' },
  ];

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Transparencia</h1>
          <p className="text-slate-655 text-base">
            Acceso libre a los documentos regulatorios, planificación institucional y reportes oficiales de la carrera.
          </p>
        </div>
      </section>

      {/* Docs Grid */}
      <section className="space-y-4">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <ShieldCheck className="h-10 w-10 text-teal-600 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">Compromiso de Transparencia Activa</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Cumpliendo con la Ley Orgánica de Transparencia y Acceso a la Información Pública (LOTAIP), ponemos a disposición los documentos vigentes de control interno.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {documents.map((doc, index) => (
            <div key={index} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between h-48">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">{doc.code}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.year}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-snug">{doc.title}</h4>
              </div>
              <button
                onClick={() => alert(`Descargando documento ${doc.code}...`)}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all self-start"
              >
                <Download className="h-4 w-4 text-slate-500" />
                <span>Descargar ({doc.size})</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
