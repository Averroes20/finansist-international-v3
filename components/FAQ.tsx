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
        <TitleSection className="text-white mx-10 mb-3 md:mx-0 md:mb-7">{title}</TitleSection>
        <div className="max-w-5xl bg-white rounded-xl mx-10 md:mx-auto p-6">
          <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-6">
            {/* LEFT */}
            <Accordion type="single" collapsible className="w-full">
              {left.map((item, i) => (
                <AccordionItem key={i} value={`left-${i}`}>
                  <AccordionTrigger className="text-lg text-start font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* DIVIDER */}
            <div className="hidden md:flex justify-center">
              <div className="w-px bg-gray-300 h-full" />
            </div>

            {/* RIGHT */}
            <Accordion type="single" collapsible className="w-full">
              {right.map((item, i) => (
                <AccordionItem key={i} value={`right-${i}`}>
                  <AccordionTrigger className="text-lg text-start font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
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
