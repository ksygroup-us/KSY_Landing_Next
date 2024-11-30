/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  output: 'standalone',
  trailingSlash: true,
}

module.exports = nextConfig
