import Link from 'next/link';
import styles from './Navbar.module.css';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <header className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>Wakaf</span>Ku
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/campaigns" className={styles.link}>Program Wakaf</Link>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>
        </nav>
        <div className={styles.actions}>
          <Button variant="outline" size="sm">Masuk</Button>
          <Button variant="primary" size="sm">Mulai Wakaf</Button>
        </div>
      </div>
    </header>
  );
};
