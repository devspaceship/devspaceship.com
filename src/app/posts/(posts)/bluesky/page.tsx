import BlueSkyMDX, { meta } from "@/posts/bluesky.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
};

const BlueSkyPage = () => {
  return <BlueSkyMDX />;
};

export default BlueSkyPage;
