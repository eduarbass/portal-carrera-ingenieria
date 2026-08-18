import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Sun, Droplets, Thermometer, AlertTriangle, RefreshCw, Layers, Users, Calendar, Download, Image, Play } from 'lucide-react';
import { api } from '../services/api';

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

export default function LosVergeles() {
  const [activeTab, setActiveTab] = useState('monitoreo');
  const [anomalyMode, setAnomalyMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Telemetry real-time states
  const [telemetry, setTelemetry] = useState({
    temp: 24.2,
    humidity: 62.4,
    reservoir: 78.5,
    solarVoltage: 18.4,
    solarCurrent: 3.2,
    power: 58.8,
    co2: 412
  });

  // History log for chart
  const [history, setHistory] = useState([
    { time: '10:00', water: 72, solar: 45, temp: 22 },
    { time: '10:05', water: 73, solar: 48, temp: 22.5 },
    { time: '10:10', water: 74, solar: 50, temp: 23 },
    { time: '10:15', water: 75, solar: 52, temp: 23.4 },
    { time: '10:20', water: 77, solar: 55, temp: 23.8 },
    { time: '10:25', water: 78, solar: 58.8, temp: 24.2 }
  ]);

  // Fetch telemetry from API or fallback
  const fetchTelemetry = async () => {
    const data = await api.getTelemetry();
    if (data && data.telemetry) {
      setTelemetry(data.telemetry);
      setAnomalyMode(data.telemetry.anomalyMode);
      if (data.history) {
        setHistory(data.history);
      }
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnomalyToggle = async () => {
    const nextMode = !anomalyMode;
    setAnomalyMode(nextMode);
    await api.setAnomaly(nextMode);
    fetchTelemetry();
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchTelemetry();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const centerPosition = [-0.1807, -78.4678]; // Center of the community layout

  // Map nodes representing the exact 10 points requested in the prompt
  const mapNodes = [
    { id: 1, name: 'Escuela Comunitaria', coords: [-0.1802, -78.4682], color: '#3b82f6', desc: 'Centro de educación básica y nodo receptor de alertas.' },
    { id: 2, name: 'Cancha de Uso Múltiple', coords: [-0.1805, -78.4688], color: '#64748b', desc: 'Punto de reunión comunitaria y zona segura de evacuación.' },
    { id: 3, name: 'Tanque Reservorio Principal', coords: [-0.1808, -78.4674], color: '#2563eb', desc: `Monitoreo hídrico continuo. Nivel: ${telemetry.reservoir}%` },
    { id: 4, name: 'Bosque Protector Los Vergeles', coords: [-0.1795, -78.4690], color: '#15803d', desc: 'Estudio de conservación y microclima forestal.' },
    { id: 5, name: 'Cultivos Experimentales', coords: [-0.1812, -78.4670], color: '#10b981', desc: `Monitoreo de humedad de suelo: ${telemetry.humidity}%` },
    { id: 6, name: 'Gateway principal LoRaWAN', coords: [-0.1807, -78.4678], color: '#9333ea', desc: 'Recibe datos de sensores en un radio de 5km y los sube a la API.' },
    { id: 7, name: 'Nodo Sensor Ambiental Central', coords: [-0.1815, -78.4682], color: '#0d9488', desc: `CO2: ${telemetry.co2} ppm | Temp: ${telemetry.temp}°C` },
    { id: 8, name: 'Estación de Paneles Solares', coords: [-0.1810, -78.4674], color: '#ea580c', desc: `Producción de energía actual: ${telemetry.power} W` },
    { id: 9, name: 'Bomba de Agua Inteligente', coords: [-0.1809, -78.4676], color: '#0284c7', desc: 'Control de llenado autónomo mediante relés LoRa.' },
    { id: 10, name: 'Viviendas Demostrativas', coords: [-0.1818, -78.4686], color: '#db2777', desc: 'Medición de consumo y demanda energética residencial.' }
  ];

  return (
    <div className="space-y-8 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title section */}
      <section className="pt-10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-650 uppercase tracking-wider">Micrositio del Proyecto de Investigación</span>
            <h1 className="font-display font-extrabold text-3xl text-slate-900">Proyecto "Los Vergeles"</h1>
            <p className="text-slate-600 text-sm">Monitoreo IoT en tiempo real, diagnósticos, resultados y actividades del proyecto insignia.</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAnomalyToggle}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                anomalyMode 
                  ? 'bg-red-50 border-red-200 text-red-650 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>{anomalyMode ? 'Simulando Alerta' : 'Simular Alerta'}</span>
            </button>
            <button
              onClick={handleManualRefresh}
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-650 hover:text-teal-650 hover:bg-teal-50 transition-all shadow-sm"
              title="Actualizar Datos"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'monitoreo', name: 'Monitoreo IoT & Mapa', icon: Activity },
          { id: 'presentacion', name: 'Presentación & Objetivos', icon: Layers },
          { id: 'equipo', name: 'Equipo Investigador', icon: Users },
          { id: 'cronograma', name: 'Cronograma & Actividades', icon: Calendar },
          { id: 'diagnosticos', name: 'Diagnósticos', icon: AlertTriangle },
          { id: 'resultados', name: 'Resultados & Descargas', icon: Download }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-teal-650 text-white shadow-md shadow-teal-600/10'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-55'
            }`}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[500px]">
        {activeTab === 'monitoreo' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Live variables Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Solar Power */}
              <div className="glass p-5 rounded-2xl bg-white/60 border border-slate-250 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Producción Solar</p>
                  <h3 className="text-2xl font-bold text-slate-900">{telemetry.power} W</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">V: {telemetry.solarVoltage} V | I: {telemetry.solarCurrent} A</p>
                </div>
              </div>

              {/* Card 2: Water Reservoir */}
              <div className="glass p-5 rounded-2xl bg-white/60 border border-slate-250 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nivel Reservorio</p>
                  <h3 className="text-2xl font-bold text-slate-900">{telemetry.reservoir}%</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{telemetry.reservoir < 20 ? 'Alerta Nivel Bajo' : 'Nivel Estable'}</p>
                </div>
              </div>

              {/* Card 3: Weather Temp */}
              <div className="glass p-5 rounded-2xl bg-white/60 border border-slate-250 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Thermometer className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Temperatura / Hum</p>
                  <h3 className="text-2xl font-bold text-slate-900">{telemetry.temp}°C</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Humedad Suelo: {telemetry.humidity}%</p>
                </div>
              </div>

              {/* Card 4: CO2 sensor */}
              <div className="glass p-5 rounded-2xl bg-white/60 border border-slate-250 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sensor CO2</p>
                  <h3 className="text-2xl font-bold text-slate-900">{telemetry.co2} ppm</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Calidad del Aire: Normal</p>
                </div>
              </div>
            </div>

            {/* Map and Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Leaflet Map with all 10 nodes */}
              <div className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-10">
                <MapContainer center={centerPosition} zoom={17} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapNodes.map((node) => (
                    <Marker key={node.id} position={node.coords} icon={createGlowIcon(node.color)}>
                      <Popup>
                        <div className="space-y-1.5 p-1 text-left">
                          <h4 className="font-bold text-slate-900 text-xs leading-snug">{node.name}</h4>
                          <p className="text-[11px] text-slate-650 leading-relaxed font-mono">{node.desc}</p>
                          <span className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-150 shadow-sm">
                            Activo
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Chart */}
              <div className="lg:col-span-1 glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Tendencias de Telemetría</h4>
                  <p className="text-[10px] text-slate-500">Muestra la relación entre la carga solar y el consumo de agua potable.</p>
                </div>
                <div className="h-64 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: 9, fontFamily: 'monospace' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: 9, fontFamily: 'monospace' }} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Area type="monotone" dataKey="water" name="Agua (%)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} />
                      <Area type="monotone" dataKey="solar" name="Solar (W)" stroke="#ea580c" fill="#ea580c" fillOpacity={0.05} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'presentacion' && (
          <div className="glass p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-250/60 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-slate-900">Presentación del Proyecto</h2>
            <p className="text-slate-655 text-sm leading-relaxed">
              El proyecto "Los Vergeles" es una iniciativa de desarrollo e investigación tecnológica ejecutada por la Carrera de Ingeniería y Telemática. Consiste en la implementación de una microrred de sensores inteligentes alimentada por energía solar y conectada mediante enlaces de telecomunicaciones LoRaWAN de larga distancia.
            </p>
            <h3 className="text-lg font-bold font-display text-slate-900 border-t border-slate-100 pt-4">Objetivos del Proyecto</h3>
            <ul className="space-y-4 text-xs font-semibold text-slate-655 pl-0 list-none">
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-650 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Desplegar una red de monitoreo de telemetría hídrica y ambiental en la comunidad para la autogestión de recursos esenciales.</span>
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-650 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Proveer datos de diagnóstico en tiempo real al laboratorio de la carrera y a los líderes comunitarios a través del portal.</span>
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-650 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Capacitar a los miembros de la comunidad en el uso básico del panel web y la detección preventiva de averías eléctricas o de red.</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'equipo' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {[
              { role: 'Director de Proyecto', name: 'Dr. Carlos Mendoza', desc: 'Líder general e investigador principal de microrredes de sensores.' },
              { role: 'Investigador Principal', name: 'M.Sc. Beatriz Castro', desc: 'Especialista en redes inalámbricas y optimización de protocolos de enrutamiento.' },
              { role: 'Investigador IoT', name: 'Dr. Alejandro Rivas', desc: 'Diseño de hardware de ultra bajo consumo y nodos sensores autónomos.' },
              { role: 'Estudiante Investigador', name: 'Est. Marlon Guevara', desc: 'Desarrollador de firmware y calibración de transductores.' },
              { role: 'Estudiante Investigador', name: 'Est. Sonia Calle', desc: 'Administración de base de datos e interfaz gráfica en tiempo real.' }
            ].map((member, i) => (
              <div key={i} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-teal-650 uppercase tracking-wider font-mono">{member.role}</span>
                  <h4 className="font-bold text-slate-800 text-sm">{member.name}</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-2">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="glass p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-250/60 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-slate-900">Cronograma & Actividades</h2>
            <div className="relative border-l border-slate-200 pl-6 space-y-6">
              {[
                { phase: 'Fase I: Diagnósticos Previos', date: 'Marzo - Mayo 2025', desc: 'Estudios hidrológicos, topografía, y levantamiento de requerimientos socioeconómicos en la comunidad.' },
                { phase: 'Fase II: Despliegue de Gateway & Nodos', date: 'Junio - Septiembre 2025', desc: 'Instalación física de mástiles, antenas LoRa y nodos de medición solar en el reservorio de agua.' },
                { phase: 'Fase III: Integración Web y API', date: 'Octubre - Diciembre 2025', desc: 'Desarrollo del backend PHP/MySQL con fallback automático y despliegue del mapa Leaflet interactivo.' },
                { phase: 'Fase IV: Operación en Vivo & Capacitación', date: 'Enero 2026 - Continuo', desc: 'Transmisión ininterrumpida de telemetría y talleres presenciales con líderes de la comunidad.' }
              ].map((act, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-teal-500 bg-white"></div>
                  <span className="text-[10px] font-bold text-teal-650 uppercase tracking-wider font-mono">{act.date}</span>
                  <h4 className="font-bold text-slate-800 text-sm mt-0.5">{act.phase}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'diagnosticos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {[
              { type: 'Diagnóstico Energético', desc: 'Evaluación del consumo residencial de energía y capacidad de producción solar de los paneles comunitarios.' },
              { type: 'Diagnóstico Tecnológico', desc: 'Análisis de la cobertura celular y determinación de la viabilidad de enlaces sub-GHz para redes de sensores.' },
              { type: 'Diagnóstico Ambiental', desc: 'Monitoreo de calidad de aire, radiación solar y erosión de suelos en las laderas comunitarias.' },
              { type: 'Diagnóstico Hídrico', desc: 'Cálculo de caudal de la vertiente de captación y tasa de vaciado del tanque reservorio potable.' },
              { type: 'Diagnóstico Agrícola', desc: 'Evaluación del requerimiento de riego del suelo y optimización del uso de agua mediante control de bombeo inteligente.' },
              { type: 'Socioeconómico', desc: 'Encuestas sobre calidad de vida, acceso a internet y necesidades prioritarias en infraestructura comunitaria.' }
            ].map((diag, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl bg-white/60 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-teal-650 uppercase tracking-wider font-mono">Tipo Diagnóstico</span>
                  <h4 className="font-bold text-slate-800 text-sm">{diag.type}</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-2">{diag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resultados' && (
          <div className="glass p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-250/60 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold font-display text-slate-900">Resultados Obtenidos</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Image className="h-4.5 w-4.5 text-teal-600" /> Galería de Fotos & Videos
                </h4>
                <div className="flex gap-2">
                  <div className="h-16 w-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-300">
                    Foto 1
                  </div>
                  <div className="h-16 w-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-300">
                    Foto 2
                  </div>
                  <div className="h-16 w-24 bg-slate-850 rounded-lg flex items-center justify-center text-white font-bold text-[10px] cursor-pointer" onClick={() => alert("Reproduciendo video del proyecto...")}>
                    <Play className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Download className="h-4.5 w-4.5 text-cyan-600" /> Publicaciones & Descargas
                </h4>
                <div className="space-y-1.5">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Descargando informe..."); }} className="text-xs font-bold text-teal-650 hover:underline block">
                    📄 Informe Técnico Final Los Vergeles (PDF)
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Descargando dataset..."); }} className="text-xs font-bold text-teal-650 hover:underline block">
                    📊 Dataset de Telemetría CO2 & Temperatura (CSV)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
