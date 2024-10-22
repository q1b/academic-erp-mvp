import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/academic-division/:id',
        destination: '/academic-division/:id/programs',
        permanent: true,
      },
      {
        source: '/academic-division/:id/programs/:program',
        destination: '/academic-division/:id/programs/:program/batches',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
