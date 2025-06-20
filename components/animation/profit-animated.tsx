'use client';
import Dotlottie from '@/components/animation/dotlottie';
import AnimatedTag from '@/components/animation/tag-animated';

const ProfitAnimated: React.FC<{ tagsLine: Array<string> }> = ({ tagsLine }) => {
  return (
    <div className="relative pt-10 overflow-visible">
      <Dotlottie src="/animate/profit.lottie" autoplay speed={0.9} segment={[0, 98]} />
      <AnimatedTag className="absolute bottom-[3rem] left-[2rem] md:bottom-[9rem] md:left-[2.5rem]">{tagsLine[0]}</AnimatedTag>
      <AnimatedTag className="absolute top-[5rem] left-[3.5rem] md:top-[5.5rem] md:left-[5rem]">{tagsLine[1]}</AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] left-[7.5rem] md:top-[0.7rem] md:left-[10rem]">{tagsLine[2]}</AnimatedTag>
      <AnimatedTag className="absolute top-[4rem] right-[3rem] md:right-[16rem] md:top-[2.5rem] -translate-y-1/3">{tagsLine[3]}</AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] right-[1.5rem] md:top-[1.5rem] md:right-[3.5rem]">{tagsLine[4]}</AnimatedTag>
      <AnimatedTag className="absolute bottom-[2rem] right-[1.5rem] md:right-[1rem] md:bottom-[11rem]">{tagsLine[5]}</AnimatedTag>
    </div>
  );
};

export default ProfitAnimated;
