import React from 'react';
import './MenuAcceso.css';
import Footer from '../assets/Footer';
import Header from '../assets/Header';

const Fisica = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
        <div className="next-module">
        <Header/>
        </div>

          <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
    <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
        Opciones para usuarios registrados
    </h1>
    <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize:'20px', fontFamily:'Poppins' }}>
        Elige la opción que requieras
    </p>
</header>


<main className="max-w-6xl mx-auto py-10">
  {/* Contenedor para la primera fila */}
  <div className="grid-cols-3">

  <a href="/formulariodonacion" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Registro de donaciones</p>
        <p className="text-gray-500 mt-2"> Registra las donaciones fisicas</p>           
      </div>
    </a>

    <a href="/consultardonaciones" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-search"></i> Consulta las donaciones</p>
        <p className="text-gray-500 mt-2"> Consulta los registros de donaciones fisicos</p>           
      </div>
    </a>

    <a href="/donacion"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Donación de estudios digitales</p>
        <p className="text-gray-500 mt-2"> Dona tus estudios médicos para contribuir al conocimiento</p>           
      </div>
    </a>

    <a href="/importar"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Donación de estudios fisicos</p>
        <p className="text-gray-500 mt-2">Sube los archivos de las donaciones fisicas</p>           
      </div>
    </a>

    <a href="/visualizador" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-binoculars"></i> Visualizador de Archivos</p>
        <p className="text-gray-500 mt-2"> Explora estudios médicos</p>           
      </div>
    </a>

    <a href="/diagnosticos"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Diagnosticos</p>
        <p className="text-gray-500 mt-2">Emite diagnosticos de los estudios almacenados</p>           
      </div>
    </a>

    <a href="/dataset"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-download"></i> Conjunto de datos</p>
        <p className="text-gray-500 mt-2">Descarga el conjunto de datos</p>           
      </div>
    </a>

    <a href="/muestra"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-download"></i> Conjunto de datos muestra</p>
        <p className="text-gray-500 mt-2">Descarga el conjunto de datos de muestra</p>           
      </div>
    </a>

  </div>

         
</main>
<Footer />
    </div>
  );
}

export default Fisica;
