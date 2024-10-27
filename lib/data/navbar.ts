import { icons } from '@/constants/icons';
import { StaticImageData } from 'next/image';

interface MenuItem {
  label: string;
  href?: string;
  subItems?: {
    company: { label: string; href: string }[];
    special: { label: string; href: string }[];
  };
}

interface MenuLanguage {
  value: string;
  icon: StaticImageData;
}

export const menuItems: MenuItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'Service',
    subItems: {
      company: [
        { label: 'Accounting and Bookkeeping', href: '#' },
        { label: 'Tax Report', href: '#' },
        { label: 'Payroll', href: '#' },
      ],
      special: [
        { label: 'Tax Planning', href: '#' },
        { label: 'LKPM/PMA Report', href: '#' },
        { label: 'Internal Audit', href: '#' },
        { label: 'External Audit', href: '#' },
      ],
    },
  },
  { label: 'About Us', href: '#about-us' },
  { label: 'Careers', href: '#careers' },
  { label: 'Blogs', href: '/blogs' },
];

export const menuLanguages: MenuLanguage[] = [
  { value: 'EN', icon: icons.FlagUK },
  { value: 'ID', icon: icons.FlagID },
];
