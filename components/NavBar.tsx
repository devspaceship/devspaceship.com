import HomeIcon from '@material-ui/icons/Home';
import styles from '../styles/Layout.module.scss';

import { FC } from 'react';

const NavBar: FC = () => (
  <div className={styles.navbar}>
    <HomeIcon fontSize="large" />
  </div>
);

export default NavBar;
