'use client';

import HeaderAdmin from '@/components/common/HeaderAdmin';
import PaginationComponent from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { createPortfolio, deletePortfolio, getPortfolio, updatePortfolio } from '@/lib/action/portfolio';
import { Portfolio } from '@/lib/type/portfolio';
import { PortfolioType } from '@/lib/validation/schema-form-portfolio';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));
const PortfolioForm = dynamic(() => import('@/components/portfolio/PortfolioForm'));

const limit = 5;

const PortfolioAdmin = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [title, setTitle] = useState('');
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const querySearch = useDebounce(title, 500);

  const fetchPortfolio = useCallback(async () => {
    const {
      data,
      meta: { totalPages },
    } = await getPortfolio({ page: meta.page, limit, companyName: querySearch });
    setPortfolio(data);
    setMeta({ page: meta.page, totalPages: totalPages ?? 1 });
  }, [meta.page, querySearch]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  const handleAdd = useCallback(async (data: PortfolioType) => {
    try {
      const formData = new FormData();
      formData.append('companyName', data.companyName);
      formData.append('country', data.country);
      formData.append('description', data.description);
      formData.append('software', data.software as unknown as string);
      formData.append('companyLogo', data.companyLogo);

      await createPortfolio(formData);
    } catch (error) {
      console.error(error instanceof Error && error.message);
      alert(`Failed to add portfolio: ${error instanceof Error && error.message}`);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deletePortfolio(id);
    } catch (error) {
      console.error(error instanceof Error && error.message);
      alert(`Failed to delete portfolio: ${error instanceof Error && error.message}`);
    }
  }, []);

  const handleEdit = useCallback(
    async (data: PortfolioType) => {
      if (!portfolioId) return;
      try {
        const formData = new FormData();
        formData.append('companyName', data.companyName);
        formData.append('country', data.country);
        formData.append('description', data.description);
        formData.append('software', data.software as unknown as string);
        formData.append('companyLogo', data.companyLogo ?? '');

        await updatePortfolio(formData, portfolioId);
        setPortfolioId(null);
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to edit portfolio: ${error instanceof Error && error.message}`);
      }
    },
    [portfolioId]
  );

  return (
    <>
      <HeaderAdmin title="Portfolio" description="Manage your portfolio" />
      <div className="flex flex-col md:flex-row gap-4 my-7">
        <Input placeholder="Search company..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <PortfolioForm onSubmit={handleAdd} title="Add" description="Add a new portfolio" trigger={<Button className="">Add Portfolio</Button>} />
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="min-w-[140px]">Logo Company</TableHead>
              <TableHead className="min-w-[250px]">Company Name</TableHead>
              <TableHead className="min-w-[150px]">Country</TableHead>
              <TableHead className="min-w-[200px]">Description</TableHead>
            </TableRow>
          </TableHeader>
          {portfolio.length > 0 ? (
            portfolio.map((item, index) => (
              <TableBody key={item.id} className="text-base">
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
      <PaginationComponent meta={meta} handlePageChange={handlePageChange} />
    </>
  );
};

export default PortfolioAdmin;
