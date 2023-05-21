import Title from "@/components/Title";
import { PostMetadata } from "@/posts/types";
const posts_names = ["gridworld", "tesseract", "bluesky", "elevator"];

const Posts = async () => {
  const metas = await Promise.all(
    posts_names.reverse().map(async (name) => {
      const { meta } = (await import(`@/posts/${name}.mdx`)) as {
        meta: PostMetadata;
      };
      return meta;
    })
  );
  console.log(metas);
  return (
    <div>
      <div className="mt-6">
        <Title size={3}>Posts</Title>
      </div>
      {metas.map((meta) => {
        return (
          <div
            className="m-4 rounded-2xl bg-background-950 p-3"
            key={meta.slug}
          >
            <div className="text-xl text-primary-300">{meta.title}</div>
            <div className="mt-2">{meta.summary}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
