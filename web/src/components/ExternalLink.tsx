import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

const ExternalLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-primary"
			aria-label="(opens in a new tab)"
		>
			{children} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
		</a>
	);
};

export default ExternalLink;
