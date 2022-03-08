import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import styles from "../../styles/Layout.module.scss";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { FC } from "react";

type SocialLinkProps = {
  href: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

const SocialLink: FC<SocialLinkProps> = ({ href, Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon fontSize="large" />
  </a>
);

const Footer: FC = () => (
  <footer className={styles.footer}>
    <SocialLink href="https://github.com/devspaceship" Icon={GitHubIcon} />
    <SocialLink
      href="https://www.linkedin.com/in/devspaceship/"
      Icon={LinkedInIcon}
    />
    <SocialLink
      href="https://www.instagram.com/devspaceship/"
      Icon={InstagramIcon}
    />
    <SocialLink href="https://twitter.com/adamspaceship" Icon={TwitterIcon} />
  </footer>
);

export default Footer;
