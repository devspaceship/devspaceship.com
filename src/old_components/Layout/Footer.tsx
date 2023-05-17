import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/Layout.module.scss";

import { FC, ReactNode } from "react";

type SocialLinkProps = {
  href: string;
  children?: ReactNode;
};

const SocialLink: FC<SocialLinkProps> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer: FC = () => (
  <footer className={styles.footer}>
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
  </footer>
);

export default Footer;
