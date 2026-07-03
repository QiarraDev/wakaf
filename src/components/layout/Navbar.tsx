'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import { Button } from '../ui/Button';
import { LanguageThemeSwitcher } from './LanguageThemeSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
  const { t } = useLanguage();

  return (
    <header className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>Wakaf</span>Ku
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/campaigns" className={styles.link}>{t('nav.program')}</Link>
          <Link href="/simulasi" className={styles.link}>{t('nav.simulasi')}</Link>
          <Link href="/dashboard" className={styles.link}>{t('nav.dashboard')}</Link>
          <Link href="/admin" className={styles.link} style={{ color: 'var(--danger-color)' }}>{t('nav.admin')}</Link>
        </nav>
        <div className={styles.actions}>
          <LanguageThemeSwitcher />
          <Button variant="outline" size="sm">{t('nav.masuk')}</Button>
          <Button variant="primary" size="sm">{t('nav.mulaiWakaf')}</Button>
        </div>
      </div>
    </header>
  );
};
