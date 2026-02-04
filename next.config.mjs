/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fqwledoycwqkufomdoph.supabase.co',
        pathname: '/storage/v1/object/public/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
