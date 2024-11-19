'use client';

import { createPortfolio, deletePortfolio, fetchPortfolios, updatePortfolio } from '@/action/action-portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { useDebounce } from '@/hooks/use-debounce';
import { Portfolio } from '@/lib/type/portfolio';
import { PortfolioType } from '@/lib/validation/schema-form-portfolio';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));
const PortfolioForm = dynamic(() => import('@/components/common/PortfolioForm'));

const limit = 5;

const PortfolioAdmin = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const querySearch = useDebounce(title, 500);

  const fetchPortfolio = useCallback(async () => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(querySearch && { companyName: querySearch }),
    }).toString();
    const data = await fetchPortfolios(query);
    setPortfolio(data.data);
    setTotalPages(data.meta.totalPages);
  }, [page, querySearch]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deletePortfolio(id);
        fetchPortfolio();
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to delete portfolio: ${error instanceof Error && error.message}`);
      }
    },
    [fetchPortfolio]
  );

  const handleAdd = useCallback(
    async (data: PortfolioType) => {
      try {
        await createPortfolio(data);
        fetchPortfolio();
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to add portfolio: ${error instanceof Error && error.message}`);
      }
    },
    [fetchPortfolio]
  );

  const handleEdit = useCallback(
    async (data: PortfolioType) => {
      if (!portfolioId) return;
      try {
        await updatePortfolio(portfolioId, {
          ...data,
          software: data?.software ? data?.software : undefined,
        });
        setPortfolioId(null);
        fetchPortfolio();
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to edit portfolio: ${error instanceof Error && error.message}`);
      }
    },
    [fetchPortfolio, portfolioId]
  );

  return (
    <>
      <div className="space-y-4">
        <TypographyH2 className="text-3xl font-bold">Portfolio</TypographyH2>
        <TypographyP className="text-gray-500">Welcome to your portfolio</TypographyP>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Input placeholder="Search company..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <PortfolioForm onSubmit={handleAdd} title="Add" description="Add a new portfolio" trigger={<Button className="">Add Portfolio</Button>} />
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
              <TableBody key={item.id}>
                <TableRow className="hover:bg-gray-100 border-b-2 items-center border-slate-900">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={item.companyLogo as string}
                      alt={item.companyName}
                      loading="lazy"
                      width={40}
                      height={40}
                      className="rounded-full mx-auto shadow-lg"
                    />
                  </TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 self-center">
                      <PortfolioForm
                        onSubmit={handleEdit}
                        data={{
                          companyName: item.companyName,
                          country: item.country,
                          description: item.description,
                          software: (item?.software as string) ? item?.software?.split(',') : [],
                          companyLogo: item.companyLogo as string,
                        }}
                        title="Edit"
                        description="Edit portfolio details"
                        trigger={<PenBox className="cursor-pointer" size={20} onClick={() => setPortfolioId(item.id)} />}
                      />
                      <ActionDelete
                        title="Delete"
                        description="Are you sure you want to delete this portfolio?"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center font-bold text-gray-500 text-md">
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

export default PortfolioAdmin;
