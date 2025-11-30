import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;