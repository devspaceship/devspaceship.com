import published_posts from "@/posts/published";
import { MDXComponent } from "@/posts/types";

import "katex/dist/katex.min.css";
import "@highlightjs/cdn-assets/styles/github-dark.min.css";

const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { default: MDXPost } = (await import(`@/posts/${slug}.mdx`)) as {
    default: MDXComponent;
  };
  return (
    <article className="container prose prose-invert mx-auto p-3 prose-headings:text-primary-300">
      <MDXPost />
    </article>
  );
};

export default Post;

export const generateStaticParams = () => {
  return published_posts.map((slug) => ({ slug }));
};
