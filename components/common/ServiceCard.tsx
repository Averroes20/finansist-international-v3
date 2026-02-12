import { Service } from '@/lib/type/service';
import { formatCurrency } from '@/utils/currency';
import { Minus } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import ButtonContact from './ButtonContact';
import Modal from './Modal';
import { useLanguage } from '@/context/LanguageProvider';

const Gif = dynamic(() => import('../animation/gif'), { ssr: false });
const ServiceCard = ({
  service,
  monthly,
  annual,
  isAnnual,
  code,
  lang,
  isDiscount,
  paymentType
}: {
  service: Service;
  monthly: number;
  annual: number;
  isAnnual: boolean;
  code: string;
  lang: string;
  isDiscount: boolean;
  paymentType?: 'MONTHLY' | 'ONE_TIME' | 'CUSTOM';
}) => {
  const { dictionary } = useLanguage();
  const { month } = dictionary?.services || {};
  const renderPrice = () => {
    switch (paymentType) {
      case 'MONTHLY':
        return (
          <>
            {formatCurrency(monthly, code)}/{lang === 'en' ? 'Month' : 'Bulan'}
          </>
        );

      case 'ONE_TIME':
        return formatCurrency(monthly, code);

      case 'CUSTOM':
        return lang === 'en'
          ? <span className="text-xl md:text-2xl font-bold text-center">Determined after consultation</span>
          : <span className="text-xl md:text-2xl font-bold text-center">Ditentukan setelah konsultasi</span>;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center flex-grow">
        <span
        id={`service-anchor-${service.link}`}
        className="block h-0 scroll-mt-[140px]"
      />
        <header className="px-8 flex flex-col justify-center items-center min-h-5 md:h-24 relative text-center">
          <h3 className="text-xl font-bold">{service.title}</h3>
          {service.newService && (
            <span className="absolute -top-4 -right-2 text-sm md:text-base text-[#333333] font-bold px-2 py-1 bg-[#FFD700] rounded-lg">New</span>
          )}
        </header>
        <span className="w-[60%] h-1 bg-[#3A9DA1]" />
        <div className="w-72 h-40 mx-auto p-4 flex justify-center">
          <Gif src={service.icon} />
        </div>
        <section className="w-full">
          <div className="flex justify-center items-center my-2">
            <span className='inline-flex bg-[#3A9DA1] text-white dark:bg-slate-50 dark:text-slate-900 p-1 px-2 rounded-lg mb-0 md:mb-3'>
              {service.tags.map((tag, tagIndex) => (
                <div key={`tag-${tagIndex + 1}`} className="flex items-center">
                  <span className="text-base font-semibold text-[#3A9DA1}">{tag}</span>
                  <span>{tagIndex !== service.tags.length - 1 && <Minus size={20} className="rotate-90" />}</span>
                </div>
              ))}
            </span>
          </div>
          <ul className="space-y-2">
            {service.benefits.map((benefit, index) => (
              <li key={`benefit-${index + 1}`} className="flex items-start border-b">
                <span className="mr-2 text-green-600 font-bold">✔</span>
                <span className="text-base">{benefit}</span>
              </li>
            ))}
            <li className="flex items-start border-b">
              <span className="mr-2 text-green-600 font-bold">✔</span>
              <span className="text-base">etc...</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="font-dosis flex flex-col gap-y-2 pt-6">
        <>
          <p className="font-semibold">{service.prices.label} : </p>
          <span className="text-2xl lg:text-3xl font-bold text-center">
            {renderPrice()}
          </span>
          <p className="font-medium text-base text-center md:text-start">{service.prices.desc}</p>
        </>
      </div>
      <ServiceModal service={service} lang={lang} />
    </>
  );
};

const ServiceModal = memo(({ service, lang }: { service: Service, lang: string }) => {
  return (
    <Modal
      trigger={
        <Button className="bg-slate-800 hover:bg-slate-950 text-sm md:text-base text-white font-bold py-3 px-5 rounded-lg mt-5 shadow-md self-center transform transition-transform duration-300 ease-out hover:scale-110 dark:bg-slate-50 dark:hover:bg-slate-100 dark:text-slate-900">
          More Details <span className="ml-2">&#8594;</span>
        </Button>
      }
      contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[65vw] md:min-h-[90vh] p-0 border-0 overflow-y-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
        <div className="col-span-1 order-2 md:order-1 px-5 bg-[#3A9DA1] flex flex-col h-full justify-center items-center">
          <div className='my-4 md:my-0'>
            <h1 className="text-center text-xl text-white font-libreBaskerville mb-9">What you will get</h1>
            {service.benefitsDetails.map((benefit, index) => (
              <div key={`benefit-${index + 1}`} className="">
                <ul className="list-disc pl-6 text-white">
                  <li className="my-1">{benefit}</li>
                </ul>
              </div>
            ))}
            <div className="md:hidden flex justify-center mb-10">
              <ButtonContact
                title={lang === 'en' ? "Free Consultasion!" : "Konsultasi Gratis!"}
                className="font-semibold py-2 px-4 rounded-lg mt-5 shadow-md self-center text-sm md:text-base"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 order-1 md:order-2 px-5 flex relative flex-col h-full justify-center items-center">
          <div>
            <DialogHeader>
              <div className="w-72 mx-auto p-4">
                <Gif src={service.icon} />
              </div>
              <DialogTitle className="font-bold text-center text-xl text-black">
                <span className="border-b-4 border-[#3A9DA1] inline-block pb-2">{service.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex flex-col flex-grow flex-1 mb-10 md:mb-0">
              <div>
                {service.link === 'cfo-package' && (<Image src="/images/statistik-cfo.png" alt="statistik-cfo" width={9999} height={9999} className='w-full object-cover mr-4 md:w-1/3 md:float-start' />)}
                <DialogDescription className="leading-7 text-black text-sm md:text-base prose prose-lg text-justify">
                  {service.details.overview}
                </DialogDescription>
                <ul>
                  {service.details.extendedServices.map((extendedService, index) => (
                    <li key={`extendedService-${index + 1}`} className="my-1 text-black text-sm md:text-base flex">
                      <span className="mr-2 text-green-600 font-bold">✔</span>
                      <span>{extendedService}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden md:flex justify-center mb-10">
              <ButtonContact
                title={lang === 'en' ? "Free Consultasion!" : "Konsultasi Gratis!"}
                className="font-semibold py-2 px-4 rounded-lg mt-5 shadow-md self-center text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

ServiceModal.displayName = 'ServiceModal';

export default memo(ServiceCard);
