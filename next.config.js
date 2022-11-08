/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})


const nextConfig = {
  reactStrictMode: true,
  env: {
    ROOT: __dirname,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}
export default withPWA(nextConfig)

// module.exports = nextConfig
