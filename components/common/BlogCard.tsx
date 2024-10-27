import { images } from '@/constants/images';
import Image from 'next/image';
import { memo } from 'react';
import { TypographyH5, TypographyP } from '../ui/typography';
import { Button } from '../ui/button';
import { blogs } from '@/lib/data/blogs';
import { formatDate } from '@/utils/format-date';
import { ChevronRight } from 'lucide-react';

const BlogCard = memo(({ item }: { item: (typeof blogs)[0] }) => (
  <div className="flex flex-col gap-1 border border-gray-200 rounded-lg shadow max-w-sm mx-auto relative">
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
      <Image src={item.cover} alt={`Cover image of ${item.title}`} loading="lazy" className="w-full object-cover h-72 rounded-lg" />
      <Image
        src={images.DefaultAvatar}
        alt={`Avatar for ${item.title}`}
        loading="lazy"
        className="w-12 h-12 object-cover rounded-full absolute bottom-[-20px] left-5 shadow-lg"
      />
      <p className="text-white text-sm absolute top-4 right-5 px-3 py-1 bg-gray-500 rounded-full uppercase" aria-label={`Category: ${item.category}`}>
        {item.category}
      </p>
    </div>
    <div className="p-4 space-y-3 flex-grow">
      <TypographyH5 className="font-bold">{item.title}</TypographyH5>
      <article className="text-sm md:text-base text-gray-700">{item.resume}</article>
      <Button className="bg-transparent text-blue-600 font-bold p-0 hover:bg-transparent hover:text-blue-800 focus:bg-transparent focus:text-gray-500 mt-2">
        Read More{' '}
        <span aria-hidden="true">
          <ChevronRight />
        </span>
      </Button>
    </div>
    <div className="px-8 py-2 border-t">
      <TypographyP className="text-gray-600 text-sm mb-2">{formatDate(item.createdAt)}</TypographyP>
    </div>
  </div>
));

BlogCard.displayName = 'BlogCard';

export default BlogCard;
