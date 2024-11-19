interface Achievement {
  count: string;
  description: string;
}

interface Software {
  label: string;
  value: string;
}

export const achievements: Achievement[] = [
  { count: '10', description: 'Years of experience' },
  { count: '54', description: 'Project Success' },
  { count: '112', description: 'Satisfied Clients' },
];

export const software: Software[] = [
  { label: 'Quickbooks', value: '/icons/software/quickbooks.png' },
  { label: 'Xero', value: '/icons/software/xero.png' },
  { label: 'Myob', value: '/icons/software/myob.png' },
  { label: 'Shopify', value: '/icons/software/shopify.png' },
  { label: 'Sage', value: '/icons/software/sage.png' },
  { label: 'Gusto', value: '/icons/software/gusto.png' },
  { label: 'Zoho Books', value: '/icons/software/zoho.png' },
  { label: 'Wave', value: '/icons/software/wave.png' },
  { label: 'Stessa', value: '/icons/software/stessa.png' },
  { label: 'Accurate', value: '/icons/software/accurate.png' },
  { label: 'Mekari Jurnal', value: '/icons/software/jurnal.png' },
  { label: 'Zahir', value: '/icons/software/zahir.png' },
];
