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
  { label: 'Home', href: '/' },
  {
    label: 'Service',
    subItems: {
      company: [
        { label: 'Accounting and Bookkeeping', href: '/services/accounting' },
        { label: 'Tax Report', href: '/services/tax-report' },
        { label: 'Payroll', href: '/services/payroll' },
      ],
      special: [
        { label: 'Tax Planning', href: '/services/tax-planning' },
        { label: 'LKPM/PMA Report', href: '/services/lkpm-pma-report' },
        { label: 'Internal Audit', href: '/services/internal-audit' },
        { label: 'External Audit', href: '/services/external-audit' },
      ],
    },
  },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blogs', href: '/blogs' },
];

export const menuLanguages: MenuLanguage[] = [
  { value: 'EN', icon: icons.FlagUK },
  { value: 'ID', icon: icons.FlagID },
];
