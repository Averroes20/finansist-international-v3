'use client';
import BlogCard from '@/components/blog/BlogCard';
import BlogCategory from '@/components/blog/BlogCategory';
import PaginationComponent from '@/components/common/Pagination';
import { Input } from '@/components/ui/input';
import { TitleSection } from '@/components/ui/typography';
import { useDebounce } from '@/hooks/use-debounce';
import { getBlogs } from '@/lib/action/blog';
import type { Blog } from '@/lib/type/blog';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const limit = 4;
const Blog = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState({
    title: '',
    category: '',
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
    <section className="md:max-w-screen-xl mx-auto pt-24">
      <div className="">
        <div className="relative">
          <TitleSection>New Blog</TitleSection>
          <div className="flex flex-row mb-4 space-x-2 md:mb-0 md:space-x-4 md:space-y-0 md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:right-0">
            <div className="relative">
              <Input className="w-full" placeholder="Search..." type="text" aria-label="Search blogs" value={search.title} onChange={handleSearch} />
              <span className="absolute right-3 top-2/4 -translate-y-2/4">
                <Search fill="none" />
              </span>
            </div>
            <BlogCategory setSearch={setSearch} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <BlogCard data={data} />
        </div>
        <PaginationComponent meta={meta} handlePageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default Blog;
