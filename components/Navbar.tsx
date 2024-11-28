'use client';
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
import { ChevronUp, Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'), { ssr: false });
const Select = dynamic(() => import('@/components/ui/select').then((mod) => mod.Select), { ssr: false });
const AnimateComponent = dynamic(() => import('@/components/animation/beach-animated'), { ssr: false });

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

const Navbar = () => {
  const router = useRouter();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { language: lang, changeLanguage } = useLanguage();
  const { dictionary } = useLanguage();
  const { items } = dictionary.navbar;
  const { items: service } = dictionary.services;

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
    <header className="sticky top-0 z-50 bg-white shadow-sm py-5 backdrop-blur-lg dark:bg-transparent">
      <nav className="container px-5 md:max-w-screen-xl mx-auto flex items-center justify-between backdrop-blur-lg">
        <div className="w-[150px]">
          <Image
            src={images.LogoLarge}
            alt="logo"
            width={150}
            height={150}
            className="cursor-pointer w-full h-full object-contain"
            onClick={() => navigate('/')}
            priority
            aria-hidden="true"
          />
        </div>
        {/* Manu */}
        <div className="hidden w-full md:flex md:flex-row md:w-auto md:space-x-7" id="navbar-multi-level">
          <NavigationMenu className="hidden md:block md:w-auto lg:flex" id="navbar-default">
            <NavigationMenuList>
              {items.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.subItems ? (
                    <Popover key={index} open={openDropdown} onOpenChange={setOpenDropdown}>
                      <PopoverTrigger
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="uppercase bg-transparent hover:bg-transparent hover:text-gray-500 text-[14px] font-medium flex items-center justify-between"
                        aria-expanded={openDropdown}
                        aria-haspopup="true"
                      >
                        {item.label} <ChevronUp className={`h-4 w-4 ml-1 transition duration-300 ${openDropdown ? '' : 'rotate-180'}`} />
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-screen border-0 shadow-lg p-0 mt-4"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex gap-4 justify-around">
                          <div className="flex flex-col col-span-1 space-y-2 py-5 px-3">
                            <b>Company Services</b>
                            {service.map((item, index) => (
                              <Link href={`#${item.link}`} key={index}>
                                {item.title}
                              </Link>
                            ))}
                          </div>
                          <div className="col-span-1 justify-items-end">
                            <AnimateComponent />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Link href={item.url ? item.url : '/'} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={clsx(
                          'uppercase bg-transparent hover:bg-transparent hover:text-gray-500 focus:bg-transparent focus:text-gray-500',
                          navigationMenuTriggerStyle()
                        )}
                        aria-label={item.label}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-5">
          <ButtonContact className="hidden md:flex py-0 " title="Free Consultation" />
          <Select onValueChange={handleLanguageChange} defaultValue={lang}>
            <SelectTrigger className="focus:ring-transparent focus:ring-offset-transparent focus:outline-none gap-3 border-none bg-transparent">
              <SelectValue>
                <div className="flex items-center gap-1 w-[24px] h-[24px]">
                  <Image
                    src={menuLanguages.find((item) => item.value === lang)?.icon || '/default-icon.png'}
                    alt={lang}
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                  {lang === 'en' ? 'English' : 'Indonesia'}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {menuLanguages
                .filter((item) => item.value !== lang)
                .map((item, index) => (
                  <SelectItem key={index} value={item.value} className="px-2">
                    <div className="flex items-center gap-1">
                      <Image src={item.icon} alt={item.value} width={24} height={24} />
                      {item.value === 'en' ? 'EN' : 'ID'}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Mobile menu */}
          <motion.nav initial={false} animate={openMenuMobile ? 'open' : 'closed'} className="md:hidden md:ml-4 ">
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
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    className={`border-b border-gray-200 ${index === items.length - 1 ? 'border-none' : ''}`}
                    variants={dropdownVariants}
                  >
                    {item.subItems ? (
                      <>
                        <div
                          onClick={toggleMobileDropdown}
                          className="flex items-center justify-between w-full py-2"
                          aria-expanded={openDropdownMobile}
                        >
                          <p>{item.label}</p>
                          <ChevronUp fill="none" className={`h-4 w-4 transition duration-300 ${openDropdownMobile ? '' : 'rotate-180'}`} />
                        </div>
                        <motion.ul
                          className="overflow-hidden"
                          initial="closed"
                          animate={openDropdownMobile ? 'open' : 'closed'}
                          variants={dropdownVariants}
                        >
                          {item.subItems && (
                            <div className="flex flex-col col-span-1 py-3 px-3">
                              {service.map((item, index) => (
                                <Link
                                  href={`#${item.link}`}
                                  key={index}
                                  className={`border-b border-gray-200 py-2 pl-4  ${index === service.length - 1 ? 'border-none' : ''}`}
                                >
                                  {item.title}
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

export default Navbar;
