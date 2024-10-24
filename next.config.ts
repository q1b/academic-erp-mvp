import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/faculty/:id',
        destination: '/faculty/:id/programs',
        permanent: true,
      },
      {
        source: '/faculty/:id/programs/:program',
        destination: '/faculty/:id/programs/:program/batches',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
