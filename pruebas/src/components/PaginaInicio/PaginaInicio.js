import React from 'react';

import './PaginaInicio.css';
import Footer from '../assets/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../assets/Header';

function PaginaInicio() {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <div className="next-module">
        <Header />
      </div>

      {/* Banner */}
      <section id="banner">
        <img className="banner-image" src="/imagenes/Principal.png" alt="Banner" onContextMenu={(e) => e.preventDefault()}/>
      </section>

      <div className="section-container">
        <h3 className="section-title">Instituciones participantes del proyecto</h3>
        <div className="container">
          <div className='cardHome'  >
            
            <img src="/imagenes/logo_upp.png" alt="Logo UPP" className="logoupp"  onContextMenu={(e) => e.preventDefault()}/>
            <img src="/imagenes/logo_citedi.png" alt="Logo CITEDI" className="logocitedi" onContextMenu={(e) => e.preventDefault()}/>

          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="next-module" />
      <div className="section-container">
        <h3 className="section-title">¿Qué hacemos?</h3>
        <div className="container">
          <div className='cardHome'>

            <p className="text-lg leading-relaxed text-gray-700">
              Biblioteca Digital Mexicana de Estudios Paraclínicos en Imagenología es un ecosistema de datos diseñado para brindar acceso a imágenes radiográficas, densitometrías, ultrasonidos, tomografías axiales computarizadas y resonancias magnéticas de pacientes mexicanos, asociadas a datos clínicos. Este recurso apoya a profesionales de ciencias de la salud e ingenierías afines, tanto en formación de pregrado, especialidades y posgrado, con los siguientes objetivos:
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              • Tener acceso a estudios paraclínicos de imagenología, mediante los bancos generados por los servicios de salud en el Estado de Hidalgo, analizarlos para facilitar el entrenamiento visual en la interpretación de densidades radiológicas y medidas antropométricas en pacientes de diversas edades, para detectar alteraciones morfológicas causadas por procesos degenerativos, genéticos, congénitos y multifactoriales.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              • Proporcionar al personal de ingeniería un entrenamiento técnico vinculado a la clínica, adiestrando a los estudiantes en escenarios apegados a la realidad, al observar cada estudio y reconocer los planos anatómicos y proyección de imagenología en que fueron tomados cada uno de los estudios, para el desarrollo y optimización de equipos y algoritmos aplicados a estudios paraclínicos.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              • Obtener y ofrecer datos reales con características genéticas de la población mexicana, mediante los estudios paraclínicos para entrenar modelos de inteligencia artificial, diseñados para detectar anormalidades y sugerir alteraciones morfológicas, mediante la comparación de parámetros relacionados con la edad y el sexo de los individuos.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              • Esta plataforma representa una herramienta clave para el desarrollo de soluciones innovadoras en salud y tecnología.
            </p>
          </div>
        </div>
      </div>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default PaginaInicio;