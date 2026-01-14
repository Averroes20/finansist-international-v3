"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { TitleSection } from "../ui/typography";
import BlogCard from "./BlogCard";
import Image from "next/image";
import Link from "next/link";
import { BlogListResponses } from "@/lib/type/blog";
import { useEffect, useState } from "react";

type BlogListProps = {
  blogs: BlogListResponses
}



const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const { language } = useLanguage();
  const displayedBlogs = isMobile
  ? blogs.data.slice(0, 1)
  : blogs.data
  return (
    <div className="max-w-screen-xl mx-auto">
      <TitleSection>
        {language === 'en' ? 'Our Blog' : 'Blog Kami'}
      </TitleSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 md:mt-5">
        {displayedBlogs.length > 0 ? (
          <BlogCard data={displayedBlogs} />
        ) : (
          <div className="w-screen h-[50vh] relative">
            <Image
              src="/images/blog-not-found.webp"
              alt="no-data"
              width={500}
              height={500}
              className="w-[350px] h-[350px] object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList