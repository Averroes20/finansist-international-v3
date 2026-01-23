'use client';
import AnimatedComponent from '../animation/animation-component';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export const TitleSection = ({ children, ...props }: TypographyProps) => {
  return (
    <AnimatedComponent effect="fade-in-top" once={true} className="w-full" threshold={0.5}>
      <h1 className={`font-dosis text-center font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-normal pb-3 ${props.className}`}>
        {children}
      </h1>
    </AnimatedComponent>
  );
};
