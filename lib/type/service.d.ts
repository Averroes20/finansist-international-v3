export interface Service {
  title: string;
  icon: string;
  link: string;
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
