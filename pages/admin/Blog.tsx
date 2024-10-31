'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { blogs } from '@/lib/data/blogs';
import { TypeBlog } from '@/lib/validation/schema-form-blog';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const BlogForm = dynamic(() => import('@/components/common/BlogForm'));
const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));

const BlogsAdmin = () => {
  const router = useRouter();

  const handleDelete = useCallback((id: number) => {
    console.log('Delete blog with id:', id);
  }, []);

  const handleAdd = useCallback((data: TypeBlog) => {
    console.log('Form add submitted:', data);
  }, []);

  const handleEdit = useCallback((data: TypeBlog) => {
    console.log('Form edit submitted:', data);
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div>
          <TypographyH2 className="text-3xl font-bold">Blogs</TypographyH2>
          <TypographyP className="text-gray-500">Welcome to your blogs</TypographyP>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search..." />
          <BlogForm onSubmit={handleAdd} title="Add" description="Add a new blog" trigger={<Button className="">Add Blog</Button>} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
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
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/blogs/${index}`);
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="flex gap-3">
                    <BlogForm
                      onSubmit={handleEdit}
                      data={{ ...item, cover: undefined }}
                      title="Edit"
                      description="Edit blog details"
                      trigger={<PenBox className="cursor-pointer" size={20} />}
                    />
                    <ActionDelete title="Delete" description="Are you sure you want to delete this blog?" onClick={() => handleDelete(index)} />
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
    </>
  );
};

export default BlogsAdmin;
