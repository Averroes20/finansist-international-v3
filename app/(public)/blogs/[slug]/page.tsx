import { fetchBlogById } from '@/action/action-blog';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DetailBlog = dynamic(() => import('@/pages/DetailBlog'));

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const blog = await fetchBlogById((await params).slug);
  const title = blog.title ? blog.title : 'Blogs | Finansist International';
  const desc = blog.resume ? blog.resume : 'Discover more about our blogs at Finansist International.';
  return {
    title: title,
    description: desc,
  };
};

const Detail = async ({ params }: Props) => {
  const blog = await fetchBlogById((await params).slug);
  return <DetailBlog data={blog} />;
};

export default Detail;
