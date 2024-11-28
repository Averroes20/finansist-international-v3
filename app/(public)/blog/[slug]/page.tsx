import { fetchBlogById } from '@/action/blog';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './style.css';

const DetailBlog = dynamic(() => import('./DetailBlog'));

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const blog = await fetchBlogById(params.slug);
  const title = blog.title ? blog.title : 'Blogs | Finansist International';
  const desc = blog.resume ? blog.resume : 'Discover more about our blogs at Finansist International.';
  return {
    title: title,
    description: desc,
  };
};

const Detail = async ({ params }: Props) => {
  const blog = await fetchBlogById(params.slug);

  return <DetailBlog data={blog} />;
};

export default Detail;
