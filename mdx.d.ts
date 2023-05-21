declare module "*.mdx" {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
  interface PostMetadata {
    slug: string;
    title: string;
    creation: string;
    updated: string;
    summary: string;
    categories: string[];
    tags: string[];
  }
  export const meta: PostMetadata;
}
