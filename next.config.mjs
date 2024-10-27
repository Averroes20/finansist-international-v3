/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: './public/**/*',
      },
    ],
  },
};

export default nextConfig;
