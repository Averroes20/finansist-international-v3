import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';

const BlogsAdmin = dynamic(() => import('./Blog'));

export const metadata: Metadata = {
  title: 'Blogs | Finansist International',
  description: 'Blogs of Finansist International',
};

const Blog = async () => {
  const session = await getServerSession(authOptions);

  return <BlogsAdmin session={session} />;
};

export default Blog;
