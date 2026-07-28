import React, { useState } from 'react';
import EstudiantePanel from './EstudiantePanel';
import DocentePanel from './DocentePanel';
import ComunidadPanel from './ComunidadPanel';
import AdminPanel from './AdminPanel';
import { Lock, Mail, Key, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function MainPanel({ currentRole, setCurrentRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Credenciales válidas para la demo
  const credentials = {
    'estudiante@carrera.edu': { role: 'estudiante', pass: 'estudiante123' },
    'docente@carrera.edu': { role: 'docente', pass: 'docente123' },
    'comunidad@carrera.edu': { role: 'comunidad_rol', pass: 'comunidad123' },
    'admin@carrera.edu': { role: 'admin', pass: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const user = credentials[trimmedEmail];

    if (user && user.pass === password) {
      setCurrentRole(user.role);
    } else {
      setError('Credenciales incorrectas. Por favor, verifica el correo y la contraseña.');
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const renderPanel = () => {
    switch (currentRole) {
      case 'estudiante':
        return <EstudiantePanel />;
      case 'docente':
        return <DocentePanel />;
      case 'comunidad_rol':
        return <ComunidadPanel />;
      case 'admin':
        return <AdminPanel />;
      default:
        return (
          <div className="max-w-md mx-auto py-8 px-4 space-y-6">
            {/* Tarjeta de Login */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mx-auto">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 font-display">Portal Académico</h2>
                <p className="text-xs text-slate-600">
                  Ingresa tus credenciales institucionales para acceder a tu panel de control
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs animate-fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="usuario@carrera.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Key className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors placeholder:text-slate-400 text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 mt-2 rounded-lg bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-500/10 hover:shadow-lg transition-all focus:outline-none"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>

            {/* Asistente de credenciales de prueba */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle className="h-4 w-4 text-teal-600" />
                <span>Credenciales Demo (Autocompletar)</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Haz clic en cualquier rol para rellenar el formulario automáticamente y probar la interfaz correspondiente:
              </p>
              
              <div className="grid grid-cols-2 gap-2 pt-1.5">
                <button
                  onClick={() => handleQuickLogin('estudiante@carrera.edu', 'estudiante123')}
                  className="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50/30 transition-all space-y-0.5 shadow-sm cursor-pointer"
                >
                  <span className="font-bold text-[11px] text-slate-700 block">Estudiante</span>
                  <span className="text-[9px] text-slate-400 block truncate">estudiante@carrera.edu</span>
                </button>
                <button
                  onClick={() => handleQuickLogin('docente@carrera.edu', 'docente123')}
                  className="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50/30 transition-all space-y-0.5 shadow-sm cursor-pointer"
                >
                  <span className="font-bold text-[11px] text-slate-700 block">Docente</span>
                  <span className="text-[9px] text-slate-400 block truncate">docente@carrera.edu</span>
                </button>
                <button
                  onClick={() => handleQuickLogin('comunidad@carrera.edu', 'comunidad123')}
                  className="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50/30 transition-all space-y-0.5 shadow-sm cursor-pointer"
                >
                  <span className="font-bold text-[11px] text-slate-700 block">Líder Comunitario</span>
                  <span className="text-[9px] text-slate-400 block truncate">comunidad@carrera.edu</span>
                </button>
                <button
                  onClick={() => handleQuickLogin('admin@carrera.edu', 'admin123')}
                  className="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50/30 transition-all space-y-0.5 shadow-sm cursor-pointer"
                >
                  <span className="font-bold text-[11px] text-slate-700 block">Administrador</span>
                  <span className="text-[9px] text-slate-400 block truncate">admin@carrera.edu</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[500px]">
      {currentRole !== 'publico' && (
        <div className="mb-6 flex justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-xs shadow-sm">
          <span className="text-slate-655 font-bold">
            MODO SIMULACIÓN: <strong className="text-teal-700 uppercase font-extrabold">{currentRole.replace('_rol', '')}</strong>
          </span>
          <button
            onClick={() => {
              setCurrentRole('publico');
              setEmail('');
              setPassword('');
              setError('');
            }}
            className="text-red-600 hover:text-red-700 hover:underline font-bold cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
      
      {renderPanel()}
    </div>
  );
}
