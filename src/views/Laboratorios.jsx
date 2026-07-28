import React, { useState } from 'react';
import { Layers, Clock, Cpu, FileText, Download, ShieldAlert, Award } from 'lucide-react';

export default function Laboratorios() {
  const [activeLab, setActiveLab] = useState(1);

  const labs = [
    {
      id: 1,
      name: 'Laboratorio de Redes e Infraestructura',
      shortName: 'Redes y Telecom',
      schedule: 'Lunes a Viernes: 08:00 - 18:00 | Sábado: 09:00 - 13:00',
      coordinator: 'Dr. Alejandro Rivas',
      equipment: [
        'Switches y Enrutadores Cisco Catalyst Series (Capas 2 y 3)',
        'Servidores Rack Dell PowerEdge para Virtualización de Redes',
        'Analizadores de espectro RF e instrumentación de telecomunicaciones',
        'Kit de empalme y pruebas de fibra óptica de última generación',
      ],
      manuals: [
        { title: 'Guía de Configuración Básica de Enrutamiento Estático y OSPF.pdf', size: '2.4 MB' },
        { title: 'Manual de Prácticas de VLANs y Seguridad en Capa 2.pdf', size: '1.8 MB' },
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      description: 'Espacio dotado para el diseño, simulación y montaje físico de topologías de redes locales, enrutamiento avanzado, y análisis de señales de radiofrecuencia.',
    },
    {
      id: 2,
      name: 'Laboratorio de IoT y Sistemas Embebidos',
      shortName: 'IoT e Inteligencia',
      schedule: 'Lunes a Viernes: 08:00 - 17:00',
      coordinator: 'M.Sc. Beatriz Castro',
      equipment: [
        'Kits de desarrollo ESP32, Arduino Nano 33 IoT y Raspberry Pi 4',
        'Sensores de precisión (Gases, Humedad, Conductividad de Suelo, Ultrasonido)',
        'Módulos de comunicación inalámbrica LoRa, Zigbee, NBIoT',
        'Estaciones de soldadura SMD y microscopios de inspección digital',
      ],
      manuals: [
        { title: 'Protocolo de Comunicación MQTT con ESP32 y Mosquito Broker.pdf', size: '3.1 MB' },
        { title: 'Configuración y Lectura de Sensores Análogos mediante ADC.pdf', size: '1.2 MB' },
      ],
      image: 'https://images.unsplash.com/photo-1581092334250-248231c5a0d5?auto=format&fit=crop&w=800&q=80',
      description: 'Área dedicada a la experimentación con microcontroladores, adquisición de datos del entorno y transmisión inalámbrica hacia plataformas locales o cloud.',
    },
    {
      id: 3,
      name: 'Laboratorio de Electrónica Analógica y Digital',
      shortName: 'Electrónica',
      schedule: 'Lunes a Viernes: 07:00 - 19:00',
      coordinator: 'Ing. Fernando Ortiz',
      equipment: [
        'Osciloscopios Digitales Rigol de 4 canales y 100MHz',
        'Fuentes de voltaje DC reguladas y programables',
        'Generadores de funciones arbitrarias',
        'Kits de FPGAs Altera Cyclone para diseño digital avanzado',
      ],
      manuals: [
        { title: 'Guía de Diseño de Filtros Activos con Amplificadores Operacionales.pdf', size: '4.2 MB' },
        { title: 'Diseño de Contadores Síncronos en VHDL.pdf', size: '2.0 MB' },
      ],
      image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80',
      description: 'El laboratorio troncal para la caracterización de componentes pasivos y activos, prototipado rápido en protoboard y análisis de señales eléctricas de alta frecuencia.',
    },
    {
      id: 4,
      name: 'Centro de Prototipado Tecnológico (CPT)',
      shortName: 'Prototipado (CPT)',
      schedule: 'Lunes a Viernes: 09:00 - 18:00',
      coordinator: 'M.Sc. Diana Paredes',
      equipment: [
        'Impresoras 3D FDM (Creality Ender y Prusa i3 Mk3s)',
        'Impresora 3D de Resina SLA de alta definición',
        'Cortadora Láser de CO2 de 60W para acrílico y madera',
        'Ruteadora CNC para grabado de placas electrónicas (PCBs)',
      ],
      manuals: [
        { title: 'Lineamientos de Seguridad y Uso de la Ruteadora CNC para Placas.pdf', size: '1.5 MB' },
        { title: 'Guía de Preparación de Archivos STL para Impresión 3D.pdf', size: '2.7 MB' },
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      description: 'El CPT es el área de fabricación digital de la carrera. Aquí los estudiantes materializan los chasis, carcasas de dispositivos IoT, y fabrican sus propias tarjetas impresas (PCBs).',
    },
  ];

  const currentLab = labs.find(l => l.id === activeLab);

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="font-display font-extrabold text-4xl text-slate-900 mb-4">Laboratorios Tecnológicos</h1>
          <p className="text-slate-600">
            Contamos con infraestructura moderna y equipamiento de grado industrial para garantizar la formación práctica del estudiante de ingeniería.
          </p>
        </div>
      </section>

      {/* Lab Tabs and Details Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs Sidebar */}
          <div className="space-y-2 lg:col-span-1">
            {labs.map((lab) => (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between border ${
                  activeLab === lab.id
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{lab.shortName}</span>
                <Layers className={`h-4 w-4 ${activeLab === lab.id ? 'text-teal-600' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Details Content Card */}
          <div className="lg:col-span-3 glass p-8 rounded-2xl space-y-8 bg-white/60 border border-slate-250">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: text */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-teal-650 uppercase tracking-wider">Laboratorio Oficial</span>
                  <h2 className="text-2xl font-display font-bold text-slate-800 mt-1 leading-snug">{currentLab.name}</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{currentLab.description}</p>
                
                {/* Schedule & Coordinator info */}
                <div className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                    <span><strong>Horario:</strong> {currentLab.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Cpu className="h-4 w-4 text-teal-600 shrink-0" />
                    <span><strong>Coordinador:</strong> {currentLab.coordinator}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img src={currentLab.image} alt={currentLab.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Equipment list and manuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              {/* Equipment */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4 w-4 text-cyan-650" /> Equipamiento Principal
                </h3>
                <ul className="space-y-2">
                  {currentLab.equipment.map((item, index) => (
                    <li key={index} className="text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
                      <span className="h-1.5 w-1.5 bg-teal-500 rounded-full mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Manuals download list */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-650" /> Manuales y Guías Académicas
                </h3>
                <div className="space-y-3">
                  {currentLab.manuals.map((manual, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">{manual.title}</p>
                        <p className="text-[10px] text-slate-450 font-mono font-bold">{manual.size}</p>
                      </div>
                      <button
                        onClick={() => alert(`Simulando descarga de manual: ${manual.title}`)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all shrink-0"
                        title="Descargar Guía PDF"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Instructions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center border-l-4 border-l-amber-500 bg-amber-50/40 border border-slate-200/60 border-l-amber-500">
          <ShieldAlert className="h-10 w-10 text-amber-600 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900">Lineamientos Generales de Seguridad</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Es obligatorio el uso de bata de laboratorio, calzado cerrado, y gafas de protección al realizar soldadura de componentes o interactuar con la cortadora láser CNC del CPT. Revisa los reglamentos completos en cartelera.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
