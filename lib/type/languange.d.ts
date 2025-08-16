
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
    tagsLine: Array<string>;
    achievements: Array<{ count: string; description: string }>;
  };
  whyFinansist: {
    tagsLine: {
      part0: string;
      part1: string;
      part2: Array<string>;
    };
    description: Array<{
      icon: string;
      subtitle: string;
      description: string;
    }>;
  };
  about: {
    [key: string]: string;
  };
  financialSupport: {
    title: string;
    subtitle: string;
    points: Array<{ title: string; description: string }>;
    description: {
      text: string;
      points: Array<string>;
    };
    tagsLine: string;
  };
  customerType: {
    title1: string;
    title2: string;
    title3: string;
    description: string;
  }
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
        description1: string;
        description2: string;
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
