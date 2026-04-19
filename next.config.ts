import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to optimise local screenshots in /public/screenshots/
    localPatterns: [
      { pathname: '/screenshots/**', search: '' },
    ],
  },
  async headers() {
    return [
      {
        // Allow any third-party site to embed era widgets via iframe.
        // Main site pages keep the default X-Frame-Options: SAMEORIGIN.
        source: '/embed/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *',
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
