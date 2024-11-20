import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [curp, setCurp] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [role, setRole] = useState(null);
  const [lastActivityTime, setLastActivityTime] = useState(new Date().getTime());
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Borra los datos de sesión y redirige a la página de inicio de sesión
    localStorage.removeItem('userID');
    localStorage.removeItem('curp');
    localStorage.removeItem('role');
    localStorage.removeItem('nombre');
    setIsAuthenticated(false);
    setUserID(null);
    setCurp(null);
    setNombre(null);
    setRole(null);
    navigate('/'); // Redirige a la página de login tras cerrar sesión
  }, [navigate]);

  useEffect(() => {
    // Función para actualizar el tiempo de la última actividad del usuario
    const updateLastActivityTime = () => {
      setLastActivityTime(new Date().getTime());
    };

    // Añade listeners para registrar la actividad del usuario
    window.addEventListener('mousemove', updateLastActivityTime);
    window.addEventListener('click', updateLastActivityTime);
    window.addEventListener('keydown', updateLastActivityTime);

    // Configura un intervalo para verificar el tiempo de inactividad
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      // Si han pasado más de 15 minutos desde la última interacción, cierra sesión
      if (currentTime - lastActivityTime > 900000) { // 15 minutos en milisegundos
        logout();
      }
    }, 1000);

    // Limpia los listeners y el intervalo al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', updateLastActivityTime);
      window.removeEventListener('click', updateLastActivityTime);
      window.removeEventListener('keydown', updateLastActivityTime);
      clearInterval(interval);
    };
  }, [lastActivityTime, logout]);

  useEffect(() => {
    // Verifica la autenticación en el inicio de la aplicación
    const userID = localStorage.getItem('userID');
    const curp = localStorage.getItem('curp');
    const role = localStorage.getItem('role');
    const nombre = localStorage.getItem('nombre');

    if (userID && curp && role && nombre) {
      // Si los datos de sesión son válidos, establece la autenticación
      setIsAuthenticated(true);
      setUserID(userID);
      setCurp(curp);
      setNombre(nombre);
      setRole(role);
      setLastActivityTime(new Date().getTime()); // Establece el tiempo de la última actividad al inicio
    }
  }, []);

  const login = (id, Curp, userRole, Nombre) => {
    // Guarda los datos en localStorage y actualiza el estado
    const currentTime = new Date().getTime();
    localStorage.setItem('userID', id);
    localStorage.setItem('curp', Curp);
    localStorage.setItem('role', userRole);
    localStorage.setItem('nombre', Nombre)
    setIsAuthenticated(true);
    setUserID(id);
    setCurp(Curp);
    setRole(userRole);
    setLastActivityTime(currentTime); // Inicia el tiempo de la última actividad al hacer login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userID, curp, role, nombre, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};