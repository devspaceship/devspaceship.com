/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    mdxRs: false,
  },
  reactStrictMode: true,
};

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import nextMdx from "@next/mdx";

const withMDX = nextMdx({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX(nextConfig);
