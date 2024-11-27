import React from 'react';
import './MenuAcceso.css';
import Footer from '../assets/Footer';
import Header from '../assets/Header';
import { useAuth } from '../../AuthContext';

const MenuUsuarios = () => {
  const { role } = useAuth();
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen" >
      <Header />

      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
          Escritorio
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
          Elige una de las opciones que el repositorio tiene para ti
        </p>
      </header>
      {!role && (
        <p className="text-lg text-red-500 mt-4">Por favor, inicia sesión para acceder a más opciones.</p>
      )}

      <main className="max-w-6xl mx-auto py-10" onContextMenu={(e) => e.preventDefault()}>
        {/* Contenedor para la primera fila */}
        <div className="grid-cols-3">

          {['interno', 'administrador'].includes(role) && (
            <a href="/formulariodonacion" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className="text-2xl text-gray-600 mt-2 font-semibold"><i className="fas fa-file-circle-plus"></i> Registro de donaciones</p>
                <p className="text-gray-500 mt-2"> Registra las donaciones físicas</p>
              </div>
            </a>
          )}
          {['interno', 'administrador'].includes(role) && (
            <a href="/consultardonaciones" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-search"></i> Consulta las donaciones</p>
                <p className="text-gray-500 mt-2"> Consulta los registros de donaciones fisicos</p>
              </div>
            </a>
          )}

          {role && (
            <a href="/donacion" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Donación de estudios digitales</p>
                <p className="text-gray-500 mt-2"> Dona tus estudios médicos para contribuir al conocimiento</p>
              </div>
            </a>
          )}

          {['interno', 'administrador'].includes(role) && (
            <a href="/importar" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Donación de estudios fisicos</p>
                <p className="text-gray-500 mt-2">Sube los archivos de las donaciones fisicas</p>
              </div>
            </a>
          )}

          {['interno', 'administrador', 'medico', 'consultor'].includes(role) && (
            <a href="/visualizador" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-binoculars"></i> Visualizador de Archivos</p>
                <p className="text-gray-500 mt-2"> Explora estudios médicos</p>
              </div>
            </a>
          )}

          {['interno', 'administrador', 'medico'].includes(role) && (
            <a href="/diagnosticos" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Diagnosticos</p>
                <p className="text-gray-500 mt-2">Emite diagnosticos de los estudios almacenados</p>
              </div>
            </a>
          )}

          {['interno', 'administrador'].includes(role) && (
            <a href="/revision-diagnosticos" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Revision Diagnosticos</p>
                <p className="text-gray-500 mt-2">Revisa y realiza comentarios a los diagnosticos emitidos</p>
              </div>
            </a>
          )}

          {['interno', 'administrador'].includes(role) && (
            <a href="/dataset" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-download"></i> Conjunto de datos</p>
                <p className="text-gray-500 mt-2">Descarga el conjunto de datos</p>
              </div>
            </a>
          )}

          {role && (
            <a href="/cambiarcontrasena" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Cambiar contraseña</p>
                <p className="text-gray-500 mt-2"> Actualiza tu contraseña</p>
              </div>
            </a>
          )}

        </div>
      </main>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default MenuUsuarios;

