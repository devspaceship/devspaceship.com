import Link from "@/components/Link";
import Title from "@/components/Title";
import published_posts from "@/posts/published";
import { PostMetadata } from "@/posts/types";
import { Card, CardContent, Typography } from "@mui/material";
import { Metadata } from "next";
// import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
};

const Posts = async () => {
  const metas = await Promise.all(
    published_posts.map(async (name) => {
      const { meta } = (await import(`@/posts/${name}.mdx`)) as {
        meta: PostMetadata;
      };
      return meta;
    })
  );
  return (
    <div>
      <div>
        <Title>Posts</Title>
      </div>
      {metas.map((meta) => {
        return (
          <Link
            key={meta.slug}
            href={`/posts/${meta.slug}`}
            aria-label={meta.title}
          >
            <Card
              raised={true}
              sx={{
                margin: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" color="primary.main">
                  {meta.title}
                </Typography>
                <Typography sx={{ marginTop: 1 }}>{meta.summary}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
