import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static-first rendering: pages prerender at build time; MongoDB reads are cached
  // with `"use cache"` + tags (see src/lib/data) and invalidated by the actions that write.
  cacheComponents: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    // Remote hosts allowed through the Next.js image optimizer.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  experimental: {
    // Tree-shake the barrel files of the heaviest client libraries.
    optimizePackageImports: ["lucide-react", "motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
