import Footer from './Footer';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

export default Layout;
