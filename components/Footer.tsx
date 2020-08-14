import GitHubIcon from '@material-ui/icons/GitHub';

const SocialLink = ({ href, Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon fontSize="large" />
  </a>
);

const Footer = () => (
  <footer>
    <SocialLink href="https://github.com/devspaceship" Icon={GitHubIcon} />
    {/* <SocialLink href=''/> */}
  </footer>
);

export default Footer;
