const remarkMath = import("remark-math");
const rehypeKatex = import("rehype-katex");
const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
