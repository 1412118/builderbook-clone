import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "next/app";
import PropTypes from "prop-types";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: any) {
  return (
    <CacheProvider
      value={createCache({
        key: "css",
      })}
    >
      {/* <ThemeProvider theme={theme}> */}
      {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CssBaseline />
      {/* <Header {...pageProps} /> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </CacheProvider>
  );
}

export default MyApp;
