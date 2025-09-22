import { faFileLines, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { FC } from "react";

const NavBar: FC = () => (
	<nav className="py-6 motion-safe:animate-fade-in-from-top">
		<div className="container mx-auto flex justify-evenly">
			<Link href="/" className="hover:text-primary" aria-label="Home">
				<FontAwesomeIcon icon={faHouse} size="2x" />
			</Link>
			<Link href="/posts" className="hover:text-primary" aria-label="Posts">
				<FontAwesomeIcon icon={faFileLines} size="2x" />
			</Link>
		</div>
	</nav>
);

export default NavBar;
