import BlogsAdmin from '@/pages/admin/Blog';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blogs | Finansist International',
  description: 'Blogs of Finansist International',
};

const Blog = () => {
  return <BlogsAdmin />;
};

export default Blog;
