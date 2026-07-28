import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Send, Users } from 'lucide-react';

export default function DocentePanel() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Optimización de Enlaces LoRaWAN en Los Vergeles', area: 'IoT & Telecom', team: 'Alejandro R., Diana P.', status: 'Activo' },
    { id: 2, title: 'Banco de Baterías Inteligente Modbus/MQTT', area: 'Hardware & Energy', team: 'Beatriz C., Marlon G.', status: 'Activo' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    area: 'IoT & Telecom',
    team: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.team) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const newProj = {
      id: Date.now(),
      title: formData.title,
      area: formData.area,
      team: formData.team,
      status: 'Activo',
    };

    setProjects([newProj, ...projects]);
    setFormData({ title: '', area: 'IoT & Telecom', team: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-xl font-bold text-slate-900 font-display">Portal del Docente / Investigador</h2>
        <p className="text-xs text-slate-650">Administra tus proyectos de investigación y registra nuevas propuestas académicas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start text-left">
        {/* Project Form */}
        <div className="lg:col-span-2 glass p-6 rounded-xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <PlusCircle className="h-4 w-4 text-teal-650" /> Registrar Nuevo Proyecto
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Título del Proyecto</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej. Algoritmo de Ahorro Energético ESP32"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Área Tecnológica</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:bg-white"
              >
                <option value="IoT & Telecom">IoT & Telecomunicaciones</option>
                <option value="Hardware & Energy">Hardware & Energía</option>
                <option value="Cloud & Big Data">Cloud Computing & Big Data</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Equipo de Trabajo</label>
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Ej. Ing. Alejandro Rivas, Est. Luis Alvear"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-600 text-white font-bold text-xs uppercase hover:bg-teal-700 transition-all shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Registrar Proyecto</span>
            </button>
          </form>

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-150 text-emerald-700">
              <CheckCircle className="h-4 w-4" />
              <span className="text-[11px] font-bold">Proyecto registrado y listo para auditoría.</span>
            </div>
          )}
        </div>

        {/* Projects List */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Mis Proyectos de Investigación</h3>
          
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="glass p-5 rounded-xl space-y-2 border border-slate-250 border-l-4 border-l-purple-550 bg-white/60 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-purple-750 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 uppercase">
                    {proj.area}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-150 text-[10px] font-bold">
                    {proj.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 font-display">{proj.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  <span>Equipo: <strong className="text-slate-700 font-medium">{proj.team}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
