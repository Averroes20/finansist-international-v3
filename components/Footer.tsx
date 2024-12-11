'use client';
import { images } from '@/constants/images';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Email, Facebook, Instagram, Linkedin, TikTok, Whatsapp, Youtube } from '@/components/icons/social-media';
import { useLanguage } from '@/context/LanguageProvider';

const Footer = () => {
  const { dictionary } = useLanguage();
  const { items: service } = dictionary?.services || {};
  const [copied, setCopied] = useState<{ email: boolean; phone: boolean }>({ email: false, phone: false });

  const handleCopy = useCallback(async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
    } catch (error) {
      console.error('Error while copying: ', error);
    }
  }, []);

  return (
    <footer className="bg-slate-100 py-10">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto px-0 md:px-36 ">
        <div className="flex flex-col gap-5 px-10 items-center justify-center">
          <Image src={images.LogoLarge} alt="Logo" width={200} height={200} loading="lazy" className="w-full h-full object-contain" />
          <Image src={images.Certifications} alt="Certifications" width={300} height={300} loading="lazy" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col gap-4 items-center ">
          <h4 className="text-xl font-semibold tracking-tight md:text-2xl md:font-bold">Our Service</h4>
          <ul className="text-center space-y-2 text-sm md:text-lg">
            {service?.map((service, index) => (
              <li key={service.link + index}>
                <Link href={`#${service.link}`} aria-label={service.title} className="hover:text-blue-700 hover:underline">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-4 items-center ">
          <h4 className="text-xl font-semibold tracking-tight md:text-2xl md:font-bold">Get In Touch</h4>
          <p className="flex items-center text-sm md:text-lg">
            <span className="mr-1">
              <Email className="text-red-500 inline" />
            </span>
            <span className="ml-1">support@finansistinternational.com</span>
            <button
              className="ml-1 cursor-pointer"
              onClick={() => handleCopy('support@finansistinternational.com', 'email')}
              aria-label="Copy email address"
            >
              {copied.email ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
            </button>
          </p>
          <p className="flex items-center text-sm md:text-lg">
            <span className="mr-1">
              <Whatsapp className="text-green-500 inline" />
            </span>
            <span>+6281211114994</span>
            <button className="ml-1 cursor-pointer" onClick={() => handleCopy('+6281211114994', 'phone')} aria-label="Copy phone number">
              {copied.phone ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
            </button>
          </p>
          <div className="flex gap-2 items-center justify-center mt-8">
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
