import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import './LoadingSpinner.scss'; // Optional for custom styling

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {boolean} [props.fullPage=false] - Whether to cover full page
 * @param {string} [props.size='40px'] - Size of the spinner
 * @param {string} [props.color='primary'] - Color of the spinner
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  fullPage = false, 
  size = '40px', 
  color = 'primary' 
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={fullPage ? '100vh' : '100px'}
      width={fullPage ? '100vw' : '100%'}
    >
      <CircularProgress 
        size={size} 
        color={color} 
      />
    </Box>
  );
};

export default LoadingSpinner;