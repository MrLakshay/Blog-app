import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUserRole } from '../services/authService';

const PrivateRoute = ({ children, roleRequired }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getCurrentUserRole();
  console.log(userRole)
  if (roleRequired && userRole !== roleRequired) {
    console.log("role requ",roleRequired)
    console.log(userRole)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
