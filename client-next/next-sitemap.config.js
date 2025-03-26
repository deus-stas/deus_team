// client-next/next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://deus.team',
    generateRobotsTxt: true, // optional
    sitemapSize: 7000,
};
  