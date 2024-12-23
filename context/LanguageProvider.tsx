'use client';
import Loading from '@/components/Loading';
import type { Dictionary, Language, LanguageContextType } from '@/lib/type/languange';
import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const LanguageContext = createContext<LanguageContextType | null>(null);

const defaultLanguage: Language = 'en';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDictionary = useCallback(async (lang: Language): Promise<Dictionary> => {
    try {
      const dict = await import(`@/dictionaries/${lang}.json`);
      return dict.default;
    } catch (error) {
      console.error(`Failed to load dictionary for ${lang}:`, error);
      throw error;
    }
  }, []);

  const changeLanguage = useCallback(
    async (newLang: Language): Promise<void> => {
      try {
        const newDictionary = await loadDictionary(newLang);
        setDictionary(newDictionary);
        setLanguage(newLang);

        localStorage.setItem('preferredLanguage', newLang);
      } catch (error) {
        console.error('Error changing language:', error);
      }
    },
    [loadDictionary, setDictionary, setLanguage]
  );

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
        const initialLanguage = savedLanguage || defaultLanguage;

        const initialDictionary = await loadDictionary(initialLanguage);
        setDictionary(initialDictionary);
        setLanguage(initialLanguage);
      } catch (error) {
        console.error('Error initializing language:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeLanguage();
  }, [loadDictionary]);

  const valueContext = useMemo(() => {
    return {
      language,
      dictionary,
      changeLanguage,
    };
  }, [changeLanguage, dictionary, language]);

  if (loading || !dictionary) {
    return <Loading />;
  }

  return <LanguageContext.Provider value={valueContext}>{children}</LanguageContext.Provider>;
};

export const LanguageProviders = memo(LanguageProvider);

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
