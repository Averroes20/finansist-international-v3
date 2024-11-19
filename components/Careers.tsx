'use client';

import { careers } from '@/lib/data/careers';
import { FormInternType, FormJobType, FormPatnerType } from '@/lib/validation/schema-form-career';
import { FormIntern, FormJob, FormPatner } from './common/CareerForms';
import { TitleSection, TypographyH3, TypographyP } from './ui/typography';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Careers = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const submitPatner = (data: FormPatnerType) => {
    console.log('Form submitted patner:', data);
  };
  const submitJob = (data: FormJobType) => {
    console.log('Form submitted job:', data);
  };
  const submitIntern = (data: FormInternType) => {
    console.log('Form submitted intern:', data);
  };

  return (
    <section id="career" ref={ref} className="relative h-screen overflow-hidden mt-10">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/images/bg-cover-career.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: y,
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-30">
        <TitleSection className="mb-5 text-white">Join our program!</TitleSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-screen-lg mx-auto">
          {careers.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-xl flex flex-col h-full shadow-xl">
              <div className="flex-grow">
                <TypographyH3 className="font-bold mb-4 uppercase text-center p-2 border-b-4 border-yellow-500 w-fit mx-auto">
                  {item.title}
                </TypographyH3>
                <TypographyP className="mb-4">{item.description}</TypographyP>
                {item.facilities?.length && item.facilities.length > 0 && (
                  <>
                    <TypographyP className="mb-2">What facilities will you get?</TypographyP>
                    <ul className="list-disc list-outside space-y-2 pl-5 mb-4">
                      {item.facilities.map((facility, idx) => (
                        <li key={idx}>{facility}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              {item.title === 'Partner' && <FormPatner onSubmit={submitPatner} />}
              {item.title === 'Jobs' && <FormJob onSubmit={submitJob} />}
              {item.title === 'Internship' && <FormIntern onSubmit={submitIntern} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
