import Blog from '@/pages/Blog';
import React from 'react';

export const metadata = {
  title: 'Blogs | Finansist International',
  description: 'Blog of Finansist International',
};

const Blogs = () => {
  return (
    <main className="px-5 min-h-screen">
      <Blog />
    </main>
  );
};

export default Blogs;
