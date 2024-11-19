'use client';
import { fetchBlogs } from '@/action/action-blog';
import BlogCard from '@/components/common/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypographyH2 } from '@/components/ui/typography';
import type { Blog } from '@/lib/type/blog';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const limit = 6;
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, title: event.target.value });
  };

  const fetchBlog = useCallback(async (page: number, title: string, category: string) => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(title && { title }),
      ...(category && { category }),
    }).toString();
    const response = await fetchBlogs(query);
    setData(response.data);
    setMeta((prev) => ({
      ...prev,
      totalPages: response.meta.totalPages,
    }));
  }, []);

  useEffect(() => {
    fetchBlog(meta.page, search.title, search.category);
  }, [fetchBlog, meta.page, search.title, search.category]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    setMeta((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [search.title, search.category]);

  return (
    <section className="md:max-w-screen-xl mx-auto py-10 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="col-span-4 order-2 md:order-1">
        <TypographyH2 className="text-center font-bold mb-5 md:mb-10 uppercase">Latest Blogs</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BlogCard data={data} />
        </div>
        <div className="flex justify-between items-center my-4">
          <Button disabled={meta.page <= 1} onClick={() => handlePageChange(meta.page - 1)}>
            Previous
          </Button>
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button disabled={meta.page >= meta.totalPages} onClick={() => handlePageChange(meta.page + 1)}>
            Next
          </Button>
        </div>
      </div>
      <div className="md:col-span-1 order-1 md:order-2 space-y-5">
        <div className="relative">
          <Input className="w-full" placeholder="Search..." type="text" aria-label="Search blogs" value={search.title} onChange={handleSearch} />
          <span className="absolute right-3 top-2/4 -translate-y-2/4">
            <Search fill="none" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Blog;
