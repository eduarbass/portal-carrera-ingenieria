import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Check } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Safe DivIcon builder to avoid Leaflet missing icon issues
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

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const position = [-1.354839, -79.467834]; // UNESUM Coordinates placeholder

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Contacto</h1>
          <p className="text-slate-655 text-base">
            ¿Tienes dudas sobre admisiones, proyectos o convenios? Ponte en contacto con nosotros directamente.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Info & Map */}
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-950">Información de Contacto</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-750">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-teal-600" />
                <span>Av. Universitaria, Campus Los Vergeles - UNESUM, Ecuador</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-cyan-600" />
                <span>contacto@carrera.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-emerald-600" />
                <span>+593 5-2600-102 Ext. 104</span>
              </div>
            </div>
          </div>

          {/* Leaflet Map */}
          <div className="h-[250px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative z-10">
            <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={createGlowIcon('#0d9488')}>
                <Popup>
                  <div className="text-xs font-bold text-slate-800">Campus Ingeniería en IoT</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-slate-250/60 shadow-sm">
          <h3 className="text-lg font-bold font-display text-slate-950 mb-6">Enviar Mensaje</h3>
          {success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-250 rounded-2xl flex flex-col items-center justify-center text-center gap-2 text-emerald-800">
              <Check className="h-8 w-8 text-emerald-600 animate-bounce" />
              <p className="font-bold text-sm">¡Mensaje Enviado!</p>
              <p className="text-xs">Nos pondremos en contacto contigo a la brevedad posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. María López"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asunto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Admisiones o Prácticas"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mensaje</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="h-4 w-4" /> Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
