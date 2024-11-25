import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Enlaces de interés</h4>
          <ul>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/menu">Servicios</a></li>
            <li><a href="/documentos/AVISO_PRIVACIDAD.pdf" target="_blank" rel="noopener noreferrer">Políticas de privacidad</a></li>
            <li><a href="#">Programas de afiliación</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legales</h4>
          <ul>
            <li><a href="/documentos/TERMINOS_CONDICIONES.pdf" target="_blank" rel="noopener noreferrer" aria-label="Términos y Condiciones">
                   Términos y Condiciones
                </a></li>
            <li><a href="/documentos/AVISO_PRIVACIDAD.pdf" target="_blank" rel="noopener noreferrer" aria-label="Aviso de Privacidad">
                  Aviso de Privacidad
                </a></li>
            <li><a href="#">Asociado 3</a></li>
            <li><a href="#">Asociado 4</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Soporte</a></li>
            <li><a href="#">Contáctanos</a></li>
          </ul>
        </div>
      </div>
      <div>
        <p className='pC'>&copy; 2024 BMDM. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;