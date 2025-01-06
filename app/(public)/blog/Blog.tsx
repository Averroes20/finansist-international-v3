'use client';
import BlogCard from '@/components/blog/BlogCard';
import BlogCategory from '@/components/blog/BlogCategory';
import PaginationComponent from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import { TitleSection } from '@/components/ui/typography';
import { useDebounce } from '@/hooks/use-debounce';
import { getBlogs } from '@/lib/action/blog';
import type { Blog } from '@/lib/type/blog';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const limit = 4;
const BlogPage = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState({
    title: '',
    category: '',
    year: '',
    month: '',
    author: '',
  });
  const queryTitle = useDebounce(search.title, 500);

  const fetchBlog = useCallback(async (page: number, title: string, category: string) => {
    const select = category === 'null' ? '' : category;
    const response = await getBlogs({ page, limit, title, category: select });
    setData(response.data);
    setMeta((prev) => ({
      ...prev,
      totalPages: response.meta.totalPages,
    }));
  }, []);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, title: event.target.value });
  };

  useEffect(() => {
    fetchBlog(meta.page, queryTitle, search.category);
  }, [fetchBlog, meta.page, queryTitle, search.category]);

  useEffect(() => {
    setMeta((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [search.title, search.category]);

  return (
    <section className="md:max-w-screen-xl mx-auto flex items-center min-h-screen pt-28 md:pt-24">
      <div>
        <div className="relative">
          <TitleSection>New Blog</TitleSection>
          <div className="flex flex-col gap-x-0 gap-y-4 mb-4 md:gap-y-0 md:flex-row md:mb-0 md:gap-x-4 md:space-y-0 md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:right-0">
            <SearchInput value={search.title} onChange={handleSearch} placeholder="Search..." />
            <BlogCategory setSearch={setSearch} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 relative">
          {data.length > 0 ? (
            <BlogCard data={data} />
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
        <PaginationComponent meta={meta} handlePageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default BlogPage;
