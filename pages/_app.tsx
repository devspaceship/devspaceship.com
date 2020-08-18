import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import Layout from '../components/Layout';

import 'prismjs/themes/prism-okaidia.css';
import 'katex/dist/katex.min.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
