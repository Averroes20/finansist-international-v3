import { services } from '@/lib/data/service';
import Image from 'next/image';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { TypographyH2, TypographyH3, TypographyH5, TypographyP } from './ui/typography';
import { Whatsapp } from './icons/social-media';

const Services = () => {
  return (
    <section className="max-w-screen-lg mx-auto pt-10 md:pt-20">
      <TypographyH2 className="text-center font-bold mb-5 md:mb-10">Our Services</TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col border border-gray-200 rounded-lg shadow p-5">
            <div className="h-40">
              <TypographyH3 className="font-bold text-center">{service.title}</TypographyH3>
              <Image src={service.icon} alt={service.title} className="mx-auto py-5 w-32 h-32 mix-blend-multiply object-contain" />
            </div>
            <div>
              {service.description.map((description, descIndex) => {
                if (typeof description === 'string') {
                  return (
                    <div key={descIndex} className="flex items-start">
                      <ChecklistIcon />
                      <TypographyP>{description}</TypographyP>
                    </div>
                  );
                } else if (description.subTitle) {
                  return (
                    <div key={descIndex} className="pt-5">
                      <TypographyH5>{description.subTitle}</TypographyH5>
                      <ul>
                        {description.subDesc?.map((subDesc, subDescIndex) => {
                          if (typeof subDesc === 'string') {
                            return (
                              <div key={subDescIndex} className="flex items-start">
                                <ChecklistIcon />
                                <TypographyP>{subDesc}</TypographyP>
                              </div>
                            );
                          } else if (subDesc.subSubTitle) {
                            return (
                              <div key={subDescIndex} className="pt-5">
                                <TypographyH5>{subDesc.subSubTitle}</TypographyH5>
                                <ul>
                                  {subDesc.subSubDesc?.map((subSubDesc, subSubDescIndex) => {
                                    if (typeof subSubDesc === 'string') {
                                      return (
                                        <div key={subSubDescIndex} className="flex items-start">
                                          <ChecklistIcon />
                                          <TypographyP>{subSubDesc}</TypographyP>
                                        </div>
                                      );
                                    }
                                  })}
                                </ul>
                              </div>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  );
                }
              })}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-5 shadow-md self-center">
                  More Details <span className="ml-2">&#8594;</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] md:max-w-[640px] max-h-[90vh] overflow-y-auto ">
                <DialogHeader>
                  <DialogTitle className="font-bold text-center text-black">{service.title}</DialogTitle>
                  <DialogDescription>
                    <Image src={service.icon} alt={service.title} className="mx-auto pt-5 w-24 h-w-24 object-contain" />
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                  <div className="space-y-3">
                    <TypographyP>{service.moreDetails.moreDesc}</TypographyP>
                    <ul>
                      {service.moreDetails.moreServices?.map((subDesc, subDescIndex) => {
                        if (typeof subDesc === 'string') {
                          return (
                            <div key={subDescIndex} className="flex items-start">
                              <ChecklistIcon />
                              <TypographyP>{subDesc}</TypographyP>
                            </div>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="font-bold py-2 px-4 rounded-lg mt-5 shadow-md md:self-center">
                    <Whatsapp /> Consult Now!
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </section>
  );
};

const ChecklistIcon = () => {
  return <span className="mr-2 text-green-600 font-bold">✔</span>;
};

export default Services;
