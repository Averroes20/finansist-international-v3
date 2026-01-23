"use client"
import HeaderAdmin from "@/components/common/HeaderAdmin"
import PriceServiceForm from "@/components/price/PriceServiceForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/context/LanguageProvider";
import { getPrice, updatePrice } from "@/lib/action/service-fee";
import { PriceService } from "@/lib/type/price";
import { TypePriceService } from "@/lib/validation/schema-form-price";
import { formatCurrency } from "@/utils/currency";
import { ChevronUp, PenBox } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const currency = [
  { id: 1, name: 'USD', url: '/icons/flag-united-kingdom.webp' },
  { id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' },
]

const PricePage: React.FC = () => {
  const { dictionary, changeLanguage } = useLanguage();
  const { items } = dictionary?.services || {};
  const [select, setSelect] = useState({ id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' });
  const [openDropdown, setOpenDropdown] = useState(false);
  const [data, setData] = useState<PriceService[]>([]);

  const onSelect = (id: number, name: string, url: string) => {
    setSelect({ id, name, url });
    setOpenDropdown(false);
  }

  const fetchPrice = useCallback(async () => {
    const res = await getPrice(select.name);
    setData(res as PriceService[]);
  }, [select.name]);

  const handleEdit = useCallback(async (data: TypePriceService) => {
    try {
      await updatePrice({
        ...data,
        fee: Number(data.fee),
        annual_fee: Number(data.annual_fee),
        is_discount: Boolean(data.is_discount),
      });
      alert('Price updated successfully');
      fetchPrice();
    } catch (error) {
      alert(`Failed to update price ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [fetchPrice]);

  useEffect(() => {
    changeLanguage('en')
    fetchPrice();
  }, [changeLanguage, fetchPrice]);

  return (
    <>
      <HeaderAdmin title="Price Service" description="Manage Price Service" />
      <Popover open={openDropdown} onOpenChange={setOpenDropdown} defaultOpen>
        <PopoverTrigger
          className="uppercase hover:bg-secondary shadow-sm p-2 rounded-md font-medium flex items-center justify-between ring-0 focus:outline-none focus:ring-0 text-base"
          aria-expanded={openDropdown}
          aria-haspopup="true"
        >
          <Image src={select.url} alt={select.name} width={20} height={20} className='mr-2' />
          {select.name} <ChevronUp className={`h-4 w-4 ml-1 transition duration-300 ${openDropdown ? '' : 'rotate-180'}`} />
        </PopoverTrigger>
        <PopoverContent className="shadow-lg p-0 w-20">
          <div className="flex gap-4 justify-around">
            <div className="flex flex-col col-span-1 space-y-3 py-2">
              {currency?.map((item, index) => (
                <button key={index} className="flex items-center gap-2" onClick={() => onSelect(item.id, item.name, item.url)}>
                  <Image src={item.url} alt={item.name} width={20} height={20} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="overflow-x-auto mt-5">
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="">Service Name</TableHead>
              <TableHead className="">Code</TableHead>
              <TableHead className="">Monthly</TableHead>
              <TableHead className="">Annual</TableHead>
              <TableHead className="">Discount</TableHead>
            </TableRow>
          </TableHeader>
          {items?.map((item, index) => (
            <TableBody key={data[index]?.id} className="text-base">
              <TableRow>
                <TableCell className="w-[50px] ">{index + 1}</TableCell>
                <TableCell className="">{item.title}</TableCell>
                <TableCell className="">
                  {data[index]?.code}
                </TableCell>
                <TableCell className="">
                  {formatCurrency(data[index]?.fee, select.name, select.name === 'IDR' ? 'id-ID' : 'en-US')}
                </TableCell>
                <TableCell className="">
                  {formatCurrency(data[index]?.annual_fee, select.name, select.name === 'IDR' ? 'id-ID' : 'en-US')}
                </TableCell>
                <TableCell className="">
                  {data[index]?.is_discount ? (
                    <span className="bg-green-600 text-white px-3 py-2 rounded-full">Active</span>
                  ) : (
                    <span className="bg-red-600 text-white px-3 py-2 rounded-full">Inactive</span>
                  )}
                </TableCell>
                <TableCell>
                  <PriceServiceForm
                    data={{
                      code: data[index]?.code,
                      fee: data[index]?.fee,
                      annual_fee: data[index]?.annual_fee,
                      id: data[index]?.id,
                      serviceName: item.title,
                      is_discount: data[index]?.is_discount
                    }}
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
  )
}

export default PricePage