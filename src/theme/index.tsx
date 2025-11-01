// theme.ts
import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import palette from "./palette";
import MuiMenu from "./overrides/MuiMenu";
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      hover: string;
      background: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      hover?: string;
      background?: string;
    };
  }
}

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiMenu,
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.gradient.primary,

          "& .MuiTableCell-root": {
            // color: "#fff",
            border:'none',
            background: '#f2ebf0ff',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
          },
        }),
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTableCell-root": {
            padding: '6px 16px',

            // letterSpacing: 0.5,
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: ({ theme }) => ({
          fontWeight: 500,
          boxShadow: "none",
          transition: "background 0.3s ease",
          "&:hover": {
            boxShadow: "none",
          },
        }),
      },
    },
  },
});

export default theme;
