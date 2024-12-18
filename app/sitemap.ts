import { DOMAIN_WEB } from '@/constants/env';
import { getBlogs } from '@/lib/action/blog';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs({ page: 1 });

  const blogUrls = blogs.data.map((blog) => {
    return {
      url: `${DOMAIN_WEB}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
    };
  });
  return [
    {
      url: `${DOMAIN_WEB}`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN_WEB}/blog`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
