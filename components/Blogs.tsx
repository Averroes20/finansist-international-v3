import { fetchBlogs } from '@/action/blog';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { TitleSection } from './ui/typography';

const CardBlogs = dynamic(() => import('./common/BlogCard'), { ssr: true });

const Blogs = async () => {
  const blogPromise = fetchBlogs(`page=1&limit=3`);

  const [blogs] = await Promise.all([blogPromise]);
  return (
    <section id="blog" className="max-w-screen-xl mx-auto min-h-screen mt-10 md:mt-20">
      <TitleSection>News Blog</TitleSection>
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-10 mt-5">
        <CardBlogs data={blogs?.data || []} />
      </div>
      <div className="flex justify-center">
        <Link href={'/blogs'} prefetch={true} className="mt-10 py-2 px-4 bg-slate-800 hover:bg-slate-950 text-white  rounded-md">
          More Blog
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
