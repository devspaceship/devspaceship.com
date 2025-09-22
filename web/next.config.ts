import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		// typedRoutes: true,
		// mdxRs: true,
	},
	reactStrictMode: true,
};

// import nextMdx from "@next/mdx";
// import rehypeAutolink from "rehype-autolink-headings";
// import rehypeHighlight from "rehype-highlight";
// import rehypeKatex from "rehype-katex";
// import rehypeSlug from "rehype-slug";
// import remarkMath from "remark-math";
import createMDX from "@next/mdx";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
// }

const withMDX = createMDX({
	options: {
		remarkPlugins: [
			// 'remark-gfm',
			// ['remark-toc', { heading: 'The Table' }],
			"remark-math",
		],
		rehypePlugins: [
			"rehype-slug",
			["rehype-autolink-headings", { behavior: "wrap" }],
			["rehype-katex", { strict: true, throwOnError: true }],
			"rehype-highlight",
		],
	},
});

// const withMDX = nextMdx({
// 	options: {
// 		remarkPlugins: [remarkMath],
// 		rehypePlugins: [
// 			rehypeSlug,
// 			[rehypeAutolink, { behavior: "wrap" }],
// 			rehypeKatex,
// 			rehypeHighlight,
// 		],
// 	},
// });

export default withMDX(nextConfig);
