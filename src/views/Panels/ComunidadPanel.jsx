import React from 'react';
import { Calendar, Download, FileText, MapPin } from 'lucide-react';

export default function ComunidadPanel() {
  const events = [
    { title: 'Taller de Monitoreo de Consumo Eléctrico y Solar', date: 'Agosto 5, 2026', time: '15:00', place: 'Aula Tecnológica Los Vergeles' },
    { title: 'Asamblea Comunitaria de Gestión del Agua Potable', date: 'Agosto 10, 2026', time: '10:00', place: 'Casa Comunal Vergeles' },
  ];

  const resources = [
    { title: 'Cartilla Educativa: Uso Eficiente del Agua y Riego por Goteo.pdf', size: '1.4 MB' },
    { title: 'Guía Práctica: Mantenimiento Preventivo de Paneles Solares Comunitarios.pdf', size: '2.1 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-xl font-bold text-slate-900 font-display">Portal del Líder Comunitario</h2>
        <p className="text-xs text-slate-650">Consulta los próximos eventos comunitarios y descarga material didáctico del proyecto.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
        {/* Events */}
        <div className="glass p-6 rounded-xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" /> Agenda de Eventos y Talleres
          </h3>

          <div className="space-y-3">
            {events.map((ev, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-slate-800 font-display">{ev.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-450 font-mono font-bold">
                  <span>{ev.date} - {ev.time}</span>
                  <span className="flex items-center gap-1 uppercase tracking-wider"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {ev.place}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="glass p-6 rounded-xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal-600" /> Manuales y Recursos Educativos
          </h3>

          <div className="space-y-3">
            {resources.map((res, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[160px] sm:max-w-xs">{res.title}</p>
                    <p className="text-[10px] text-slate-455 font-mono font-bold">{res.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Simulando descarga de cartilla: ${res.title}`)}
                  className="p-2 rounded-lg bg-white border border-slate-205 text-slate-650 hover:text-teal-650 hover:bg-teal-50 hover:border-teal-200 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
