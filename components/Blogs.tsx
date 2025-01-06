import { TitleSection } from '@/components/ui/typography';
import { images } from '@/constants/images';
import { getBlogs } from '@/lib/action/blog';
import { formatDate } from '@/utils/format-date';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Blogs = async () => {
  const blogPromise = getBlogs({ page: 1, limit: 3 });
  const [blogs] = await Promise.all([blogPromise]);
  return (
    <section id="blog" className="max-w-screen-xl mx-auto md:min-h-screen h-[80vh] flex justify-center items-center">
      <div>
        <TitleSection>Our Blog</TitleSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {blogs?.data?.length > 0 &&
            blogs?.data?.map((item, index) => (
              <div
                className={`flex flex-col gap-1 border border-gray-200 rounded-lg shadow max-w-sm mx-auto relative ${
                  index === 0 ? 'block' : 'hidden md:block'
                }`}
                key={item.id}
              >
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                  <Image
                    src={item.cover}
                    alt={`Cover image of ${item.title}`}
                    loading="lazy"
                    width={500}
                    height={300}
                    className="w-full object-cover h-56 lg:h-64 rounded-lg"
                  />
                  <div className="absolute bottom-[-10px] left-5 flex items-center">
                    <Image
                      src={images.DefaultAvatar}
                      alt={`Avatar for ${item.title}`}
                      loading="lazy"
                      className="w-12 h-12 object-cover rounded-full shadow-lg"
                    />
                  </div>
                  <h1
                    className="text-white text-xs lg:text-base absolute top-4 right-5 px-3 py-1 bg-gray-500 rounded-full uppercase"
                    aria-label={`Category: ${item.category}`}
                  >
                    {item.category}
                  </h1>
                </div>
                <div className="p-4 space-y-3 flex-grow">
                  <h1 className="font-bold text-xl lg:text-2xl line-clamp-2 overflow-hidden">{item.title}</h1>
                  <article className="text-sm sm:text-base lg:text-lg text-gray-700 line-clamp-3 md:line-clamp-4 lg:line-clamp-5 overflow-hidden">
                    {item.resume}
                  </article>
                  <Link
                    href={`/blog/${item.slug}`}
                    aria-label={`Read more about ${item.title}`}
                    title={`Read more about ${item.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    prefetch={true}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <span className="mr-1 text-sm lg:text-base">Read more</span>
                    <span>
                      <ChevronRight size={16} />
                    </span>
                  </Link>
                </div>
                <div className="px-8 py-2 border-t">
                  <p className="text-gray-600 text-sm mb-2">{formatDate(item.createdAt.toString())}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center">
          <Link href={'/blog'} prefetch={true} className="mt-10 py-2 px-4 bg-slate-800 hover:bg-slate-950 text-white rounded-md">
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
