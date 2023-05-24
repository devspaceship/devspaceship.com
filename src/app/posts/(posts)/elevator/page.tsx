import ElevatorMDX, { meta } from "@/posts/elevator.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
};

const ElevatorPage = () => {
  return <ElevatorMDX />;
};

export default ElevatorPage;
