import React from 'react';
import { TextField } from '@mui/material';

export default function TextFieldControl({ value,placeholder = '', size, label, name, variant, onChange, disabled=false, error = null }) {

    return (
        <TextField
            disabled={disabled}
            value={value}
            size={size}
            label={label}
            name={name}
            placeholder={placeholder}
            variant={variant}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    )
}