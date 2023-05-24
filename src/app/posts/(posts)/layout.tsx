import "katex/dist/katex.min.css";
import "@highlightjs/cdn-assets/styles/github-dark.min.css";

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="container prose prose-invert mx-auto my-7 max-w-none p-3 prose-headings:text-primary-300 prose-img:mx-auto">
      {children}
    </article>
  );
};

export default PostLayout;
