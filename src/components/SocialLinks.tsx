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
  children,
}: {
  href: string;
  children?: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary-300"
  >
    {children}
  </a>
);

const SocialLinks = () => (
  <>
    <SocialLink href="https://github.com/devspaceship">
      <FontAwesomeIcon icon={faGithub} size="2x" />
    </SocialLink>
    <SocialLink href="https://www.linkedin.com/in/devspaceship/">
      <FontAwesomeIcon icon={faLinkedin} size="2x" />
    </SocialLink>
    <SocialLink href="https://www.instagram.com/devspaceship/">
      <FontAwesomeIcon icon={faInstagram} size="2x" />
    </SocialLink>
    <SocialLink href="https://twitter.com/devspaceship">
      <FontAwesomeIcon icon={faTwitter} size="2x" />
    </SocialLink>
  </>
);

export default SocialLinks;
