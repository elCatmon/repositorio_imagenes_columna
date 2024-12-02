import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

// Rutas con carga inmediata
import Conocenos from './components/Conocenos/Conocenos';
import Contacto from './components/Contacto/Contacto';
import Nosotros from './components/Nosotros/Nosotros';
import Register from './components/Registro/Register';
import Login from './components/LOGIN/Login';

// Rutas con carga diferida
import VisualizerPage from './components/Visualizador/VisualizerPage';
import Donacion from './components/Donaciones/Donacion';
import PaginaInicio from './components/PaginaInicio/PaginaInicio';
import Fisica from './components/Fisica/Fisica';
import MenuAcceso from './components/MenuAcceso/MenuAcceso';
import Diagnostico from './components/Diagnosticos/DiagnosticosPage';
import Importar from './components/Donaciones/Importar'
import Dataset from './components/dataset/datasetDownload';
import ChangePassword from './components/CambiarContrasena/CambioContrasena';
import FormDonacion from './components/Donaciones/RegistroDonaciones';
import TablaDonaciones from './components/Donaciones/ConsultarDonaciones';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fisica" element={<Fisica />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/menu" element={<MenuAcceso />} />
          <Route element={<PrivateRoute />}>
            <Route path="/visualizador" element={<VisualizerPage />} />
            <Route path="/importar" element={<Importar />} />
            <Route path="/donacion" element={<Donacion />} />
            <Route path="/diagnosticos" element={<Diagnostico />} />
            <Route path="/dataset" element={<Dataset />} />
            <Route path="/formulariodonacion" element={<FormDonacion />} />
            <Route path="/consultardonaciones" element={<TablaDonaciones />} />
            <Route path="/cambiarcontrasena" element={<ChangePassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
