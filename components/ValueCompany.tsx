"use client";
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageProvider';
import { splitString } from '@/utils/split-string';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Modal = dynamic(() => import('@/components/common/Modal'), { ssr: false });

const ValueCompany = () => {
  const { dictionary, language } = useLanguage();
  const { items, title } = dictionary?.valueCompany || {};

  const part1 = title?.part1 ? splitString(title.part1) : [];
  const part2 = title?.part2 ? splitString(title.part2) : [];

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section id="valueCompany" className="min-h-screen flex flex-col bg-[#071620] mt-8 md:mt-0">
      <header className="px-5 py-6 md:px-16 md:py-12 flex-grow">
        <motion.h2
          initial="hidden"
          whileInView={'reveal'}
          transition={{ staggerChildren: 0.02 }}
          className="text-3xl md:text-6xl md:leading-tight font-bold text-white"
        >
          {part1.map((word, index) => (
            <motion.span key={`${index + 1}-${word}`} transition={{ duration: 0.5 }} variants={charVariants} className="text-[#84A2B7]">
              {word}
            </motion.span>
          ))}
          <br />
          {part2.map((word, index) => (
            <motion.span key={`${index + 1}-${word}`} transition={{ duration: 0.5 }} variants={charVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </header>
      <div className="flex flex-col justify-center max-w-screen overflow-auto items-center md:flex-row md:justify-center gap-4 pb-10">
        {items?.map((item, index) => (
          <div
            className="relative w-80 h-[300px] md:h-[500px] bg-[#091f2f] rounded-lg overflow-hidden shadow-lg flex flex-col group transition-all duration-500 cursor-default"
            key={`${index + 1}-${item.title}`}
          >
            <div className="p-3 md:p-5 flex flex-grow">
              <h1 className="text-xl md:text-3xl text-white text-start font-bold leading-tight">{item.title}</h1>
            </div>
            <div className="relative w-full h-[350px]">
              <div
                className={
                  `flex-1 flex justify-start items-start md:justify-end md:items-end h-full transition-transform duration-500 
                  md:group-hover:translate-x-[-100%] md:group-hover:opacity-50 translate-x-0 opacity-100`
                }
              >
                <Image src={item.urlImage} alt="Card Image" width={9999} height={9999} loading="lazy" className="hidden md:block object-cover w-full h-full" />
                <div className="block md:hidden px-4 py-0 text-white">
                  <p className="text-sm md:text-base font-medium text-start">{item.description}</p>
                </div>
              </div>
              <div
                className={
                  `absolute bottom-0 left-0 w-full h-full transition-all duration-700 ease-out
                  transform md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:scale-100 translate-y-[100%] opacity-0 scale-90`
                }
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="hidden md:block p-4 text-white">
                  <p className="text-sm md:text-base font-medium text-start">{item.description}</p>
                </div>
              </div>
            </div>
            <Modal
              trigger={<Button className="self-end m-3 z-10 bg-green-500 hover:bg-green-600 rounded-full py-4 text-sm md:text-base">{language === 'en' ? 'Finansist Solution' : 'Solusi Finansist'} →</Button>}
              contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[70vw] md:max-h-[90vh] p-0 border-0 overflow-y-auto border-0"
            >
              <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2">
                <div className="col-span-1 md:row-span-2 p-5 bg-[#FFFFFF] text-slate-900">
                  <h1 className="text-center text-xl mb-4">{language === 'en' ? 'With Employee' : 'Dengan Karyawan'}</h1>
                  <p className="text-lg">{item.contentModal.description1}</p>
                </div>
                <div className="col-span-1 md:row-span-2 p-5 bg-[#091f2f]">
                  <DialogHeader>
                    <DialogTitle className="font-bold text-center">
                      <span className="text-white text-xl">
                        {language === 'en' ? 'With Finansist' : 'Dengan Finansist'}
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <DialogDescription className="leading-7 text-white text-lg">{item.contentModal.description2}</DialogDescription>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueCompany;
