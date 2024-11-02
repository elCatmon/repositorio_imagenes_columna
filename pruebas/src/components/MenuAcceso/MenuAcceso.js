import React from 'react';
import './MenuAcceso.css';
import Footer from '../assets/Footer';
import Header from '../assets/Header';
import { useAuth } from '../../AuthContext';

const MenuUsuarios = () => {
  const { role } = useAuth();
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <div className="next-module">
        <Header />
      </div>

      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
          Escritorio
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
          Elige una de las opciones que la biblioteca digital tiene para ti
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-10">
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
            <a href="/dataset" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-download"></i> Conjunto de datos</p>
                <p className="text-gray-500 mt-2">Descarga el conjunto de datos</p>
              </div>
            </a>
          )}

          {['interno', 'administrador', 'consultor'].includes(role) && (
            <a href="/muestra" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
              <div className="qr-card">
                <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-download"></i> Conjunto de datos muestra</p>
                <p className="text-gray-500 mt-2">Descarga el conjunto de datos de muestra</p>
              </div>
            </a>
          )}

        </div>

      </main>

      <div className="next-module">
        <div className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
          <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
            Sevicios digitales
          </h1>
          <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
            Accede a los servicios que tenemos para ti
          </p>
          <div className="grid-cols-3">
            {role && (
              <a href="/menu" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
                <div className="qr-card">
                  <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-exchange-alt"></i> Conversor de archivos</p>
                  <p className="text-gray-500 mt-2"> Convierte tus archivos dicom a formato jpg, png, xml entre otros</p>
                </div>
              </a>
            )}
            {role && (
              <a href="/menu" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
                <div className="qr-card">
                  <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-eye"></i> Visualizador DICOM</p>
                  <p className="text-gray-500 mt-2"> Visualiza tus archivos DICOM</p>
                </div>
              </a>
            )}
            {role && (
              <a href="/menu" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
                <div className="qr-card">
                  <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-pencil-alt"></i> Editor de imagenes</p>
                  <p className="text-gray-500 mt-2"> Realiza el revelado de tus imagenes</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MenuUsuarios;
