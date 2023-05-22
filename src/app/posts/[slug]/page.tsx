// "use client";
import published_posts from "@/posts/published";
import { MDXComponent } from "@/posts/types";

const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { default: MDXPost } = (await import(`@/posts/${slug}.mdx`)) as {
    default: MDXComponent;
  };
  return <MDXPost />;
};

export default Post;

export const generateStaticParams = () => {
  return published_posts.map((slug) => ({ slug }));
};
