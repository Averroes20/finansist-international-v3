'use client';
import { Button } from '../ui/button';
import { Whatsapp } from '../icons/social-media';
import { cn } from '@/lib/utils';
import { memo } from 'react';

type Props = {
  className?: string;
  title: string;
  showIcon?: boolean;
};

const WHATSAPP_URL = 'https://wa.me/6281211114994';
const MESSAGE = encodeURIComponent('Halo, saya ingin tahu lebih lanjut tentang layanan Anda.');

const openWhatsApp = () => {
  window.open(`${WHATSAPP_URL}?text=${MESSAGE}`, '_blank');
};

const ButtonContact: React.FC<Props> = ({ className, title, showIcon = true }) => {
  return (
    <Button
      onClick={openWhatsApp}
      className={cn(
        className,
        `px-3 py-1 items-center text-sm md:text-base self-start text-white rounded-full transform transition-transform duration-300 ease-out hover:scale-110 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500`
      )}
    >
      {showIcon && <Whatsapp />}
      {title}
    </Button>
  );
};

export default memo(ButtonContact);
