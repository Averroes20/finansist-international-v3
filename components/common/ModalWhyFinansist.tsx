import AnimatedComponent from '@/components/animation/animation-component';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const ModalWhyFinansist = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { dictionary } = useLanguage();
  const { title, points, description, tagsLine, subtitle } = dictionary?.financialSupport || {};

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <section id="servicePromotion" className="min-h-[90vh] max-w-screen-xl mx-auto px-5 md:px-0 flex items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-slate-900 py-4 md:py-7 px-5 md:px-5 rounded-xl">
          <h1 className="font-libreBaskerville text-white text-center leading-9 text-[1.5rem] md:text-[1.5rem] font-bold">
            {subtitle}
          </h1>
          <ul className="pt-4 space-y-2">
            {points?.map((item, index) => (
              <li key={`${index + 1}-${item.title}`} className="flex">
                <span className="mr-2 text-lg text-white">✔</span>
                <p className="font-libreBaskerville text-white">
                  <b className="text-base">{item.title} </b>
                  <span className="text-sm">{item.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 pr-6">
          <h1 className="font-santaCatalina text-slate-900 dark:text-white text-center leading-[5rem] text-[2.25rem] md:text-[3rem] font-bold mb-4">
            {title}
          </h1>
          <p className="font-libreBaskerville">{description?.text}</p>
          <ul className="list-disc my-5 font-libreBaskerville space-y-2">
            <p className="mb-3">{description?.points?.[0]}:</p>
            {description?.points?.slice(1, 4).map((item, index) => (
              <li key={`${index + 1}-${item}`} className="text-sm ml-3 md:text-base">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-base font-libreBaskerville">{description?.points?.[4]}</p>
          <h2 className="font-santaCatalina text-slate-900 dark:text-white text-right text-[2.25rem] md:text-[3rem] font-bold mt-4">{tagsLine}</h2>
        </div>
        <div className="md:col-span-1 flex justify-center items-center">
          <AnimatedComponent
            once={true}
            effect='fade-up'
            className="hidden md:block md:relative md:w-full md:h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={images.Promotion}
              alt="Styled Image"
              loading='lazy'
              className={clsx(
                `w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-out`,
                isHovered ? 'opacity-0' : 'opacity-1'
              )}
            />
            <Image
              src={images.PromotionSecond}
              alt="Styled Image"
              className={clsx(
                `w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-in`,
                isHovered ? 'opacity-1' : 'opacity-0'
              )}
            />
          </AnimatedComponent>
        </div>
      </div>
    </section>
  )
}

export default ModalWhyFinansist