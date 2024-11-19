import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Aktifkan jika ANALYZE=true
})({
  images: {
    domains: [], // Isi dengan domain yang Anda izinkan untuk optimisasi gambar
  },
  reactStrictMode: true,
  swcMinify: true,
});

export default nextConfig;
