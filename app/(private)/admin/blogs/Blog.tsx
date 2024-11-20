'use client';

import { createBlog, deleteBlog, fetchBlogs, updateBlog } from '@/action/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { Blog } from '@/lib/type/blog';
import { BlogType } from '@/lib/validation/schema-form-blog';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const BlogForm = dynamic(() => import('@/components/common/BlogForm'));
const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));

const limit = 10;

const BlogsAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [blogId, setBlogId] = useState<number | null>(null);

  const fetchDataBlogs = useCallback(async () => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(title && { title }),
      ...(category && { category }),
    }).toString();

    const data = await fetchBlogs(query);
    setBlogs(data.data);
    setTotalPages(data.meta.totalPages);
  }, [page, title, category]);

  useEffect(() => {
    fetchDataBlogs();
  }, [fetchDataBlogs]);

  useEffect(() => {
    setPage(1);
  }, [title, category]);

  const handleAdd = useCallback(
    async (data: BlogType) => {
      try {
        await createBlog(data);
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
        await updateBlog(blogId, data);
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

  return (
    <>
      <div className="space-y-4">
        <div>
          <TypographyH2 className="text-3xl font-bold">Blogs</TypographyH2>
          <TypographyP className="text-gray-500">Welcome to your blogs</TypographyP>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search by title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Search by category..." value={category} onChange={(e) => setCategory(e.target.value)} />
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
                    <Link href={`/blogs/${item.slug}`} prefetch={true}>
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
      <div className="flex justify-between items-center my-4">
        <Button disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
          Next
        </Button>
      </div>
    </>
  );
};

export default BlogsAdmin;
