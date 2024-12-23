import { TitleSection } from '@/components/ui/typography';
import { getBlogs } from '@/lib/action/blog';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CardBlogs = dynamic(() => import('@/components/blog/BlogCard'), { ssr: true });

const Blogs = async () => {
  const blogPromise = getBlogs({ page: 1, limit: 3 });

  const [blogs] = await Promise.all([blogPromise]);
  return (
    <section id="blog" className="max-w-screen-xl mx-auto min-h-screen mt-10">
      <TitleSection>News Blog</TitleSection>
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-10 mt-5">
        <CardBlogs data={blogs?.data || []} />
      </div>
      <div className="flex justify-center">
        <Link href={'/blog'} prefetch={true} className="mt-10 py-2 px-4 bg-slate-800 hover:bg-slate-950 text-white  rounded-md">
          Read more
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
