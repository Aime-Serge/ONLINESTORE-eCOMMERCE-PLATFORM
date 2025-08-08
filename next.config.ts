import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
//changes to next.config.ts to handle API proxying
// This configuration allows you to proxy API requests to a different server
// without exposing the API URL in your frontend code.
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ecom.sakachris.com/api/:path*', // Proxy to API
      },
    ];
  },
};

