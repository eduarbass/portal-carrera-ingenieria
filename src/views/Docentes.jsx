import React, { useState, useEffect } from 'react';
import { Search, Mail, ExternalLink, GraduationCap } from 'lucide-react';
import { api } from '../services/api';

export default function Docentes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await api.getTeachers();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'all' || t.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="font-display font-extrabold text-4xl text-slate-900 mb-4">Cuerpo Docente e Investigadores</h1>
          <p className="text-slate-600">
            Conoce a los profesionales y académicos encargados de guiar los proyectos de investigación, vincular con la comunidad y dictar las cátedras de especialidad.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar docente por nombre, título o bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-xs"
            />
          </div>

          {/* Department Filter Selector */}
          <div className="flex gap-1.5 self-stretch lg:self-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setDeptFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                deptFilter === 'all' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setDeptFilter('telecom')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                deptFilter === 'telecom' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Telecomunicaciones
            </button>
            <button
              onClick={() => setDeptFilter('hardware')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                deptFilter === 'hardware' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Embebidos & Hardware
            </button>
            <button
              onClick={() => setDeptFilter('software')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                deptFilter === 'software' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Cloud & Datos
            </button>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTeachers.map((t) => (
              <div key={t.id} className="glass p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center glass-hover bg-white/60">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-slate-50">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-3 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 font-display flex items-center gap-2">
                      {t.name}
                    </h3>
                    <p className="text-xs text-teal-600 font-bold mt-0.5">{t.title}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.bio}</p>

                  <div className="flex flex-wrap gap-2 pt-2 items-center">
                    <a href={`mailto:${t.email}`} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-teal-650 hover:bg-teal-50 transition-all" title={t.email}>
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    {/* Academic Profiles */}
                    <a href={t.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase hover:bg-cyan-100 transition-all border border-cyan-200/50">
                      <span>Scholar</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                    <a href={t.orcid} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase hover:bg-emerald-100 transition-all border border-emerald-200/50">
                      <span>ORCID</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                    <a href={t.scopus} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-[10px] font-bold uppercase hover:bg-violet-100 transition-all border border-violet-200/50">
                      <span>Scopus</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-2xl bg-white/60">
            <GraduationCap className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron docentes</h3>
            <p className="text-slate-500 text-sm mt-1">Prueba a buscar con otras palabras clave o cambiar de departamento.</p>
          </div>
        )}
      </section>
    </div>
  );
}
