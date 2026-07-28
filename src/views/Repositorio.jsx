import React, { useState } from 'react';
import { Search, BookOpen, Download, FileText, Calendar, User, Tag } from 'lucide-react';

export default function Repositorio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const documents = [
    {
      id: 1,
      type: 'thesis',
      title: 'Sistema Autónomo de Riego Basado en IoT y Sensores de Humedad de Suelos para la Comunidad Los Vergeles',
      author: 'Ing. Gabriel Velasco',
      advisor: 'M.Sc. Beatriz Castro',
      date: 'Junio 2026',
      tags: ['IoT', 'AgroSmart', 'ESP32'],
      abstract: 'Esta investigación propone un diseño e implementación de un nodo sensor y actuador alimentado por energía fotovoltaica para optimizar la dosificación del recurso hídrico en sembríos locales.',
      fileSize: '4.8 MB',
    },
    {
      id: 2,
      type: 'paper',
      title: 'Performance Analysis of LoRaWAN Propagation in Mountainous Rural Topographies',
      author: 'Dr. Alejandro Rivas, M.Sc. Diana Paredes',
      advisor: 'N/A (Publicación Indexada)',
      date: 'Marzo 2026',
      tags: ['LoRaWAN', 'RF', 'Rural Link'],
      abstract: 'Evaluación empírica y computacional de la pérdida de trayectoria en enlaces inalámbricos sub-GHz en topografías con vegetación densa e irregularidades orográficas.',
      fileSize: '1.2 MB',
    },
    {
      id: 3,
      type: 'project',
      title: 'Diseño e Integración de un Banco de Baterías Inteligente con Telemetría Modbus/MQTT',
      author: 'Est. Marlon Guevara, Est. Sonia Calle',
      advisor: 'Dr. Carlos Mendoza',
      date: 'Febrero 2026',
      tags: ['Modbus', 'Baterías', 'MQTT'],
      abstract: 'Prototipo de cargador inteligente que mide voltaje, corriente, temperatura y resistencia interna de celdas de litio, reportando métricas vía bróker MQTT en tiempo real.',
      fileSize: '3.5 MB',
    },
    {
      id: 4,
      type: 'guide',
      title: 'Guía de Buenas Prácticas de Ciberseguridad en el Despliegue de Puertas de Enlace (Gateways) LoRaWAN',
      author: 'Carrera de Ingeniería en IoT',
      advisor: 'Comité Técnico Académico',
      date: 'Enero 2026',
      tags: ['Seguridad', 'Gateway', 'Cifrado'],
      abstract: 'Manual didáctico con directrices para la configuración de llaves de red, firewalls, puertos seguros y actualizaciones de firmware en gateways expuestos al exterior.',
      fileSize: '1.5 MB',
    },
  ];

  const getDocTypeLabel = (type) => {
    switch (type) {
      case 'thesis': return 'Tesis de Grado';
      case 'paper': return 'Artículo Científico';
      case 'project': return 'Proyecto Integrador';
      default: return 'Guía Académica';
    }
  };

  const getDocTypeColor = (type) => {
    switch (type) {
      case 'thesis': return 'bg-cyan-50 text-cyan-750 border-cyan-200/50';
      case 'paper': return 'bg-violet-50 text-violet-750 border-violet-200/50';
      case 'project': return 'bg-emerald-50 text-emerald-755 border-emerald-200/50';
      default: return 'bg-amber-50 text-amber-750 border-amber-200/50';
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || doc.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="font-display font-extrabold text-4xl text-slate-900 mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-9 w-9 text-purple-600" /> Repositorio Académico
          </h1>
          <p className="text-slate-600">
            Explora las investigaciones de tesis, artículos científicos indexados, informes técnicos y proyectos integradores desarrollados por la comunidad académica de nuestra carrera.
          </p>
        </div>
      </section>

      {/* Search Bar & Category filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, autor, abstract o etiqueta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-xs"
            />
          </div>

          {/* Document Types Filter pills */}
          <div className="flex gap-1.5 self-stretch lg:self-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                categoryFilter === 'all' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setCategoryFilter('thesis')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                categoryFilter === 'thesis' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Tesis
            </button>
            <button
              onClick={() => setCategoryFilter('paper')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                categoryFilter === 'paper' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Artículos
            </button>
            <button
              onClick={() => setCategoryFilter('project')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                categoryFilter === 'project' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Proyectos
            </button>
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div key={doc.id} className="glass p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start glass-hover border border-slate-200 border-l-4 border-l-teal-500 bg-white/60 shadow-sm">
              <div className="space-y-4 flex-grow">
                {/* Meta details row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${getDocTypeColor(doc.type)}`}>
                    {getDocTypeLabel(doc.type)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{doc.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-450 font-bold uppercase tracking-wider">
                    <User className="h-3.5 w-3.5" />
                    <span>Tutor: {doc.advisor}</span>
                  </div>
                </div>

                {/* Title and Abstract */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-display leading-tight">{doc.title}</h3>
                  <p className="text-xs text-slate-600 font-bold flex items-center gap-1">
                    <span>Autor(es):</span> <span className="text-teal-650">{doc.author}</span>
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{doc.abstract}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-150 text-[10px] text-slate-500 font-mono font-bold">
                      <Tag className="h-2.5 w-2.5 text-slate-400" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download actions */}
              <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 flex md:flex-col gap-3 justify-between md:justify-center items-center">
                <span className="text-xs text-slate-450 font-mono font-bold">{doc.fileSize}</span>
                <button
                  onClick={() => alert(`Simulando descarga de documento de repositorio: ${doc.title}`)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-650 hover:bg-teal-50 hover:border-teal-200 transition-all font-bold text-xs uppercase shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 glass rounded-2xl bg-white/60 border border-slate-200">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron documentos</h3>
            <p className="text-slate-500 text-sm mt-1">Intenta refinar tus términos de búsqueda o cambiar los filtros de categoría.</p>
          </div>
        )}
      </section>
    </div>
  );
}
