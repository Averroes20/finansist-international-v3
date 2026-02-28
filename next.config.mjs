/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/all-posts',
        destination: '/',
        permanent: true,
      },
      {
        source: '/uncategorized/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/#blog',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        port: '',
        pathname: '/tr',
      },
      {
        protocol: 'https',
        hostname: 'fqwledoycwqkufomdoph.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;