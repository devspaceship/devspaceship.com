import Footer from './Footer'
import NavBar from './NavBar'
import styles from '../../styles/Layout.module.scss'
import { FC, ReactNode } from 'react'
import Container from 'react-bootstrap/Container'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <NavBar />
    <main style={{ marginTop: '2rem' }}>
      <Container>{children}</Container>
    </main>
    <Footer />
  </div>
)

export default Layout
