'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Milestone } from '@/data/mock-campaigns';
import styles from './CampaignTimeline.module.css';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

// Dynamically import Chrono dengan ssr: false
const Chrono = dynamic(
  () => import('react-chrono').then(m => m.Chrono),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.loadingContainer}>
        <p>Memuat timeline konstruksi...</p>
      </div>
    )
  }
);

interface CampaignTimelineProps {
  campaignTitle: string;
  milestones: Milestone[];
}

export const CampaignTimeline: React.FC<CampaignTimelineProps> = ({
  campaignTitle,
  milestones,
}) => {
  const { t } = useLanguage();
  // Format data untuk React-Chrono
  const chronoItems = useMemo(() => {
    return milestones.map((milestone) => ({
      title: campaignTitle,
      cardTitle: milestone.name,
      cardSubtitle: formatCurrency(milestone.amount),
      cardDetailedText: `📐 Fase: ${milestone.name}

💰 Estimasi Biaya: ${formatCurrency(milestone.amount)}

📊 Status: ${
        milestone.status === 'completed'
          ? '✓ Selesai'
          : milestone.status === 'in_progress'
            ? '⚙ Sedang Berlangsung'
            : '⏳ Belum Dimulai'
      }

🔒 Escrow: ${
        milestone.escrowReleased
          ? '✓ Dana Dicairkan'
          : '🔐 Dana Terkunci (Menunggu Verifikasi)'
      }

Setiap tahapan diawasi ketat dengan sistem escrow untuk memastikan proyek berjalan sesuai rencana.`,
    }));
  }, [milestones, campaignTitle]);

  if (milestones.length === 0) {
    return <div className={styles.emptyState}>Tidak ada milestone untuk proyek ini</div>;
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        <h3 className={styles.timelineTitle}>Timeline Konstruksi (Milestones)</h3>
        <p className={styles.timelineSubtitle}>
          Pantau setiap tahapan dari awal hingga selesai. Dana dialokasikan per-milestone melalui Escrow.
        </p>
      </div>

      <div className={styles.chronoWrapper}>
        <Chrono
          items={chronoItems}
          mode="VERTICAL"
          hideControls={false}
          theme={{
            primary: '#1e40af',
            secondary: '#16a34a',
            titleColor: '#111827',
            titleColorActive: '#1e40af',
            cardBgColor: '#ffffff',
            cardForegroundColor: '#6b7280',
            detailsColor: '#111827',
          }}
          autoPlay={false}
          autoPlayDelay={3000}
        />
      </div>

      <div className={styles.escrowInfo}>
        <div className={styles.escrowCard}>
          <div className={styles.escrowIcon}>🔒</div>
          <div className={styles.escrowContent}>
            <h4>{t('campaign.sistimEscrow')}</h4>
            <p>
              {t('campaign.escrowDesc')}
            </p>
          </div>
        </div>

        <div className={styles.escrowCard}>
          <div className={styles.escrowIcon}>✓</div>
          <div className={styles.escrowContent}>
            <h4>Transparansi Penuh</h4>
            <p>
              Anda dapat memantau progres setiap tahapan konstruksi melalui dashboard 
              dan menerima update berkala tentang status pencairan dana.
            </p>
          </div>
        </div>

        <div className={styles.escrowCard}>
          <div className={styles.escrowIcon}>📊</div>
          <div className={styles.escrowContent}>
            <h4>Dokumentasi Visual</h4>
            <p>
              Setiap milestone dilengkapi dengan foto dan laporan progres untuk 
              memastikan pekerjaan sesuai spesifikasi dan standar yang ditetapkan.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Milestone</span>
          <span className={styles.statValue}>{milestones.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Biaya</span>
          <span className={styles.statValue}>
            {formatCurrency(
              milestones.reduce((sum, m) => sum + m.amount, 0)
            )}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Selesai</span>
          <span className={styles.statValue}>
            {milestones.filter(m => m.status === 'completed').length}/{milestones.length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Dana Dicairkan</span>
          <span className={styles.statValue}>
            {formatCurrency(
              milestones
                .filter(m => m.escrowReleased)
                .reduce((sum, m) => sum + m.amount, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignTimeline;
