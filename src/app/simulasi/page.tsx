"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import styles from './page.module.css';

export default function SimulasiPage() {
  const [amount, setAmount] = useState<number>(50000);
  const [frequency, setFrequency] = useState<'daily' | 'monthly'>('monthly');
  const [durationYears, setDurationYears] = useState<number>(1);

  // Calculations
  const periodMultiplier = frequency === 'daily' ? 365 : 12;
  const totalPeriods = periodMultiplier * durationYears;
  const projectedTotal = amount * totalPeriods;

  // Impact estimations (arbitrary logic for MVP simulation)
  const mealsProvided = Math.floor(projectedTotal / 25000); // Assume Rp 25.000 per meal
  const quranDistributed = Math.floor(projectedTotal / 75000); // Assume Rp 75.000 per Quran
  const wellsContributed = (projectedTotal / 15000000).toFixed(2); // Assume Rp 15.000.000 per well

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kalkulator Simulasi Wakaf</h1>
        <p className={styles.subtitle}>
          Hitung proyeksi dan estimasi dampak dari wakaf rutin yang Anda niatkan. Sedikit namun rutin, lebih dicintai Allah.
        </p>
      </div>

      <div className={styles.content}>
        <Card className={styles.calculatorCard}>
          <div className={styles.formGroup}>
            <label>Niat Wakaf Sebesar (Rp)</label>
            <input 
              type="number" 
              value={amount || ''} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className={styles.input}
              min="1000"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Rutinitas</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="frequency" 
                  checked={frequency === 'daily'} 
                  onChange={() => setFrequency('daily')} 
                />
                Harian
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="frequency" 
                  checked={frequency === 'monthly'} 
                  onChange={() => setFrequency('monthly')} 
                />
                Bulanan
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Jangka Waktu (Tahun)</label>
            <input 
              type="range" 
              min="1" max="10" 
              value={durationYears} 
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className={styles.rangeInput}
            />
            <div className={styles.rangeValue}>{durationYears} Tahun</div>
          </div>
        </Card>

        <Card className={styles.resultCard}>
          <h2>Proyeksi Nilai Wakaf Anda</h2>
          <div className={styles.projectedTotal}>
            {formatCurrency(projectedTotal)}
          </div>
          <p className={styles.resultDesc}>
            Terkumpul dalam waktu {durationYears} tahun jika Anda berwakaf {formatCurrency(amount)} secara {frequency === 'daily' ? 'rutin setiap hari' : 'rutin setiap bulan'}.
          </p>

          <div className={styles.impactSection}>
            <h3>Estimasi Dampak Kebaikan</h3>
            <ul className={styles.impactList}>
              <li>
                <span className={styles.impactIcon}>🍚</span>
                <div>
                  <strong>{mealsProvided}</strong> porsi makanan gratis bagi santri/dhuafa
                </div>
              </li>
              <li>
                <span className={styles.impactIcon}>📖</span>
                <div>
                  <strong>{quranDistributed}</strong> mushaf Al-Quran tersalurkan
                </div>
              </li>
              {Number(wellsContributed) >= 0.01 && (
                <li>
                  <span className={styles.impactIcon}>💧</span>
                  <div>
                    <strong>{wellsContributed}</strong> bagian partisipasi pembuatan sumur bor
                  </div>
                </li>
              )}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
