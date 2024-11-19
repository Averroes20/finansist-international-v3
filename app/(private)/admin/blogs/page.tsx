import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BlogsAdmin = dynamic(() => import('./Blog'));

export const metadata: Metadata = {
  title: 'Blogs | Finansist International',
  description: 'Blogs of Finansist International',
};

const Blog = () => {
  return <BlogsAdmin />;
};

export default Blog;
