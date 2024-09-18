import React, { useState } from 'react';
import './Nosotros.css';
import Footer from '../Footer';
import Header from '../Header';

const Nosotros = () => {
  return (

<div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
     <Header/>


<header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
<h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
   Nosotros
</h1>
<p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize:'20px', fontFamily:'Poppins' }}>
Descubre el talento y la dedicación detrás de nuestro equipo.
</p>
</header>

<main className="max-w-6xl mx-auto py-10">
  {/* Contenedor para la primera fila */}
  <div className="grid-cols-3">
    <div className="persona-card">
      <img src="/Imagenes/cesar.jpeg" alt="Cesar Andrés Ortega Herrera" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Cesar Andrés Ortega Herrera</h2>
      <p className="text-gray-600 mt-2">Estudiante de Ing. de Software</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> cesarortegaah@micorro.upp.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 123 456 789</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="https://www.linkedin.com/in/cesar-andres-ortega-herrera-ba7a81253" target="_blank" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="https://github.com/elCatmon" target="_blank" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
    <div className="persona-card">
      <img src="/Imagenes/dieter.jpeg" alt="Al Dieter Valderrabano Garcia" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Al Dieter Valderrabano Garcia</h2>
      <p className="text-gray-600 mt-2">Estudiante de Biomédica</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> dieter.vg@upp.edu.mx </p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 123 456 789</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
    <div className="persona-card">
      <img src="/Imagenes/Julian.png" alt="M. I. Julián Garibaldi" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">M. I. Julián Garibaldi</h2>
      <p className="text-gray-600 mt-2">Maestro en Ingeniería en Computación</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> julian.garibaldi@upp.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 345 678 901</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
  </div>
</main>
<Footer />
    </div>



    
  );
}

export default Nosotros;


