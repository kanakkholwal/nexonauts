/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  // swSrc: "./public/sw.js",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === "development",

});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {},
});


module.exports = nextConfig;
