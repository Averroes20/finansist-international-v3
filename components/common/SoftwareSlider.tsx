'use client';
import { software } from '@/lib/data/intro';
import Image from 'next/image';
import { memo, useMemo } from 'react';

const SoftwareSlider = () => {
  const softwareList = useMemo(() => software.concat(software, software), []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1/5 z-[5] bg-gradient-to-r from-white to-transparent" />
      <div className="flex gap-0">
        <div className="flex flex-row whitespace-nowrap animate-slider" style={{ willChange: 'transform' }}>
          {softwareList.map((item, index) => (
            <div key={`software-${index + 1}`} className="flex flex-row items-center min-w-fit mx-5 space-x-2">
              <Image src={item.value} alt={item.label} width={1000} height={1000} className="w-[60px] object-contain" />
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/5 z-[5] bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default memo(SoftwareSlider);
