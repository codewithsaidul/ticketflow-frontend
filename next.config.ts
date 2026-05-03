import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    const isDev = process.env.NODE_ENV === "development";

    const backendUrl = isDev
      ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL
      : process.env.NEXT_PUBLIC_PROD_BACKEND_URL;

    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },

  reactCompiler: true,
};

export default nextConfig;
