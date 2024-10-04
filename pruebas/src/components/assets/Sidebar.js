import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-active' : ''}`} id="sidebar">
      <nav>
        <ul>
          <li><i className="fas fa-user-secret mr-2"></i>Anonimización</li>
          <li><i className="fas fa-file-code mr-2"></i>DICOM_A_XML</li>
          <li><i className="fas fa-file-image mr-2"></i>DICOM_A_JPG</li>
          <li><i className="fas fa-file-import mr-2"></i>JPG_A_DICOM</li>
          <li>
            <a href="/visualizador" style={{ textDecoration: "none", color: "inherit" }}>
              <i className="fas fa-eye mr-2"></i> VISUALIZADOR
            </a>
          </li>
          <li>
            <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <i className="fas fa-sign-out-alt mr-2"></i> Terminar sesión
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
