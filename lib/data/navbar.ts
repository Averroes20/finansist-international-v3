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
  icon: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about-us' },
  {
    label: 'Services',
    subItems: {
      company: [
        { label: 'Accounting and Bookkeeping', href: '/#' },
        { label: 'Tax Report', href: '/#' },
        { label: 'Payroll', href: '/#' },
      ],
      special: [
        { label: 'Tax Planning', href: '/#' },
        { label: 'LKPM/PMA Report', href: '#' },
        { label: 'Internal Audit', href: '#' },
        { label: 'External Audit', href: '#' },
      ],
    },
  },
  { label: 'Career', href: '/#career' },
  { label: 'Blog', href: '/#blog' },
];

export const menuLanguages: MenuLanguage[] = [
  { value: 'EN', icon: '/icons/flag-united-kingdom.png' },
  { value: 'ID', icon: '/icons/flag-indonesia.png' },
];
