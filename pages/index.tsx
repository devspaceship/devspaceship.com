import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

import { FC } from 'react';

const Home: FC = () => (
  <Layout>
    <Head>
      <title>Science Decoder</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <img className={styles.ppic} src="/ppic.jpg" alt="Profile picture" />
      <h1 className={styles.title}>Science Decoder</h1>
      <p className={styles.description}>
        Hello, my name is Thomas Saint-Gérand. I am a French developer currently
        living, studying and working in Amsterdam, The Netherlands.
        <br />
        This website is intented to be a repository of stuff that I find cool,
        interesting, visually pleasing or all of these. I try to answer specific
        questions with detailed examples.
      </p>
      <p>
        This website is still under construction.
        <br />
        It does not contain the posts yet
      </p>
    </main>
  </Layout>
);

export default Home;
