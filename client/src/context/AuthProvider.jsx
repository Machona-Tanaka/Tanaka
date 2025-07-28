// src/context/AuthProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import { checkAuthStatus, logout as authLogout } from '../utils/authUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => checkAuthStatus());

  const login = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    setAuthState({ isAuthenticated: true, isAdmin: role === 'admin' });
  };

  const logout = () => {
    authLogout();
    setAuthState({ isAuthenticated: false, isAdmin: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const Auth = () => {
  return useContext(AuthContext);
};