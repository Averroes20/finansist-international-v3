import { blogs } from '@/lib/data/blogs';
import { formatDate } from '@/utils/format-date';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TypographyH5 } from '../ui/typography';

const BlogCard: React.FC = () => {
  return blogs.map((item) => (
    <div className="flex flex-col md:flex-row md:space-x-10" key={item.id}>
      <div className="w-full md:w-1/3">
        <Image
          src={item.cover as string}
          alt={`Cover image of ${item.title}`}
          loading="lazy"
          width={260}
          height={260}
          className="object-cover bg-center rounded-lg"
        />
      </div>
      <div className="flex flex-col md:w-9/12 ">
        <div className="space-y-1 mt-4 md:mt-0 md:space-y-2 flex-1">
          <span className="text-black text-sm">{formatDate(item.createdAt.toLocaleString())}</span>
          <TypographyH5 className="font-bold">{item.title}</TypographyH5>
          <article className="text-sm md:text-base ">{item.resume}</article>
        </div>
        <Link
          // href={`/blogs/${item.slug}`}
          href={`/blogs/#`}
          aria-label="Read More"
          prefetch={true}
          className="flex items-center justify-start text-blue-600 font-bold hover:text-blue-800 mt-2"
        >
          <span aria-label="Read More">Read More</span>
          <span aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        </Link>
      </div>
    </div>
  ));
};

export default BlogCard;
