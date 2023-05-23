import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

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
    className="hover:text-primary-300"
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
    <SocialLink
      href="https://www.instagram.com/devspaceship/"
      ariaLabel="Instagram"
    >
      <FontAwesomeIcon icon={faInstagram} size="2x" />
    </SocialLink>
    <SocialLink href="https://twitter.com/devspaceship" ariaLabel="Twitter">
      <FontAwesomeIcon icon={faTwitter} size="2x" />
    </SocialLink>
  </>
);

export default SocialLinks;
