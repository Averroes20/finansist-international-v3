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
  whyFinansist: {
    tagsLine: {
      part1: string;
      part2: Array<string>;
    };
    description: Array<{
      subtitle: string;
      description: string;
    }>;
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
      newService: boolean;
      link: string;
      icon: string;
      tags: string[];
      benefits: string[];
      prices: {
        label: string;
        price: string;
        desc: string;
      };
      details: {
        overview: string;
        extendedServices: string[];
      };
    }>;
  };
  portfolio: {
    [key: string]: string;
  };
  career: {
    title: string;
    items: Array<{
      id: number;
      title: string;
      description: string;
      facilities?: string[];
      color: string;
    }>;
  };
  faq: {
    title: string;
    questions: Array<{ question: string; answer: string }>;
  };
}

export interface LanguageContextType {
  language: Language;
  dictionary: Dictionary | null;
  changeLanguage: (lang: Language) => Promise<void>;
}
