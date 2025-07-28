import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText
} from '@mui/material';

const Select = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  fullWidth = true,
  size = 'small',
  ...props
}) => {
  return (
    <FormControl fullWidth={fullWidth} size={size} error={error}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default Select;