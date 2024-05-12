import { ReactNode } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

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

interface Link {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}

const iconSX = {
  fontSize: 35,
  mx: 1,
};

// would be nice to find a way to scale the icons
// without having to repeat the same code
// for every icon
// but somwhow I can't make it work
const links: Link[] = [
  {
    href: "https://github.com/devspaceship",
    ariaLabel: "Github",
    icon: <GitHubIcon sx={iconSX} />,
  },
  {
    href: "https://www.linkedin.com/in/devspaceship/",
    ariaLabel: "LinkedIn",
    icon: <LinkedInIcon sx={iconSX} />,
  },
  {
    href: "https://www.instagram.com/devspaceship/",
    ariaLabel: "Instagram",
    icon: <InstagramIcon sx={iconSX} />,
  },
  {
    href: "https://twitter.com/devspaceship",
    ariaLabel: "Twitter",
    icon: <TwitterIcon sx={iconSX} />,
  },
];

const SocialLinks = () => (
  <>
    {links.map((link) => (
      <SocialLink key={link.href} href={link.href} ariaLabel={link.ariaLabel}>
        {link.icon}
      </SocialLink>
    ))}
  </>
);

export default SocialLinks;
