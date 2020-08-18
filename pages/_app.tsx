import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import Layout from '../components/Layout';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
      integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
      crossOrigin="anonymous"
    ></link>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
