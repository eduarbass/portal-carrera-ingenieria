import React, { useState, useEffect } from 'react';
import { AlertCircle, Trash2, Shield, Users, FileText, CheckCircle2, XCircle, Plus, Search, Mail, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('reportes');
  const [reports, setReports] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [uploads, setUploads] = useState([]);

  // Form states for new Docente
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    title: '',
    department: 'telecom',
    email: '',
    bio: '',
    scholar: 'https://scholar.google.com/',
    orcid: 'https://orcid.org/',
    scopus: 'https://www.scopus.com/'
  });

  const fetchData = async () => {
    const reportData = await api.getReports();
    setReports(reportData || []);
    
    const teacherData = await api.getTeachers();
    setTeachers(teacherData || []);

    const uploadData = await api.getUploads();
    setUploads(uploadData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reports handlers
  const handleUpdateReportStatus = async (id, newStatus) => {
    const success = await api.updateReportStatus(id, newStatus);
    if (success) {
      fetchData();
    }
  };

  const handleDeleteReport = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este reporte del sistema?')) {
      const success = await api.deleteReport(id);
      if (success) {
        fetchData();
      }
    }
  };

  // Teachers handlers
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.title || !newTeacher.email) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }
    const added = await api.createTeacher(newTeacher);
    if (added) {
      setNewTeacher({
        name: '',
        title: '',
        department: 'telecom',
        email: '',
        bio: '',
        scholar: 'https://scholar.google.com/',
        orcid: 'https://orcid.org/',
        scopus: 'https://www.scopus.com/'
      });
      setShowAddTeacherModal(false);
      fetchData();
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar a este docente? Esto se reflejará en la vista pública.')) {
      const success = await api.deleteTeacher(id);
      if (success) {
        fetchData();
      }
    }
  };

  // Uploads handlers (Estudiantes)
  const handleUpdateUploadStatus = async (name, status) => {
    const success = await api.updateUploadStatus(name, status);
    if (success) {
      fetchData();
    }
  };

  const handleDeleteUpload = async (name) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este documento del estudiante?')) {
      const success = await api.deleteUpload(name);
      if (success) {
        fetchData();
      }
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'water': return 'text-blue-750 bg-blue-50 border-blue-150';
      case 'energy': return 'text-amber-700 bg-amber-50 border-amber-150';
      case 'telecom': return 'text-cyan-750 bg-cyan-50 border-cyan-155';
      default: return 'text-emerald-700 bg-emerald-50 border-emerald-150';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'water': return 'Problema Agua';
      case 'energy': return 'Problema Energía';
      case 'telecom': return 'Problema Tecnológico';
      default: return 'Problema Ambiental';
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-650" /> Panel de Administración General
          </h2>
          <p className="text-xs text-slate-650">Supervisión de incidencias comunitarias, nómina docente y aprobación de entregables de estudiantes.</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 gap-1.5 pb-2">
        <button
          onClick={() => setActiveTab('reportes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'reportes' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-150' : 'text-slate-600 hover:bg-slate-55'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>Incidencias ({reports.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('docentes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'docentes' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-150' : 'text-slate-600 hover:bg-slate-55'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Docentes ({teachers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('uploads')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'uploads' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-150' : 'text-slate-600 hover:bg-slate-55'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Aprobación de Documentos ({uploads.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[400px]">
        {/* TAB 1: REPORTS */}
        {activeTab === 'reportes' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Gestión de Incidencias Reportadas</h3>
            {reports.length > 0 ? (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="glass p-5 rounded-xl space-y-4 border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 shadow-sm">
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${getCategoryColor(report.category)}`}>
                          {getCategoryLabel(report.category)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold font-mono">ID: #{report.id}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{report.date}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold">{report.description}</p>
                      <p className="text-[10px] text-slate-505">
                        Reportado por: <span className="text-slate-800 font-bold">{report.reporter}</span> | Ubicación: <span className="text-slate-800 font-bold">{report.location}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center self-stretch md:self-auto justify-between border-t border-slate-100 pt-3 md:pt-0 md:border-none">
                      <div className="mr-2">
                        {report.status === 'resolved' && <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded">Resuelto</span>}
                        {report.status === 'progress' && <span className="text-[9px] text-amber-700 font-bold bg-amber-50 border border-amber-150 px-2 py-0.5 rounded">En Proceso</span>}
                        {report.status === 'pending' && <span className="text-[9px] text-red-700 font-bold bg-red-50 border border-red-155 px-2 py-0.5 rounded">Pendiente</span>}
                      </div>

                      <div className="flex gap-1.5">
                        {report.status !== 'progress' && report.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateReportStatus(report.id, 'progress')}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase hover:bg-amber-100 transition-all shadow-sm"
                          >
                            Atender
                          </button>
                        )}
                        {report.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateReportStatus(report.id, 'resolved')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase hover:bg-emerald-100 transition-all shadow-sm"
                          >
                            Resolver
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-650 hover:bg-red-100 transition-all shadow-sm"
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
        )}

        {/* TAB 2: TEACHERS */}
        {activeTab === 'docentes' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Registro y Nómina de Docentes</h3>
              <button
                onClick={() => setShowAddTeacherModal(true)}
                className="px-3 py-1.5 rounded-lg bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" /> Registrar Docente
              </button>
            </div>

            {/* List Teachers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map((t) => (
                <div key={t.id} className="glass p-5 rounded-xl border border-slate-200 bg-white/60 flex gap-4 relative">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1.5 flex-grow pr-8">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                      <p className="text-[10px] text-teal-650 font-bold">{t.title}</p>
                    </div>
                    <p className="text-xs text-slate-550 line-clamp-2 leading-relaxed">{t.bio}</p>
                    <p className="text-[10px] text-slate-450 font-semibold">📧 {t.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTeacher(t.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-650 hover:bg-red-100 transition-all shrink-0"
                    title="Eliminar Docente"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal for adding teacher */}
            {showAddTeacherModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-scaleUp">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-bold text-slate-900 text-sm">Registrar Nuevo Docente</h4>
                    <button onClick={() => setShowAddTeacherModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
                  </div>

                  <form onSubmit={handleAddTeacher} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Dr. Alejandro Rivas"
                          value={newTeacher.name}
                          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Título Académico *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Ph.D. en Telecomunicaciones"
                          value={newTeacher.title}
                          onChange={(e) => setNewTeacher({ ...newTeacher, title: e.target.value })}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Departamento *</label>
                        <select
                          value={newTeacher.department}
                          onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                        >
                          <option value="telecom">Telecomunicaciones</option>
                          <option value="hardware">Embebidos & Hardware</option>
                          <option value="software">Cloud & Datos</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Correo Institucional *</label>
                        <input
                          type="email"
                          required
                          placeholder="ejemplo@universidad.edu.ec"
                          value={newTeacher.email}
                          onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase">Biografía Breve</label>
                      <textarea
                        rows="2"
                        placeholder="Resumen del perfil y áreas de investigación..."
                        value={newTeacher.bio}
                        onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddTeacherModal(false)}
                        className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs"
                      >
                        Registrar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STUDENT UPLOADS */}
        {activeTab === 'uploads' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Aprobación de Entregables (Estudiantes)</h3>

            {uploads.length > 0 ? (
              <div className="space-y-4">
                {uploads.map((up, i) => (
                  <div key={i} className="glass p-5 rounded-xl border border-slate-200 hover:border-slate-350 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 shadow-sm">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-800 text-xs font-mono truncate max-w-[300px] sm:max-w-md">{up.name}</h4>
                      <p className="text-[10px] text-slate-550">
                        Fecha: <strong>{up.date}</strong> | Rol: <strong>{up.role === 'student' ? 'Estudiante' : 'Docente'}</strong>
                      </p>
                    </div>

                    <div className="flex gap-2 items-center self-stretch sm:self-auto justify-between border-t border-slate-100 pt-2 sm:pt-0 sm:border-none">
                      <div className="mr-2">
                        {up.status === 'approved' && <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded">Aprobado</span>}
                        {up.status === 'rejected' && <span className="text-[9px] text-red-700 font-bold bg-red-50 border border-red-155 px-2 py-0.5 rounded">Rechazado</span>}
                        {up.status === 'pending' && <span className="text-[9px] text-amber-700 font-bold bg-amber-50 border border-amber-150 px-2 py-0.5 rounded">Pendiente</span>}
                      </div>

                      <div className="flex gap-1">
                        {up.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateUploadStatus(up.name, 'approved')}
                            className="p-1 rounded bg-emerald-50 border border-emerald-250 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Aprobar Documento"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        {up.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateUploadStatus(up.name, 'rejected')}
                            className="p-1 rounded bg-red-55 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
                            title="Rechazar Documento"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUpload(up.name)}
                          className="p-1 rounded bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 transition-colors"
                          title="Eliminar Registro"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-xl bg-white/60 border border-slate-200">
                <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No hay documentos cargados en el sistema.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
