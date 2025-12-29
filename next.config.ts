import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "axiom.trade",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "axiomtrading.sfo3.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  // Compress output
  compress: true,
  // Optimize production builds
  swcMinify: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;
