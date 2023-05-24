/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // typedRoutes: true,
    // mdxRs: true,
  },
  reactStrictMode: true,
};

import nextMdx from "@next/mdx";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

const withMDX = nextMdx({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolink, { behavior: "wrap" }],
      rehypeKatex,
      rehypeHighlight,
    ],
  },
});

export default withMDX(nextConfig);
