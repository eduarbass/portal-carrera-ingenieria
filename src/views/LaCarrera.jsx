import React, { useState } from 'react';
import { Target, Eye, BookOpen, Clock, Award, Shield } from 'lucide-react';

export default function LaCarrera() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const semesters = [
    {
      num: 1,
      title: '1er Semestre',
      courses: [
        { code: 'MAT101', name: 'Álgebra Lineal & Cálculo', hrs: 80, desc: 'Bases matemáticas fundamentales para algoritmos y modelado.' },
        { code: 'FIS101', name: 'Física Electrostática', hrs: 64, desc: 'Principios de campos eléctricos, cargas y circuitos básicos.' },
        { code: 'PROG101', name: 'Fundamentos de Programación', hrs: 80, desc: 'Lógica, estructuras de datos básicas y lenguajes estructurados (C/Python).' }
      ]
    },
    {
      num: 2,
      title: '2do Semestre',
      courses: [
        { code: 'CIR102', name: 'Circuitos Eléctricos I', hrs: 80, desc: 'Análisis de corriente continua y alterna, leyes básicas de circuitos.' },
        { code: 'PROG102', name: 'Programación Orientada a Objetos', hrs: 80, desc: 'Desarrollo de software modular en lenguajes como C++ o Java.' },
        { code: 'EST102', name: 'Estadística & Probabilidades', hrs: 64, desc: 'Análisis de datos y distribuciones útiles para lecturas de sensores.' }
      ]
    },
    {
      num: 3,
      title: '3er Semestre',
      courses: [
        { code: 'ELC201', name: 'Electrónica Analógica', hrs: 80, desc: 'Transistores, amplificadores operacionales y acondicionamiento de señal.' },
        { code: 'SIST201', name: 'Sistemas Digitales', hrs: 80, desc: 'Álgebra de Boole, compuertas lógicas, decodificadores y circuitos secuenciales.' },
        { code: 'NET201', name: 'Redes de Datos y Enrutamiento', hrs: 80, desc: 'Modelo OSI, direccionamiento IP (IPv4/IPv6), subnetting y routing.' }
      ]
    },
    {
      num: 4,
      title: '4to Semestre',
      courses: [
        { code: 'MIC202', name: 'Microcontroladores & Sistemas Embebidos', hrs: 96, desc: 'Programación de hardware (Arduino, ESP32, STM32), interrupciones, GPIO.' },
        { code: 'IOT202', name: 'Protocolos de Redes IoT', hrs: 80, desc: 'Estudio de MQTT, CoAP, HTTP, LoRaWAN, Zigbee y comunicaciones inalámbricas.' },
        { code: 'BD202', name: 'Bases de Datos & SQL/NoSQL', hrs: 64, desc: 'Diseño e implementación de bases de datos para almacenamiento de lecturas de sensores.' }
      ]
    },
    {
      num: 5,
      title: '5to Semestre',
      courses: [
        { code: 'CLOUD301', name: 'Computación en la Nube & DevOps', hrs: 80, desc: 'Infraestructura cloud, AWS, Supabase, contenedores Docker y flujos CI/CD.' },
        { code: 'IOT301', name: 'Prototipado IoT Industrial (IIoT)', hrs: 96, desc: 'Integración industrial, Modbus, PLCs y sensores robustos en campo.' },
        { code: 'PROY301', name: 'Proyecto Integrador Comunitario', hrs: 80, desc: 'Desarrollo de soluciones reales aplicando telemetría, como en Los Vergeles.' }
      ]
    }
  ];

  const currentSemesterData = semesters.find(s => s.num === selectedSemester);

  return (
    <div className="space-y-20 pb-20 text-left">
      {/* Intro Banner */}
      <section className="relative overflow-hidden pt-12 pb-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">La Carrera de Ingeniería</h1>
          <p className="text-slate-650 text-lg">
            Conoce nuestras bases institucionales, objetivos, misión y visión, así como la malla curricular diseñada para los retos del mañana.
          </p>
        </div>
      </section>

      {/* Mision / Vision / Objetivos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-800">Misión</h2>
          </div>
          <p className="text-slate-650 leading-relaxed text-sm">
            Formar ingenieros en IoT y Conectividad con sólidos principios éticos, capacidad técnica de excelencia e innovación, preparados para concebir, diseñar e implementar sistemas electrónicos y digitales complejos que solventen necesidades socioeconómicas a nivel nacional e internacional.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Eye className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-800">Visión</h2>
          </div>
          <p className="text-slate-650 leading-relaxed text-sm">
            Ser reconocidos en el año 2030 como la carrera líder y referente en tecnologías de conectividad e Internet de las Cosas en el país, impulsando proyectos sostenibles y con alta implicación comunitaria, alineados con el desarrollo del agro inteligente, ciudades inteligentes y la automatización industrial.
          </p>
        </div>
      </section>

      {/* Malla Curricular Interactiva */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-teal-600" /> Malla Curricular de la Carrera
          </h2>
          <p className="text-slate-605 max-w-2xl">
            Haz clic en los diferentes niveles académicos para explorar las asignaturas clave, su carga horaria y su aplicación práctica.
          </p>
        </div>

        {/* Semester selector tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {semesters.map((s) => (
            <button
              key={s.num}
              onClick={() => setSelectedSemester(s.num)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedSemester === s.num
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/10'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Nivel {s.num} ({s.title})
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentSemesterData.courses.map((course) => (
            <div key={course.code} className="glass p-6 rounded-xl space-y-4 border border-slate-200 border-l-4 border-l-teal-500 bg-white/60 shadow-sm transition-transform duration-200 hover:translate-x-1">
              <div className="flex justify-between items-start gap-4">
                <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">{course.code}</span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 text-slate-450" /> {course.hrs} Horas
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 leading-tight">{course.name}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{course.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graduation Profile / Certifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-8">Perfil del Egresado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl flex gap-4 bg-white/60 border border-slate-250 shadow-sm">
            <Award className="h-10 w-10 text-teal-600 shrink-0 animate-pulse" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-800">Certificación Profesional</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Capacidad para certificar diseños de hardware y conectividad industrial según normas internacionales.</p>
            </div>
          </div>
          <div className="glass p-6 rounded-xl flex gap-4 bg-white/60 border border-slate-250 shadow-sm">
            <Shield className="h-10 w-10 text-emerald-600 shrink-0" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-800">Ciberseguridad Aplicada</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Conocimiento para asegurar la comunicación extremo a extremo en redes de sensores e IoT empresarial.</p>
            </div>
          </div>
          <div className="glass p-6 rounded-xl flex gap-4 bg-white/60 border border-slate-250 shadow-sm">
            <Clock className="h-10 w-10 text-amber-600 shrink-0" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-800">Desarrollo Ágil</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Metodologías de prototipado rápido en 3D, desarrollo iterativo firmware/software y entrega continua.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
