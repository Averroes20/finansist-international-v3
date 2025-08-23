"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { TitleSection } from "../ui/typography";
import BlogCard from "./BlogCard";
import Image from "next/image";
import Link from "next/link";
import { BlogListResponses } from "@/lib/type/blog";

type BlogListProps = {
  blogs: BlogListResponses
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const { language } = useLanguage();
  return (
    <div className='max-w-screen-xl mx-auto '>
      <TitleSection>{language === 'en' ? 'Our Blog' : 'Blog Kami'}</TitleSection>
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
  )
}

export default BlogList