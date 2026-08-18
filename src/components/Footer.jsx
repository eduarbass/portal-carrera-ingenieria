import React from 'react';
import { Cpu, Mail, Phone, MapPin, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0c10] border-t border-gray-800 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand & Desc */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 text-white font-display font-bold text-lg tracking-wider">
            <img src="/logo.jpg" alt="Logo Carrera de Ingeniería y Telemática" className="h-9 w-auto object-contain rounded-lg" />
            <span>INGENIERÍA <span className="text-[#66fcf1]">Y TELEMÁTICA</span></span>
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            Formando profesionales líderes en la integración de hardware y software, conectando el mundo físico con el digital para resolver problemas reales en el agro y la industria.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#66fcf1] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#66fcf1] transition-colors"><Award className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">La Carrera</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/carrera" className="hover:text-white transition-colors">Malla Curricular</a></li>
            <li><a href="/laboratorios" className="hover:text-white transition-colors">Laboratorios Tecnológicos</a></li>
            <li><a href="/docentes" className="hover:text-white transition-colors">Cuerpo Docente</a></li>
            <li><a href="/repositorio" className="hover:text-white transition-colors">Investigación y Tesis</a></li>
          </ul>
        </div>

        {/* Column 3: Projects */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Investigación y Vínculo</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/los-vergeles" className="hover:text-white transition-colors">Proyecto Los Vergeles</a></li>
            <li><a href="/los-vergeles" className="hover:text-white transition-colors">Monitoreo IoT en Tiempo Real</a></li>
            <li><a href="/comunidad" className="hover:text-white transition-colors">Reportes Comunitarios</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Convenios Internacionales</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contacto</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[#66fcf1]" />
            <span>Campus Universitario, Pabellón de Ingeniería</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-[#66fcf1]" />
            <span>+593 (02) 2999-500</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-[#66fcf1]" />
            <span>contacto.iot@universidad.edu.ec</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-900 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Ingeniería y Telemática. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Políticas de Privacidad</a>
          <a href="#" className="hover:underline">Términos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
