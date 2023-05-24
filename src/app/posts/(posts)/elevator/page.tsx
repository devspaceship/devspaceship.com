import ElevatorMDX, { meta } from "@/posts/elevator.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
  keywords: meta.tags,
  openGraph: {
    description: meta.summary,
  },
  twitter: {
    description: meta.summary,
  },
};

const ElevatorPage = () => {
  return <ElevatorMDX />;
};

export default ElevatorPage;
