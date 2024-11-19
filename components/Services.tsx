import { services } from '@/lib/data/service';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Modal from './common/Modal';
import { Whatsapp } from './icons/social-media';
import { Button } from './ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { TitleSection } from './ui/typography';

const Services = () => {
  return (
    <section className="max-w-screen-lg mx-auto pt-10 md:pt-20">
      <TitleSection>Our Services</TitleSection>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <article key={index} className="flex flex-col">
            <div className="flex flex-col flex-grow">
              <header className="text-center pt-4 px-4">
                <h3 className="text-xl font-bold pb-2 relative">
                  {service.title}
                  <span className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b-4 border-[#3A9DA1] w-1/2 mx-auto z-10 h-10"></span>
                </h3>
              </header>
              <div className="w-72 mx-auto  p-4">
                <DotLottieReact src={service.icon} loop autoplay speed={0.9} />
              </div>
              <section>
                <ul className="px-4 space-y-1">
                  {service.shortDescription.map((short, shortIndex) => (
                    <li key={shortIndex} className="flex items-start border-b">
                      <span className="mr-2 text-green-600 font-bold">✔</span>
                      <span>{short}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <Modal
              trigger={
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-5 shadow-md self-center">
                  More Details <span className="ml-2">&#8594;</span>
                </Button>
              }
              contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[80vh] p-0 border-0 overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
                <div className="col-span-1 p-5 bg-[#3A9DA1]">
                  <h1 className="text-center font-dosis text-lg text-white">What you will get</h1>
                  {service.details.benefits.map((benefit, index) => (
                    <div key={index} className={`${benefit.title === '-' ? 'mt-5' : 'mt-0'}`}>
                      {benefit.title !== '-' && <h2 className="font-bold text-white mt-5">{benefit.title}</h2>}
                      <ul className="list-disc pl-6 text-white">
                        {benefit.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="my-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-span-2 p-5">
                  <DialogHeader>
                    <div className="w-72 mx-auto  p-4">
                      <DotLottieReact src={service.icon} loop autoplay speed={0.9} />
                    </div>
                    <DialogTitle className="font-bold text-center text-black">
                      <span className="border-b-4 border-[#3A9DA1] inline-block pb-2">{service.title}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <DialogDescription className="leading-7 text-black dark:text-white text-base">{service.details.overview}</DialogDescription>

                    {service.details.extendedServices.map((extendedService, index) => (
                      <p key={index} className="my-1">
                        <span className="mr-2 text-green-600 font-bold">✔</span>
                        <span>{extendedService}</span>
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-center items-center">
                    <Button className="font-bold py-2 px-4 rounded-lg mt-5 shadow-md self-center">
                      <Whatsapp /> Consult Now!
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
