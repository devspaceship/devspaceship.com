import GridWorldMDX, { meta } from "@/posts/gridworld.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
  keywords: meta.tags,
  openGraph: {
    description: meta.summary,
  },
  twitter: {
    description: meta.summary,
  },
};

const GridWorldPage = () => {
  return <GridWorldMDX />;
};

export default GridWorldPage;
