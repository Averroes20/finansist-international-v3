'use client';
import { bounceFade } from '@/utils/variants';
import { motion } from 'framer-motion';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
const fadeBounce = bounceFade(0.2, 0.7, 2);

export const TitleSection = ({ children, ...props }: TypographyProps) => {
  return (
    <motion.h1
      variants={fadeBounce}
      initial="hidden"
      whileInView={'show'}
      viewport={{ once: false, amount: 0.2 }}
      className={`${props.className} text-center font-libreBaskerville md:text-5xl text-3xl uppercase tracking-normal py-3`}
    >
      {children}
    </motion.h1>
  );
};
