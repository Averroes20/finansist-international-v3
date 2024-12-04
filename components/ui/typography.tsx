'use client';
import { motion } from 'framer-motion';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export const TitleSection = ({ children, ...props }: TypographyProps) => {
  return (
    <motion.h1
      variants={{
        hidden: {
          opacity: 0,
          y: -50,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      }}
      initial="hidden"
      whileInView={'show'}
      viewport={{ once: false }}
      className={`${props.className} text-center font-dosis font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-normal py-3`}
    >
      {children}
    </motion.h1>
  );
};
