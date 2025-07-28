import React, { createContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info' // 'error', 'warning', 'info', 'success'
  });

  const showNotification = (message, type = 'info') => {
    setNotification({ open: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// export const useNotification = () => useContext(NotificationContext);