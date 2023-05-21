import { PostMetadata } from "@/posts/types";
declare module "*.mdx" {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
  export const meta: PostMetadata;
}
