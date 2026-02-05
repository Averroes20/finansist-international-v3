'use client';
import { Email, Facebook, Instagram, Linkedin, TikTok, Twitter, Whatsapp, Youtube } from '@/components/icons/social-media';
import { images } from '@/constants/images';
import { isSocialKey, SOCIAL_ICONS } from '@/constants/socialIcons';
import { useLanguage } from '@/context/LanguageProvider';
import { useSocialMedia } from '@/context/SocialMediaProvider';
import { Clipboard, ClipboardCheck, Calculator , CircleDollarSign, UserRoundCheck, ChartNoAxesCombined, MonitorCog, TvMinimalPlay, SearchCheck, BookUser, FilePen, Building, University, ReplaceAll } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createElement, useCallback, useState } from 'react';

const iconServices = [Calculator , CircleDollarSign, UserRoundCheck, ChartNoAxesCombined, MonitorCog, TvMinimalPlay, SearchCheck, BookUser, FilePen, Building, University, ReplaceAll];

const Footer = () => {
  const { dictionary, language } = useLanguage();
  const { items: service, title } = dictionary?.services || {};
  const { data, loading } = useSocialMedia();
  const [copied, setCopied] = useState<{ email: boolean; phone: boolean }>({ email: false, phone: false });

  const activeSocials = data?.filter(
    (item) => item.active && item.url
  );

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
    <footer className="relative pb-10 pt-5">
      <div className="absolute inset-0 bg-[url('/images/bg-footer.webp')] bg-cover bg-bottom filter grayscale opacity-10"></div>
      <div className="absolute inset-0 "></div>
      <div className="relative z-10 p-4">
        <div className="container grid grid-cols-1 md:grid-cols-7 gap-5 mx-auto px-5">
          <div className="flex flex-col md:col-span-2 space-y-4 w-full items-center justify-center">
            <Image src={images.LogoLarge} alt="Certifications" width={1000} height={1000} loading="lazy" className="w-full object-contain mb-4" />
            <Image src={images.Certifications} alt="Certifications" width={1000} height={1000} loading="lazy" className="w-full object-contain" />
          </div>
          <div className="flex flex-col md:col-span-3 gap-4 items-center ">
            <h4 className="text-xl font-semibold tracking-tight md:text-2xl md:font-bold">{title?.split('&')[0]}</h4>
            <ul className="flex flex-col col-span-1 space-y-1 py-3 px-4">
              {service?.map((item, index) => (
                <Link
                  href={`#${item.link}`}
                  key={`${index + 1}-${item.link}`}
                  className="text-sm md:text-base flex items-center gap-4 hover:bg-[#F0F0F0] py-2 px-3 rounded-md"
                >
                  <span>{iconServices[index] && createElement(iconServices[index], { className: 'w-5 h-5 text-[#3A9DA1]' })}</span>
                  {item.title}
                  {item.newService && <span className="text-sm md:text-base text-[#333333] font-bold px-2 py-1 bg-[#FFD700] rounded-lg">New</span>}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:col-span-2 gap-4">
            <h4 className="text-xl font-semibold tracking-tight text-center mb-4 md:text-2xl md:font-bold">{language === 'en' ? 'Get In Touch' : 'Hubungi Kami'}</h4>
            <div className="flex flex-col gap-y-5">
              <p className="flex text-sm md:text-base">
                <span className="mr-2">
                  <Email className="text-red-500 inline" />
                </span>
                <span className="ml-1">{data && data.find((item) => item.id === 8)?.url}</span>
                <button
                  className="ml-1 cursor-pointer"
                  onClick={() => handleCopy(`${data && data.find((item) => item.id === 8)?.url}`, 'email')}
                  aria-label="Copy email address"
                >
                  {copied.email ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
                </button>
              </p>
              <p className="flex text-sm md:text-base">
                <span className="mr-3.5">
                  <Whatsapp className="text-green-500 inline" />
                </span>
                <span>+{data && data.find((item) => item.id === 9)?.url}</span>
                <button className="ml-1 cursor-pointer" onClick={() => handleCopy(`+${data && data.find((item) => item.id === 9)?.url}`, 'phone')} aria-label="Copy phone number">
                  {copied.phone ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
                </button>
              </p>
              <div className="flex gap-3 items-center justify-center mt-3 flex-wrap">
                {data
                  .filter(item => item.active)
                  .map(item => {

                    const key = item.label.toLowerCase();

                    if (!isSocialKey(key)) return null;

                    const { icon: Icon, className } = SOCIAL_ICONS[key];

                    return (
                      <Link key={item.id} href={item.url}>
                        <div className={`p-[5px] rounded-lg ${className}`}>
                          <Icon className="text-white" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              <div className={data && data.find((item) => item.id === 10)?.active ? '' : 'hidden'}>
                <iframe height="250"
                  className='w-full rounded-md shadow-md'
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${data && data.find((item) => item.id === 10)?.url || ''}&hl=id&ie=UTF8&iwloc=B&output=embed`}></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;

