import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import VisualizerPage from './components/VisualizerPage';
import Importar from './components/Importar';
import Donacion from './components/Donacion';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/visualizador" element={<VisualizerPage />} />
      <Route path="/" element={<Importar />} />
      <Route path="/" element={<Donacion />} />
      
    </Routes>
  </Router>
);
