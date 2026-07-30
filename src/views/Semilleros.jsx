import React, { useState } from 'react';
import { Target, Users, BookOpen, Layers, Send, Check } from 'lucide-react';

export default function Semilleros() {
  const [selectedSemillero, setSelectedSemillero] = useState('mintev');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    semester: '1',
    motivation: ''
  });
  const [success, setSuccess] = useState(false);

  const semilleros = {
    mintev: {
      name: 'MINTEV (Monitoreo e Innovación Tecnológica Verde)',
      history: 'Fundado en 2024, MINTEV se enfoca en investigar e integrar soluciones tecnológicas que optimicen el uso de recursos energéticos y de agua en comunidades de escasos recursos.',
      mision: 'Desarrollar prototipos de hardware de bajo costo y software libre orientados a la sustentabilidad ecológica y ambiental.',
      vision: 'Ser el semillero referente a nivel provincial en la aplicación de IoT ambiental y energías renovables de baja escala.',
      members: ['Dr. Carlos Mendoza (Tutor)', 'Est. Marlon Guevara', 'Est. Sonia Calle', 'Est. Gabriel Velasco'],
      projects: ['Banco de Baterías Inteligente con telemetría MQTT', 'Estación de Clima LoRaWAN para Los Vergeles'],
    },
    'smart-minds': {
      name: 'SMART MINDS (Redes Inteligentes e Inteligencia Artificial)',
      history: 'Establecido en 2025, SMART MINDS estudia algoritmos de Machine Learning y enrutamiento inalámbrico inteligente para optimizar el flujo de datos y la ciberseguridad en redes de sensores.',
      mision: 'Investigar e implementar arquitecturas seguras de red y algoritmos de optimización de datos en el Edge y la Nube.',
      vision: 'Desarrollar soluciones inteligentes robustas y de nivel de producción aplicables a Smart Cities y agroindustria regional.',
      members: ['Dr. Alejandro Rivas (Tutor)', 'M.Sc. Diana Paredes (Cotutora)', 'Est. Juan Castro', 'Est. Luisa Ortiz'],
      projects: ['Modelo Predictivo de Lluvias basado en Telemetría CO2/Temp', 'Seguridad criptográfica simplificada para nodos LoRaWAN'],
    }
  };

  const current = semilleros[selectedSemillero];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.motivation) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', email: '', semester: '1', motivation: '' });
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Semilleros de Investigación</h1>
          <p className="text-slate-655 text-base">
            Participa en nuestros semilleros de investigación académica donde los estudiantes diseñan prototipos y colaboran en publicaciones científicas.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={() => setSelectedSemillero('mintev')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            selectedSemillero === 'mintev' ? 'bg-teal-650 text-white shadow-md shadow-teal-600/10' : 'bg-slate-50 border border-slate-200 text-slate-600'
          }`}
        >
          Semillero MINTEV
        </button>
        <button
          onClick={() => setSelectedSemillero('smart-minds')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            selectedSemillero === 'smart-minds' ? 'bg-teal-650 text-white shadow-md shadow-teal-600/10' : 'bg-slate-50 border border-slate-200 text-slate-600'
          }`}
        >
          Semillero SMART MINDS
        </button>
      </div>

      {/* Semillero Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-slate-250/60 shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-teal-650 uppercase tracking-wider font-mono">Semillero Activo</span>
            <h2 className="text-2xl font-bold font-display text-slate-900">{current.name}</h2>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm">Historia</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{current.history}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-teal-600" /> Misión
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{current.mision}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-cyan-600" /> Integrantes
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {current.members.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-teal-600" /> Proyectos Emblemáticos
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {current.projects.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-1 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-slate-900">Postular al Semillero</h3>
            <p className="text-slate-500 text-xs font-semibold">Envía tus datos para unirte como estudiante investigador.</p>
          </div>

          {success ? (
            <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-2xl flex flex-col items-center justify-center text-center gap-2 text-emerald-800">
              <Check className="h-8 w-8 text-emerald-600" />
              <p className="font-bold text-sm">¡Postulación Enviada!</p>
              <p className="text-xs">Revisaremos tu perfil académico y te enviaremos un correo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correo Institucional</label>
                <input
                  type="email"
                  required
                  placeholder="usuario@carrera.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Semestre Actual</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                >
                  <option value="1">1er Semestre</option>
                  <option value="2">2do Semestre</option>
                  <option value="3">3er Semestre</option>
                  <option value="4">4to Semestre</option>
                  <option value="5">5to Semestre</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">¿Por qué deseas unirte?</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Describe tus intereses..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="h-4 w-4" /> Enviar Postulación
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
