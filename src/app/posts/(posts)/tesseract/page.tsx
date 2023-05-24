import TesseractMDX, { meta } from "@/posts/tesseract.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
};

const TesseractPage = () => {
  return <TesseractMDX />;
};

export default TesseractPage;
