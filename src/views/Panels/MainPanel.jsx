import React from 'react';
import EstudiantePanel from './EstudiantePanel';
import DocentePanel from './DocentePanel';
import ComunidadPanel from './ComunidadPanel';
import AdminPanel from './AdminPanel';
import { Lock } from 'lucide-react';

export default function MainPanel({ currentRole, setCurrentRole }) {
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
          <div className="max-w-md mx-auto text-center py-16 px-4 space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mx-auto animate-pulse">
              <Lock className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-display">Acceso al Panel de Control</h2>
              <p className="text-xs text-slate-600">
                Selecciona uno de los perfiles simulados de la demo para experimentar las diferentes interfaces y flujos de trabajo administrativos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => setCurrentRole('estudiante')}
                className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 hover:border-cyan-250 transition-all font-bold text-xs uppercase shadow-sm"
              >
                Estudiante
              </button>
              <button
                onClick={() => setCurrentRole('docente')}
                className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-purple-750 hover:bg-purple-50 hover:border-purple-250 transition-all font-bold text-xs uppercase shadow-sm"
              >
                Docente
              </button>
              <button
                onClick={() => setCurrentRole('comunidad_rol')}
                className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-250 transition-all font-bold text-xs uppercase shadow-sm"
              >
                Líder Comunitario
              </button>
              <button
                onClick={() => setCurrentRole('admin')}
                className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-700 hover:bg-red-50 hover:border-red-250 transition-all font-bold text-xs uppercase shadow-sm"
              >
                Administrador
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[500px]">
      {currentRole !== 'publico' && (
        <div className="mb-6 flex justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-xs shadow-sm">
          <span className="text-slate-605 font-bold">
            MODO SIMULACIÓN: <strong className="text-slate-800 uppercase font-extrabold">{currentRole}</strong>
          </span>
          <button
            onClick={() => setCurrentRole('publico')}
            className="text-red-600 hover:text-red-700 hover:underline font-bold"
          >
            Salir del Panel
          </button>
        </div>
      )}
      
      {renderPanel()}
    </div>
  );
}
