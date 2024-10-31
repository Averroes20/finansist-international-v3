'use client';
import { images } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { Email, Facebook, Instagram, Linkedin, TikTok, Whatsapp, Youtube } from './icons/social-media';
import { TypographyH4, TypographyP } from './ui/typography';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState<{ email: boolean; phone: boolean }>({ email: false, phone: false });

  const handleCopy = useCallback(async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
    } catch (error) {
      console.log('Error while copying: ', error);
    }
  }, []);

  return (
    <footer className="bg-slate-100 py-10">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto px-0 md:px-36 ">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image src={images.LogoLarge} alt="Logo" className="w-60" loading="lazy" />
          <Image src={images.Certifications} alt="Certifications" className="w-60" loading="lazy" />
        </div>
        <div className="flex flex-col gap-4 items-center ">
          <TypographyH4>Our Service</TypographyH4>
          <ul className="text-center space-y-2">
            <li>Bookkeeping</li>
            <li>Accounting</li>
            <li>Payroll</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center ">
          <TypographyH4>Get In Touch</TypographyH4>
          <TypographyP className="flex items-center md:text-sm">
            <span className="mr-1">
              <Email className="text-red-500 inline" />
            </span>
            support@finansistinternational.com
            <span className="ml-1 cursor-pointer" onClick={() => handleCopy('support@finansistinternational.com', 'email')}>
              {copied.email ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
            </span>
          </TypographyP>
          <TypographyP className="flex items-center md:text-sm">
            <span className="mr-1">
              <Whatsapp className="text-green-500 inline" />
            </span>
            +6281211114994
            <span className="ml-1 cursor-pointer" onClick={() => handleCopy('+6281211114994', 'phone')}>
              {copied.phone ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
            </span>
          </TypographyP>
          <div className="flex gap-2 items-center justify-center">
            <Link href="#" className="p-[5px] rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
              <Instagram className="text-white" />
            </Link>
            <Link href="#" className="p-[5px] rounded-lg bg-black">
              <TikTok className="text-white" />
            </Link>
            <Link href="#" className="p-[5px] rounded-lg bg-[#0e76a8]">
              <Linkedin className="text-white" />
            </Link>
            <Link href="#" className="p-[5px] rounded-lg bg-[#3b5998]">
              <Facebook className="text-white" />
            </Link>
            <Link href="#" className="p-[5px] rounded-lg bg-[#c4302b]">
              <Youtube className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
