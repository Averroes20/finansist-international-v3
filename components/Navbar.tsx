'use client';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Whatsapp } from './icons/social-media';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { TypographyH5 } from './ui/typography';
import { Button } from './ui/button';
import { BurgerMenu, ChevronDown, ChevronUp, Close } from './icons/asset-svg';
import { motion, Variants } from 'framer-motion';
import { menuItems, menuLanguages } from '@/lib/data/navbar';

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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 p-4">
      <div className="container mx-auto flex items-center justify-between ">
        <Image src={images.LogoLarge} alt="logo" width={150} className="aspect-auto" />
        <NavigationMenu className="hidden md:block md:w-auto lg:flex" id="navbar-default">
          <NavigationMenuList>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.subItems ? (
                  <>
                    <NavigationMenuTrigger className="uppercase bg-transparent hover:bg-transparent hover:text-gray-500 focus:bg-transparent focus:text-gray-500">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="min-w-96">
                        <div className="grid gap-3 p-4">
                          <TypographyH5>Company Services</TypographyH5>
                          {item.subItems.company.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.href} legacyBehavior passHref>
                              <NavigationMenuLink className="text-sm">{subItem.label}</NavigationMenuLink>
                            </Link>
                          ))}
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
        <div className="flex items-center">
          <Button className="px-4 py-2 hidden md:flex items-center gap-2 text-sm self-start bg-green-500 text-white hover:bg-green-600 rounded-full">
            <Whatsapp />
            Consult With Us
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-4 focus:outline-none">
              <div className="flex items-center gap-2">
                <Image src={language === 'EN' ? icons.FlagUK : icons.FlagID} alt="flag" width={24} height={24} />
                {language}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                {menuLanguages.map((item, index) => (
                  <DropdownMenuRadioItem key={index} value={item.value} className="flex items-center gap-2">
                    <Image src={item.icon} alt="flag" width={24} height={24} />
                    {item.value}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <motion.div initial={false} animate={isMobileMenuOpen ? 'open' : 'closed'} className="md:hidden ml-4">
            <motion.button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <Close className="w-6 h-6" /> : <BurgerMenu className="w-6 h-6" />}
            </motion.button>
            <motion.div
              className="md:hidden absolute top-20 w-[90vw] rounded-lg left-1/2 -translate-x-1/2 bg-white shadow-md overflow-hidden"
              initial="closed"
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              variants={dropdownVariants}
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
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
