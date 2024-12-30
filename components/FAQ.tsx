'use client';
import { useLanguage } from '@/context/LanguageProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { TitleSection } from './ui/typography';

const FAQ: React.FC = () => {
  const { dictionary } = useLanguage();
  const faq = dictionary?.faq || [];
  return (
    <section id="faq" className="py-24 space-y-10">
      <TitleSection>FAQ</TitleSection>
      <div className="max-w-screen-md m-auto p-4 border rounded-xl">
        <Accordion type="single" collapsible>
          {faq.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={`faq-${index + 1}`}>
              <AccordionTrigger className="text-lg font font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
