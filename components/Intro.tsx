import { images } from '@/constants/images';
import Image from 'next/image';
import ProfitAnimated from './animation/profit-animated';
import Achievements from './common/AchievementCard';
import SoftwareSlider from './common/SoftwareSlider';

const Intro = () => {
  return (
    <section id="home" className="pt-10 max-w-screen-lg mx-auto my-auto min-h-screen scroll-mt-20">
      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-libreBaskerville leading-snug">
            Your <b> Financial Assistant </b> Empowered with
          </h1>
          <span className="font-santaCatalina font-normal text-5xl pt-3 pb-2">Certified Professionals </span>
          <Achievements />
          <div className="mt-3">
            <p className="font-bold">Certified of :</p>
            <Image src={images.Certifications} alt="certifications" width={300} height={300} loading="lazy" />
          </div>
        </div>
        <div className="flex flex-col">
          <ProfitAnimated />
          <p className="font-libreBaskerville font-bold text-2xl text-center tracking-wide">Effective and efficient at the same time</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 text-center">Experts in many software</p>
      </div>
      <SoftwareSlider />
    </section>
  );
};

export default Intro;
