import { DOMAIN_WEB } from '@/constants/env';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${DOMAIN_WEB}/sitemap.xml`,
  };
}
