import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to optimise local screenshots in /public/screenshots/
    localPatterns: [
      { pathname: '/screenshots/**', search: '' },
    ],
  },
  async headers() {
    // Baseline security headers applied to every route. These are cheap,
    // standards-aligned defaults that don't constrain how the app runs.
    // We deliberately do NOT set a strict Content-Security-Policy here
    // because Next 16 + GSAP + Vercel Analytics rely on inline scripts
    // and styles that would require nonces to lock down properly. That's
    // worth doing as a follow-up; this commit closes the easy wins.
    const baseSecurityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];
    return [
      {
        source: '/:path*',
        headers: baseSecurityHeaders,
      },
      {
        // Allow any third-party site to embed era widgets via iframe.
        // Main site pages keep the default X-Frame-Options: SAMEORIGIN.
        source: '/embed/:path*',
        headers: [
          ...baseSecurityHeaders,
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
