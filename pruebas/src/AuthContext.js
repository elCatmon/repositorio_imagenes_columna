// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();

    console.log('Verificando autenticación:', loginTime, currentTime);

    if (loginTime && currentTime - loginTime > 600000) { // 10 minutos
      logout();
    } else if (loginTime) {
      setIsAuthenticated(true);
      setUserID(localStorage.getItem('userID'));
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const login = (id, userRole) => {
    const currentTime = new Date().getTime();
    localStorage.setItem('userID', id);
    localStorage.setItem('role', userRole);
    localStorage.setItem('loginTime', currentTime);
    setIsAuthenticated(true);
    setUserID(id);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    setUserID(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userID, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
