import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Статика не нуждается в оптимизации
  },
};

export default nextConfig;