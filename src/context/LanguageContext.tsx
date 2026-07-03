'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, LanguageKey } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  t: (path: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageKey>('id');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as LanguageKey;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
    setIsReady(true);
  }, []);

  const setLanguage = (lang: LanguageKey) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      // Update text direction for Arabic
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const t = (path: string): string => {
    try {
      const keys = path.split('.');
      let value: any = translations[language];
      
      for (const key of keys) {
        value = value[key];
        if (value === undefined) {
          // Fallback to Indonesian if key not found
          value = translations.id;
          for (const k of keys) {
            value = value[k];
          }
          break;
        }
      }
      
      return typeof value === 'string' ? value : path;
    } catch {
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
