// components/ThemeButton.tsx
"use client";

import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface ThemeButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ children, sx, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      {...props}

      sx={{
        textTransform: "none",
        borderRadius: 3,
        boxShadow: 3,
        color: "#fff",

        ...sx, 
      }}
    >
      {children}
    </Button>
  );
};

export default ThemeButton;
