"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { mockCampaigns } from '@/data/mock-campaigns';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/campaigns/DonationModal';
import styles from './page.module.css';

export default function CampaignDetails({ params }: { params: { id: string } }) {
  const campaign = mockCampaigns.find(c => c.id === params.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!campaign) {
    notFound();
  }

  const progress = calculateProgress(campaign.currentAmount, campaign.targetAmount);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageWrapper} style={{ backgroundImage: `url(${campaign.imageUrl})` }}>
          <div className={styles.overlay}>
            <span className={styles.badge}>{campaign.category}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{campaign.title}</h1>
          
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Terkumpul</span>
              <span className={styles.statValue}>{formatCurrency(campaign.currentAmount)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Target</span>
              <span className={styles.statValue}>{formatCurrency(campaign.targetAmount)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Sisa Waktu</span>
              <span className={styles.statValue}>{campaign.daysLeft} Hari</span>
            </div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.progressMeta}>
              <span>{progress}% Tercapai</span>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Cerita Program</h2>
            <p>{campaign.description}</p>
            <p>Wakaf produktif ini bertujuan untuk memberikan manfaat yang berkelanjutan bagi penerima manfaat. Kami memastikan setiap dana yang terkumpul dikelola secara profesional dan transparan.</p>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.actionCard}>
            <h3>Mari Berwakaf</h3>
            <p>Pahala yang terus mengalir walaupun kita telah tiada.</p>
            <Button size="lg" fullWidth onClick={() => setIsModalOpen(true)}>
              Wakaf Sekarang
            </Button>
            <div className={styles.securityNote}>
              <span>🔒 Transaksi aman & terenkripsi</span>
            </div>
          </div>
        </div>
      </div>

      <DonationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        campaignTitle={campaign.title}
      />
    </div>
  );
}
