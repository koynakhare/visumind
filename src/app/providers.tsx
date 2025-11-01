"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline, StyledEngineProvider } from "@mui/material";
import theme from "@/theme";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="top-right" reverseOrder={false} />
          <Provider store={store}>
            {children}
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  );
}
