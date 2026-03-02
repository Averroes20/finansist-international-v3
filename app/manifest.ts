import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Finansist International',
    short_name: 'Finansist',
    description: 'Financial & Business Consultant in Indonesia',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#020e16',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/logo-large.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
    ],
  }
}