
'use client';

import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useState } from 'react';
import { getPrice } from '@/lib/action/service-fee';
import { PriceService } from '@/lib/type/price';

const ServiceCard = dynamic(() => import('@/components/common/ServiceCard'), { ssr: true });

// const currency = [
//   { id: 1, name: 'USD', url: '/icons/flag-united-states.webp' },
//   { id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' },
// ];

const Services = () => {
  const { dictionary, language } = useLanguage();
  const { items, title } = dictionary?.services || {};

  const [servicePrice, setServicePrice] = useState<PriceService[]>([]);
  // const [isAnnual] = useState(false);
  // const [openDropdown, setOpenDropdown] = useState(false);
  // const [select, setSelect] = useState(currency[1]);
  // const [manualSelect, setManualSelect] = useState(false);

  // const onToggle = () => setIsAnnual((prev) => !prev);

  // const onSelect = (id: number, name: string, url: string) => {
  //   setSelect({ id, name, url });
  //   setManualSelect(true);
  //   setOpenDropdown(false);
  // };

  const fetchPrice = useCallback(async () => {
    const response = await getPrice('IDR');
    setServicePrice(response);
  }, []);



  // useEffect(() => {
  //   if (!manualSelect) {
  //     setSelect(
  //       language === 'en'
  //         ? { id: 1, name: 'USD', url: '/icons/flag-united-states.webp' }
  //         : { id: 2, name: 'IDR', url: '/icons/flag-indonesia.webp' }
  //     );
  //   }
  // }, [language, manualSelect]);


  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return (
    <section className="max-w-screen-xl bg-white text-black mx-auto min-h-screen py-5 px-5 md:px-0 md:my-10">
      <div className="flex flex-col items-center gap-3 my-5 md:flex-row md:justify-center md:gap-4">
        <TitleSection>{title}</TitleSection>
      </div>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 pb-6">
          {items?.map((service, index) => (
            <div
              key={`${service.link}-${index + 1}`}
              id={service.link}
              className="flex flex-col scroll-mt-28"
            >
              <ServiceCard
                service={service}
                monthly={servicePrice[index]?.fee}
                // isAnnual={isAnnual}
                isDiscount={servicePrice[index]?.is_discount}
                paymentType={servicePrice[index]?.payment_type}
                code="IDR"
                lang={language}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
