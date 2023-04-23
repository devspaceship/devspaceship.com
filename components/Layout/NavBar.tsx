import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
// import PersonIcon from '@mui/icons-material/Person'

import styles from '../../styles/Layout.module.scss'

import { FC } from 'react'

const NavBar: FC = () => (
  <nav className={styles.navbar}>
    <Link href="/" passHref>
      <HomeIcon fontSize="large" />
    </Link>
    <Link href="/posts" passHref>
      <SchoolIcon fontSize="large" />
    </Link>
    {/* <Link href="/resume" passHref>
      <PersonIcon fontSize="large" />
    </Link> */}
  </nav>
)

export default NavBar
