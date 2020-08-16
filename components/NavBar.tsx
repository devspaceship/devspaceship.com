import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';

import styles from '../styles/Layout.module.scss';

import { FC } from 'react';

const NavBar: FC = () => (
  <nav className={styles.navbar}>
    <HomeIcon fontSize="large" />
    <SchoolIcon fontSize="large" />
    <PersonIcon fontSize="large" />
  </nav>
);

export default NavBar;
