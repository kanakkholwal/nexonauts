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
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  swcMinify: true,
  compiler: { styledComponents: { ssr: true } },
  crossOrigin: 'anonymous',
  output:"standalone",
  images: {
    // domains: ['res.cloudinary.com',"global-uploads.webflow.com" ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
});


module.exports = nextConfig;
