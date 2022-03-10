import "../styles/globals.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-okaidia.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Layout from "../components/Layout";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <title>Science Decoder</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Science Decoder" key="title" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
