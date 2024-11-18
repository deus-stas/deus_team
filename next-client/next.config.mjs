/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Включает строгий режим React
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Перенаправление для API-запросов
        destination: 'http://localhost:4554/api/:path*', // URL вашего бэкенд-сервера
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/old-route', // Старая ссылка
        destination: '/new-route', // Новая ссылка
        permanent: true, // Постоянный редирект (HTTP 308)
      },
    ];
  },
  images: {
    domains: ['example.com', 'localhost'], // Разрешенные домены для изображений
  },
  webpack(config, { dev }) {
    // Добавление кастомных настроек Webpack
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Проверка изменений каждую секунду
        aggregateTimeout: 300, // Увеличение времени ожидания
      };
    }
    return config;
  },
};

export default nextConfig;
