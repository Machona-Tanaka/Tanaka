import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ErrorPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="error-page">
      <h1>Error - 404</h1>
      <p>Page not found</p>
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default ErrorPage;