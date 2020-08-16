import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';

import styles from '../styles/Layout.module.scss';

import { FC } from 'react';

const NavBar: FC = () => (
  <nav className={styles.navbar}>
    <Link href="/">
      <HomeIcon fontSize="large" />
    </Link>
    <Link href="/posts">
      <SchoolIcon fontSize="large" />
    </Link>
    <Link href="/resume">
      <PersonIcon fontSize="large" />
    </Link>
  </nav>
);

export default NavBar;
