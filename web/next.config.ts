import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// 'unsafe-inline' is required for script-src and style-src because:
// - Next.js's App Router injects inline <script> tags to stream RSC
//   hydration payloads on every page (content differs per page/build,
//   can't be hash- or nonce-allowlisted without switching every route to
//   dynamic rendering).
// - KaTeX (math rendering in posts) emits inline style="..." attributes
//   per glyph to position them.
const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' https://www.googletagmanager.com 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data:",
	"font-src 'self'",
	"connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
	cacheComponents: true,
	experimental: {
		// typedRoutes: true,
		// mdxRs: true,
	},
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "Content-Security-Policy", value: contentSecurityPolicy },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
		];
	},
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
