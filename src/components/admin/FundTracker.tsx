"use client";

import React, { useState, useMemo } from 'react';
import { DonationReport } from '@/data/mock-admin';
import { formatCurrency } from '@/lib/utils';
import styles from './FundTracker.module.css';

interface FundTrackerProps {
  reports: DonationReport[];
}

const PAYMENT_META: Record<string, { logo: string; color: string; bg: string; glowColor: string }> = {
  BCA:             { logo: '🏦', color: '#005DAA', bg: 'rgba(0, 93, 170, 0.18)', glowColor: '#005DAA' },
  BSI:             { logo: '🕌', color: '#00923F', bg: 'rgba(0, 146, 63, 0.18)',  glowColor: '#00923F' },
  Muamalat:        { logo: '☪️', color: '#c0392b', bg: 'rgba(192, 57, 43, 0.18)', glowColor: '#c0392b' },
  'Cash/Teller':   { logo: '💵', color: '#64748b', bg: 'rgba(100, 116, 139, 0.18)', glowColor: '#64748b' },
  'Bank Transfer': { logo: '🏦', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.18)', glowColor: '#2563eb' },
  'E-Wallet':      { logo: '📱', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.18)', glowColor: '#7c3aed' },
};

const STATUS_META = {
  completed: { label: 'Terverifikasi', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)', dot: '#22c55e' },
  pending:   { label: 'Menunggu',     color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', dot: '#f59e0b' },
  failed:    { label: 'Gagal',        color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)', dot: '#ef4444' },
};

export const FundTracker: React.FC<FundTrackerProps> = ({ reports }) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [selectedTx, setSelectedTx] = useState<DonationReport | null>(null);
  const [search, setSearch] = useState('');

  const paymentSummary = useMemo(() => {
    const map: Record<string, { count: number; total: number; completed: number }> = {};
    reports.forEach(r => {
      if (!map[r.paymentMethod]) map[r.paymentMethod] = { count: 0, total: 0, completed: 0 };
      map[r.paymentMethod].count++;
      map[r.paymentMethod].total += r.amount;
      if (r.status === 'completed') map[r.paymentMethod].completed += r.amount;
    });
    return map;
  }, [reports]);

  const filtered = useMemo(() => {
    return reports.filter(r => {
      const matchStatus = filter === 'all' || r.status === filter;
      const matchPayment = selectedPayment === 'all' || r.paymentMethod === selectedPayment;
      const matchSearch = !search || r.wakifName.toLowerCase().includes(search.toLowerCase())
        || r.id.toLowerCase().includes(search.toLowerCase())
        || r.projectName.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchPayment && matchSearch;
    });
  }, [reports, filter, selectedPayment, search]);

  const totalVerified = reports.filter(r => r.status === 'completed').reduce((s, r) => s + r.amount, 0);
  const totalFiltered = filtered.filter(r => r.status === 'completed').reduce((s, r) => s + r.amount, 0);
  const paymentMethods = Object.keys(paymentSummary);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>Aliran Dana Real-time</span>
          <h2 className={styles.title}>Tracking Sumber Dana</h2>
          <p className={styles.subtitle}>Pantau asal dan status dana wakaf dari setiap metode pembayaran</p>
        </div>
        <div className={styles.totalBadge}>
          <span>Total Dana Terverifikasi</span>
          <strong>{formatCurrency(totalVerified)}</strong>
        </div>
      </div>

      {/* Payment Method Cards */}
      <div className={styles.paymentCards}>
        <button
          className={`${styles.pmCard} ${selectedPayment === 'all' ? styles.pmCardActive : ''}`}
          onClick={() => setSelectedPayment('all')}
        >
          <div className={styles.pmCardGlow} style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
          <span className={styles.pmLogo}>📊</span>
          <div className={styles.pmName}>Semua Saluran</div>
          <div className={styles.pmCount}>{reports.length} transaksi</div>
          <div className={styles.pmTotal}>{formatCurrency(reports.reduce((s, r) => s + r.amount, 0))}</div>
        </button>

        {paymentMethods.map(pm => {
          const meta = PAYMENT_META[pm] || { logo: '💳', color: '#64748b', bg: 'rgba(100,116,139,0.18)', glowColor: '#64748b' };
          const data = paymentSummary[pm];
          return (
            <button
              key={pm}
              className={`${styles.pmCard} ${selectedPayment === pm ? styles.pmCardActive : ''}`}
              onClick={() => setSelectedPayment(pm)}
            >
              <div className={styles.pmCardGlow} style={{ background: meta.glowColor }} />
              <span className={styles.pmLogo}>{meta.logo}</span>
              <div className={styles.pmName}>{pm}</div>
              <div className={styles.pmCount}>{data.count} transaksi</div>
              <div className={styles.pmTotal}>{formatCurrency(data.completed)}</div>
            </button>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className={styles.filterBar}>
        <div className={styles.filterTabs}>
          {(['all', 'completed', 'pending', 'failed'] as const).map(f => (
            <button
              key={f}
              className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Semua' : STATUS_META[f].label}
              <span className={styles.filterCount}>
                {f === 'all' ? reports.length : reports.filter(r => r.status === f).length}
              </span>
            </button>
          ))}
        </div>
        <input
          className={styles.searchInput}
          placeholder="🔎  Cari nama, ID, atau program..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.summaryBar}>
        <span>{filtered.length} transaksi ditemukan</span>
        <span>Terverifikasi: <strong>{formatCurrency(totalFiltered)}</strong></span>
      </div>

      {/* Transaction List */}
      <div className={styles.txList}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>Tidak ada transaksi yang cocok.</div>
        ) : (
          filtered.map(tx => {
            const meta = PAYMENT_META[tx.paymentMethod] || { logo: '💳', color: '#64748b', bg: 'rgba(100,116,139,0.18)', glowColor: '#64748b' };
            const statusMeta = STATUS_META[tx.status];
            return (
              <button
                key={tx.id}
                className={`${styles.txCard} ${selectedTx?.id === tx.id ? styles.txCardSelected : ''}`}
                onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
              >
                <div className={styles.txRow}>
                  <div className={styles.txBank} style={{ background: meta.bg }}>
                    <span>{meta.logo}</span>
                  </div>
                  <div className={styles.txInfo}>
                    <div className={styles.txTop}>
                      <span className={styles.txId}>{tx.id}</span>
                      <span className={styles.txPm} style={{ color: meta.color, background: meta.bg }}>{tx.paymentMethod}</span>
                    </div>
                    <div className={styles.txName}>{tx.wakifName}</div>
                    <div className={styles.txProject}>{tx.projectName}</div>
                    {tx.city && <div className={styles.txCity}>📍 {tx.city}</div>}
                  </div>
                  <div className={styles.txRight}>
                    <div className={styles.txAmount}>{formatCurrency(tx.amount)}</div>
                    <div className={styles.txStatus} style={{ color: statusMeta.color, background: statusMeta.bg }}>
                      <span className={styles.txDot} style={{ background: statusMeta.dot }} />
                      {statusMeta.label}
                    </div>
                    <div className={styles.txDate}>{formatDate(tx.date)}</div>
                  </div>
                </div>

                {selectedTx?.id === tx.id && (
                  <div className={styles.txDetail} onClick={e => e.stopPropagation()}>
                    <div className={styles.txDetailGrid}>
                      <div className={styles.txDetailItem}><span>ID Transaksi</span><strong>{tx.id}</strong></div>
                      <div className={styles.txDetailItem}><span>Waktu Donasi</span><strong>{formatDate(tx.date)} · {formatTime(tx.date)}</strong></div>
                      <div className={styles.txDetailItem}><span>Metode Pembayaran</span><strong style={{ color: meta.color }}>{meta.logo} {tx.paymentMethod}</strong></div>
                      <div className={styles.txDetailItem}><span>Kota Asal</span><strong>📍 {tx.city || '—'}</strong></div>
                      <div className={styles.txDetailItem}><span>Nama Wakif</span><strong>{tx.wakifName}</strong></div>
                      {tx.wakifEmail && <div className={styles.txDetailItem}><span>Email</span><strong>{tx.wakifEmail}</strong></div>}
                      <div className={styles.txDetailItem}><span>Program Wakaf</span><strong>{tx.projectName}</strong></div>
                      <div className={styles.txDetailItem}><span>Nominal</span><strong className={styles.txDetailAmount}>{formatCurrency(tx.amount)}</strong></div>
                      {tx.verifiedAt && <div className={styles.txDetailItem}><span>Terverifikasi</span><strong style={{ color: '#4ade80' }}>✓ {formatDate(tx.verifiedAt)} · {formatTime(tx.verifiedAt)}</strong></div>}
                      <div className={styles.txDetailItem}><span>Status</span><strong style={{ color: statusMeta.color }}>{statusMeta.label}</strong></div>
                    </div>

                    <div className={styles.txTimeline}>
                      <div className={`${styles.txTimelineStep} ${styles.txTimelineDone}`}>
                        <div className={styles.txTimelineDot} />
                        <div><strong>Dana Masuk Diterima</strong><span>{formatDate(tx.date)} {formatTime(tx.date)}</span></div>
                      </div>
                      <div className={`${styles.txTimelineStep} ${tx.status !== 'pending' ? styles.txTimelineDone : styles.txTimelineActive}`}>
                        <div className={styles.txTimelineDot} />
                        <div><strong>Verifikasi Admin</strong><span>{tx.verifiedAt ? `${formatDate(tx.verifiedAt)} ${formatTime(tx.verifiedAt)}` : tx.status === 'failed' ? 'Gagal diverifikasi' : 'Menunggu verifikasi...'}</span></div>
                      </div>
                      <div className={`${styles.txTimelineStep} ${tx.status === 'completed' ? styles.txTimelineDone : ''}`}>
                        <div className={styles.txTimelineDot} />
                        <div><strong>Dana Masuk Escrow</strong><span>{tx.status === 'completed' ? 'Dana berhasil dikunci di Escrow' : '—'}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
