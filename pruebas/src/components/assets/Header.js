import React from 'react';
import './Header.css';

function Header({ toggleSidebar }) {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
    <nav className="navbar py-2 px-0 flex items-start justify-between shadow-lg">
       <div className="flex items-center">
         {/* <button className="menu-button transition-transform duration-300">
           <i 
             className="fas fa-bars" 
             style={{ 
               transition: 'transform 0.3s ease, color 0.3s ease' 
             }} 
             onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(20deg)'; e.currentTarget.style.color = '#55555'; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.color = '#666666'; }}
           ></i>
         </button> */}
         
         <img src="/imagenes/logo_upp.png" alt="Logo BDMDM" className="logo BDMDM" style={{ position: 'relative', left: '60px' }} />
         {/*<span className="title ml-4 text-lg font-semibold"> </span>
         <img src="/imagenes/upp.png" alt="Logo UPP" className="logo upp-logo ml-8" />
         <img src="/imagenes/logo_citedi.png" alt="Logo CITEDI" className="logo citedi-logo ml-8" />*/}
       </div>
       <div className="navbar-right flex items-center">
         <a href="/"
           className="nav-link transform hover:scale-110 transition-transform duration-300"
         >
           <i className="fas fa-home"></i> Inicio
         </a>
         <a href="/conocenos" 
           className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6"
         >
           <i className="fas fa-info-circle"></i> Conócenos
         </a>
         <a href="/contacto" 
           className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6"
         >
           <i className="fas fa-address-book"></i> Contacto
         </a>
         <a href="/fisica" 
           className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6"
         >
           <i className="fas fa-file-image"></i> Donación física
         </a>
         <a href="/login" 
           className="nav-link transform hover:scale-110 transition-transform duration-300 ml-6"
         >
           <i className="fas fa-sign-in-alt"></i> Acceder
         </a>
        
         
       </div>
     </nav>
     </div>
  );
}

export default Header;
