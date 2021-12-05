import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import store from "../redux/store";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/header/gl-header';

import Footer from '../components/footer/gl-footer';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Provider } from "react-redux";
import theme from '../styles/theme';
import '../styles/globals.scss';
import createEmotionCache from '../utils/createEmotionCache';
import "typeface-poppins";

import reportWebVitals from "../reportWebVitals";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Jobs horn | SohanIT Inc</title>
        <meta name="description" content="USA IT Jobs" />
        <link rel="shortcut icon" href="https://www.hottohire.com/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
reportWebVitals();
