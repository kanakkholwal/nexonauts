/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  env: {
    ROOT: __dirname,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pwa: {
    dest: "public",
    sw: "/sw.js",
    swSrc: "service-worker.js",
    register: true,
    skipWaiting: true,
  },
}
module.exports = withPWA(nextConfig)

// module.exports = nextConfig
