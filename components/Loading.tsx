'use client';
import Dotlottie from '@/components/animation/dotlottie';
import Image from 'next/image';

const Loading = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col space-y-5 items-center justify-center">
          <Image src={'/images/logo-loading.webp'} width={200} height={200} alt="logo" priority />
          <span className="text-5xl font-libreBaskerville text-slate-800 font-bold">Please wait</span>
        </div>
        <div>
          <Dotlottie src="/animate/loading.lottie" autoplay speed={1} loop className="w-[400px] -mt-14" />
        </div>
      </section>
    </main>
  );
};

export default Loading;
