import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Sun, Droplets, Thermometer, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

// Safe DivIcon builders to avoid Leaflet missing icon issues
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

  // Simulate real-time fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const rand = Math.random();
        
        let newTemp = prev.temp + (rand - 0.5) * 0.2;
        let newHum = prev.humidity + (rand - 0.5) * 0.5;
        let newRes = prev.reservoir + (rand - 0.5) * 0.15;
        let newVolt = prev.solarVoltage + (rand - 0.5) * 0.3;
        let newCurr = prev.solarCurrent + (rand - 0.5) * 0.1;

        // Boundaries and anomaly injection
        if (anomalyMode) {
          newTemp = Math.min(newTemp + 0.5, 38.5);
          newRes = Math.max(newRes - 0.8, 12.4);
          newVolt = Math.min(newVolt + 0.8, 26.5);
        } else {
          newTemp = Math.max(18, Math.min(newTemp, 30));
          newHum = Math.max(40, Math.min(newHum, 85));
          newRes = Math.max(65, Math.min(newRes, 95));
          newVolt = Math.max(12, Math.min(newVolt, 21));
        }

        newCurr = Math.max(0.5, Math.min(newCurr, 8));
        const newPower = parseFloat((newVolt * newCurr).toFixed(1));

        return {
          temp: parseFloat(newTemp.toFixed(1)),
          humidity: parseFloat(newHum.toFixed(1)),
          reservoir: parseFloat(newRes.toFixed(1)),
          solarVoltage: parseFloat(newVolt.toFixed(1)),
          solarCurrent: parseFloat(newCurr.toFixed(1)),
          power: newPower,
          co2: Math.max(380, Math.min(prev.co2 + Math.round((rand - 0.5) * 4), 480))
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [anomalyMode]);

  // Feed the history chart whenever telemetry updates
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory(prev => {
      const next = [...prev, {
        time: timeStr,
        water: telemetry.reservoir,
        solar: telemetry.power,
        temp: telemetry.temp
      }];
      if (next.length > 8) next.shift();
      return next;
    });
  }, [telemetry]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const position = [-0.180653, -78.467834];

  const mapNodes = [
    { id: 1, name: 'Nodo A: Tanque Reservorio Principal', coords: [-0.1802, -78.4682], color: telemetry.reservoir < 20 ? '#ef4444' : '#3b82f6', desc: `Monitorea volumen de agua potable. Nivel: ${telemetry.reservoir}%` },
    { id: 2, name: 'Nodo B: Estación Solar Comunitaria', coords: [-0.1812, -78.4674], color: '#f59e0b', desc: `Generación fotovoltaica. Potencia actual: ${telemetry.power} W` },
    { id: 3, name: 'Nodo C: Aula Tecnológica Los Vergeles', coords: [-0.1807, -78.4678], color: '#10b981', desc: `Gateway principal LoRaWAN y sensor ambiental. Temp: ${telemetry.temp}°C` },
    { id: 4, name: 'Nodo D: Viviendas Demostrativas', coords: [-0.1818, -78.4686], color: '#8b5cf6', desc: 'Monitoreo de flujo eléctrico residencial y consumo.' }
  ];

  return (
    <div className="space-y-8 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title section */}
      <section className="pt-10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-650 uppercase tracking-wider">Investigación & Impacto Social</span>
            <h1 className="font-display font-extrabold text-3xl text-slate-900">Micrositio Proyecto "Los Vergeles"</h1>
            <p className="text-slate-600 text-sm">Monitoreo ambiental e infraestructura mediante telemetría IoT de baja potencia en tiempo real.</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setAnomalyMode(!anomalyMode)}
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

      {/* Main Map + Side Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Leaflet Container */}
        <div className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-10">
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 z-40 pointer-events-none flex items-center gap-2 shadow-sm">
            <Layers className="h-3.5 w-3.5 text-teal-600" />
            <span>Mapa del Ecosistema IoT</span>
          </div>

          <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapNodes.map((node) => (
              <Marker key={node.id} position={node.coords} icon={createGlowIcon(node.color)}>
                <Popup>
                  <div className="space-y-1.5 p-1 text-left">
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{node.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-mono">{node.desc}</p>
                    <span className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-150 shadow-sm">
                      Activo
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Live Variables Panel */}
        <div className="space-y-6 lg:col-span-1">
          {/* Card 1: Water Tank */}
          <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden bg-white/60 border border-slate-250 shadow-sm">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Droplets className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tanque Reservorio</p>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-0.5">{telemetry.reservoir}%</h3>
              <p className="text-xs text-slate-600 mt-1 font-mono">
                {telemetry.reservoir < 20 ? 'Alerta: Nivel Crítico' : 'Volumen de Agua Estable'}
              </p>
            </div>
            {/* Liquid Level Indicator bar at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
              <div 
                className={`h-full transition-all duration-1000 ${telemetry.reservoir < 20 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${telemetry.reservoir}%` }}
              ></div>
            </div>
          </div>

          {/* Card 2: Solar Panels */}
          <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden bg-white/60 border border-slate-250 shadow-sm">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
              <Sun className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estación Solar</p>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-0.5">{telemetry.power} W</h3>
              <p className="text-xs text-slate-600 mt-1 font-mono">
                V: {telemetry.solarVoltage} V | I: {telemetry.solarCurrent} A
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
              <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${(telemetry.power / 150) * 100}%` }}></div>
            </div>
          </div>

          {/* Card 3: Weather Station */}
          <div className="glass p-5 rounded-2xl flex items-center gap-4 bg-white/60 border border-slate-250 shadow-sm">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <Thermometer className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sensores Ambientales</p>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-0.5">{telemetry.temp}°C</h3>
              <p className="text-xs text-slate-600 mt-1 font-mono">
                Hum: {telemetry.humidity}% | CO₂: {telemetry.co2} ppm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Telemetry log */}
      <section className="glass p-6 sm:p-8 rounded-2xl bg-white/60 border border-slate-250 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-600" /> Gráficos de Tendencias en Tiempo Real
            </h3>
            <p className="text-xs text-slate-500">Fluctuación de potencia solar y nivel de reserva en intervalos de 5 segundos.</p>
          </div>
        </div>

        <div className="h-64 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis stroke="#64748b" style={{ fontSize: 10, fontFamily: 'monospace' }} />
              <Tooltip 
                contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#0f172a', fontSize: 12 }} 
                labelClassName="font-mono"
              />
              <Area type="monotone" dataKey="water" name="Agua (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorWater)" />
              <Area type="monotone" dataKey="solar" name="Potencia (W)" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorSolar)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
