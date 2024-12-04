'use client';

import BlogCategory from '@/components/blog/BlogCategory';
import PaginationComponent from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '@/lib/action/blog';
import { Blog } from '@/lib/type/blog';
import { BlogType } from '@/lib/validation/schema-form-blog';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const BlogForm = dynamic(() => import('@/components/blog/BlogForm'));
const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));

const limit = 10;
const BlogsAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState({
    title: '',
    category: '',
  });
  const [blogId, setBlogId] = useState<number | null>(null);
  const queryTitle = useDebounce(search.title, 500);

  const fetchDataBlogs = useCallback(async () => {
    const select = search.category === 'null' ? '' : search.category;
    const data = await getBlogs({ page: meta.page, limit, title: queryTitle, category: select });
    setBlogs(data.data);
    setMeta({ page: data.meta.page, totalPages: data.meta.totalPages });
  }, [meta.page, queryTitle, search.category]);

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
        formData.append('cover', data.cover);
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
        formData.append('cover', data.cover);

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
      <div className="space-y-4 mb-7">
        <div>
          <h2 className="tracking-tight first:mt-0 text-3xl font-bold">Blogs</h2>
          <p className="text-muted-foreground">Manage your blogs</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search by title..." value={search.title} onChange={(e) => setSearch({ ...search, title: e.target.value })} />
          <BlogCategory setSearch={setSearch} />
          <BlogForm onSubmit={handleAdd} title="Add" description="Add a new blog" trigger={<Button className="">Add Blog</Button>} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="min-w-[150px]">Cover</TableHead>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="min-w-[150px]">Author</TableHead>
              <TableHead className="min-w-[150px]">Category</TableHead>
            </TableRow>
          </TableHeader>
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <TableBody key={index} className="hover:bg-gray-100 h-[5px]">
                <TableRow className="hover:bg-gray-100 h-[5px]">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Image src={item.cover as string} alt={item.title} width={100} height={100} className="object-cover" />
                  </TableCell>
                  <TableCell className="cursor-pointer">
                    <Link rel="preload" href={`/blog/${item.slug}`} prefetch={true}>
                      {item.title}
                    </Link>
                  </TableCell>
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
                          cover: item.cover as string,
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
                <TableCell colSpan={4} className="text-center font-bold text-gray-500 text-md">
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
