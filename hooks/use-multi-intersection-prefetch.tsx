import { useEffect } from 'react';

type PrefetchItem = {
  ref: React.RefObject<HTMLElement>;
  prefetchFn: () => void;
};

export default function useMultiIntersectionPrefetch(items: PrefetchItem[]) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ ref, prefetchFn }) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          prefetchFn();
          observer.disconnect();
        }
      });

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);
}
