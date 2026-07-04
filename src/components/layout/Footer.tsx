import React from 'react';
import styles from './Footer.module.css';

import { MosqueLogo } from '../ui/MosqueLogo';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <MosqueLogo />
              </div>
              <div className={styles.logoText}>
                Wakaf<span> Konstruksi</span>
              </div>
            </div>
            <p>Membangun masa depan melalui wakaf yang produktif dan bermanfaat bagi umat.</p>
          </div>
          <div className={styles.links}>
            <h4>Tentang Kami</h4>
            <a href="#">Visi Misi</a>
            <a href="#">Laporan Transparansi</a>
            <a href="#">FAQ</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Wakaf Konstruksi MVP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
