import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import LaCarrera from './views/LaCarrera';
import OfertaAcademica from './views/OfertaAcademica';
import Docentes from './views/Docentes';
import Laboratorios from './views/Laboratorios';
import Investigacion from './views/Investigacion';
import Vinculacion from './views/Vinculacion';
import Semilleros from './views/Semilleros';
import LosVergeles from './views/LosVergeles';
import PortalComunidad from './views/PortalComunidad';
import Noticias from './views/Noticias';
import Repositorio from './views/Repositorio';
import Transparencia from './views/Transparencia';
import Contacto from './views/Contacto';
import MainPanel from './views/Panels/MainPanel';
import './App.css';

function App() {
  const [currentRole, setCurrentRole] = useState('publico');

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f8fafc] text-[#334155] antialiased">
        <Navbar currentRole={currentRole} setCurrentRole={setCurrentRole} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrera" element={<LaCarrera />} />
            <Route path="/oferta-academica" element={<OfertaAcademica />} />
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/laboratorios" element={<Laboratorios />} />
            <Route path="/investigacion" element={<Investigacion />} />
            <Route path="/vinculacion" element={<Vinculacion />} />
            <Route path="/semilleros" element={<Semilleros />} />
            <Route path="/los-vergeles" element={<LosVergeles />} />
            <Route path="/comunidad" element={<PortalComunidad />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/repositorio" element={<Repositorio />} />
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/panel" element={<MainPanel currentRole={currentRole} setCurrentRole={setCurrentRole} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
