import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import LaCarrera from './views/LaCarrera';
import Docentes from './views/Docentes';
import Laboratorios from './views/Laboratorios';
import LosVergeles from './views/LosVergeles';
import Repositorio from './views/Repositorio';
import PortalComunidad from './views/PortalComunidad';
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
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/laboratorios" element={<Laboratorios />} />
            <Route path="/los-vergeles" element={<LosVergeles />} />
            <Route path="/repositorio" element={<Repositorio />} />
            <Route path="/comunidad" element={<PortalComunidad />} />
            <Route path="/panel" element={<MainPanel currentRole={currentRole} setCurrentRole={setCurrentRole} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
