'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';

const FAQ: React.FC = () => {
  const { dictionary } = useLanguage();
  const { title, questions = [] } = dictionary?.faq ?? {};
  const mid = Math.ceil(questions.length / 2);
  const left = questions.slice(0, mid);
  const right = questions.slice(mid);

  return (
    <section id="faq" className="scroll-mt-24 relative pt-24 pb-28">
      <div className='absolute top-1 left-0 w-full'>
        <div className="h-24 relative border-b border-b-[#113870]" aria-label="wave">
          <Image src="/waves/wave-up.svg" alt="Layer 1" fill className="object-cover absolute bottom-2" />
        </div>
      </div>
      <div className="bg-[#113870] py-5">
        <TitleSection className="text-white mx-10 mb-3 md:mx-0 md:mb-7">
          {title}
        </TitleSection>

        <div className="relative max-w-5xl mx-10 md:mx-auto">
          {/* Divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300" />

          <Accordion type="single" collapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
              {/* LEFT BOX */}
              <div className="bg-white md:rounded-xl p-6">
                {left.map((item, i) => (
                  <AccordionItem
                    key={`left-${i}`}
                    value={`faq-${i}`}
                  >
                    <AccordionTrigger className="text-lg text-start font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>

              {/* RIGHT BOX */}
              <div className="bg-white md:rounded-xl p-6">
                {right.map((item, i) => (
                  <AccordionItem
                    key={`right-${i}`}
                    value={`faq-${i + left.length}`}
                  >
                    <AccordionTrigger className="text-lg text-start font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      <div className='absolute bottom-1 left-0 w-full'>
        <div className="h-28 relative border-t border-[#113870]" style={{ background: '#' }} aria-label="wave">
          <Image src="/waves/wave-down.svg" alt="Layer 2" fill loading='lazy' className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
