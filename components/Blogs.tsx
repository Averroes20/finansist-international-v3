import { TitleSection } from '@/components/ui/typography';
import { getBlogs } from '@/lib/action/blog';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from './blog/BlogCard';
import { headers } from 'next/headers';

const Blogs = async () => {
  const headerlist = headers();
  const userAgent = headerlist.get('user-agent');
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent ?? '');
  const limit = isMobile ? 1 : 3;
  const blogPromise = getBlogs({ page: 1, limit });
  const [blogs] = await Promise.all([blogPromise]);
  return (
    <>
      <section id="blog" className="md:min-h-screen h-[80vh] flex justify-center items-center bg-[#f7f7f7]">
        <div className='max-w-screen-xl mx-auto '>
          <TitleSection>Our Blog</TitleSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 md:py-0 md:mt-5">
            {blogs.data.length > 0 ? (
              <BlogCard data={blogs.data} />
            ) : (
              <div className="w-screen h-[50vh] ">
                <Image
                  src="/images/blog-not-found.webp"
                  alt="no-data"
                  width={500}
                  height={500}
                  className="w-[350px] h-[350px] object-contain absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center ">
            <Link href={'/blog'} prefetch={true} className="mt-10 py-2 px-4 bg-slate-800 hover:bg-slate-950 text-white rounded-md">
              Read more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
