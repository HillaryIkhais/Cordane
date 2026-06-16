import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '10.237.230.123',
    'thirty-goats-live.loca.lt',
    'real-women-hope.loca.lt',
    'khaki-clocks-decide.loca.lt'
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*' // Proxy to Backend
      }
    ]
  }
};

export default nextConfig;
