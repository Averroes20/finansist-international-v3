import dynamic from 'next/dynamic';
import Link from 'next/link';
import { TitleSection } from './ui/typography';
import { fetchBlogs } from '@/action/blog';

const CardBlogs = dynamic(() => import('./common/BlogCard'), { ssr: true });

const Blogs = async () => {
  const data = await fetchBlogs(`page=1&limit=3`);
  return (
    <section id="blog" className="max-w-screen-lg mx-auto pt-5 md:pt-20">
      <TitleSection>News Blog</TitleSection>
      <div className="flex flex-col space-y-10 mt-10">
        <CardBlogs data={data?.data || []} />
      </div>
      <div className="flex justify-center">
        <Link href={'/blogs'} prefetch={true} className="mt-10 py-2 px-4 bg-black text-white  rounded-md">
          More Blog
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
