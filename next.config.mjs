const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    if (!process.env.BACKEND_URL) {
      return []
    }

    return [
      {
        source: '/api/admin/:path*',
        destination: `${process.env.BACKEND_URL.replace(/\/$/, '')}/api/admin/:path*`,
      },
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    webpackMemoryOptimizations: true,
  },
}

export default nextConfig
