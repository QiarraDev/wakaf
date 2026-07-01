import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockCampaigns } from '@/data/mock-campaigns';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import styles from './page.module.css';

export default function Home() {
  const featuredCampaigns = mockCampaigns.slice(0, 3);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Wujudkan Kebaikan Abadi <br/> Melalui <span>Wakaf Produktif</span>
          </h1>
          <p className={styles.subtitle}>
            Platform terpercaya untuk menyalurkan wakaf Anda. Bersama kita bangun kemandirian umat dan berikan manfaat yang tak terputus.
          </p>
          <div className={styles.heroActions}>
            <Link href="/campaigns">
              <Button variant="primary" size="lg">Mulai Berwakaf</Button>
            </Link>
            <Link href="#featured">
              <Button variant="outline" size="lg">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroShape}></div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section id="featured" className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Program Wakaf Pilihan</h2>
          <Link href="/campaigns" className={styles.viewAll}>
            Lihat Semua Program &rarr;
          </Link>
        </div>
        <div className={styles.campaignGrid}>
          {featuredCampaigns.map((campaign) => {
            const progress = calculateProgress(campaign.currentAmount, campaign.targetAmount);
            
            return (
              <Card key={campaign.id} className={styles.campaignCard}>
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url(${campaign.imageUrl})` }}
                >
                  <span className={styles.categoryBadge}>{campaign.category}</span>
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
      </section>
    </div>
  );
}
