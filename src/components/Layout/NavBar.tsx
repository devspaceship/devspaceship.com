import Link from "next/link";
import styles from "../../styles/Layout.module.scss";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons";

const NavBar: FC = () => (
  <nav className={styles.navbar}>
    <Link href="/" passHref>
      <FontAwesomeIcon icon={faHouse} size="2x" />
    </Link>
    <Link href="/posts" passHref>
      <FontAwesomeIcon icon={faGraduationCap} size="2x" />
    </Link>
    {/* <Link href="/resume" passHref>
    </Link> */}
  </nav>
);

export default NavBar;
