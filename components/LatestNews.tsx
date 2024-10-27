import { blogs } from '@/lib/data/blogs';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import BlogCard from './common/BlogCard';
import { TypographyH2 } from './ui/typography';

const LatestNews = () => {
  return (
    <section className="max-w-screen-lg mx-auto pt-10 md:pt-20">
      <TypographyH2 className="text-center font-bold mb-5 md:mb-10">Latest News</TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((item, index) => (
          <BlogCard key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href={'/blogs'} className="mt-10 py-2 px-4 bg-black text-white  rounded-md">
          More Blogs
          <ChevronRight className="inline ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default LatestNews;
