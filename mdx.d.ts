declare module "*.mdx" {
  import { PostMetadata, MDXComponent } from "@/posts/types";
  export default MDXComponent;
  export const meta: PostMetadata;
}
