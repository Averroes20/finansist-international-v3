'use client';

import { getLinks } from '@/lib/action/link';
import { TypeLink } from '@/lib/validation/schema-form-link';
import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const SocialMediaContext = createContext<{ data: TypeLink[]; loading: boolean } | null>(null);

interface Props {
  children: React.ReactNode;
}

const SocialMediaProvider = ({ children }: Props) => {
  const [data, setData] = useState<TypeLink[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLinks();
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const valueContext = useMemo(() => ({ data, loading }), [data, loading]);

  return <SocialMediaContext.Provider value={valueContext}>{children}</SocialMediaContext.Provider>;
};
export const SocialMediaProviders = memo(SocialMediaProvider);

export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (!context) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
}
