import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "ui/card";
import published_posts from "@/posts/published";
import type { PostMetadata } from "@/posts/types";

export const metadata: Metadata = {
	title: "Posts",
};

const Posts = async () => {
	"use cache";
	const metas = await Promise.all(
		published_posts.map(async (name) => {
			const { meta } = (await import(`@/posts/${name}.mdx`)) as {
				meta: PostMetadata;
			};
			return meta;
		}),
	);
	return (
		<div>
			<div className="mt-6">
				<h1 className="text-center text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
					Posts
				</h1>
			</div>
			{metas.map((meta) => {
				return (
					<Link
						key={meta.slug}
						href={`/posts/${meta.slug}`}
						aria-label={meta.title}
					>
						<Card className="mt-4">
							<CardHeader>
								<CardTitle className="text-primary">{meta.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{meta.summary}</p>
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</div>
	);
};

export default Posts;
