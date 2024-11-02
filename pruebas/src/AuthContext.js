// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (id, userRole) => {
    // Guarda los datos en localStorage y actualiza el estado
    const currentTime = new Date().getTime();
    localStorage.setItem('userID', id);
    localStorage.setItem('role', userRole);
    localStorage.setItem('loginTime', currentTime);
    setIsAuthenticated(true);
    setUserID(id);
    setRole(userRole);
  };

  const logout = () => {
    // Borra los datos de sesión y redirige a la página de inicio de sesión
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    setUserID(null);
    setRole(null);
    navigate('/login'); // Redirige a la página de login tras cerrar sesión
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
