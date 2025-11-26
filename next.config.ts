import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Разрешить картинки с любых HTTPS ресурсов (удобно для разработки)
      },
    ],
  },
};

export default nextConfig;