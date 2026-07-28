import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, CheckCircle2, Clock, MapPin, Check, Send } from 'lucide-react';

const INITIAL_REPORTS = [
  {
    id: 101,
    category: 'water',
    description: 'Baja presión detectada en la acometida norte de la escuela de Los Vergeles.',
    location: 'Sector Escuela Comunitaria',
    reporter: 'Sr. Manuel Guamán (Líder Vecinal)',
    status: 'progress',
    date: 'Julio 27, 2026',
  },
  {
    id: 102,
    category: 'energy',
    description: 'Fluctuaciones de voltaje intermitentes en el banco de inversores solares secundarios.',
    location: 'Estación de Baterías Norte',
    reporter: 'Ing. Alejandro Rivas',
    status: 'pending',
    date: 'Julio 28, 2026',
  },
  {
    id: 103,
    category: 'telecom',
    description: 'Reemplazo y calibración del nodo gateway LoRaWAN principal finalizado con éxito.',
    location: 'Torre de Transmisión del Aula Tecnológica',
    reporter: 'M.Sc. Diana Paredes',
    status: 'resolved',
    date: 'Julio 24, 2026',
  },
];

export default function PortalComunidad() {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('vergeles_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [formData, setFormData] = useState({
    category: 'water',
    description: '',
    location: '',
    reporter: '',
  });

  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('vergeles_reports', JSON.stringify(reports));
  }, [reports]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.location || !formData.reporter) {
      alert('Por favor completa todos los campos del formulario.');
      return;
    }

    const newReport = {
      id: Date.now(),
      category: formData.category,
      description: formData.description,
      location: formData.location,
      reporter: formData.reporter,
      status: 'pending',
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    setReports([newReport, ...reports]);
    setFormData({
      category: 'water',
      description: '',
      location: '',
      reporter: '',
    });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'water': return 'Hídrico / Agua';
      case 'energy': return 'Energía Solar';
      case 'telecom': return 'Redes / LoRa';
      default: return 'Medio Ambiente';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-150 shadow-sm">
            <CheckCircle2 className="h-3 w-3" /> Resuelto
          </span>
        );
      case 'progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-150 shadow-sm animate-pulse">
            <Clock className="h-3 w-3" /> En Curso
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-155 shadow-sm">
            <AlertCircle className="h-3 w-3" /> Pendiente
          </span>
        );
    }
  };

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl text-slate-900 mb-4">Portal de Reportes Comunitarios</h1>
          <p className="text-slate-600">
            Canal directo para registrar y reportar inconvenientes técnicos en la infraestructura de agua, energía o telecomunicaciones de Los Vergeles.
          </p>
        </div>
      </section>

      {/* Main Grid Content: Form + Reports feed */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left Column: Form (2 cols) */}
        <div className="lg:col-span-2 glass p-6 sm:p-8 rounded-2xl space-y-6 bg-white/60 border border-slate-250 shadow-sm">
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-teal-600" /> Nuevo Reporte de Incidencia
            </h3>
            <p className="text-xs text-slate-500">
              Registra los detalles del problema técnico y la ubicación exacta para enviar la orden de trabajo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tipo de Incidencia</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:bg-white"
              >
                <option value="water">Agua / Reservorio / Riego</option>
                <option value="energy">Energía Solar / Baterías</option>
                <option value="telecom">Telecomunicaciones / Red LoRa</option>
                <option value="environment">Medio Ambiente / Flora y Fauna</option>
              </select>
            </div>

            {/* Reporter Name */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nombre del Reportante</label>
              <input
                type="text"
                name="reporter"
                value={formData.reporter}
                onChange={handleChange}
                placeholder="Ej. Sr. Juan Pérez"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ubicación / Sector</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej. Sector Escuela Comunitaria o Celda 4"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Descripción del Inconveniente</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe a detalle el problema observado..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white resize-none"
              ></textarea>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all text-xs uppercase shadow-sm shadow-teal-500/10"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Reporte</span>
            </button>
          </form>

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-150 text-emerald-700 animate-fade-in-down">
              <Check className="h-4 w-4 shrink-0" />
              <p className="text-[11px] font-bold">Reporte registrado con éxito. Visualizado en la cartelera.</p>
            </div>
          )}
        </div>

        {/* Right Column: Reports Log Feed (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 font-display">Historial de Reportes Activos</h3>
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-bold">
              Total: {reports.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-none">
            {reports.map((report) => (
              <div key={report.id} className="glass p-5 rounded-xl space-y-3 relative hover:border-slate-300 transition-colors bg-white/60 border border-slate-250 shadow-sm">
                {/* Meta details row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100 uppercase">
                    {getCategoryLabel(report.category)}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-bold">{report.date}</span>
                    {getStatusBadge(report.status)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 leading-relaxed font-mono font-medium">{report.description}</p>

                {/* Reporter / Location row */}
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>Lugar: <strong className="text-slate-700">{report.location}</strong></span>
                  </div>
                  <div>
                    <span>Por: <strong className="text-slate-700">{report.reporter}</strong></span>
                  </div>
                  <div className="ml-auto font-mono font-bold text-slate-400">ID: #{report.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
