import type { Metadata } from "next";
import GridworldMDX, { meta } from "@/posts/gridworld.mdx";

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

const GridworldPage = () => {
	return <GridworldMDX />;
};

export default GridworldPage;
