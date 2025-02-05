/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');
const gracefulFs = require('graceful-fs');

// Применяем graceful-fs
gracefulFs.gracefulify(fs);

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    outputFileTracing: false,
  },
  images: { 
    domains: ['deus.team'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Перенаправление для API-запросов
        destination: 'http://localhost:4554/api/:path*', // URL вашего бэкенда
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@uploads'] = path.join(__dirname, 'uploads');
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push('@mui/icons-material');
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Применяется ко всем маршрутам
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'v3.deus.team',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'v3.deus.team',
        pathname: '**',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:4554', // Переменные окружения, доступные на клиенте
  },
};

module.exports = nextConfig;

