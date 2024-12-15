import { getBlogs } from '@/lib/action/blog';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs({ page: 1, limit: 10000 });

  const blogUrls = blogs.data.map((blog) => {
    return {
      url: `https://finansist-international-beta.vercel.app/blog/${blog.slug}`,
      lastModified: new Date(blog.createdAt),
    };
  });
  return [
    {
      url: 'https://finansist-international-beta.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://finansist-international-beta.vercel.app/blog',
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
