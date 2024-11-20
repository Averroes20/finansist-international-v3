'use client';

import useMultiIntersectionPrefetch from '@/hooks/use-multi-intersection-prefetch';
import React, { useRef } from 'react';
import Services from './Services';

interface Props {
  portfolio: React.ReactNode;
  review: React.ReactNode;
  blogs: React.ReactNode;
  careers: React.ReactNode;
  valueCompany: React.ReactNode;
  servicePromotion: React.ReactNode;
}

const Home: React.FC<Props> = ({ portfolio, review, blogs, careers, valueCompany, servicePromotion }: Props) => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);
  const servicePromotionRef = useRef<HTMLDivElement>(null);
  const valueCompanyRef = useRef<HTMLDivElement>(null);

  useMultiIntersectionPrefetch([
    { ref: portfolioRef, prefetchFn: () => import('@/components/Portfolio') },
    { ref: reviewsRef, prefetchFn: () => import('@/components/Review') },
    { ref: blogsRef, prefetchFn: () => import('@/components/Blogs') },
    { ref: careersRef, prefetchFn: () => import('@/components/Careers') },
    { ref: servicePromotionRef, prefetchFn: () => import('@/components/ServicePromotion') },
    { ref: valueCompanyRef, prefetchFn: () => import('@/components/ValueCompany') },
  ]);
  return (
    <>
      <div ref={reviewsRef}>{review}</div>
      <div ref={servicePromotionRef}>{servicePromotion}</div>
      <div ref={valueCompanyRef}>{valueCompany}</div>
      <Services />
      <div ref={portfolioRef}>{portfolio}</div>
      <div ref={blogsRef}>{blogs}</div>
      <div ref={careersRef}>{careers}</div>
    </>
  );
};

export default Home;
