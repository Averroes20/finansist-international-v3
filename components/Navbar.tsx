'use client';
import { images } from '@/constants/images';
import { menuItems, menuLanguages } from '@/lib/data/navbar';
import { motion, Variants } from 'framer-motion';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import ButtonContact from './common/ButtonContact';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TypographyH5 } from './ui/typography';
import { useRouter } from 'next/navigation';

const AnimateComponent = dynamic(() => import('./animation/beach-animated'), { ssr: false });

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
  const [language, setLanguage] = useState('EN');
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  const onChangeLanguage = useCallback((value: string) => setLanguage(value), []);
  const toggleMobileMenu = useCallback(() => setOpenMenu((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setOpenDropdown((prev) => !prev), []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-5 backdrop-blur-lg dark:bg-transparent">
      <nav className="container px-5 md:max-w-screen-lg mx-auto flex items-center justify-between backdrop-blur-lg">
        <Image src={images.LogoLarge} alt="logo" width={150} priority className="cursor-pointer" onClick={() => router.push('/')} />
        {/* Manu */}
        <div className="hidden w-full md:flex md:flex-row md:w-auto md:space-x-7" id="navbar-multi-level">
          <NavigationMenu className="hidden md:block md:w-auto lg:flex" id="navbar-default">
            <NavigationMenuList>
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger className="uppercase bg-transparent hover:bg-transparent hover:text-gray-500 focus:bg-transparent focus:text-gray-500">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="relative min-w-[900px]">
                        <div className="grid grid-cols-2 ">
                          <div className="flex flex-col col-span-1 space-y-3 p-5">
                            <TypographyH5>Company Services</TypographyH5>
                            {item.subItems.company.map((subItem, subIndex) => (
                              <Link key={subIndex} href={subItem.href} legacyBehavior passHref>
                                <NavigationMenuLink className="text-sm">{subItem.label}</NavigationMenuLink>
                              </Link>
                            ))}
                          </div>
                          <div className="col-span-1 justify-items-end">
                            <AnimateComponent />
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href ? item.href : '/'} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`uppercase bg-transparent hover:bg-transparent hover:text-gray-500 focus:bg-transparent focus:text-gray-500 ${navigationMenuTriggerStyle()}`}
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
          <ButtonContact className="hidden md:flex py-0 " />
          <Select onValueChange={onChangeLanguage} defaultValue={language}>
            <SelectTrigger className="focus:ring-transparent focus:ring-offset-transparent focus:outline-none gap-3 border-none bg-transparent">
              <SelectValue>
                <div className="flex items-center gap-1">
                  <Image
                    src={menuLanguages.find((item) => item.value === language)?.icon || '/default-icon.png'}
                    alt={language}
                    width={24}
                    height={24}
                  />
                  {language}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {menuLanguages
                .filter((item) => item.value !== language)
                .map((item, index) => (
                  <SelectItem key={index} value={item.value} className="px-2">
                    <div className="flex items-center gap-1">
                      <Image src={item.icon} alt={item.value} width={24} height={24} />
                      {item.value}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Mobile menu */}
          <motion.nav initial={false} animate={openMenu ? 'open' : 'closed'} className="md:hidden md:ml-4 -ml-4">
            <motion.button
              className="lg:hidden rounded-md text-gray-700 hover:bg-gray-200"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle navigation"
            >
              {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
            <motion.div
              className="md:hidden absolute top-20 w-[90vw] rounded-lg left-1/2 -translate-x-1/2 bg-white shadow-md overflow-hidden"
              initial="closed"
              animate={openMenu ? 'open' : 'closed'}
              variants={dropdownVariants}
              ref={menuRef}
            >
              <motion.ul className="flex flex-col space-y-2 p-4">
                {menuItems.map((item, index) => (
                  <motion.li key={index} className="border-b border-gray-200" variants={dropdownVariants}>
                    {item.subItems ? (
                      <>
                        <div onClick={toggleDropdown} className="flex items-center justify-between w-full py-2">
                          <p>{item.label}</p>
                          {openDropdown ? <ChevronUp fill="none" /> : <ChevronDown fill="none" />}
                        </div>
                        <motion.ul
                          className="pl-4 overflow-hidden"
                          initial="closed"
                          animate={openDropdown ? 'open' : 'closed'}
                          variants={dropdownVariants}
                        >
                          {item.subItems.company.map((subItem, subIndex) => (
                            <li key={subIndex} className="py-1">
                              <Link href={subItem.href} legacyBehavior passHref>
                                <a className="block py-1 text-gray-700 hover:text-gray-900">{subItem.label}</a>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    ) : (
                      <Link href={item.href ? item.href : '/'} className="block py-2 text-gray-700 hover:text-gray-900">
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
