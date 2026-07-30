import React, { useState, useEffect } from 'react';
import { AlertCircle, Trash2, Shield } from 'lucide-react';
import { api } from '../../services/api';

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

export default function AdminPanel() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const data = await api.getReports();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const success = await api.updateReportStatus(id, newStatus);
    if (success) {
      fetchReports();
    }
  };

  const handleDeleteReport = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este reporte del sistema?')) {
      const success = await api.deleteReport(id);
      if (success) {
        fetchReports();
      }
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'water': return 'text-blue-700 bg-blue-50 border-blue-150';
      case 'energy': return 'text-amber-700 bg-amber-50 border-amber-150';
      case 'telecom': return 'text-cyan-750 bg-cyan-50 border-cyan-155';
      default: return 'text-emerald-700 bg-emerald-50 border-emerald-150';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'water': return 'Hídrico / Agua';
      case 'energy': return 'Energía Solar';
      case 'telecom': return 'Redes / LoRa';
      default: return 'Medio Ambiente';
    }
  };

  const stats = [
    { name: 'Incidencias Totales', val: reports.length, color: 'text-teal-600' },
    { name: 'Pendientes', val: reports.filter(r => r.status === 'pending').length, color: 'text-red-600' },
    { name: 'En Proceso', val: reports.filter(r => r.status === 'progress').length, color: 'text-amber-600' },
    { name: 'Resueltas', val: reports.filter(r => r.status === 'resolved').length, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-650" /> Panel del Administrador
          </h2>
          <p className="text-xs text-slate-650">Métricas de supervisión global e incidencias técnicas reportadas por la comunidad.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="glass p-5 rounded-xl text-center bg-white/60 border border-slate-200 shadow-sm">
            <span className={`text-2xl font-bold font-display ${st.color}`}>{st.val}</span>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">{st.name}</p>
          </div>
        ))}
      </div>

      {/* Reports management grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Gestión de Reportes Comunitarios</h3>

        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="glass p-5 rounded-xl space-y-4 border border-slate-250 hover:border-slate-350 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 shadow-sm">
                {/* Details */}
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${getCategoryColor(report.category)}`}>
                      {getCategoryLabel(report.category)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">ID: #{report.id}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{report.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono font-medium">{report.description}</p>
                  <p className="text-[10px] text-slate-500">
                    Reportado por: <span className="text-slate-800 font-bold">{report.reporter}</span> | Lugar: <span className="text-slate-800 font-bold">{report.location}</span>
                  </p>
                </div>

                {/* Quick actions status */}
                <div className="flex flex-wrap gap-2 items-center self-stretch md:self-auto justify-between border-t border-slate-100 pt-3 md:pt-0 md:border-none">
                  {/* Current status display */}
                  <div className="mr-2">
                    {report.status === 'resolved' && (
                      <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded">Resuelto</span>
                    )}
                    {report.status === 'progress' && (
                      <span className="text-[9px] text-amber-700 font-bold bg-amber-50 border border-amber-150 px-2 py-0.5 rounded">En Proceso</span>
                    )}
                    {report.status === 'pending' && (
                      <span className="text-[9px] text-red-700 font-bold bg-red-50 border border-red-155 px-2 py-0.5 rounded">Pendiente</span>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-1.5">
                    {report.status !== 'progress' && report.status !== 'resolved' && (
                      <button
                        onClick={() => handleUpdateStatus(report.id, 'progress')}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase hover:bg-amber-100 transition-all shadow-sm"
                        title="Atender reporte"
                      >
                        Atender
                      </button>
                    )}
                    {report.status !== 'resolved' && (
                      <button
                        onClick={() => handleUpdateStatus(report.id, 'resolved')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase hover:bg-emerald-100 transition-all shadow-sm"
                        title="Marcar como solucionado"
                      >
                        Resolver
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-650 hover:bg-red-100 transition-all shadow-sm"
                      title="Eliminar reporte"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass rounded-xl bg-white/60 border border-slate-200">
            <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No hay incidencias activas en el sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
}
