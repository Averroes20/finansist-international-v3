interface Blog {
  id: number;
  title: string;
  resume: string;
  article: string;
  author: string;
  category: string;
  slug: string;
  cover: File | string;
  sum_comments: number;
  createdAt: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'Business Demographic in Indonesia Based on Industries: An Ultimate Guide for Entrepreneurs',
    resume:
      'This article provides an overview of the business demographic in Indonesia based on industries to help entrepreneurs and companies make informed decisions when opening a business.',
    article:
      'This article provides an overview of the business demographic in Indonesia based on industries to help entrepreneurs and companies make informed decisions when opening a business. Indonesia, a Southeast Asian country with over 270 million people, presents a vast opportunity for entrepreneurs and companies to establish their businesses. With its rich natural resources and diverse population, Indonesia is a market with immense potential for growth.',
    author: 'Ega Retno',
    category: 'Open Business In Indonesia',
    slug: 'business-demographic-in-indonesia-based-on-industries-an-ultimate-guide-for-entrepreneurs',
    sum_comments: 0,
    cover: '/images/cover-blog.png',
    createdAt: '2024-11-04T10:08:06.108Z',
  },
  {
    id: 2,
    title: 'Ultimate Location of Business Demographics in Indonesia',
    resume:
      'Are you an entrepreneur or a company planning to open a business in Indonesia? If yes, then it’s essential to understand the business demographic in Indonesia',
    article:
      'Are you an entrepreneur or a company planning to open a business in Indonesia? If yes, then it’s essential to understand the business demographic in Indonesia based on location.With over 270 million people, Indonesia is the fourth most populous country in the world. This article provides you with an overview of the business demographic in Indonesia based on location to help you make informed decisions when opening your business.',
    author: 'Ega Retno',
    category: 'Open Business In Indonesia',
    slug: 'ultimate-location-of-business-demographics-in-indonesia',
    sum_comments: 0,
    cover: '/images/cover-blog.png',
    createdAt: '2024-11-04T10:08:06.108Z',
  },
  {
    id: 3,
    title: 'The Ultimate Pros and Cons of Doing Your Own Bookkeeping',
    resume:
      'In this article, we will explore the pros and cons of doing your own bookkeeping, specifically tailored to entrepreneurs and companies opening businesses in Indonesia. As',
    article:
      'In this article, we will explore the pros and cons of doing your own bookkeeping, specifically tailored to entrepreneurs and companies opening businesses in Indonesia. As an entrepreneur or company looking to open a business in Indonesia, you have a myriad of tasks and responsibilities on your plate. One of the crucial aspects of running a successful business is managing your finances effectively. Bookkeeping plays a vital role in this regard, ensuring accurate record-keeping and financial transparency. When it comes to bookkeeping, you have two options: doing it yourself or outsourcing the task to a professional.',
    author: 'Ega Retno',
    slug: 'the-ultimate-pros-and-cons-of-doing-your-own-bookkeeping',
    sum_comments: 0,
    category: 'Open Business In Indonesia',
    cover: '/images/cover-blog.png',
    createdAt: '2024-11-04T10:08:06.108Z',
  },
];
