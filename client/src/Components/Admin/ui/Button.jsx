import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <LoadingButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      loading={loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </LoadingButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;