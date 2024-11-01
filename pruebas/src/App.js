// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Importa el AuthProvider
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
import Dataset from './components/dataset/datasetDownload';
import ChangePassword from './components/CambiarContrasena/CambioContrasena';
import Muestra from './components/dataset/datasetFijo';
import FormDonacion from './components/Donaciones/RegistroDonaciones';
import Editor from './components/Editor/Editor';
import TablaDonaciones from './components/Donaciones/ConsultarDonaciones';
import PrivateRoute from './PrivateRoute'; // Importa el componente PrivateRoute

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fisica" element={<Fisica />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/cambiarcontrasena" element={<ChangePassword />} />
          <Route 
            path="/visualizador" 
            element={
              <PrivateRoute>
                <VisualizerPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/importar" 
            element={
              <PrivateRoute>
                <Importar />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/donacion" 
            element={
              <PrivateRoute>
                <Donacion />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <PrivateRoute>
                <MenuAcceso />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/diagnosticos" 
            element={
              <PrivateRoute>
                <Diagnostico />
              </PrivateRoute>
            } 
          />
                    <Route 
            path="/dataset" 
            element={
              <PrivateRoute>
                <Dataset />
              </PrivateRoute>
            } 
          />
                    <Route 
            path="/muestra" 
            element={
              <PrivateRoute>
                <Muestra />
              </PrivateRoute>
            } 
          />
                    <Route 
            path="/formulariodonacion" 
            element={
              <PrivateRoute>
                <FormDonacion />
              </PrivateRoute>
            } 
          />
                    <Route 
            path="/editor" 
            element={
              <PrivateRoute>
                <Editor />
              </PrivateRoute>
            } 
          />
                    <Route 
            path="/consultardonaciones" 
            element={
              <PrivateRoute>
                <TablaDonaciones />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
  
}

export default App;
