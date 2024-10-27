import { icons } from '@/constants/icons';
import { StaticImageData } from 'next/image';

interface Achievement {
  count: string;
  description: string;
}

interface Client {
  icon: StaticImageData;
  name: string;
}

export const achievements: Achievement[] = [
  { count: '10', description: 'Years of experience' },
  { count: '35', description: 'Project Success' },
  { count: '27', description: 'Satisfied Clients' },
];

export const clients: Client[] = [
  { icon: icons.Quickbooks, name: 'Quickbooks' },
  { icon: icons.Xero, name: 'Xero' },
  { icon: icons.Myob, name: 'Myob' },
  { icon: icons.Shopify, name: 'Shopify' },
  { icon: icons.Sage, name: 'Sage' },
  { icon: icons.Gusto, name: 'Gusto' },
  { icon: icons.ZohoBooks, name: 'Zoho Books' },
  { icon: icons.Wave, name: 'Wave' },
  { icon: icons.Stessa, name: 'Stessa' },
  { icon: icons.Accurate, name: 'Accurate' },
  { icon: icons.MekariJurnal, name: 'Mekari Jurnal' },
  { icon: icons.Zahir, name: 'Zahir' },
];
