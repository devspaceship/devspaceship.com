import type { Metadata } from "next";
import TesseractMDX, { meta } from "@/posts/tesseract.mdx";

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

const TesseractPage = () => {
	return <TesseractMDX />;
};

export default TesseractPage;
