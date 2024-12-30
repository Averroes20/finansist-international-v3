import { Service } from '@/lib/type/service';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import ButtonContact from './ButtonContact';
import Modal from './Modal';

const Gif = dynamic(() => import('../animation/gif'), { ssr: false });

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <>
      <div className="flex flex-col items-center flex-grow">
        <header className="px-8 flex flex-col justify-center min-h-[80px]">
          <h3 className="text-center text-lg md:text-xl font-bold">{service.title}</h3>
        </header>
        <span className="w-[60%] h-1 bg-[#3A9DA1]" />
        <div className="w-72 mx-auto p-4 flex justify-center">
          <Gif src={service.icon} />
        </div>

        <section className="w-full">
          <ul className="px-4 space-y-3">
            {service.shortDescription.map((short, shortIndex) => (
              <li key={`short-${shortIndex + 1}`} className="flex items-start border-b">
                <span className="mr-2 text-green-600 font-bold">✔</span>
                <span className="text-base">{short}</span>
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
        <span className="block font-semibold">{service.tagPrice}</span>
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Rp. {service.price} <span className="text-xl md:text-2xl lg:text-3xl">/month</span>{' '}
        </span>
      </div>
      <ServiceModal service={service} />
    </>
  );
};

const ServiceModal = memo(({ service }: { service: Service }) => {
  return (
    <Modal
      trigger={
        <Button className="bg-slate-800 hover:bg-slate-950 text-sm md:text-base text-white font-bold py-3 px-5 rounded-lg mt-10 shadow-md self-center transform transition-transform duration-300 ease-out hover:scale-110 dark:bg-slate-50 dark:hover:bg-slate-100 dark:text-slate-900">
          More Details <span className="ml-2">&#8594;</span>
        </Button>
      }
      contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[65vw] md:min-h-[90vh] p-0 border-0 overflow-y-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
        <div className="col-span-1 px-5 bg-[#3A9DA1] pt-28">
          <h1 className="text-center text-xl text-white font-libreBaskerville">What you will get</h1>
          {service.details.benefits.map((benefit, index) => (
            <div key={`benefit-${index + 1}`} className={clsx(benefit.title === '-' ? 'mt-5' : 'mt-0')}>
              {benefit.title !== '-' && <h2 className="font-bold text-white mt-5">{benefit.title}</h2>}
              <ul className="list-disc pl-6 text-white">
                {benefit.items.map((item, itemIndex) => (
                  <li key={`item-${itemIndex + 1}`} className="my-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-2 pt-28 px-5 flex flex-col h-full justify-center items-center">
          <DialogHeader>
            <div className="w-72 mx-auto p-4">
              <Gif src={service.icon} />
            </div>
            <DialogTitle className="font-bold text-center text-xl text-black">
              <span className="border-b-4 border-[#3A9DA1] inline-block pb-2">{service.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col flex-grow flex-1">
            <DialogDescription className="leading-7 text-black text-lg">{service.details.overview}</DialogDescription>
            {service.details.extendedServices.map((extendedService, index) => (
              <p key={`extendedService-${index + 1}`} className="my-1 text-black text-lg">
                <span className="mr-2 text-green-600 font-bold">✔</span>
                <span>{extendedService}</span>
              </p>
            ))}
          </div>
          <div className="flex justify-center mt-auto mb-10">
            <ButtonContact
              title="Free Consultasion!"
              className="font-semibold py-2 px-4 rounded-lg mt-5 shadow-md self-center text-sm md:text-base"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
});

ServiceModal.displayName = 'ServiceModal';

export default memo(ServiceCard);
