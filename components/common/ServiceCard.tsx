import { Service } from '@/lib/type/service';
import { Minus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import ButtonContact from './ButtonContact';
import Modal from './Modal';
import { formatCurrency } from '@/utils/currency';
import Image from 'next/image';

const Gif = dynamic(() => import('../animation/gif'), { ssr: false });

const ServiceCard = ({ service, price, isAnnual, code, lang }: { service: Service, price: number, isAnnual: boolean, code: string, lang: string }) => {
  return (
    <>
      <div className="flex flex-col items-center flex-grow">
        <header className="px-8 flex flex-col justify-center items-start min-h-[60px] relative">
          <h3 className="text-center text-lg md:text-xl font-bold">{service.title}</h3>
          {service.newService && (
            <span className="absolute -top-1 -right-2 text-xs text-[#3A9DA1] font-bold px-2 py-1 bg-[#98eded] rounded-lg">New</span>
          )}
        </header>
        <span className="w-[60%] h-1 bg-[#3A9DA1]" />
        <div className="w-72 mx-auto p-4 flex justify-center">
          <Gif src={service.icon} />
        </div>
        <section className="w-full">
          <div className="flex justify-center items-center my-2">
            {service.tags.map((tag, tagIndex) => (
              <div key={`tag-${tagIndex + 1}`} className="flex items-center">
                <span className="text-base font-semibold text-[#3A9DA1}">{tag}</span>
                <span>{tagIndex !== service.tags.length - 1 && <Minus size={20} className="rotate-90" />}</span>
              </div>
            ))}
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
        {price === 0 ? <span className="text-xl md:text-2xl lg:text-3xl font-bold text-center">{lang === 'en' ? 'Determined after consultation' : 'Ditentukan setelah konsultasi'}</span> :
          <>
            <p className="font-semibold">{service.prices.label}</p>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
              {isAnnual ? formatCurrency(price * 12, code, code === 'IDR' ? 'id-ID' : 'en-US') : formatCurrency(price, code, code === 'IDR' ? 'id-ID' : 'en-US')} <span className="text-base md:text-2xl lg:text-3xl">/{isAnnual ? 'year' : 'month'}</span>{' '}
            </span>
            <p className="font-medium text-base text-end">{service.prices.desc}</p>
          </>
        }
      </div>
      <ServiceModal service={service} />
    </>
  );
};

const ServiceModal = memo(({ service }: { service: Service }) => {
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
        <div className="col-span-1 px-5 bg-[#3A9DA1] flex flex-col h-full justify-center items-center">
          <div>
            <h1 className="text-center text-xl text-white font-libreBaskerville mb-9">What you will get</h1>
            {service.benefitsDetails.map((benefit, index) => (
              <div key={`benefit-${index + 1}`} className="">
                <ul className="list-disc pl-6 text-white">
                  <li className="my-1">{benefit}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 px-5 flex relative flex-col h-full justify-center items-center">
          <div>
            <DialogHeader>
              <div className="w-72 mx-auto p-4">
                <Gif src={service.icon} />
              </div>
              <DialogTitle className="font-bold text-center text-xl text-black">
                <span className="border-b-4 border-[#3A9DA1] inline-block pb-2">{service.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex flex-col flex-grow flex-1">
              <div>
                {service.newService ? <Image src="/images/statistik-cfo.png" alt="statistik-cfo" width={9999} height={9999} className='w-full object-cover mr-4 md:w-1/2 md:float-start' /> : ''}
                <DialogDescription className="leading-7 text-black text-lg prose prose-lg text-justify">
                  {service.details.overview}
                </DialogDescription>
              </div>
              <ul>
                {service.details.extendedServices.map((extendedService, index) => (
                  <li key={`extendedService-${index + 1}`} className="my-1 text-black text-lg flex">
                    <span className="mr-2 text-green-600 font-bold">✔</span>
                    <span>{extendedService}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center m-10">
              <ButtonContact
                title={service.lang === 'en' ? "Free Consultasion!" : "Konsultasi Gratis!"}
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
