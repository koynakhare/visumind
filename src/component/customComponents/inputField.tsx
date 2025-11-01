"use client";

import React from "react";
import TextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
interface CustomTextFieldProps extends MuiTextFieldProps { }

const CustomTextField: React.FC<CustomTextFieldProps> = ({ sx, isSendIcon = false, ...props }) => {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      size="small"
      fullWidth
      sx={{
        mb: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "& input": {
            padding: "8px 12px",
          },
          "& fieldset": {
            borderRadius: 2,
          },
        },
        ...sx,
      }}
      InputProps={{
        endAdornment: isSendIcon && (
          <InputAdornment position="end">
            <IconButton type="submit" edge="end" color="primary">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />

  );
};


export default CustomTextField;
