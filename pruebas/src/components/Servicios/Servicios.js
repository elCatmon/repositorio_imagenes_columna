import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import MainContent from '../MainContent';
import './Servicios.css'; 

function Servicios() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`servicios ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <MainContent />
    </div>
  );
}

export default Servicios;


