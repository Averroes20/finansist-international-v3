'use client';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import { menuLanguages } from '@/lib/data/navbar';
import { Language } from '@/lib/type/languange';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { ChevronUp, Menu, X, Calculator , CircleDollarSign, UserRoundCheck, ChartNoAxesCombined, MonitorCog, TvMinimalPlay, SearchCheck, BookUser, FilePen, Building, University, ReplaceAll } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createElement, memo, useCallback, useEffect, useRef, useState } from 'react';
import Modal from './common/Modal';
import ModalWhyFinansist from './common/ModalWhyFinansist';

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'), { ssr: false });
const Select = dynamic(() => import('@/components/ui/select').then((mod) => mod.Select), { ssr: false });

const dropdownVariants: Variants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
};

const iconServices = [ Calculator , CircleDollarSign, UserRoundCheck, ChartNoAxesCombined, MonitorCog, TvMinimalPlay, SearchCheck, BookUser, FilePen, Building, University, ReplaceAll];

const Navbar = () => {
  const router = useRouter();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeDropdown = useCallback(() => {setOpenDropdown(false);}, []);
  const [openModal, setOpenModal] = useState(false);
  const { language: lang, changeLanguage } = useLanguage();
  const { dictionary } = useLanguage();
  const { items } = dictionary?.navbar || {};
  const { items: service } = dictionary?.services || {};

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenuMobile(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  const handleLanguageChange = useCallback(
    async (newLang: Language) => {
      if (newLang !== lang) {
        await changeLanguage(newLang);
      }
    },
    [changeLanguage, lang]
  );
  const handleMouseEnter = useCallback(() => setOpenDropdown(true), []);
  const handleMouseLeave = useCallback(() => setOpenDropdown(false), []);
  const toggleMobileMenu = useCallback(() => setOpenMenuMobile((prev) => !prev), []);
  const toggleMobileDropdown = useCallback(() => setOpenDropdownMobile((prev) => !prev), []);
  const navigate = useCallback((url: string) => router.push(url), [router]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md py-5 dark:bg-white dark:text-black">
      <link rel="preload" href="/images/logo-large.webp" as="image" type="image/webp" fetchPriority="high" media="(min-width: 1px)" />
      <link rel="preload" href="/icons/flag-united-kingdom.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <link rel="preload" href="/icons/flag-indonesia.webp" as="image" type="image/webp" media="(min-width: 1px)" />

      <nav className="container px-5 md:max-w-screen-2xl mx-auto flex items-center justify-between backdrop-blur-lg">
        <div className="w-[225px]">
          <Image
            src={images.LogoLarge}
            alt="logo"
            width={1000}
            height={1000}
            className="cursor-pointer w-full h-full object-contain"
            onClick={() => navigate('/')}
            priority
            aria-hidden="true"
          />
        </div>
        {/* Manu */}
        <div className="hidden w-full md:flex md:flex-row md:w-auto md:space-x-7" id="navbar-multi-level">
          <NavigationMenu className="hidden md:block md:w-auto lg:flex" id="navbar-default">
            <NavigationMenuList className="flex gap-x-5">
              {items?.map((item, index) => (
                <NavigationMenuItem key={index + 1}>
                  {item.subItems ? (
                    <Popover open={openDropdown} onOpenChange={setOpenDropdown} defaultOpen>
                      <PopoverTrigger
                        onMouseEnter={handleMouseEnter}
                        className="uppercase bg-transparent hover:bg-transparent hover:text-gray-500 font-medium flex items-center justify-between ring-0 focus:outline-none focus:ring-0 text-base"
                        aria-expanded={openDropdown}
                        aria-haspopup="true"
                      >
                        {item.label} <ChevronUp className={`h-4 w-4 ml-1 transition duration-300 ${openDropdown ? '' : 'rotate-180'}`} />
                      </PopoverTrigger>
                      <PopoverContent className="shadow-lg p-0 mt-4 w-[450px]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="flex gap-4 justify-around">
                          <div className="flex flex-col col-span-1 space-y-3 py-3 px-4">
                            {service?.map((item, index) => (
                              <Link
                                href={`#${item.link}`}
                                key={`${index + 1}-${item.link}`}
                                className="text-sm md:text-base flex items-center gap-4 hover:bg-[#F0F0F0] py-2 px-3 rounded-md"
                              >
                                <span>{iconServices[index] && createElement(iconServices[index], { className: 'w-6 h-6 text-[#3A9DA1]' })}</span>
                                {item.title}
                                {item.newService && <span className="text-base text-[#333333] font-bold px-2 py-1 bg-[#FFD700] rounded-lg">New</span>}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <>
                      {index === 0 ? (
                        <Modal
                          open={openModal}
                          onOpenChange={setOpenModal}
                          contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[90vh] p-0 border-0 overflow-y-auto border-0"
                          trigger={<span role='button' className="px-3 py-2 bg-blue-950 text-white rounded-md  transform transition-transform duration-300 ease-out hover:bg-blue-900 hover:scale-105 hover:text-white mr-5 cursor-pointer">{item.label}</span>}>
                          <ModalWhyFinansist />
                        </Modal>
                      ) : (
                        <Link href={item.url ? item.url : '/'} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx(
                              'uppercase bg-transparent hover:bg-transparent hover:text-gray-500 focus:bg-transparent focus:text-gray-500',
                              navigationMenuTriggerStyle()
                            )}
                            aria-label={item.label}
                          >
                            <span className="text-base">{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center">
          <ButtonContact className="hidden md:flex py-0" title={lang === 'en' ? "Free Consultation" : "Konsultasi Gratis"} />
          <Button
            variant="outline"
            className="hidden md:flex border-blue-900 border-2 text-blue-900 font-semibold ml-6 mr-4 bg-transparent"
          >
            Login
          </Button>
          <span className="hidden md:flex text-3xl mx-5 font-light text-gray-300">|</span>
          <Select onValueChange={handleLanguageChange} defaultValue={lang}>
            <SelectTrigger className="focus:ring-transparent focus:ring-offset-transparent focus:outline-none gap-3 border-none bg-transparent">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <Image
                    src={menuLanguages.find((item) => item.value === lang)?.icon ?? '/default-icon.png'}
                    alt={lang}
                    width={100}
                    height={100}
                    className="w-full h-[25px]"
                  />
                  <span className="text-base hidden md:block">{lang === 'en' ? 'English' : 'Bahasa'}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent aria-label="Language" aria-labelledby="language">
              {menuLanguages
                .filter((item) => item.value !== lang)
                .map((item, index) => (
                  <SelectItem key={`${index + 1}-${item.value}`} value={item.value} className="px-2">
                    <div className="flex items-center gap-2">
                      <Image src={item.icon} alt={item.value} width={24} height={24} />
                      <span className="text-base">{item.value === 'en' ? 'English' : 'Bahasa'}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Mobile menu */}
          <motion.nav aria-hidden="true" initial={false} animate={openMenuMobile ? 'open' : 'closed'} className="md:hidden">
            <motion.button
              className="lg:hidden rounded-md text-gray-700 hover:bg-gray-200"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label={openMenuMobile ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {openMenuMobile ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </motion.button>
            <motion.div
              className="md:hidden absolute top-14 w-screen rounded-lg left-1/2 -translate-x-1/2 bg-white shadow-md overflow-hidden"
              initial="closed"
              animate={openMenuMobile ? 'open' : 'closed'}
              variants={dropdownVariants}
              ref={menuRef}
            >
              <motion.ul className="flex flex-col space-y-2 px-4 py-2">
                {items?.map((item, index) => (
                  <motion.li
                    key={`${index + 1}-${item.label}`}
                    className={`border-b border-gray-200 ${index === items.length - 1 ? 'border-none' : ''}`}
                    variants={dropdownVariants}
                  >
                    {item.subItems ? (
                      <>
                        <button
                          type="button"
                          onClick={toggleMobileDropdown}
                          className="flex items-center justify-between w-full py-2"
                          aria-expanded={openDropdownMobile}
                          aria-label="Toggle mobile dropdown"
                        >
                          <p>{item.label}</p>
                          <ChevronUp fill="none" className={`h-4 w-4 transition duration-300 ${openDropdownMobile ? '' : 'rotate-180'}`} />
                        </button>
                        <motion.ul
                          className="overflow-hidden"
                          initial="closed"
                          animate={openDropdownMobile ? 'open' : 'closed'}
                          variants={dropdownVariants}
                        >
                          {item.subItems && (
                            <div className="flex flex-col col-span-1 py-3 px-3">
                              {service?.map((item, index) => (
                                <Link
                                  href={`#${item.link}`}
                                  key={`${index + 1}-${item.link}`}
                                  onClick={() => {
                                    setOpenDropdownMobile(false);
                                    setOpenMenuMobile(false);
                                  }}
                                  className={`border-b border-gray-200 py-2 pl-4  ${index === service.length - 1 ? 'border-none' : ''
                                    } flex items-center gap-4 hover:bg-[#F0F0F0] py-2 px-3 rounded-md`}
                                >
                                  <span>{iconServices[index] && createElement(iconServices[index], { className: 'w-5 h-5 text-[#3A9DA1]' })}</span>
                                  {item.title}
                                  {item.newService && <span className="text-xs text-[#333333] font-bold px-2 py-1 bg-[#FFD700] rounded-lg">New</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.ul>
                      </>
                    ) : (
                      <Link href={item.url ? item.url : '/'} className="block py-2 text-gray-700 hover:text-gray-900">
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.nav>
        </div>
      </nav>
    </header>
  );
};

export default memo(Navbar);
