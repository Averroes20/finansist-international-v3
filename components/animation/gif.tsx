'use client';
import dynamic from 'next/dynamic';

const Dotlottie = dynamic(() => import('./dotlottie').then((mod) => mod.default), { ssr: false });

const Gif = ({ src }: { src: string }) => {
  return <Dotlottie src={src} loop autoplay speed={0.9} />;
};

export default Gif;
