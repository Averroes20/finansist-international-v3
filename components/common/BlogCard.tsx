import { images } from '@/constants/images';
import { Blog } from '@/lib/type/blog';
import { formatDate } from '@/utils/format-date';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface BlogCardProps {
  data: Blog[];
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    data?.length > 0 &&
    data?.map((item) => (
      <div className="flex flex-col gap-1 border border-gray-200 rounded-lg shadow max-w-sm mx-auto relative" key={item.id}>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
          <Image
            src={item.cover}
            alt={`Cover image of ${item.title}`}
            loading="lazy"
            width={500}
            height={300}
            className="w-full object-cover h-72 rounded-lg"
          />
          <Image
            src={images.DefaultAvatar}
            alt={`Avatar for ${item.title}`}
            loading="lazy"
            className="w-12 h-12 object-cover rounded-full absolute bottom-[-20px] left-5 shadow-lg"
          />
          <p
            className="text-white text-sm absolute top-4 right-5 px-3 py-1 bg-gray-500 rounded-full uppercase"
            aria-label={`Category: ${item.category}`}
          >
            {item.category}
          </p>
        </div>
        <div className="p-4 space-y-3 flex-grow">
          <h5 className="font-bold text-2xl">{item.title}</h5>
          <article className="text-sm md:text-base text-gray-700">{item.resume}</article>
          <Link
            href={`/blog/${item.slug}`}
            aria-label={`Read more about ${item.title}`}
            title={`Read more about ${item.title}`}
            rel="noopener noreferrer"
            target="_blank"
            prefetch={true}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <span className="mr-1">Read More</span>
            <span aria-hidden="true">
              <ChevronRight />
            </span>
          </Link>
        </div>
        <div className="px-8 py-2 border-t">
          <p className="text-gray-600 text-sm mb-2">{formatDate(item.createdAt.toLocaleString())}</p>
        </div>
      </div>
    ))
  );
};

export default memo(BlogCard);
