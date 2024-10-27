import { icons } from '@/constants/icons';
import { StaticImageData } from 'next/image';

export type PortfolioItem = {
  title: string;
  logoCompany: StaticImageData;
  subLogoCompany?: StaticImageData[];
  country: string;
  description: string;
};

export const portfolio: PortfolioItem[] = [
  {
    title: 'Counto',
    logoCompany: icons.Counto,
    country: 'Singapore',
    description: 'Counto offers account, tax & incorporation service for growing biz in Singapore',
  },
  {
    title: 'Idea Agri Bahari',
    logoCompany: icons.Idea,
    subLogoCompany: [icons.MekariJurnal],
    country: 'Indonesia',
    description:
      'Idea Agri Bahari is a global agri-tech company that specializes in agro-forestry, agro-chemicals, agro-industries, agro-foods, agro-technology and agro-forestry',
  },
  {
    title: 'The Hedgehog',
    logoCompany: icons.Hedgehog,
    subLogoCompany: [icons.Quickbooks],
    country: 'United States',
    description: 'The Hedgehog is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'Yuk Bisnis',
    logoCompany: icons.YukBisnis,
    country: 'Indonesia',
    description: 'Yuk Bisnis is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'Clockster',
    logoCompany: icons.Clockster,
    country: 'Singapore',
    description: 'Clockster is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'TITMANN Design + Consulting',
    logoCompany: icons.Titman,
    country: 'Indonesia',
    description:
      'TITMANN Design + Consulting is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'BRANDWORKS Jakarta',
    logoCompany: icons.Brandworks,
    subLogoCompany: [icons.Xero],
    country: 'Indonesia',
    description: 'BRANDWORKS Jakarta is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'Herban Therapies SPA',
    logoCompany: icons.Herban,
    subLogoCompany: [icons.Quickbooks],
    country: 'United States',
    description:
      'Herban Therapies SPA is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'Breakfree Trading',
    logoCompany: icons.BreakfreeTrading,
    subLogoCompany: [icons.Xero],
    country: 'Singapore',
    description: 'Breakfree Trading is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'myLoqta LLC',
    logoCompany: icons.MyLoqta,
    subLogoCompany: [icons.ZohoBooks, icons.Quickbooks],
    country: 'Kuwait',
    description: 'myLoqta LLC is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'CNTRD Consulting',
    logoCompany: icons.CNTRDConsulting,
    country: 'United States',
    description: 'CNTRD Consulting is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'Mikairu Enterprise',
    logoCompany: icons.Mikairu,
    subLogoCompany: [icons.MekariJurnal],
    country: 'Indonesia',
    description: 'Mikairu Enterprise is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
  {
    title: 'BeanBurds',
    logoCompany: icons.Beanburds,
    country: 'United Arab Emirates',
    description: 'BeanBurds is a startup that provides enterprise-grade tax software for small businesses. The company was founded in 2021',
  },
];
