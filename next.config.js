/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your actual image domain
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  }
}

module.exports = nextConfig
