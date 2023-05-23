import Link from "next/link";

import { faFileLines, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const NavBar: FC = () => (
  <nav className=" bg-background-950 py-6">
    <div className="container mx-auto flex justify-evenly">
      <Link href="/" className="hover:text-primary-300" aria-label="Home">
        <FontAwesomeIcon icon={faHouse} size="2x" />
      </Link>
      <Link href="/posts" className="hover:text-primary-300" aria-label="Posts">
        <FontAwesomeIcon icon={faFileLines} size="2x" />
      </Link>
    </div>
  </nav>
);

export default NavBar;