// theme.ts
import { createTheme } from "@mui/material/styles";

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
 palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#42a5f5", light: "#e3f2fd" },
    error: { main: "#d32f2f" },
    gradient: {
      primary: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
      secondary: "linear-gradient(90deg, #1e88e5 0%, #64b5f6 100%)",
      hover: "linear-gradient(90deg, #bbdefb 0%, #e3f2fd 100%)",
      background: "linear-gradient(135deg, #f8fbff 0%, #eef2f6 100%)",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    chipColor: {
      primary: "#1976d2",
      secondary: "#e3f2fd",
      contrastText: "#1565c0",
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.gradient.primary,
          "& .MuiTableCell-root": {
            // color: "#fff",
            background: '#f2ebf0ff',


            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
          },
        }),
      },
    },
  },
});

export default theme;
