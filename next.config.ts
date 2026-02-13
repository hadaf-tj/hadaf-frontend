import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Для оптимизации Docker образа
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