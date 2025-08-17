import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Exclude Strapi CMS files from Next.js build
  experimental: {
    excludeDefaultMomentLocales: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude Strapi CMS files from webpack compilation
    config.externals = config.externals || [];
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
