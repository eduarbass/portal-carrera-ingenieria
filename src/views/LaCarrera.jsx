import React, { useState } from 'react';
import { Target, Eye, BookOpen, Clock, Award, Shield, User, FileText, Landmark, Compass, Briefcase, Network } from 'lucide-react';

export default function LaCarrera() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [activeTab, setActiveTab] = useState('historia');

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

  const tabs = [
    { id: 'historia', name: 'Historia', icon: Clock },
    { id: 'mision-vision', name: 'Misión y Visión', icon: Target },
    { id: 'objetivos', name: 'Objetivos', icon: Compass },
    { id: 'perfil', name: 'Perfil & Campo', icon: Briefcase },
    { id: 'autoridades', name: 'Autoridades', icon: User },
    { id: 'organigrama', name: 'Organigrama', icon: Network },
    { id: 'malla', name: 'Malla Curricular', icon: BookOpen },
    { id: 'reglamento', name: 'Reglamento', icon: FileText }
  ];

  return (
    <div className="space-y-12 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Banner */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">La Carrera</h1>
          <p className="text-slate-600 text-base">
            Conoce el organigrama, la historia institucional, las autoridades académicas y las normativas que guían el desarrollo de la Carrera de Ingeniería y Telemática.
          </p>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Secciones</span>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-teal-650 text-white shadow-md shadow-teal-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="lg:col-span-3 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-slate-250/60 shadow-sm min-h-[500px]">
          {activeTab === 'historia' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-teal-600" /> Historia de la Carrera
              </h2>
              <div className="text-slate-650 space-y-4 text-sm leading-relaxed">
                <p>
                  La Carrera de Ingeniería y Telemática fue concebida en el año 2023 en respuesta a la creciente demanda global y local de digitalización y conectividad de sistemas físicos en el ámbito de la Industria 4.0.
                </p>
                <p>
                  Reconociendo el impacto de las redes de baja potencia como LoRaWAN en el sector agrícola regional, y la necesidad de profesionales capaces de integrar sistemas embebidos, analítica en la nube y sensores físicos, el Consejo Universitario aprobó su creación formal.
                </p>
                <p>
                  Desde su primer grupo de matriculados en 2024, la carrera ha liderado proyectos emblemáticos de vinculación comunitaria, destacando la infraestructura IoT implementada en el proyecto "Los Vergeles" como laboratorio vivo.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'mision-vision' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Target className="h-6 w-6 text-teal-600" /> Misión
                </h2>
                <p className="text-slate-655 text-sm leading-relaxed">
                  Formar ingenieros en Ingeniería y Telemática con sólidos principios éticos, capacidad técnica de excelencia e innovación, preparados para concebir, diseñar e implementar sistemas electrónicos y digitales complejos que solventen necesidades socioeconómicas a nivel nacional e internacional.
                </p>
              </div>
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-cyan-600" /> Visión
                </h2>
                <p className="text-slate-655 text-sm leading-relaxed">
                  Ser reconocidos en el año 2030 como la carrera líder y referente en tecnologías de ingeniería y telemática en el país, impulsando proyectos sostenibles y con alta implicación comunitaria, alineados con el desarrollo del agro inteligente, ciudades inteligentes y la automatización industrial.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'objetivos' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Compass className="h-6 w-6 text-teal-600" /> Objetivos de la Carrera
              </h2>
              <ul className="space-y-4 text-slate-655 text-sm leading-relaxed list-none pl-0">
                <li className="flex gap-3">
                  <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Formación Técnica Integral:</strong> Proveer conocimientos sólidos en microelectrónica, procesamiento digital de señales, protocolos de enrutamiento y desarrollo web/cloud.</span>
                </li>
                <li className="flex gap-3">
                  <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Desarrollo de Proyectos Comunitarios:</strong> Fomentar la creación de proyectos de vinculación de alto impacto social, resolviendo necesidades hídricas, ambientales y energéticas en zonas rurales.</span>
                </li>
                <li className="flex gap-3">
                  <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Investigación Aplicada:</strong> Fomentar el desarrollo de publicaciones científicas y patentes en telemetría de baja potencia y redes inteligentes.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Award className="h-6 w-6 text-teal-600" /> Perfil Profesional
                </h2>
                <p className="text-slate-655 text-sm leading-relaxed">
                  El egresado es un profesional capaz de diseñar hardware de sensores, programar microcontroladores y gateways embebidos, establecer infraestructuras de telecomunicaciones inalámbricas (LoRaWAN, WiFi, 5G), y programar servicios web en la nube para procesar, visualizar y almacenar series de tiempo e información telemétrica de forma segura.
                </p>
              </div>
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-teal-600" /> Campo Ocupacional
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-650 text-xs font-medium">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    🏢 Administrador de Redes e Infraestructura Cloud/IoT
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    🚜 Consultor en Agricultura Inteligente y Smart Farms
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    🏭 Diseñador de Soluciones IoT Industrial (IIoT) y Automatización
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    💻 Programador Fullstack especializado en Series de Tiempo y Web Sockets
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'autoridades' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <User className="h-6 w-6 text-teal-600" /> Autoridades de la Carrera
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700 text-lg">
                    DR
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Dr. Carlos Mendoza</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Director de Carrera</p>
                    <p className="text-[10px] text-teal-650 font-mono mt-1">carlos.mendoza@carrera.edu</p>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700 text-lg">
                    MS
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">M.Sc. Beatriz Castro</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Coordinadora Académica</p>
                    <p className="text-[10px] text-teal-650 font-mono mt-1">beatriz.castro@carrera.edu</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'organigrama' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Network className="h-6 w-6 text-teal-600" /> Organigrama Funcional
              </h2>
              {/* Vertical Visual Organigrama tree */}
              <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="px-4 py-2 bg-teal-650 text-white font-bold rounded-lg text-xs shadow-sm">
                  Consejo de Carrera (Comité Técnico)
                </div>
                <div className="h-6 w-0.5 bg-slate-300"></div>
                <div className="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg text-xs shadow-sm">
                  Dirección de Carrera
                </div>
                <div className="h-6 w-0.5 bg-slate-300"></div>
                <div className="flex flex-col sm:flex-row gap-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg text-xs shadow-sm">
                      Comisión de Docencia & Malla
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg text-xs shadow-sm">
                      Comisión de Vinculación & CPT
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg text-xs shadow-sm">
                      Comisión de Investigación & Semilleros
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'malla' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-teal-600" /> Malla Curricular Vigente
                </h2>
                <p className="text-slate-600 text-xs">
                  Haz clic en los diferentes niveles académicos para explorar las asignaturas clave.
                </p>
              </div>

              {/* Semester selector tabs */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
                {semesters.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setSelectedSemester(s.num)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      selectedSemester === s.num
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    Nivel {s.num}
                  </button>
                ))}
              </div>

              {/* Courses grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentSemesterData.courses.map((course) => (
                  <div key={course.code} className="p-4 rounded-xl border border-slate-200 border-l-4 border-l-teal-500 bg-white/60 shadow-sm">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-mono text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">{course.code}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{course.hrs} H</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight mt-2">{course.name}</h4>
                    <p className="text-slate-600 text-[11px] leading-normal mt-1">{course.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reglamento' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <FileText className="h-6 w-6 text-teal-600" /> Reglamento de Régimen Académico
              </h2>
              <div className="text-slate-655 space-y-4 text-sm leading-relaxed">
                <p>
                  La carrera se rige bajo el Reglamento de Régimen Académico del Consejo de Educación Superior, garantizando:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li><strong>Aprobación de Asignaturas:</strong> Promedio mínimo de 7.0/10 en el consolidado de exámenes y trabajos prácticos autónomos.</li>
                  <li><strong>Prácticas Preprofesionales:</strong> Cumplir un mínimo de 240 horas de prácticas de vinculación o pasantías en empresas validadas por el CPT.</li>
                  <li><strong>Integración Curricular:</strong> Desarrollo de un Trabajo de Integración Curricular (Tesis) o rendición de examen de carácter complexivo.</li>
                </ul>
                <div className="pt-2">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Descargando Reglamento PDF..."); }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Descargar Reglamento Interno (.PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
