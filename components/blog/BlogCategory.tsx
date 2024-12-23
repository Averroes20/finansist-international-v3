import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data/categories';

interface Props {
  setSearch: React.Dispatch<
    React.SetStateAction<{
      title: string;
      category: string;
      year: string;
      month: string;
      author: string;
    }>
  >;
  className?: string;
}

const BlogCategory: React.FC<Props> = ({ setSearch, className }) => {
  return (
    <Select onValueChange={(value) => setSearch((prev) => ({ ...prev, category: value }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" className={className} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="null">All</SelectItem>
        {categories.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BlogCategory;
