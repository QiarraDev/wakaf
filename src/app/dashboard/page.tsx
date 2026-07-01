"use client";

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

interface Contribution {
  id: string;
  campaignTitle: string;
  amount: number;
  date: string;
}

export default function DashboardPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wakaf_contributions');
    if (saved) {
      setContributions(JSON.parse(saved));
    }
  }, []);

  const totalWakaf = contributions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard Wakif</h1>
      <p className={styles.subtitle}>Selamat datang kembali, hamba Allah.</p>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <h3>Total Wakaf</h3>
          <p className={styles.statValue}>{formatCurrency(totalWakaf)}</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>Program Didukung</h3>
          <p className={styles.statValue}>{contributions.length}</p>
        </Card>
      </div>

      <div className={styles.historySection}>
        <h2>Riwayat Wakaf</h2>
        {contributions.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Anda belum memiliki riwayat wakaf.</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Program Wakaf</th>
                  <th>Nominal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr key={c.id}>
                    <td>{new Date(c.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{c.campaignTitle}</td>
                    <td className={styles.amount}>{formatCurrency(c.amount)}</td>
                    <td><span className={styles.statusSuccess}>Berhasil</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
