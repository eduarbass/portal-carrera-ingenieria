import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, User, ChevronDown } from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Carrera', href: '/carrera' },
    { name: 'Docentes', href: '/docentes' },
    { name: 'Laboratorios', href: '/laboratorios' },
    { name: 'Los Vergeles', href: '/los-vergeles' },
    { name: 'Repositorio', href: '/repositorio' },
    { name: 'Comunidad', href: '/comunidad' },
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
    <nav className="sticky top-4 z-50 w-[90%] max-w-7xl mx-auto rounded-2xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-md transition-all duration-300 py-1 px-4 my-4">
      <div className="w-full">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-900 font-display font-bold text-lg tracking-wider">
              <Cpu className="h-5 w-5 text-teal-600 animate-pulse" />
              <span>INGENIERÍA <span className="text-teal-600">IoT</span></span>
            </Link>
          </div>

          {/* Desktop Navigation - Clean inline nav with reduced padding & font sizes to prevent wrapping */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-teal-600 bg-teal-50/80 border border-teal-100/50'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                {item.name}
              </Link>
            ))}
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
        <div className="lg:hidden bg-white border-t border-slate-150 rounded-b-2xl mt-1">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(item.href)
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
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
            <div className="pt-2 px-3">
              {currentRole !== 'publico' ? (
                <Link
                  to="/panel"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block px-4 py-2 rounded-lg bg-teal-600 text-white font-bold text-xs"
                >
                  Ir a Mi Panel
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setCurrentRole('estudiante');
                    setIsOpen(false);
                  }}
                  className="w-full text-center block px-4 py-2 rounded-lg border border-teal-600 text-teal-600 font-bold text-xs"
                >
                  Acceder Demo
                </button>
              )}
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
