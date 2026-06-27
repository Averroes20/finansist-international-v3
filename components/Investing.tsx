'use client';
import { TitleSection } from '@/components/ui/typography';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from '@/components/animation/animation-component';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

const Investing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false)
  const { dictionary } = useLanguage();
  const { title, subtitle, description } = dictionary?.investing || {};
  const { items: service} = dictionary?.services || {};
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setDark(entry.isIntersecting), { rootMargin: '50% 0px -50% 0px' });
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) observer.observe(currentSectionRef);
    
    return () => {
      if (currentSectionRef) observer.disconnect();
    };
  }, [setDark]);

  const sectionClasses = useMemo(() => clsx(
    'min-h-[90vh] md:min-h-screen px-5 md:px-0 flex items-center overflow-hidden',
    'transition-colors duration-500 will-change-colors',
    dark ? 'bg-white text-black' : 'bg-[rgb(2,14,22)] text-white'
  ), [dark]);
  
  const featuredServices = [
    {
      link:"permit-investor-visa",
      icon: images.IconInvestorVisa
    },
    {
      link: "specialized-reporting",
      icon: images.IconTax
    },
    {
      link: "pma",
      icon: images.IconAccounting
    },
    {
      link: "audit-services",
      icon: images.IconCompliance
    }
  ]

  const investingServices = featuredServices
    .map(serviceConfig => {
      const serviceData = service?.find(
        item => item.link === serviceConfig.link
      );

      if (!serviceData) return null;

      return {
        ...serviceData,
        icon: serviceConfig.icon,
      };
    })
    .filter(
      (
        item
      ): item is NonNullable<typeof item> =>
        item !== null
  );

  return (
    <>
      <section
        id="investing"
        className={clsx(sectionClasses, "relative")}
        ref={sectionRef}
      >
        <Image
          src={images.BGBali}
          alt="Invest in Indonesia"
          fill
          priority
          className="absolute inset-0 object-cover object-right select-none pointer-events-none"
        />

        {/* Dark Overlay */}
        <div
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            dark ? "opacity-0" : "opacity-100"
          )}
        >
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r

              from-[rgba(2,14,22,.92)]
              via-[rgba(2,14,22,.82)]
              via-40%

              to-transparent
            "
          />
        </div>

        {/* White Overlay */}
        <div
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            dark ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 via-40% to-transparent"/>
        </div>

        {/* Content */}
        <div className="relative z-10 ml-5 pr-5 md:pr-8 lg:px-10">
          <TitleSection className="text-center lg:text-start sm:text-3xl md:text-5xl lg:text-6xl font-black mt-2 md:mb-8 lg:mb-10 leading-tight">
            {title}
          </TitleSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-auto">
            <AnimatedComponent threshold={0.5} once effect="fade-in-left" className="lg:col-span-4">
              <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl italic font-semibold leading-relaxed">
                {subtitle}
              </p>

              <ul className="mt-6 md:mt-8 lg:mt-10 ml-2 sm:ml-4 md:ml-8 flex flex-col gap-1 md:gap-4">
                {investingServices?.map((item) => (
                  <li key={item.link}>

                    <Link
                      href={`#${item.link}`}
                      className="group inline-flex items-center gap-3 md:gap-4 rounded-xl px-2 md:px-3 py-2 transition-all duration-300"
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={42}
                        height={42}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain shrink-0"
                      />

                      <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold">
                        {item.subtitle}
                      </span>

                      {item.newService && (
                        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md">
                          NEW
                        </span>
                      )}
                    </Link>

                  </li>
                ))}
              </ul>

              <p className="mt-6 md:mt-8 lg:mt-10 text-sm sm:text-base md:text-lg lg:text-2xl opacity-90 leading-relaxed">
                {description}
              </p>

            </AnimatedComponent>

          </div>
        </div>
        <Image
          src={images.ImgPerson}
          alt="Investor"
          width={620}
          height={900}
          className="
            hidden
            md:block

            absolute
            bottom-0
            right-0

            md:-mr-16
            lg:-mr-48

            md:h-[45%]
            lg:h-[60%]

            w-auto
            object-contain
            object-bottom
            pointer-events-none
            select-none
          "
        />
      </section>
    </>
  );
};

export default Investing;
