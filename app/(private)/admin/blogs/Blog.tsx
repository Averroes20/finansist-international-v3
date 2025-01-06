'use client';

import BlogCategory from '@/components/blog/BlogCategory';
import BlogMonth from '@/components/blog/BlogMonth';
import HeaderAdmin from '@/components/common/HeaderAdmin';
import PaginationComponent from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '@/lib/action/blog';
import { Blog } from '@/lib/type/blog';
import { BlogType } from '@/lib/validation/schema-form-blog';
import { formatDate } from '@/utils/format-date';
import { PenBox, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const BlogForm = dynamic(() => import('@/components/blog/BlogForm'));
const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));

const limit = 5;
const BlogsAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogId, setBlogId] = useState<number | null>(null);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState({
    title: '',
    category: '',
    author: '',
    year: 0,
    month: '',
  });

  const [input, setInput] = useState({
    title: '',
    category: '',
    author: '',
    year: '',
    month: '',
  });

  const fetchDataBlogs = useCallback(async () => {
    const selectCategory = search.category === 'null' ? '' : search.category;
    const selectMonth = search.month === 'null' ? '' : search.month;

    try {
      const data = await getBlogs({
        page: meta.page,
        limit,
        title: search.title,
        category: selectCategory,
        author: search.author,
        month: selectMonth || undefined,
        year: search.year || undefined,
      });
      setBlogs(data.data);
      setMeta({ page: data.meta.page, totalPages: data.meta.totalPages });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, [meta.page, search]);

  const handleSearchClick = () => {
    setSearch({
      title: input.title,
      category: input.category,
      author: input.author,
      year: parseInt(input.year, 10) || 0,
      month: input.month,
    });
  };

  useEffect(() => {
    fetchDataBlogs();
  }, [fetchDataBlogs]);

  useEffect(() => {
    setMeta((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleAdd = useCallback(
    async (data: BlogType) => {
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('resume', data.resume);
        formData.append('article', data.article);
        formData.append('author', data.author);
        formData.append('category', data.category);
        if (data.cover) {
          formData.append('cover', data.cover);
        }
        await createBlog(formData);
        fetchDataBlogs();
      } catch (error) {
        console.error(error);
        alert(`Failed to add blog: ${error instanceof Error && error.message}`);
      }
    },
    [fetchDataBlogs]
  );

  const handleEdit = useCallback(
    async (data: BlogType) => {
      if (blogId === null) return;
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('resume', data.resume);
        formData.append('article', data.article);
        formData.append('author', data.author);
        formData.append('category', data.category);
        if (data.cover) {
          formData.append('cover', data.cover);
        }

        await updateBlog(formData, blogId);
        setBlogId(null);
        fetchDataBlogs();
      } catch (error) {
        console.error(error);
        alert(`Failed to update blog: ${error instanceof Error && error.message}`);
      }
    },
    [blogId, fetchDataBlogs]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteBlog(id);
        fetchDataBlogs();
      } catch (error) {
        console.error(error);
        alert('Failed to delete blog');
      }
    },
    [fetchDataBlogs]
  );

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <HeaderAdmin title="Blogs" description="Manage your blogs" />
      <div className="space-y-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput placeholder="Search by title..." value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} />
          <BlogCategory setSearch={setInput} />
          <BlogForm onSubmit={handleAdd} title="Add" description="Add a new blog" trigger={<Button className="">Add Blog</Button>} />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            <SearchInput
              className="col-span-1"
              placeholder="Search by author..."
              value={input.author}
              onChange={(e) => setInput({ ...input, author: e.target.value })}
            />
            <div className="flex gap-4 col-span-1">
              <SearchInput
                placeholder="Search by year..."
                type="number"
                value={input.year || ''}
                onChange={(e) => setInput({ ...input, year: e.target.value })}
              />
              <BlogMonth setSearch={setInput} />
            </div>
          </div>
          <Button className="bg-[#113870] hover:bg-[#0c2444] text-base" onClick={handleSearchClick}>
            Search <Search />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader className="text-base">
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="min-w-[150px]">Cover</TableHead>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="min-w-[150px]">Published</TableHead>
              <TableHead className="min-w-[150px]">Author</TableHead>
              <TableHead className="min-w-[150px]">Category</TableHead>
            </TableRow>
          </TableHeader>
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <TableBody key={item.id} className="hover:bg-gray-100 h-[5px] text-base">
                <TableRow className="hover:bg-gray-100 h-[5px]">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Image src={item.cover} alt={item.title} width={100} height={100} className="object-cover" />
                  </TableCell>
                  <TableCell className="cursor-pointer hover:text-indigo-700 hover:underline">
                    <Link rel="preload" href={`/blog/${item.slug}`} prefetch={true}>
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt.toISOString())}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 self-center">
                      <BlogForm
                        onSubmit={handleEdit}
                        data={{
                          article: item.article,
                          author: item.author,
                          category: item.category,
                          resume: item.resume,
                          title: item.title,
                          cover: item.cover,
                        }}
                        title="Edit"
                        description="Edit blog details"
                        trigger={<PenBox className="cursor-pointer" size={20} onClick={() => setBlogId(item.id)} />}
                      />
                      <ActionDelete title="Delete" description="Are you sure you want to delete this blog?" onClick={() => handleDelete(item.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center font-bold text-gray-500 text-md">
                  No blog found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <PaginationComponent meta={meta} handlePageChange={handlePageChange} />
    </>
  );
};

export default BlogsAdmin;
