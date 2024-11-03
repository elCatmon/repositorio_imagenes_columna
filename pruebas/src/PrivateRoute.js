import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, userID } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check if authentication status is determined
    setAuthChecked(true);
  }, [isAuthenticated, userID]);

  // Render the outlet if authenticated, otherwise navigate to login
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
