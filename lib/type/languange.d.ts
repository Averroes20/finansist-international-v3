export type Language = 'id' | 'en';

export interface Dictionary {
  navbar: {
    items: Array<{ label: string; url: string; subItems?: boolean }>;
  };
  intro: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    certifiedOf: string;
    description: string;
    softwareTitle: string;
    achievements: Array<{ count: string; description: string }>;
  };
  about: {
    [key: string]: string;
  };
  financialSupport: {
    title: string;
    points: Array<{ title: string; description: string }>;
    description: string;
    tagsLine: string;
  };
  valueCompany: {
    title: {
      part1: string;
      part2: string;
    };
    items: Array<{
      title: string;
      description: string;
      urlImage: string;
      contentModal: {
        title: string;
        description: string;
        otherDesc: string;
      };
    }>;
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      link: string;
      icon: string;
      shortDescription: string[];
      details: {
        overview: string;
        extendedServices: string[];
        benefits: {
          title: string;
          items: string[];
        }[];
      };
    }>;
  };
  portfolio: {
    [key: string]: string;
  };
  career: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      facilities?: string[];
      color: string;
    }>;
  };
}

export interface LanguageContextType {
  language: Language;
  dictionary: Dictionary | null;
  changeLanguage: (lang: Language) => Promise<void>;
}
