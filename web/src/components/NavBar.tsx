"use client";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import { MouseEvent, ReactElement, SyntheticEvent, useState } from "react";
import Link from "./Link";

function samePageLinkNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  );
}

interface LinkTabProps {
  label?: string;
  href: string;
  selected?: boolean;
  icon?: ReactElement;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab component={Link} aria-current={props.selected && "page"} {...props} />
  );
}

export function NavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== "click" ||
      samePageLinkNavigation(event as MouseEvent<HTMLAnchorElement>)
    ) {
      setValue(newValue);
    }
  };

  const iconSX = {
    fontSize: 40,
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        role="navigation"
        centered
      >
        <LinkTab aria-label="Home" href="/" icon={<HomeIcon sx={iconSX} />} />
        <LinkTab
          aria-label="Posts"
          href="/posts"
          icon={<ArticleIcon sx={iconSX} />}
        />
      </Tabs>
    </Box>
  );
}

const NavBar = () => {
  return <NavTabs />;
};

export default NavBar;
