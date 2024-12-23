'use client';
import HeaderAdmin from '@/components/common/HeaderAdmin';
import SocialMediaForm from '@/components/link/SocialMediaForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getLinks, updateLink } from '@/lib/action/link';
import { Link } from '@/lib/type/link';
import { TypeLink } from '@/lib/validation/schema-form-link';
import { PenBox } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const PageLinkSocial = () => {
  const [data, setData] = useState<Link[]>([]);

  const fetchLink = useCallback(async () => {
    const res = await getLinks();
    setData(res as Link[]);
  }, []);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  const handleEdit = useCallback(async (data: TypeLink) => {
    try {
      await updateLink(data);
    } catch (error) {
      alert(`Failed to update link ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  return (
    <>
      <HeaderAdmin title="Link Social" description="Manage Link Social" />
      <div className="overflow-x-auto mt-5">
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="">Label</TableHead>
              <TableHead className="">Link</TableHead>
            </TableRow>
          </TableHeader>
          {data.map((link, index) => (
            <TableBody key={link.id} className="text-base">
              <TableRow>
                <TableCell className="w-[50px] ">{index + 1}</TableCell>
                <TableCell className="">{link.label}</TableCell>
                <TableCell className=" hover:text-indigo-700 hover:underline cursor-pointer" onClick={() => window.open(link.url, '_blank')}>
                  {link.url}
                </TableCell>
                <TableCell>
                  <SocialMediaForm
                    data={link}
                    onSubmit={handleEdit}
                    title="Edit Social Media"
                    description="Edit social media details"
                    trigger={<PenBox className="cursor-pointer" size={20} />}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </>
  );
};

export default PageLinkSocial;
