import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	experimental: {
		// typedRoutes: true,
		// mdxRs: true,
	},
	reactStrictMode: true,
};

const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-math"],
		rehypePlugins: [
			"rehype-slug",
			[
				"rehype-autolink-headings",
				{ behavior: "wrap", test: ["h2", "h3", "h4"] },
			],
			["rehype-katex", { strict: true, throwOnError: true }],
			"rehype-highlight",
		],
	},
});

export default withMDX(nextConfig);
