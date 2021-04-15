import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextComponent({field, label, errors, name, type, variant}: any) {
    return (
        <TextField
        variant={variant}
        // margin="dense"
        fullWidth
        label={label}
        {...field}
        autoFocus
        type={type}
        helperText={errors[`${name}`] ? errors[`${name}`].message : null}
        error={errors[`${name}`]}
    />
    );
}