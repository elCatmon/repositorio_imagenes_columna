import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Conocenos from './components/Conocenos/Conocenos';
import Contacto from './components/Contacto/Contacto';
import Nosotros from './components/Nosotros/Nosotros';
import Register from './components/Registro/Register';
import Login from './components/LOGIN/Login';
import VisualizerPage from './components/Visualizador/VisualizerPage';
import Importar from './components/Donaciones/Importar';
import Donacion from './components/Donaciones/Donacion';
import PaginaInicio from './components/PaginaInicio/PaginaInicio';
import Fisica from './components/Fisica/Fisica';
import MenuAcceso from './components/MenuAcceso/MenuAcceso';
import Diagnostico from './components/Diagnosticos/DiagnosticosPage';
import Dataset from './components/dataset/datasetDownload'


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/visualizador" element={<VisualizerPage />} />
      <Route path="/importar" element={<Importar />} />
      <Route path="/donacion" element={<Donacion />} />
      <Route path="/conocenos" element={<Conocenos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/fisica" element={<Fisica />} />
      <Route path="/menu" element={<MenuAcceso />} />
      <Route path="/diagnosticos" element={<Diagnostico />} />
      <Route path="/dataset" element={<Dataset />} />
      
    </Routes>
  </Router>
  );
  
}

export default App;
