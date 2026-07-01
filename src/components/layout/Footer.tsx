import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3>Wakaf<span>Ku</span></h3>
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
          <p>&copy; {new Date().getFullYear()} WakafKu MVP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
