import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // =========================================================================
    // 🚨 CRITICAL ARCHITECTURE RULE: DO NOT ENABLE IMAGE OPTIMIZATION 🚨
    // =========================================================================
    // This is set to 'true' intentionally based on past security incidents.
    // Enabling Next.js native image optimization allows attackers to perform 
    // CPU/RAM exhaustion attacks by spamming the /_next/image endpoint with 
    // randomized width/quality parameters for local files. It has also been 
    // historically exploited as an SSRF proxy to DDoS other networks.
    //
    // All image caching and optimization MUST be handled strictly at the 
    // infrastructure layer (Nginx / CDN), NEVER at the Node.js level.
    //
    // PR REVIEWERS: REJECT ANY PR THAT CHANGES THIS VALUE.
    // =========================================================================

    unoptimized: true, 
  },

  // Smart rewrites: work ONLY on dev machine
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
        },
      ];
    }
    // In production Next.js does not proxy, Nginx handles everything
    return [];
  },

  async headers() {
    return [
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Excellent baseline security for MVP
            value: [
              "default-src 'self'",
              // REMOVED 'unsafe-eval' and global unpkg.com
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com", // unpkg is less risky for CSS
              "img-src 'self' data: https: blob:",
              "font-src 'self' fonts.gstatic.com",
              "connect-src 'self' *.tile.openstreetmap.org",
              "frame-src 'self' *.google.com *.google.ru",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
