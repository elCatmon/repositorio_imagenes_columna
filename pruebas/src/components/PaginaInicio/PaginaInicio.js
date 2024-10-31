import React from 'react';

import './PaginaInicio.css';
import Footer from '../assets/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../assets/Header';



/*const NavLink = ({ href, icon, text }) => (
  <a href={href} className="flex items-center hover:text-teal-300 text-white transition-transform duration-300">
    <i className={`${icon} mr-2`}></i>
    <span>{text}</span>
  </a>
);

const SectionTitle = ({ children }) => (
  <h3 className="section-title text-4xl font-bold text-gray-800 mb-8">{children}</h3>
);

const Card = ({ children, className }) => (
  <div className={`card p-6 mb-4 bg-white shadow-lg rounded-lg ${className}`}>
    {children}
  </div>
);*/

function PaginaInicio() {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
        <div className="next-module">
        <Header/>
        </div>

      {/* Banner */}
      <section id="banner">
        <img className="banner-image" src="/imagenes/Principal.png" alt="Banner" />
    </section>



      <div className="section-container">
                <h3 className="section-title">Instituciones participantes del proyecto</h3>
                <div className="container">
                    <div className='cardHome'  >
                    <img src="/imagenes/logo_upp.png" alt="Logo UPP" className="logoupp ml-6" />
                    
                    <img src="/imagenes/logo_citedi.png" alt="Logo CITEDI" className="logocitedi ml-6" /> 

                    <img src="/imagenes/imssBienestar.png" alt="Logo IMSS-Bienestar" className="logoimss ml-6" />
                        
                    </div>
                    {/* <div className="image-container">
                        <img src="/imagenes/radiografia.jpg" alt="Persona mostrando una radiografía" />
                    </div> */}
                </div>
            </div>
      {/* About Section */}
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
                    {/* <div className="image-container">
                        <img src="/imagenes/radiografia.jpg" alt="Persona mostrando una radiografía" />
                    </div> */}
                </div>
            </div>

{/* <div className="section-container">
    <h3 className="section-title">Apoya Nuestra Causa</h3>
    <div className="container">
        <div className="image-container">
            <img src="/imagenes/sala_hospital.jpg" alt="Sala de hospital" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="card">
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
                El Centro de Investigación y Desarrollo de Tecnología Digital (CITEDI) del Instituto Politécnico Nacional (IPN), en colaboración con el Cuerpo Académico de Computo Suave y Analítica de Datos de la Universidad Politécnica de Pachuca (UPP) y la Universidad Autónoma de Baja California campus Ensenada, le invitan a participar con sus donaciones para la integración de la Biblioteca Digital Mexicana de Datos Médicos.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                <button className="btn-primary py-3 px-8 rounded-full text-white hover:bg-teal-800 focus:outline-none w-full md:w-auto mx-2 animate-bounce">Donación Presencial</button>
                <button className="btn-primary py-3 px-8 rounded-full text-white hover:bg-teal-800 focus:outline-none w-full md:w-auto mx-2 animate-bounce">Donación Digital</button>
            </div>
        </div>
    </div>
</div>

<div className="section-container">
    <h3 className="section-title">Seguimiento de Donaciones</h3>
    <div className="container">
        <div className="card">
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Realiza el seguimiento del estado de tu donación realizada a través de nuestros centros de acopio mediante el siguiente enlace:
            </p>
            <div className="flex justify-center mt-8">
                <button className="btn-primary py-3 px-8 rounded-full text-white hover:bg-blue-800 focus:outline-none animate-bounce">Iniciar Seguimiento</button>
            </div>
        </div>
        <div className="image-container">
            <img src="/imagenes/equipo_medico.jpg" alt="Equipo médico" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
    </div>
</div>
 */}
      <Footer />
    </div>
  );
}

export default PaginaInicio;