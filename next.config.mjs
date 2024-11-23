/** @type {import('next').NextConfig} */

// import withSerwistInit from '@serwist/next';

// const withSerwist = withSerwistInit({
//     cacheOnNavigation: true,
//     swSrc: "app/sw.ts",
//     swDest: "public/sw.js",
//     disable: process.env.NODE_ENV !== "production"
// });


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


// export default withSerwist(nextConfig);
export default (nextConfig);
