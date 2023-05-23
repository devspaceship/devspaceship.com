import published_posts from "@/posts/published";
import { PostMetadata } from "@/posts/types";
import Link from "next/link";

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
      <div className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
          Posts
        </h1>
      </div>
      {metas.map((meta) => {
        return (
          <Link
            key={meta.slug}
            href={`/post/${meta.slug}`}
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
