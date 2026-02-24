import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Статика не нуждается в оптимизации
  },
  
  // Умные rewrites: работают ТОЛЬКО на твоем ноутбуке
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*',
        },
      ];
    }
    // На проде Next.js не делает проксирование, всё берет на себя Nginx
    return [];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Для MVP это отличный базовый уровень защиты
            value: [
              "default-src 'self'",
              // УБРАЛИ 'unsafe-eval' и глобальный unpkg.com
              "script-src 'self' 'unsafe-inline'", 
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com", // Для CSS unpkg менее опасен
              "img-src 'self' data: https: blob:",
              "font-src 'self' fonts.gstatic.com",
              "connect-src 'self' *.tile.openstreetmap.org",
              "frame-src 'self' *.google.com *.google.ru",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;