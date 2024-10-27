import { images } from '@/constants/images';
import { StaticImageData } from 'next/image';

interface AboutUsItem {
  title: string;
  image: StaticImageData;
  description: string[] | string;
}

export const aboutUs: AboutUsItem[] = [
  {
    title: 'Imagine This',
    image: images.Imagine,
    description:
      "Your accountant or finance gets sick or takes time off, your financial operations may slow down, missed deadlines of payment, or in the worst case causing piling up fines. With Finansist, you won't face this problems because we will ensure your finances are always managed by professional experts, ensuring continuous, reliable service without interruptions.",
  },
  {
    title: 'What Do You Get From Partnering With Us?',
    image: images.Partnering,
    description:
      "A flexible team of  professional experts with international certifications, ensuring precision and high-quality results that drive your business forward and adapts to your business, whether you're a multinational, a fast-growing startup, or an e-commerce company.  Experience our services that puts your business first. We'll take care of the financials so you can focus on growing your business.",
  },
  {
    title: 'Why Do Multinational Companies Trust Us?',
    image: images.Multinational,
    description: [
      'Data Security as a Priority',
      'Accurate Financial Schedules and Reporting',
      'Able to operate all accounting applications & systems',
      '24/7 International Communication Support',
      'Compliance with Local and International Regulations (GAAP, IFRS, etc)',
    ],
  },
  {
    title: 'Make Your Smart Move',
    image: images.SmartMove,
    description:
      'Instead of spending more to recruit and maintain a large in-house finance team, our services provide a more affordable solution to meet the same needs. Let us handle the details, so you can focus on growing your business without the stress and distractions of building and managing an internal team.',
  },
];
