import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Enlaces de interés</h4>
          <ul>
            <li><a href="/nosotros">Nosotros</a></li>
            <li>Servicios</li>
            <li>Políticas de privacidad</li>
            <li>Programas de afiliación</li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Asociados</h4>
          <ul>
            <li><a href="#">Asociado 1</a></li>
            <li><a href="#">Asociado 2</a></li>
            <li><a href="#">Asociado 3</a></li>
            <li><a href="#">Asociado 4</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Soporte</a></li>
            <li><a href="#">Contáctanos</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;