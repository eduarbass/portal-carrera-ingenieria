import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, CheckCircle2, Clock, MapPin, Check, Send, BookOpen, Compass, Award, ShieldAlert, Heart, Calendar, Download, Image } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { api } from '../services/api';

const createGlowIcon = (color) => {
  return new L.DivIcon({
    html: `<div class="relative flex items-center justify-center">
             <span class="absolute inline-flex h-5 w-5 rounded-full opacity-75 animate-ping" style="background-color: ${color}"></span>
             <span class="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-lg" style="background-color: ${color}"></span>
           </div>`,
    className: 'custom-marker-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

export default function PortalComunidad() {
  const [activeTab, setActiveTab] = useState('comunidad-info');
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    category: 'water',
    description: '',
    location: '',
    reporter: '',
  });
  const [successMsg, setSuccessMsg] = useState(false);

  const fetchReports = async () => {
    const data = await api.getReports();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.location || !formData.reporter) {
      alert('Por favor completa todos los campos del formulario.');
      return;
    }

    const newReport = await api.createReport({
      category: formData.category,
      description: formData.description,
      location: formData.location,
      reporter: formData.reporter,
    });

    if (newReport) {
      setReports(prev => [newReport, ...prev]);
      setFormData({
        category: 'water',
        description: '',
        location: '',
        reporter: '',
      });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'water': return 'Problema Agua';
      case 'energy': return 'Problema Energía';
      case 'environmental': return 'Problema Ambiental';
      case 'telecom': return 'Problema Tecnológico';
      default: return 'Otro';
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

  const position = [-0.1807, -78.4678]; // Community Coordinates

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl text-slate-900 mb-4">Comunidad Los Vergeles</h1>
          <p className="text-slate-600 text-sm">
            Conoce la historia de la comunidad, sus atractivos productivos y accede al canal directo para el reporte de incidencias técnicas.
          </p>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'comunidad-info', name: 'Información General', icon: BookOpen },
          { id: 'necesidades', name: 'Necesidades & Capacitaciones', icon: Heart },
          { id: 'galeria', name: 'Galería & Descargas', icon: Image },
          { id: 'reportes', name: 'Reportar Problemas', icon: ShieldAlert }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-teal-650 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-55'
            }`}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[500px]">
        {activeTab === 'comunidad-info' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Historia / Ubicacion */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl bg-white/60 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-slate-950">Nuestra Historia</h3>
                <p className="text-slate-655 text-xs leading-relaxed">
                  La comunidad de Los Vergeles se fundó a mediados del siglo XX como un pequeño asentamiento de agricultores que buscaban tierras fértiles cerca del río. Con el paso de las décadas, se consolidó como una zona de producción agrícola y ganadera clave en el cantón, caracterizada por la calidez y el espíritu colaborador de sus habitantes.
                </p>
                <h4 className="font-bold text-slate-800 text-xs mt-4">Autoridades Locales:</h4>
                <p className="text-xs text-slate-600 leading-normal">
                  Presidente del Comité Pro-Mejoras: <strong>Sr. Manuel Guamán</strong><br />
                  Secretaria del Comité: <strong>Sra. Carmen Rivera</strong>
                </p>
              </div>

              {/* Map */}
              <div className="h-[300px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative z-10">
                <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={createGlowIcon('#10b981')}>
                    <Popup>
                      <div className="text-xs font-bold text-slate-800">Comunidad Los Vergeles</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Economy, Flora, Fauna, Culture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm space-y-2">
                <h4 className="font-bold text-slate-850 text-sm">🌾 Economía</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Principalmente sustentada en la agricultura (maíz, café, cacao) y la ganadería de engorde y producción de lácteos.
                </p>
              </div>
              <div className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm space-y-2">
                <h4 className="font-bold text-slate-850 text-sm">🌺 Flora</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Presencia de árboles nativos como el guayacán y samán, junto con una rica variedad de flores silvestres tropicales.
                </p>
              </div>
              <div className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm space-y-2">
                <h4 className="font-bold text-slate-850 text-sm">🦎 Fauna</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diversidad de aves tropicales, iguanas, pequeños reptiles y mamíferos adaptados al bosque secundario local.
                </p>
              </div>
              <div className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm space-y-2">
                <h4 className="font-bold text-slate-850 text-sm">🎭 Cultura</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Celebraciones patronales en agosto, rodeos montuvios y una arraigada tradición de gastronomía criolla regional.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'necesidades' && (
          <div className="glass p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-250/60 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-slate-900">Necesidades & Capacitaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Necesidades</h4>
                <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc">
                  <li>Estabilización de presión en el tendido de agua potable.</li>
                  <li>Ampliación de cobertura de red celular y datos.</li>
                  <li>Mantenimiento de luminarias públicas comunitarias.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Actividades del Proyecto</h4>
                <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc">
                  <li>Monitoreo continuo de telemetría de baterías solares.</li>
                  <li>Reporte de incidencias directas vía formulario web.</li>
                  <li>Reemplazo de sensores de nivel en el reservorio.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Próximas Capacitaciones</h4>
                <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc font-medium">
                  <li className="text-teal-750">🔌 Taller: Uso Eficiente de Energía Solar (Agosto 15)</li>
                  <li className="text-teal-750">💻 Taller: Herramientas Digitales y Reportes Web (Septiembre 02)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'galeria' && (
          <div className="glass p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-250/60 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-slate-900">Galería & Descargas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><Image className="h-4.5 w-4.5 text-teal-650" /> Fotografías</h4>
                <div className="flex gap-2">
                  <div className="h-16 w-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-[9px] border border-slate-300">
                    Comunidad
                  </div>
                  <div className="h-16 w-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-[9px] border border-slate-300">
                    Reunión Comité
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><Download className="h-4.5 w-4.5 text-cyan-650" /> Descargas</h4>
                <div className="space-y-2">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Descargando Estatuto..."); }} className="text-xs font-bold text-teal-650 hover:underline block">
                    📄 Estatuto de Asociación de Vecinos Los Vergeles (PDF)
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Descargando Guía..."); }} className="text-xs font-bold text-teal-650 hover:underline block">
                    📄 Guía de Reporte Rápido de Incidencias (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reportes' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start animate-fadeIn">
            {/* Form */}
            <div className="lg:col-span-2 glass p-6 sm:p-8 rounded-2xl space-y-6 bg-white/60 border border-slate-250 shadow-sm">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-teal-600" /> Reportar Problema
                </h3>
                <p className="text-xs text-slate-500">
                  Registra un problema técnico de agua, luz o comunicaciones de la comunidad.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Categoría del Problema</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="water">Problema Agua</option>
                    <option value="energy">Problema Energía</option>
                    <option value="environmental">Problema Ambiental</option>
                    <option value="telecom">Problema Tecnológico</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Reportado Por</label>
                  <input
                    type="text"
                    name="reporter"
                    required
                    placeholder="Su nombre o cargo..."
                    value={formData.reporter}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ubicación de Incidencia</label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Ej. Sector Tanque de Agua..."
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Descripción del Problema</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    placeholder="Detalles sobre el desperfecto..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 resize-none bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="h-4 w-4" /> Enviar Reporte
                </button>
              </form>

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>¡Reporte registrado y enviado exitosamente!</span>
                </div>
              )}
            </div>

            {/* List */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
                📋 Historial de Incidencias
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <div key={report.id} className="p-5 rounded-xl border border-slate-200 bg-white/70 shadow-sm flex justify-between items-start gap-4 transition-all duration-200 hover:border-slate-300">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                            {getCategoryLabel(report.category)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">{report.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{report.description}</p>
                        <div className="text-[10px] text-slate-500 font-semibold space-y-0.5">
                          <p>📍 {report.location}</p>
                          <p>👤 Reportado por: {report.reporter}</p>
                        </div>
                      </div>
                      <div className="shrink-0">{getStatusBadge(report.status)}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-bold text-slate-400">
                    Cargando historial de reportes...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
