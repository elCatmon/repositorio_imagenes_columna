import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Conocenos from './components/Conocenos/Conocenos';
import Contacto from './components/Contacto/Contacto';
import Nosotros from './components/Nosotros/Nosotros';
import RecuperarContrasena from './components/RecuperarContrasena/RecuperarContrasena';
import SeguimientoDonacion from './components/SeguimientoDonacion/SeguimientoDonacion';
import TerminosCondiciones from './components/TerminosCondiciones/TerminosCondiciones';
import Register from './components/Register';
import Login from './components/Login';
import VisualizerPage from './components/VisualizerPage';
import Importar from './components/Importar';
import Donacion from './components/Donacion';
import PaginaInicio from './components/PaginaInicio/PaginaInicio';
import Diagnostico from './components/DiagnosticosPage';
import PrivateRoute from './routes/PrivateRoute';
import Menu from './components/MenuAcceso/MenuAcceso'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas privadas */}
          <Route path="/visualizador" element={<PrivateRoute element={<VisualizerPage />} />} />
          <Route path="/importar" element={<PrivateRoute element={<Importar />} />} />
          <Route path="/donacion" element={<PrivateRoute element={<Donacion />} />} />
          <Route path="/seguimientodonacion" element={<PrivateRoute element={<SeguimientoDonacion />} />} />
          <Route path="/diagnostico" element={<PrivateRoute element={<Diagnostico />} />} />
          <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
          {/* Rutas públicas */}
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
