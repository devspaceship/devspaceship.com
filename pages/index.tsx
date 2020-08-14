import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Science Decoder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.ppic} src="/ppic.jpg" alt="Profile picture" />
        <h1 className={styles.title}>Science Decoder</h1>
        <p className={styles.description}>
          Hello, my name is Thomas Saint-Gérand. I am a French developer
          currently living, studying and working in Amsterdam, The Netherlands.
          <br />
          This website is intented to be a repository of stuff that I find cool,
          interesting, visually pleasing or all of these. I try to answer
          specific questions with detailed examples.
        </p>
        <p>
          This website is still under construction.
          <br />
          It do not contain the posts yet
        </p>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}
