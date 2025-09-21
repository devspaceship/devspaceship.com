import { MetadataRoute } from "next";

const routes = [
	"",
	"/posts",
	"/posts/gridworld",
	"/posts/tesseract",
	"/posts/bluesky",
	"/posts/elevator",
];

export default function sitemap(): MetadataRoute.Sitemap {
	return routes.map((route) => ({
		url: `https://devspaceship.com${route}`,
		lastModified: new Date(),
	}));
}
