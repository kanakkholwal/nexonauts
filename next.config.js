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
  webpack: (config, { isServer }) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
      if (!isServer) {
        config.resolve.fallback = { ...config.resolve.fallback, 
          net: false, os: false,fs:false,
          tls:false,
          canvas:false,
          child_process:false
        };
      }

      

    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
});


module.exports = nextConfig;
