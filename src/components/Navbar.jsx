import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, User, ChevronDown, ExternalLink } from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'academia' or 'comunidad'
  const location = useLocation();

  const academiaLinks = [
    { name: 'La Carrera', href: '/carrera' },
    { name: 'Oferta Académica', href: '/oferta-academica' },
    { name: 'Docentes', href: '/docentes' },
    { name: 'Laboratorios', href: '/laboratorios' },
    { name: 'Transparencia', href: '/transparencia' },
  ];

  const comunidadLinks = [
    { name: 'Comunidad Los Vergeles', href: '/comunidad' },
    { name: 'Proyecto Los Vergeles (Monitoreo)', href: '/los-vergeles' },
    { name: 'Centro de Producción (CPT)', href: 'https://ctpunesum.com/index.php', external: true },
  ];

  const mainLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Investigación', href: '/investigacion' },
    { name: 'Semilleros', href: '/semilleros' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Repositorio', href: '/repositorio' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const roles = [
    { id: 'publico', name: 'Público / Visitante' },
    { id: 'estudiante', name: 'Estudiante' },
    { id: 'docente', name: 'Docente / Investigador' },
    { id: 'comunidad_rol', name: 'Líder Comunitario' },
    { id: 'admin', name: 'Administrador' },
  ];

  const getRoleLabel = (role) => {
    switch (role) {
      case 'estudiante': return 'Estudiante';
      case 'docente': return 'Docente';
      case 'comunidad_rol': return 'Líder Comunitario';
      case 'admin': return 'Administrador';
      default: return 'Visitante';
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-4 z-50 w-[95%] max-w-7xl mx-auto rounded-2xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-md transition-all duration-300 py-1 px-4 my-4">
      <div className="w-full">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-900 font-display font-bold text-base sm:text-lg tracking-wider">
              <Cpu className="h-5 w-5 text-teal-600 animate-pulse" />
              <span>INGENIERÍA <span className="text-teal-600">IoT</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Inicio
            </Link>

            {/* Academia Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'academia' ? null : 'academia')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-slate-605 hover:text-slate-955 hover:bg-slate-100/60 transition-all"
              >
                <span>Academia</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {activeDropdown === 'academia' && (
                <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-xl bg-white border border-slate-200/80 z-50 py-1">
                  {academiaLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block px-4 py-2 text-xs transition-colors ${
                        isActive(link.href) ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/investigacion"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/investigacion') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Investigación
            </Link>

            <Link
              to="/semilleros"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/semilleros') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Semilleros
            </Link>

            {/* Comunidad Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'comunidad' ? null : 'comunidad')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-slate-605 hover:text-slate-955 hover:bg-slate-100/60 transition-all"
              >
                <span>Comunidad</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {activeDropdown === 'comunidad' && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-slate-200/80 z-50 py-1">
                  {comunidadLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </a>
                    ) : (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`block px-4 py-2 text-xs transition-colors ${
                          isActive(link.href) ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            <Link
              to="/noticias"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/noticias') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Noticias
            </Link>

            <Link
              to="/repositorio"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/repositorio') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Repositorio
            </Link>

            <Link
              to="/contacto"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/contacto') ? 'text-teal-600 bg-teal-50/80' : 'text-slate-605 hover:text-slate-950 hover:bg-slate-100/60'
              }`}
            >
              Contacto
            </Link>
          </div>

          {/* Role Selector & Login Button */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowRoles(!showRoles)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 hover:text-slate-950 transition-all font-medium"
              >
                <User className="h-3.5 w-3.5 text-teal-600" />
                <span>Rol: <span className="font-bold text-slate-900">{getRoleLabel(currentRole)}</span></span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {showRoles && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-slate-200/80 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1">
                  <div className="py-1">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentRole(r.id);
                          setShowRoles(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                          currentRole === r.id
                            ? 'bg-teal-50 text-teal-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {currentRole !== 'publico' ? (
              <Link
                to="/panel"
                className="px-3.5 py-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-sm shadow-teal-500/10"
              >
                Mi Panel
              </Link>
            ) : (
              <button
                onClick={() => setCurrentRole('estudiante')}
                className="px-3.5 py-1 rounded-full border border-teal-600 text-teal-600 hover:bg-teal-50 font-bold text-xs transition-all"
              >
                Demo
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowRoles(!showRoles)}
              className="px-2 py-1 rounded border border-slate-200 text-[10px] font-semibold text-slate-700 bg-slate-50"
            >
              Rol: {getRoleLabel(currentRole)}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-150 rounded-b-2xl mt-1 max-h-[70vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Inicio
            </Link>

            {/* Academia Section on Mobile */}
            <div className="border-t border-slate-100 pt-2 my-2">
              <span className="block px-3 py-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">Academia</span>
              {academiaLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-1.5 rounded-lg text-xs ${
                    isActive(link.href) ? 'text-teal-650 font-bold bg-teal-50' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              to="/investigacion"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Investigación
            </Link>

            <Link
              to="/semilleros"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Semilleros
            </Link>

            {/* Comunidad Section on Mobile */}
            <div className="border-t border-slate-100 pt-2 my-2">
              <span className="block px-3 py-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">Comunidad</span>
              {comunidadLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-50"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-1.5 rounded-lg text-xs ${
                      isActive(link.href) ? 'text-teal-650 font-bold bg-teal-50' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            <Link
              to="/noticias"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Noticias
            </Link>

            <Link
              to="/repositorio"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Repositorio
            </Link>

            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              Contacto
            </Link>

            <div className="border-t border-slate-100 my-2 pt-2">
              <span className="block px-3 py-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">Simular Rol</span>
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left block px-3 py-1.5 rounded-lg text-xs ${
                    currentRole === r.id ? 'text-teal-600 bg-teal-50 font-bold' : 'text-slate-500 hover:text-slate-855 hover:bg-slate-50'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role list popup for mobile helper */}
      {showRoles && !isOpen && (
        <div className="lg:hidden fixed inset-x-4 top-16 bg-white border border-slate-200 rounded-2xl z-50 py-3 px-4 shadow-xl">
          <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">Selecciona un rol para la demo:</p>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setCurrentRole(r.id);
                  setShowRoles(false);
                }}
                className={`text-center py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentRole === r.id ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r.name.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
