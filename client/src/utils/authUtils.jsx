// Auth constants and utilities
export const checkAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  return {
    isAuthenticated: !!token,
    isAdmin: role === 'admin'
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
  localStorage.removeItem('user');
  window.location.reload();
};

export const user = () => {
    const data = localStorage.getItem('user');
    return data;
}