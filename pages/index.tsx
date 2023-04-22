import Head from 'next/head'
import styles from '../styles/Home.module.css'
import profilePic from '../public/static/ppic.jpg'

import { FC } from 'react'
import Image from 'next/image'

const Home: FC = () => (
  <>
    <Head>
      <title>Science Decoder</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className={styles.ppic_wrapper}>
        <Image
          className={styles.ppic}
          src={profilePic}
          alt="Profile picture"
          height={200}
          width={200}
        />
      </div>
      <h1 className={styles.title}>Thomas Saint-Gérand</h1>
      <p className={styles.description}>
        This website is intented to be a repository of stuff that I find cool,
        interesting, visually pleasing or all of these. I try to answer specific
        questions with detailed examples.
      </p>
    </main>
  </>
)

export default Home
