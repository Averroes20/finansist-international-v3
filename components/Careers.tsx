'use client';

import { FormIntern, FormJobs, FormPatner } from '@/components/career/CareerForms';
import { useLanguage } from '@/context/LanguageProvider';
import { useToast } from '@/hooks/use-toast';
import { submitInternshipRequest, submitJobRequest, submitPartnershipRequest } from '@/lib/action/send-email';
import { useState } from 'react';
import AnimatedComponent from './animation/animation-component';
import { TitleSection } from './ui/typography';

type Action = (formData: FormData) => Promise<{ success: boolean; error?: string; message?: string }>;

const Careers = () => {
  const [loading, setLoading] = useState(false);
  const { dictionary } = useLanguage();
  const { items, title } = dictionary?.career || {};
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (action: Action, data: any) => {
    'server only';
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'language') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });

      const result = await action(formData);

      if (result.success) {
        alert(result.message ?? 'Your request has been successfully sent.');
        toast({
          title: 'Success',
          description: 'Your request has been successfully sent.',
          variant: 'default',
        });
      } else {
        throw new Error(result.error ?? 'Failed to send request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="career"
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(/images/bg-cover-career.webp)` }}
      aria-labelledby="career-title"
    >
      <link rel="preload" href="/images/bg-cover-career.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 md:p-0 md:h-[70vh] bg-black bg-opacity-30">
        <TitleSection id="career-title" className="mb-10 md:mb-32 text-white">
          {title}
        </TitleSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-screen-lg lg:max-w-screen-xl lg:h-[55vh] mx-auto">
          {items?.map((item, index) => (
            <AnimatedComponent
              once={true}
              effect="scale"
              key={`${index + 1}-${item.title}`}
              className="p-4 lg:p-7 bg-white rounded-xl flex flex-col h-full shadow-xl"
            >
              <div className="flex-grow lg:text-lg lg:py-3 xl:text-xl xl:py-4">
                <h1 className="text-xl md:text-3xl tracking-tight font-bold uppercase text-center ">{item.title}</h1>
                <div className="h-1 w-[50%] mx-auto mt-2 mb-4" style={{ backgroundColor: `#${item.color}` }} />
                <p className="mb-4">{item.description}</p>
                {!!item.facilities && (
                  <>
                    <p className="mb-2 ">What facilities will you get?</p>
                    <ul className="list-disc list-outside space-y-2 pl-5 mb-4">
                      {item.facilities.map((facility, idx) => (
                        <li key={`${idx}-${facility}`}>{facility}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              {item.id === 3 && (
                <FormPatner colorHeader={item.color} loading={loading} onSubmit={(data) => handleSubmit(submitPartnershipRequest, data)} />
              )}
              {item.id === 2 && <FormJobs colorHeader={item.color} loading={loading} onSubmit={(data) => handleSubmit(submitJobRequest, data)} />}
              {item.id === 1 && (
                <FormIntern colorHeader={item.color} loading={loading} onSubmit={(data) => handleSubmit(submitInternshipRequest, data)} />
              )}
            </AnimatedComponent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
