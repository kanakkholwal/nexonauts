/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  output:"standalone",
  logging: {
    fetches: {
        fullUrl: false
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
}


module.exports = withPWA(nextConfig);
