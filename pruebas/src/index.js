import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import VisualizerPage from './components/VisualizerPage';
import Importar from './components/Importar';
import Donacion from './components/Donacion';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/visualizador" element={<VisualizerPage />} />
      <Route path="/importar" element={<Importar />} />
      <Route path="/donacion" element={<Donacion />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
