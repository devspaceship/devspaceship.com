import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

const SocialLink = ({
	href,
	ariaLabel,
	children,
}: {
	href: string;
	ariaLabel: string;
	children?: ReactNode;
}) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="hover:text-primary"
		aria-label={ariaLabel}
	>
		{children}
	</a>
);

const SocialLinks = () => (
	<>
		<SocialLink href="https://github.com/devspaceship" ariaLabel="Github">
			<FontAwesomeIcon icon={faGithub} size="2x" />
		</SocialLink>
		<SocialLink
			href="https://www.linkedin.com/in/devspaceship/"
			ariaLabel="LinkedIn"
		>
			<FontAwesomeIcon icon={faLinkedin} size="2x" />
		</SocialLink>
		<SocialLink href="mailto:thomas@devspaceship.com" ariaLabel="Email">
			<FontAwesomeIcon icon={faEnvelope} size="2x" />
		</SocialLink>
	</>
);

export default SocialLinks;
