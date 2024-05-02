"use client";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MouseEvent, SyntheticEvent, useState } from "react";
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

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        role="navigation"
      >
        <LinkTab label="Home" href="/" />
        <LinkTab label="Posts" href="/posts" />
      </Tabs>
    </Box>
  );
}

const NavBar = () => {
  return <NavTabs />;
};

export default NavBar;
