/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Перенаправление для API-запросов
        destination: 'http://localhost:4554/api/:path*', // URL вашего бэкенда
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@uploads'] = path.join(__dirname, 'uploads');
    return config;
  },
  images: {
    domains: ['example.com', 'localhost'], // Разрешенные домены для изображений
  },

  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:4554', // Переменные окружения, доступные на клиенте
  },
};

module.exports = nextConfig;

