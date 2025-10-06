/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');
const gracefulFs = require('graceful-fs');

// Применяем graceful-fs
gracefulFs.gracefulify(fs);

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    'react-hotkeys-hook',
    'ra-ui-materialui',
    'react-admin',
    '@mui/material',
    '@emotion/react'
  ],
  experimental: {
    outputFileTracing: false,
    esmExternals: 'loose'
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
      config.externals.push('react-hotkeys-hook');
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      // Принудительно используем CommonJS версию если доступна
    };
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
  async redirects() {
    return [
      {
        source: '/news',
        destination: '/blog',
        permanent: true, // 301 редирект
      },
      {
        source: '/news/:slug*',
        destination: '/blog/:slug*',
        permanent: true, // 301 редирект
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dev.deus.team',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dev.deus.team',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4554',
        pathname: '/uploads/**',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:4554', // Переменные окружения, доступные на клиенте
  },
};

module.exports = nextConfig;

