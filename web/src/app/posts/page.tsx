import Title from "@/components/Title";
import published_posts from "@/posts/published";
import { PostMetadata } from "@/posts/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
};

const Posts = async () => {
  const metas = await Promise.all(
    published_posts.map(async (name) => {
      const { meta } = (await import(`@/posts/${name}.mdx`)) as {
        meta: PostMetadata;
      };
      return meta;
    })
  );
  return (
    <div>
      <div>
        <Title>Posts</Title>
      </div>
      {metas.map((meta) => {
        return (
          <Link
            key={meta.slug}
            href={`/posts/${meta.slug}`}
            aria-label={meta.title}
          >
            <div className="m-4 rounded-2xl bg-background-950 p-3">
              <div className="text-xl text-primary-300">{meta.title}</div>
              <div className="mt-2">{meta.summary}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
