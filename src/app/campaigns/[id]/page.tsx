"use client";

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { mockCampaigns } from '@/data/mock-campaigns';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/campaigns/DonationModal';
import { CampaignTimeline } from '@/components/campaigns/CampaignTimeline';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import styles from './page.module.css';

export default function CampaignDetails({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useLanguage();
  const { id } = use(params);
  const campaign = mockCampaigns.find(c => c.id === id);
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className={styles.badge}>{t(`categories.${campaign.category}`)}</span>
              <span className={styles.badge} style={{ background: campaign.pbgStatus === 'Verified' ? 'var(--success-color)' : '#94a3b8' }}>
                PBG: {campaign.pbgStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{campaign.title}</h1>
          
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>{t('campaign.terkumpul')}</span>
              <span className={styles.statValue}>{formatCurrency(campaign.currentAmount)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>{t('campaign.target')}</span>
              <span className={styles.statValue}>{formatCurrency(campaign.targetAmount)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>{t('campaign.sisaWaktu')}</span>
              <span className={styles.statValue}>{campaign.daysLeft} {t('campaign.hari')}</span>
            </div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.progressMeta}>
              <span>{progress}% {t('campaign.tercapai')}</span>
            </div>
          </div>

          <div className={styles.description}>
            <h2>{t('campaign.ceritaProjek')}</h2>
            <p>{campaign.description}</p>
            <p>{t('campaign.mitra')} {t('campaign.diawasi')}</p>
          </div>

          {/* React-Chrono Timeline Component */}
          <CampaignTimeline 
            campaignTitle={campaign.title}
            milestones={campaign.milestones}
          />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.actionCard}>
            <h3>{t('campaign.mariWakaf')}</h3>
            <p>{t('campaign.pahala')}</p>
            <Button size="lg" fullWidth onClick={() => setIsModalOpen(true)}>
              {t('donation.mulaiWakaf')}
            </Button>
            <div className={styles.securityNote}>
              <span>🔒 {t('campaign.transaksiAman')}</span>
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
