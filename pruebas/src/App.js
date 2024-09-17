import React from 'react';
//import { useNavigate } from 'react-router-dom'; // Asumiendo que usas react-router para navegación
//import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Conocenos from './components/Conocenos/Conocenos';
import Contacto from './components/Contacto/Contacto';
import Nosotros from './components/Nosotros/Nosotros';
import RecuperarContrasena from './components/RecuperarContrasena/RecuperarContrasena';
import SeguimientoDonacion from './components/SeguimientoDonacion/SeguimientoDonacion';
import Servicios from './components/Servicios/Servicios';
import TerminosCondiciones from './components/TerminosCondiciones/TerminosCondiciones';
import Register from './components/Register';
import Login from './components/Login';
import VisualizerPage from './components/VisualizerPage';
import Importar from './components/Importar';
import Donacion from './components/Donacion';
import PaginaInicio from './components/PaginaInicio/PaginaInicio';
import Fisica from './components/Fisica/Fisica';


function App() {
  
  //const navigate = useNavigate();

  return (
    <Router>
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/visualizador" element={<VisualizerPage />} />
      <Route path="/importar" element={<Importar />} />
      <Route path="/donacion" element={<Donacion />} />
      <Route path="/conocenos" element={<Conocenos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
      <Route path="/seguimientodonacion" element={<SeguimientoDonacion />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
      <Route path="/fisica" element={<Fisica />} />
        
      
    </Routes>
  </Router>
    /*<div className="app-container">
      <h1>Prueba de webservice</h1>
      <div className="service-cards-container">
        <div className="service-card bg-uno" onClick={() => navigate('/register')}>
          <h2>Registro</h2>
          <p>Realizar registro de usuario</p>
          <a href="/register">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/login')}>
          <h2>Acceder</h2>
          <p>Acceder a tu cuenta</p>
          <a href="/login">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/visualizador')}>
          <h2>Visualizador DICOM</h2>
          <p>Ver imágenes DICOM</p>
          <a href="/visualizador">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/importar')}>
          <h2>Donacion Fisica</h2>
          <p>Registrar donaciones fisicas</p>
          <a href="/importar">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/donacion')}>
          <h2>Donación Digital</h2>
          <p>Realizar una donación</p>
          <a href="/donacion">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
      <div className="content">
        <div className="thumbnail-gallery">
          {/* Aquí puedes colocar el componente de galería de miniaturas }
        </div>
        <div className="dicom-viewer-container">
          {/* Aquí puedes colocar el componente del visor DICOM }
        </div>
      </div>

    </div>
  */
  );
  
}

export default App;
