/** @type {import('next').NextConfig} */

// const path = require('path');
// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
  // dest: "public",
  // swSrc: "./public/sw.js",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
//   buildExcludes: [/middleware-manifest.json$/],
//   disable: process.env.NODE_ENV !== "production",
// });

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  crossOrigin: 'anonymous',
  output:"standalone",
  logging: {
    fetches: {
        fullUrl: true
    }
  },
  images: {
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
        config.resolve.fallback = { 
          ...config.resolve.fallback, 
          net: false, os: false,fs:false,
          tls:false,
          canvas:false,
          child_process:false
        };
      }

      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   '@': path.resolve(__dirname, './@'),
      //   'src': path.resolve(__dirname, './components'),
      // };
      

    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    
  },
}


module.exports = nextConfig;
