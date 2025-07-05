'use client';

import AnimatedComponent from '@/components/animation/animation-component';
import { FormIntern, FormJobs, FormPatner } from '@/components/career/CareerForms';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import { useToast } from '@/hooks/use-toast';
import { submitInternshipRequest, submitJobRequest, submitPartnershipRequest } from '@/lib/action/send-email';
import { useState } from 'react';

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
        if (key === 'cv') {
          const files = Array.isArray(data[key]) ? data[key] : [data[key]];
          files.forEach((file) => {
            formData.append('cv', file);
          });
        } else if (key === 'language') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });

      const result = await action(formData);

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Your request has been successfully sent.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Failed',
          description: `${result.error ?? 'Failed to send request'}`,
          variant: 'destructive',
        });
        throw new Error(result.error ?? 'Failed to send request');
      }
    } catch (error) {
      toast({
        title: 'Failed',
        description: `${error instanceof Error ? error.message : 'Failed to send request. Please try again.'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden h-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(/images/bg-cover-career.webp)` }}
      aria-labelledby="career-title"
    >
      <link rel="preload" href="/images/bg-cover-career.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <div id="career" className="relative z-10 flex flex-col items-center justify-center md:p-20 bg-black bg-opacity-30 scroll-mt-96">
        <TitleSection id="career-title" className="my-10 md:my-14 text-white scroll-mt-96">
          {title}
        </TitleSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10  max-w-screen-lg lg:max-w-screen-xl mx-auto px-10 mb-20 md:mb-0 md:px-0">
          {items?.map((item, index) => (
            <AnimatedComponent
              once={true}
              effect="scale"
              key={`${index + 1}-${item.title}`}
              className="p-4 lg:p-7 bg-white rounded-xl flex flex-col h-full shadow-xl"
            >
              <div className="flex-grow lg:text-lg lg:py-3 xl:text-xl xl:py-4">

                <p className='text-center mb-4'>
                  <span className="text-xl md:text-3xl tracking-tight font-bold uppercase inline-block pb-2" style={{ borderBottom: `4px solid #${item.color}` }}>
                    {item.title}
                  </span>
                </p>
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
