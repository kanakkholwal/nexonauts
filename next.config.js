/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})


const nextConfig = {
  reactStrictMode: true,
  env: {
    ROOT: __dirname,
  }

}
module.exports = withPWA(nextConfig)

// module.exports = nextConfig
