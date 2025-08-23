import { getBlogs } from '@/lib/action/blog';
import { headers } from 'next/headers';
import BlogList from './blog/BlogList';

const Blogs = async () => {
  const headerlist = headers();
  const userAgent = headerlist.get('user-agent');
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent ?? '');
  const limit = isMobile ? 1 : 3;
  const blogPromise = getBlogs({ page: 1, limit });
  const [blogs] = await Promise.all([blogPromise]);
  return (
    <>
      <section id="blog" className=" flex justify-center py-10 items-center bg-[#FFFFFF]">
        <BlogList blogs={blogs} />
      </section>
    </>
  );
};

export default Blogs;
