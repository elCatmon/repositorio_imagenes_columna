import React from 'react';
import './MenuAcceso.css';
import Footer from '../Footer';
import Header from '../Header';

const Fisica = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
     <Header/>

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
    
    <a href="/visualizador" className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-binoculars"></i> Visualizador de Archivos</p>
        <p className="text-gray-500 mt-2"> Explora estudios médicos</p>           
      </div>
    </a>

    <a href="/Donacion"  className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6">           
      <div className="qr-card">
        <p className=" text-2xl text-gray-600 mt-2 font-semibold "><i className="fas fa-file-circle-plus"></i> Donación de estudios</p>
        <p className="text-gray-500 mt-2"> Dona tus estudios médicos para contribuir al conocimiento</p>           
      </div>
    </a>

  </div>

         
</main>
<Footer />
    </div>
  );
}

export default Fisica;
