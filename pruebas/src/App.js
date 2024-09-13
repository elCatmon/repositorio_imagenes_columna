import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asumiendo que usas react-router para navegación
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Prueba de webservice</h1>
      <div className="service-cards-container">
        <div className="service-card bg-uno" onClick={() => navigate('/register')}>
          <h2>Registro</h2>
          <p>Realizar registro de usuario</p>
          <a href="/">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/login')}>
          <h2>Acceder</h2>
          <p>Acceder a tu cuenta</p>
          <a href="/">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/visualizador')}>
          <h2>Visualizador DICOM</h2>
          <p>Ver imágenes DICOM</p>
          <a href="/visualizador">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/importar')}>
          <h2>Importar Estudios</h2>
          <p>Importar nuevos estudios</p>
          <a href="/">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-uno" onClick={() => navigate('/donacion')}>
          <h2>Donación Digital</h2>
          <p>Realizar una donación</p>
          <a href="/">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
      <div className="content">
        <div className="thumbnail-gallery">
          {/* Aquí puedes colocar el componente de galería de miniaturas */}
        </div>
        <div className="dicom-viewer-container">
          {/* Aquí puedes colocar el componente del visor DICOM */}
        </div>
      </div>
    </div>
  );
}

export default App;
