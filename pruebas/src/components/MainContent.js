import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <div className="main-content">
      <h1 className="main-title">Servicios</h1>
      <div className="services-grid">
        <div className="service-card bg-uno">
          <h2>Donación</h2>
          <p>Realizar una donación</p>
          <a href="/donacion">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-tertiary">
          <h2>Seguimiento de Donación</h2>
          <p>Revisar el estado de la donación</p>
          <a href="/seguimiento-donacion">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-quinary">
          <h2>Exploración</h2>
          <p>Explorar datos médicos</p>
          <a href="/exploracion">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card bg-sixth">
          <h2>Estadísticas</h2>
          <p>Ver estadísticas médicas</p>
          <a href="/estadisticas">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
        <div className="service-card" style={{ backgroundColor: '#d1c2cb' }}>
          <h2>Cambio de Diagnóstico</h2>
          <p>Actualizar el diagnóstico médico</p>
          <a href="/cambio-diagnostico">Ir a la liga <i className="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
