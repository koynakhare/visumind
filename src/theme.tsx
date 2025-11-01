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
    primary: { main: "#7b2ff7" },
    secondary: { main: "#f107a3",light:'#f0afdaff' },
    gradient: {
      primary: "linear-gradient(90deg, #7b2ff7 0%, #f107a3 100%)",
      secondary: "linear-gradient(90deg, #a445b2 0%, #ff0066 100%)",
      hover: "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)",
      background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    },
    background: {
      default: "#fdf7ff",
      paper: "#fff0f6",
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
