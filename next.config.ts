// next.config.js

{/*const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig*/}
// next.config.js
/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['minio.sakachris.com'], // ✅ Allow MinIO image host
  },
};

module.exports = nextConfig;



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

