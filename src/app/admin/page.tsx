"use client";

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

interface Contribution {
  id: string;
  campaignTitle: string;
  amount: number;
  wakifName?: string;
  date: string;
}

export default function AdminDashboardPage() {
  const [allContributions, setAllContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call fetching all users' data.
    // For MVP, we read the shared local storage.
    const saved = localStorage.getItem('wakaf_contributions');
    if (saved) {
      setAllContributions(JSON.parse(saved));
    }
  }, []);

  const totalFunds = allContributions.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = allContributions.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Nazhir (Admin)</h1>
        <p className={styles.subtitle}>Pantau laporan transaksi dan pengumpulan dana wakaf secara *real-time*.</p>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <h3>Total Dana Terkumpul</h3>
          <p className={styles.statValue}>{formatCurrency(totalFunds)}</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>Total Transaksi Berhasil</h3>
          <p className={styles.statValue}>{totalTransactions}</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>Program Aktif</h3>
          <p className={styles.statValue}>4</p>
        </Card>
      </div>

      <div className={styles.reportSection}>
        <div className={styles.reportHeader}>
          <h2>Laporan Detail Transaksi</h2>
          <button className={styles.exportBtn} onClick={() => window.print()}>Cetak Laporan</button>
        </div>
        
        {allContributions.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Belum ada data transaksi yang masuk.</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Tanggal</th>
                  <th>Nama Wakif</th>
                  <th>Nama Program</th>
                  <th>Nominal</th>
                  <th>Metode</th>
                </tr>
              </thead>
              <tbody>
                {allContributions.map((c) => (
                  <tr key={c.id}>
                    <td className={styles.txId}>#{c.id.toUpperCase()}</td>
                    <td>{new Date(c.date).toLocaleString('id-ID')}</td>
                    <td><strong>{c.wakifName || 'Hamba Allah'}</strong></td>
                    <td>{c.campaignTitle}</td>
                    <td className={styles.amount}>{formatCurrency(c.amount)}</td>
                    <td>Gateway (Mock)</td>
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
