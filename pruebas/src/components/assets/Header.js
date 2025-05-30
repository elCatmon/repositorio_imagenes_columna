import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();          // Cierra la sesión
    navigate('/');     // Redirige a la página principal
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <nav className="navbar py-2 px-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center left-container">
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <a href="https://conahcyt.mx/" target="_blank" rel="noopener noreferrer">
            <img
              src="/imagenes/Logo_CONAHCYT.png"
              alt="Logo CONAHCYT"
              className="logo1"
              onContextMenu={(e) => e.preventDefault()}
            />
          </a>
          <a href="https://www.citedi.mx/portal/" target="_blank" rel="noopener noreferrer">
            <img
              src="/imagenes/logo_citedi.png"
              alt="Logo CITEDI"
              className="logo2"
              onContextMenu={(e) => e.preventDefault()}
            />
          </a>
          <a href="https://www.upp.edu.mx/" target="_blank" rel="noopener noreferrer">
            <img
              src="/imagenes/logo_upp.png"
              alt="Logo UPP"
              className="logo"
              onContextMenu={(e) => e.preventDefault()}
            />
          </a>

        </div>

        {/* Mostrar enlaces solo en pantallas grandes */}
        <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Inicio</a>
          <a href="/conocenos" className="nav-link">Conócenos</a>
          <a href="/contacto" className="nav-link">Contacto</a>
          <a href="/fisica" className="nav-link">Donación física</a>
          <a href="/menu" className="nav-link">Menu</a>
          {isAuthenticated ? (
            <a href="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</a>
          ) : (
            <a href="/login" className="nav-link">Acceder</a>
          )}
        </div>
      </nav>

      {/* Mostrar menú desplegable si está abierto */}
      {isOpen && (
        <div className="menu-dropdown" style={{ top: '100px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a href="/" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Inicio</a>
          <a href="/conocenos" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Conócenos</a>
          <a href="/contacto" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Contacto</a>
          <a href="/fisica" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Donación física</a>
          <a href="/menu" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Menu del usuario</a>

          {isAuthenticated ? (
            <a href="/" onClick={handleLogout} className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Cerrar Sesión</a>
          ) : (
            <a href="/login" className="nav-link" style={{ fontSize: '20px', padding: '5px', textAlign: 'center' }}>Acceder</a>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;