'use client';
import { TitleSection } from './ui/typography';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageProvider';
import { motion } from 'framer-motion';

const ServiceCard = dynamic(() => import('./common/ServiceCard'), { ssr: true });

const Services = () => {
  const { dictionary } = useLanguage();
  const { items, title } = dictionary.services;
  return (
    <section className="max-w-screen-lg mx-auto min-h-screen pt-5 px-5 md:px-0 md:mt-10">
      <TitleSection>{title}</TitleSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 py-6">
        {items.map((service, index) => (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.9, duration: 0.5 }}
            viewport={{ once: false, amount: 0.9 }}
            key={index}
            id={service.link}
            className="flex flex-col scroll-mt-20"
          >
            <ServiceCard service={service} />
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default memo(Services);
