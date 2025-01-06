'use client';
import Dotlottie from '@/components/animation/dotlottie';
import AnimatedTag from '@/components/animation/tag-animated';

const ProfitAnimated: React.FC = () => {
  return (
    <div className="relative pt-10">
      <Dotlottie src="/animate/profit.lottie" autoplay speed={0.9} segment={[0, 98]} />
      <AnimatedTag className="absolute bottom-[3rem] left-[2rem] md:bottom-[9rem] md:left-[2.5rem]">Audit</AnimatedTag>
      <AnimatedTag className="absolute top-[5rem] left-[3.5rem] md:top-[3rem] md:left-[7rem]">Accounting</AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] right-[7.5rem] md:top-[1rem] md:right-[4rem]">Bookkeeping</AnimatedTag>
      <AnimatedTag className="absolute top-[4rem] right-[3rem] md:right-[16rem] md:top-[2.5rem] -translate-y-1/3">Payroll</AnimatedTag>
      <AnimatedTag className="absolute bottom-[2rem] right-[1.5rem] md:right-[1rem] md:bottom-[8rem]">Tax Planning</AnimatedTag>
    </div>
  );
};

export default ProfitAnimated;
