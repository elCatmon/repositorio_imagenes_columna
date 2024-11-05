import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const [lastActivityTime, setLastActivityTime] = useState(new Date().getTime());
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Borra los datos de sesión y redirige a la página de inicio de sesión
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    setUserID(null);
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
      // Si han pasado más de 10 minutos desde la última interacción, cierra sesión
      if (currentTime - lastActivityTime > 600000) {
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
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();

    console.log('Verificando autenticación:', loginTime, currentTime);

    // Si han pasado más de 10 minutos desde el inicio de sesión, cierra sesión
    if (loginTime && currentTime - loginTime > 600000) {
      logout();
    } else if (loginTime) {
      // Si el tiempo de sesión es válido, establece la autenticación
      setIsAuthenticated(true);
      setUserID(localStorage.getItem('userID'));
      setRole(localStorage.getItem('role'));
      setLastActivityTime(currentTime); // Establece el tiempo de la última actividad al inicio
    }
  }, [logout]);

  const login = (id, userRole) => {
    // Guarda los datos en localStorage y actualiza el estado
    const currentTime = new Date().getTime();
    localStorage.setItem('userID', id);
    localStorage.setItem('role', userRole);
    localStorage.setItem('loginTime', currentTime);
    setIsAuthenticated(true);
    setUserID(id);
    setRole(userRole);
    setLastActivityTime(currentTime); // Inicia el tiempo de la última actividad al hacer login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userID, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};