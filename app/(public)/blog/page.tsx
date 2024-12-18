import { DOMAIN_WEB } from '@/constants/env';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BlogPage = dynamic(() => import('./Blog'));

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Search and read our blogs at Finansist International.',
  openGraph: {
    title: 'Blogs',
    description: 'Search and read our blogs at Finansist International.',
    type: 'website',
    locale: 'id_ID',
    url: `${DOMAIN_WEB}/blog`,
    siteName: 'Finansist International',
  },
};

const Blogs = () => {
  return (
    <main className="px-5 min-h-screen">
      <BlogPage />
    </main>
  );
};

export default Blogs;
