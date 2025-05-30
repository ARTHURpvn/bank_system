import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  distDir: "out",
  basePath: "",
};

export default nextConfig;
