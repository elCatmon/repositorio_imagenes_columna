import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth(); // Obtiene el usuario del contexto

    return user ? element : <Navigate to="/login" />; // Redirige a login si no hay usuario
};

export default PrivateRoute;
