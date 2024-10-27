'use client';
import BlogCard from '@/components/common/BlogCard';
import { Search } from '@/components/icons/asset-svg';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { blogs } from '@/lib/data/blogs';
import { Fragment, useState } from 'react';

const menuCategories = [
  { label: 'All', value: 'all' },
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Lifestyle', value: 'lifestyle' },
];

const Blog = () => {
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter berdasarkan kategori dan kata kunci pencarian
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = category === 'all' || blog.category === category;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.resume.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="md:max-w-screen-xl mx-auto py-10 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="col-span-4 order-2 md:order-1">
        <TypographyH2 className="text-center font-bold mb-5 md:mb-10 uppercase">Latest Blogs</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((item, index) => (
            <BlogCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="md:col-span-1 order-1 md:order-2 space-y-5">
        <div className="relative">
          <Input className="w-full" placeholder="Search..." type="text" aria-label="Search blogs" value={searchTerm} onChange={handleSearch} />
          <span className="absolute right-3 top-2/4 -translate-y-2/4">
            <Search fill="none" />
          </span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button variant="outline">Category Blogs</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {menuCategories.map((item) => (
                <Fragment key={item.value}>
                  <DropdownMenuItem onClick={() => handleCategory(item.value)}>
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <TypographyP>{category !== 'all' && `Category: ${category}`}</TypographyP>
        </div>
      </div>
    </section>
  );
};

export default Blog;
