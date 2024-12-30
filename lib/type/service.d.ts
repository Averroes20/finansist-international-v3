export interface Service {
  title: string;
  icon: string;
  link: string;
  price: string;
  tagPrice: string;
  shortDescription: string[];
  details: {
    overview: string;
    extendedServices: string[];
    benefits: {
      title: string;
      items: string[];
    }[];
  };
}
