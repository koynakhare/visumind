import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
  SelectProps,
} from "@mui/material";

interface CustomSelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: boolean;
  helperText?: string;
}

const ITEM_HEIGHT = 40;
const MENU_MAX_HEIGHT = 200;

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth error={error} variant="outlined" size="small" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: MENU_MAX_HEIGHT,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ height: ITEM_HEIGHT }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelectField;
