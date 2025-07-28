// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Auth } from '../../context/AuthProvider';

export const PrivateRoute = ({ adminOnly = false, children }) => {
  const { isAuthenticated, isAdmin } = Auth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};