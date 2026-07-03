'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import styles from './LanguageThemeSwitcher.module.css';

export const LanguageThemeSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages: Array<{ code: 'id' | 'en' | 'ar'; name: string; flag: string }> = [
    { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const handleLanguageSelect = (lang: 'id' | 'en' | 'ar') => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className={styles.switcherContainer}>
      {/* Language Selector */}
      <div className={styles.languageWrapper}>
        <button
          className={styles.languageBtn}
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          title="Select language"
        >
          <span className={styles.langIcon}>🌍</span>
          <span className={styles.langText}>
            {languages.find(l => l.code === language)?.flag}
          </span>
        </button>

        {isLanguageMenuOpen && (
          <div className={styles.languageMenu}>
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`${styles.languageMenuItem} ${
                  language === lang.code ? styles.languageMenuItemActive : ''
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className={styles.langFlag}>{lang.flag}</span>
                <span className={styles.langName}>{lang.name}</span>
                {language === lang.code && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        className={`${styles.themeBtn} ${styles[theme]}`}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};
