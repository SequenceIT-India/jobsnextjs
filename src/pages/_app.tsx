import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { createWrapper } from 'next-redux-wrapper';
import store from "../redux/store";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Router from 'next/router';
import NetworkInter from '../service/interceptor';
import ProgressBar from '@badrap/bar-of-progress';
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


const MyApp = (props: MyAppProps) => {


  useEffect(() => {
    fetch("https://geolocation-db.com/json/", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.text();
      })
      .then((location) => {
        let response = JSON.parse(location);
        sessionStorage.setItem("ip", response.IPv4);
        sessionStorage.setItem("country_code", response.country_code);
      });
    const progress = new ProgressBar({
      size: 2,
      color: 'rgb(0, 0, 0)',
      className: 'bar-of-progress',
      delay: 100,
    });
    Router.events.on('routeChangeStart', progress.start);
    Router.events.on('routeChangeComplete', progress.finish);
    Router.events.on('routeChangeError', progress.finish);
    return () => {
      Router.events.off('routeChangeStart', progress.start);
      Router.events.off('routeChangeComplete', progress.finish);
      Router.events.off('routeChangeError', progress.finish);
    };

  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Jobs horn | SohanIT Inc</title>
        <meta name="description" content="USA IT Jobs" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
NetworkInter.setupInterceptors(store);
export default createWrapper(() => store).withRedux(MyApp);

