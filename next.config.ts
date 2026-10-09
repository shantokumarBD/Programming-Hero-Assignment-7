import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  
  async rewrites() {
    return [
      {
        source: "/signin",
        destination: "/sign-in",
      },
      {
        source: "/signup",
        destination: "/sign-up",
      },
    ];
  },

  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
