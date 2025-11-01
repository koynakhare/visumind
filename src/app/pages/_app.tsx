// pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "@/component/layout/index";
import { CssBaseline } from "@mui/material";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline /> {/* normalize CSS for MUI */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
