"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockCampaigns } from '@/data/mock-campaigns';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../page.module.css';

export default function CampaignsPage() {
  const { t } = useLanguage();
  return (
    <div className={styles.container} style={{ paddingTop: '4rem' }}>
      <div className={styles.sectionHeader}>
        <h2>Jelajahi Program Wakaf</h2>
      </div>
      <div className={styles.campaignGrid}>
        {mockCampaigns.map((campaign) => {
          const progress = calculateProgress(campaign.currentAmount, campaign.targetAmount);
          
          return (
            <Card key={campaign.id} className={styles.campaignCard}>
              <div 
                className={styles.cardImage} 
                style={{ backgroundImage: `url('${campaign.imageUrl}')` }}
              >
                <span className={styles.categoryBadge}>{t(`categories.${campaign.category}`)}</span>
              </div>
              <div className={styles.cardContent}>
                <h3>{campaign.title}</h3>
                <p className={styles.description}>{campaign.description}</p>
                
                <div className={styles.progressContainer}>
                  <div className={styles.progressText}>
                    <span>Terkumpul: <strong>{formatCurrency(campaign.currentAmount)}</strong></span>
                    <span>{progress}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className={styles.targetText}>
                    Target: {formatCurrency(campaign.targetAmount)}
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <span className={styles.daysLeft}>Sisa {campaign.daysLeft} hari</span>
                  <Link href={`/campaigns/${campaign.id}`}>
                    <Button variant="primary" size="sm">Wakaf Sekarang</Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
