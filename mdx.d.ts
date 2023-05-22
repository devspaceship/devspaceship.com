import { PostMetadata, MDXComponent } from "@/posts/types";
declare module "*.mdx" {
  export default MDXComponent;
  export const meta: PostMetadata;
}
