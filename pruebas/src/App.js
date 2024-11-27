import React, { Suspense, lazy } from "react";
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
const VisualizerPage = lazy(() => import("./components/Visualizador/VisualizerPage"));
const Importar = lazy(() => import("./components/Donaciones/Importar"));
const Donacion = lazy(() => import("./components/Donaciones/Donacion"));
const PaginaInicio = lazy(() => import("./components/PaginaInicio/PaginaInicio"));
const Fisica = lazy(() => import("./components/Fisica/Fisica"));
const MenuAcceso = lazy(() => import("./components/MenuAcceso/MenuAcceso"));
const Diagnostico = lazy(() => import("./components/Diagnosticos/DiagnosticosPage"));
const RevisionDiagnostico = lazy(() => import("./components/Diagnosticos/RevisionDiag"));
const Dataset = lazy(() => import("./components/dataset/datasetDownload"));
const ChangePassword = lazy(() => import("./components/CambiarContrasena/CambioContrasena"));
const FormDonacion = lazy(() => import("./components/Donaciones/RegistroDonaciones"));
const TablaDonaciones = lazy(() => import("./components/Donaciones/ConsultarDonaciones"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fisica" element={<Fisica />} />
            <Route path="/conocenos" element={<Conocenos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/menu" element={<MenuAcceso />} />

            {/* Rutas privadas */}
            <Route element={<PrivateRoute />}>
              <Route path="/visualizador" element={<VisualizerPage />} />
              <Route path="/importar" element={<Importar />} />
              <Route path="/donacion" element={<Donacion />} />
              <Route path="/diagnosticos" element={<Diagnostico />} />
              <Route path="/revision-diagnosticos" element={<RevisionDiagnostico />} />
              <Route path="/dataset" element={<Dataset />} />
              <Route path="/formulariodonacion" element={<FormDonacion />} />
              <Route path="/consultardonaciones" element={<TablaDonaciones />} />
              <Route path="/cambiarcontrasena" element={<ChangePassword />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
