import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-okaidia.css";
import "../styles/globals.css";
config.autoAddCss = false;

import type { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Layout from "../components/Layout";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <title>Thomas Saint-Gérand</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Thomas Saint-Gérand" key="title" />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
