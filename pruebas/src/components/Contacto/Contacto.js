import React from 'react';
import { Link } from 'react-router-dom';
import './Contacto.css';
import Footer from '../Footer';
import Header from '../Header';

const Contacto = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
     <Header/>


<header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
<h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
   Contáctanos
</h1>
<p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize:'20px', fontFamily:'Poppins' }}>
Estamos aquí para ayudarte. Conoce a nuestro equipo de profesionales.
</p>
</header>

<main className="max-w-6xl mx-auto py-10">
  {/* Contenedor para la primera fila */}
  <div className="grid-cols-3">
    <div className="persona-card">
      <img src="/imagenes/oscar.jpeg" alt="Dr. Oscar Montiel Ross" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Dr. Oscar Montiel Ross</h2>
      <p className="text-gray-600 mt-2">Coordinador técnico CITEDI</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> oross@citedi.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 664 623 1344</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
    <div className="persona-card">
      <img src="/imagenes/maria.jpg" alt="Dra. María de los Ángeles Cosío León" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Dra. María de los Ángeles Cosío León</h2>
      <p className="text-gray-600 mt-2">Coordinadora técnica UPP</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> ma.cosio.leon@upp.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 771 547 7510</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
    <div className="persona-card">
      <img src="/imagenes/anabel.jpg" alt="Dra. Anabel Martínez Vargas" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Dra. Anabel Martínez Vargas</h2>
      <p className="text-gray-600 mt-2">Coordinadora Administrativa</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> anabel.martinez@upp.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 771 547 7510</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
  </div>

  {/* Contenedor para la segunda fila centrada */}
  <div className="grid-cols-2 mt-10">
    <div className="persona-card">
      <img src="/imagenes/tania.jpg" alt="Dra. Tania Inés Aparicio Monroy" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Dra. Tania Inés Aparicio Monroy</h2>
      <p className="text-gray-600 mt-2">Asesor Clínico UPP</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> taniaaparicio@upp.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 771 547 7510</p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
        <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-x-twitter fa-lg"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-github fa-lg"></i></a>
      </div>
    </div>
    <div className="persona-card">
      <img src="/imagenes/gener.jpeg" alt="Dr. Gener José Avilés Rodríguez" className="persona-img" />
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Dr. Gener José Avilés Rodríguez</h2>
      <p className="text-gray-600 mt-2">Asesor Clínico UABC</p>
      <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> aviles.gener@uabc.edu.mx</p>
      <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 646 152 8231</p>
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

export default Contacto;
