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
  images: {
    domains: ['v3.deus.team', 'localhost'], // Разрешенные домены для изображений
  },

  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:4554', // Переменные окружения, доступные на клиенте
  },
};

module.exports = nextConfig;

