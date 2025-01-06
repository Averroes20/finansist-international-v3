'use client';
import { Email, Facebook, Instagram, Linkedin, TikTok, Twitter, Whatsapp, Youtube } from '@/components/icons/social-media';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import { useSocialMedia } from '@/context/SocialMediaProvider';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const Footer = () => {
  const { dictionary } = useLanguage();
  const { items: service } = dictionary?.services || {};
  const { data, loading } = useSocialMedia();
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

  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  return (
    <footer className="bg-white py-10 shadow-inner">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto px-5 ">
        <div className="flex flex-col gap-4 px-10 items-center justify-center">
          <Image src={images.LogoLarge} alt="Logo" width={1000} height={1000} loading="lazy" className="w-[700px] object-contain" />
          <Image src={images.Certifications} alt="Certifications" width={1000} height={1000} loading="lazy" className="w-[700px] object-contain" />
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
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold tracking-tight text-center md:text-2xl md:font-bold">Get In Touch</h4>
          <div className="flex flex-col items-center gap-y-5">
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
            {data && (
              <div className="flex gap-2 items-center justify-center mt-3">
                {data.map(
                  ({ id, url, active }) =>
                    url && (
                      <Link key={id} href={url} target="_blank" aria-label={`Social Media ${id}`} className="p-[5px] rounded-lg">
                        {id === 3 && active && (
                          <div className="p-[5px] rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
                            <Instagram className="text-white" />
                          </div>
                        )}
                        {id === 6 && active && (
                          <div className="p-[5px] rounded-lg bg-black">
                            <TikTok className="text-white" />
                          </div>
                        )}
                        {id === 4 && active && (
                          <div className="p-[5px] rounded-lg bg-[#0e76a8]">
                            <Linkedin className="text-white" />
                          </div>
                        )}
                        {id === 7 && active && (
                          <div className="p-[5px] rounded-lg bg-[#3b5998]">
                            <Facebook className="text-white" />
                          </div>
                        )}
                        {id === 5 && active && (
                          <div className="p-[5px] rounded-lg bg-[#c4302b]">
                            <Youtube className="text-white" />
                          </div>
                        )}
                        {id === 2 && active && (
                          <div className="p-[5px] rounded-lg bg-white">
                            <Twitter className="text-black" />
                          </div>
                        )}
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
