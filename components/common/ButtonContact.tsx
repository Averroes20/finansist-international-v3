'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Whatsapp } from '../icons/social-media';

type Props = {
  className?: string;
};

const WHATSAPP_URL = 'https://wa.me/6281211114994';
const MESSAGE = encodeURIComponent('Halo, saya ingin tahu lebih lanjut tentang layanan Anda.');

const openWhatsApp = () => {
  window.open(`${WHATSAPP_URL}?text=${MESSAGE}`, '_blank');
};

const ButtonContact: React.FC<Props> = ({ className }) => {
  return (
    <Button
      onClick={openWhatsApp}
      className={`px-3 py-1 items-center text-sm self-start bg-green-500 text-white hover:bg-green-600 rounded-full ${className}`}
    >
      <Whatsapp />
      Free Consultation
    </Button>
  );
};

export default ButtonContact;
