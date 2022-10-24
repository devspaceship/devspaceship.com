import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypePrism from "@mapbox/rehype-prism";

// MDX Components
import Gridworld from "../../components/Gridworld";
import Tesseract from "../../components/Tesseract";
import EarthDensity from "../../components/Graphs/EarthDensity";
const components = {
  Gridworld,
  Tesseract,
  EarthDensity,
};

interface PostProps {
  mdx_source: MDXRemoteSerializeResult;
}

const Post = (props: PostProps) => {
  const { mdx_source } = props;
  return (
    <div className="mt-4">
      <MDXRemote {...mdx_source} components={components} />
    </div>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface Context {
  params: {
    slug: string;
  };
}

const getStaticProps = async (context: Context) => {
  const { slug } = context.params;
  const filename = fs.existsSync(path.join("posts", slug + ".mdx"))
    ? path.join("posts", slug + ".mdx")
    : path.join("posts", slug, "index.mdx");
  const raw_content = fs.readFileSync(filename, "utf-8");
  const { content } = matter(raw_content);
  const mdx_source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypePrism],
    },
  });

  return {
    props: {
      mdx_source,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default Post;

// TODO Put title head field in posts
// TODO Add Open Graph Protocol metadata
