'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { portfolio } from '@/lib/data/portfolio';
import { TypePortfolio } from '@/lib/validation/schema-form-portfolio';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback } from 'react';

const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));
const PortfolioForm = dynamic(() => import('@/components/common/PortfolioForm'));

const PortfolioAdmin = () => {
  const handleDelete = useCallback((id: number) => {
    console.log('Delete blog with id:', id);
  }, []);

  const handleAdd = useCallback((data: TypePortfolio) => {
    console.log('Form add submitted:', data);
  }, []);

  const handleEdit = useCallback((data: TypePortfolio) => {
    console.log('Form edit submitted:', data);
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div>
          <TypographyH2 className="text-3xl font-bold">Portfolio</TypographyH2>
          <TypographyP className="text-gray-500">Welcome to your portfolio</TypographyP>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search..." />
          <PortfolioForm onSubmit={handleAdd} title="Add" description="Add a new portfolio" trigger={<Button className="">Add Blog</Button>} />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                <TableHead className="min-w-[140px]">Logo Company</TableHead>
                <TableHead className="min-w-[250px]">Company Name</TableHead>
                <TableHead className="min-w-[150px]">Country</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
              </TableRow>
            </TableHeader>
            {portfolio.length > 0 ? (
              portfolio.map((item, index) => (
                <TableBody key={index}>
                  <TableRow className="hover:bg-gray-100 border-b-2 items-center border-slate-900">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Image src={item.logoCompany} alt={item.title} className="w-12 h-12 rounded-full mx-auto shadow-lg" />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="flex gap-3 mt-4 -translate-y-1">
                      <PortfolioForm
                        onSubmit={handleEdit}
                        data={{ ...item, companyLogo: undefined, companyName: item.title }}
                        title="Edit"
                        description="Edit portfolio details"
                        trigger={<PenBox className="cursor-pointer" size={20} />}
                      />
                      <ActionDelete
                        title="Delete"
                        description="Are you sure you want to delete this portfolio?"
                        onClick={() => handleDelete(index)}
                      />
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
      </div>
    </>
  );
};

export default PortfolioAdmin;
