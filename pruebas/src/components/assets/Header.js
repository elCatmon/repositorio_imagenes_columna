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
          <img src="/imagenes/logo_bdmdm.png" alt="Logo BDMDM" className="logo" />
          <img src="/imagenes/logo_upp.png" alt="Logo BDMDM" className="logo" />
        </div>

        {/* Mostrar enlaces solo en pantallas grandes */}
        <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Inicio</a>
          <a href="/conocenos" className="nav-link">Conócenos</a>
          <a href="/contacto" className="nav-link">Contacto</a>
          <a href="/fisica" className="nav-link">Donación física</a>
          {isAuthenticated ? (
            <a href="/menu" className="nav-link">Menu del Usuario</a>
          ) : null}
          {isAuthenticated ? (
            <a href="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</a>
          ) : (
            <a href="/login" className="nav-link">Acceder</a>
          )}
        </div>
      </nav>

      {/* Mostrar menú desplegable si está abierto */}
      {isOpen && (
        <div className="menu-dropdown">
          <a href="/" className="nav-link">Inicio</a>
          <a href="/conocenos" className="nav-link">Conócenos</a>
          <a href="/contacto" className="nav-link">Contacto</a>
          <a href="/fisica" className="nav-link">Donación física</a>
          {isAuthenticated ? (
            <a href="/menu" className="nav-link">Menu del Usuario</a>
          ) : null}
          {isAuthenticated ? (
            <a href="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</a>
          ) : (
            <a href="/login" className="nav-link">Acceder</a>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
