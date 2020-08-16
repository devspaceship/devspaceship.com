import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import styles from '../../styles/Layout.module.scss';

import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { FC } from 'react';

type SocialLinkProps = {
  href: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
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
