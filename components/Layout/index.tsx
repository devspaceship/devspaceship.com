import Footer from './Footer';
import NavBar from './NavBar';
import styles from '../../styles/Layout.module.scss';
import { FC, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
