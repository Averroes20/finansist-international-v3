export interface Service {
  title: string;
  newService: boolean;
  link: string;
  icon: string;
  tags: string[];
  benefits: string[];
  benefitsDetails: string[];
  prices: {
    label: string;
    price: string;
    desc: string;
  };
  details: {
    overview: string;
    extendedServices: string[];
  };

  payment_type?: 'MONTHLY' | 'ONE_TIME' | 'CUSTOM';
}
