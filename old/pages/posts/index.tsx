import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import fs from "fs";
import matter from "gray-matter";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import path from "path";

interface PostsProps {
  posts: {
    slug: string;
    title: string;
    creation: string;
    updated: string;
    summary: string;
    categories: string[];
    tags: string[];
  }[];
}

const Posts: FC<PostsProps> = (props) => {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Thomas Saint-Gérand - Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
            <Card
              className="mt-3"
              style={{ backgroundColor: "var(--bs-dark)", cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.summary}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files
    .map((filename) => {
      if (!filename.endsWith(".mdx")) {
        filename = path.join(filename, "index.mdx");
      }
      const raw_content = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const { data: front_matter } = matter(raw_content);
      return front_matter;
    })
    .sort((post_a, post_b) => {
      const date_a = new Date(post_a.creation).valueOf();
      const date_b = new Date(post_b.creation).valueOf();
      return date_b - date_a;
    });

  return {
    props: {
      posts,
    },
  };
};
