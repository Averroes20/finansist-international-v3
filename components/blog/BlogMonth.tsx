import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { months } from '@/lib/data/categories';
import React from 'react';

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
}

const BlogMonth: React.FC<Props> = ({ setSearch }) => {
  return (
    <Select onValueChange={(value) => setSearch((prev) => ({ ...prev, month: value }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="null">All</SelectItem>
        {months.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BlogMonth;
