/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        port: '',
        pathname: '/tr',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
