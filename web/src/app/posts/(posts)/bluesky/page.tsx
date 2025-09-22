import type { Metadata } from "next";
import BlueSkyMDX, { meta } from "@/posts/bluesky.mdx";

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

const BlueSkyPage = () => {
	return <BlueSkyMDX />;
};

export default BlueSkyPage;
