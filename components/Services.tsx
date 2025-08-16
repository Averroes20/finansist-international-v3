'use client';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { getPrice } from '@/lib/action/service-fee';
import { PriceService } from '@/lib/type/price';

const ServiceCard = dynamic(() => import('@/components/common/ServiceCard'), { ssr: true });

const currency = [
  { id: 1, name: 'USD', url: '/icons/flag-united-states.webp' },
  { id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' },
]

const Services = () => {
  const { dictionary, language } = useLanguage();
  const { items, title } = dictionary?.services || {};
  const [servicePrice, setServicePrice] = useState<PriceService[]>([]);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [select, setSelect] = useState({ id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' });

  const onToggle = () => { setIsAnnual(!isAnnual) };
  const onSelect = (id: number, name: string, url: string) => {
    setSelect({ id, name, url });
    setOpenDropdown(false);
  }

  const fetchPrice = useCallback(async () => {
    const response = await getPrice(select.name);

    setServicePrice(response);
  }, [select.name])

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return (
    <section className="max-w-screen-xl bg-white text-black mx-auto min-h-screen py-5 px-5 md:px-0 md:my-10">
      <TitleSection>{title}</TitleSection>
      <div className="flex items-center justify-center gap-4 my-5">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 rounded-md bg-gray-100 dark:bg-white text-white font-bold shadow-inner"
        >
          <span className={`${!isAnnual ? 'font-bold text-white bg-[#3A9DA1]' : 'text-muted-foreground'} p-2 rounded-md`}>Monthly</span>
          <span className={`${isAnnual ? 'font-bold text-white bg-[#3A9DA1]' : 'text-muted-foreground'} p-2 rounded-md`}>Annual</span>
        </button>
        <Popover open={openDropdown} onOpenChange={setOpenDropdown} defaultOpen>
          <PopoverTrigger
            className="uppercase hover:bg-secondary dark:hover:text-slate-900 shadow-sm p-2 rounded-md font-medium flex items-center justify-between ring-0 focus:outline-none focus:ring-0 text-base border "
            aria-expanded={openDropdown}
            aria-haspopup="true"
          >
            <Image src={select.url} alt={select.name} width={20} height={20} className='mr-2 object-cover' />
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
      </div>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 pb-6">
          {items?.map((service, index) => (
            <div key={`${service.link}-${index + 1}`} id={service.link} className={`flex flex-col scroll-mt-28`}>
              <ServiceCard
                service={service}
                monthly={servicePrice[index]?.fee}
                annual={servicePrice[index]?.annual_fee}
                isAnnual={isAnnual}
                isDiscount={servicePrice[index]?.is_discount}
                code={select.name}
                lang={language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
