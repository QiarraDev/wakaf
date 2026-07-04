"use client";

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CertificateModal } from '@/components/campaigns/CertificateModal';
import { mockProgramNews, ProgramNews } from '@/data/mock-news';
import { formatCurrency } from '@/lib/utils';
import styles from './page.module.css';

interface Contribution {
  id: string;
  campaignTitle: string;
  amount: number;
  wakifName?: string;
  date: string;
}

// ── Gamification helpers ──────────────────────────────────────
const LEVELS = [
  { name: 'Wakif Pemula', min: 0,          max: 500000,    color: '#92400e', bg: 'linear-gradient(135deg,#78350f,#d97706)', icon: '🌱', next: 'Wakif Setia' },
  { name: 'Wakif Setia',  min: 500000,     max: 2000000,   color: '#374151', bg: 'linear-gradient(135deg,#374151,#6b7280)', icon: '🥈', next: 'Wakif Mulia' },
  { name: 'Wakif Mulia',  min: 2000000,    max: 10000000,  color: '#b45309', bg: 'linear-gradient(135deg,#92400e,#d97706)', icon: '🥇', next: 'Wakif Utama' },
  { name: 'Wakif Utama',  min: 10000000,   max: 50000000,  color: '#0f766e', bg: 'linear-gradient(135deg,#0f766e,#10b981)', icon: '💎', next: 'Wakif Agung' },
  { name: 'Wakif Agung',  min: 50000000,   max: Infinity,  color: '#1e40af', bg: 'linear-gradient(135deg,#1e40af,#6366f1)', icon: '🏆', next: null },
];

function getLevel(total: number) {
  return LEVELS.find(l => total >= l.min && total < l.max) ?? LEVELS[0];
}

function getLevelProgress(total: number) {
  const level = getLevel(total);
  if (level.max === Infinity) return 100;
  return Math.min(100, Math.round(((total - level.min) / (level.max - level.min)) * 100));
}

function getBadges(contributions: Contribution[]) {
  const badges: { label: string; icon: string; desc: string }[] = [];
  const titles = contributions.map(c => c.campaignTitle.toLowerCase());
  if (contributions.length >= 1) badges.push({ label: 'Wakif Pertama', icon: '🌟', desc: 'Melakukan wakaf pertama kali' });
  if (contributions.length >= 3) badges.push({ label: 'Wakif Konsisten', icon: '🔥', desc: 'Mendukung 3+ program wakaf' });
  if (titles.some(t => t.includes('masjid'))) badges.push({ label: 'Pembangun Masjid', icon: '🕌', desc: 'Berkontribusi dalam pembangunan masjid' });
  if (titles.some(t => t.includes('sumur') || t.includes('air'))) badges.push({ label: 'Pejuang Air Bersih', icon: '💧', desc: 'Memberikan akses air bersih untuk masyarakat' });
  if (titles.some(t => t.includes('yatim') || t.includes('pendidikan'))) badges.push({ label: 'Pencerdas Umat', icon: '📚', desc: 'Mendukung pendidikan anak-anak' });
  if (titles.some(t => t.includes('klinik') || t.includes('rumah sakit') || t.includes('kesehatan'))) badges.push({ label: 'Pejuang Kesehatan', icon: '❤️‍🩹', desc: 'Membantu akses kesehatan dhuafa' });
  if (contributions.reduce((s, c) => s + c.amount, 0) >= 1000000) badges.push({ label: 'Donatur Jutawan', icon: '💰', desc: 'Total wakaf melampaui Rp 1.000.000' });
  return badges;
}

// ── News helpers ──────────────────────────────────────────────
const NEWS_TYPE_META: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  progress:  { label: 'Progress',   color: '#1d4ed8', bg: 'rgba(59,130,246,0.12)', icon: '📊' },
  budget:    { label: 'Anggaran',   color: '#0f766e', bg: 'rgba(16,185,129,0.12)', icon: '💰' },
  milestone: { label: 'Milestone',  color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', icon: '🏁' },
  impact:    { label: 'Dampak',     color: '#b45309', bg: 'rgba(245,158,11,0.12)', icon: '❤️' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DashboardPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [selectedCert, setSelectedCert] = useState<Contribution | null>(null);
  const [selectedNews, setSelectedNews] = useState<ProgramNews | null>(null);

  // Mock contributions for demo if localStorage is empty
  useEffect(() => {
    const saved = localStorage.getItem('wakaf_contributions');
    if (saved) {
      setContributions(JSON.parse(saved));
    } else {
      // Demo data so gamification & news are visible without a real donation
      setContributions([
        { id: 'demo-1', campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas', amount: 500000, date: '2026-06-15T10:00:00Z' },
        { id: 'demo-2', campaignTitle: 'Sumur Wakaf untuk Pelosok NTT',      amount: 250000, date: '2026-06-20T14:00:00Z' },
        { id: 'demo-3', campaignTitle: 'Klinik Kesehatan Gratis Dhuafa',    amount: 300000, date: '2026-07-01T09:00:00Z' },
      ]);
    }
  }, []);

  const totalWakaf = contributions.reduce((sum, item) => sum + item.amount, 0);
  const level = getLevel(totalWakaf);
  const progress = getLevelProgress(totalWakaf);
  const badges = getBadges(contributions);

  // Filter news relevant to campaigns the wakif supported
  const supportedCampaignIds = [...new Set(
    contributions
      .map((c): string | null => {
        if (c.campaignTitle.includes('Masjid')) return '1';
        if (c.campaignTitle.includes('Sumur') || c.campaignTitle.includes('Air')) return '2';
        if (c.campaignTitle.includes('Yatim') || c.campaignTitle.includes('Pendidikan')) return '3';
        if (c.campaignTitle.includes('Klinik') || c.campaignTitle.includes('Kesehatan') || c.campaignTitle.includes('Dhuafa')) return '4';
        return null;
      })
      .filter((id): id is string => id !== null)
  )];
  const relevantNews = mockProgramNews.filter(n => supportedCampaignIds.includes(n.campaignId));
  const allNews = relevantNews.length > 0 ? relevantNews : mockProgramNews;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Berita Program</h1>
            <p className={styles.subtitle}>Laporan langsung dari lapangan — transparansi anggaran & kemajuan tiap program 🤲</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <p className={styles.statLabel}>Total Wakaf</p>
            <p className={styles.statValue}>{formatCurrency(totalWakaf)}</p>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statIcon}>🕌</div>
            <p className={styles.statLabel}>Program Didukung</p>
            <p className={styles.statValue}>{contributions.length}</p>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statIcon}>{level.icon}</div>
            <p className={styles.statLabel}>Level Wakif</p>
            <p className={styles.statValue} style={{ fontSize: '1rem' }}>{level.name}</p>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statIcon}>🏅</div>
            <p className={styles.statLabel}>Badge Diraih</p>
            <p className={styles.statValue}>{badges.length}</p>
          </Card>
        </div>

        {/* ── GAMIFICATION SECTION ── */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🏆</span>
            <h2>Level & Pencapaian Wakif</h2>
          </div>

          <div className={styles.gamificationGrid}>
            {/* Level Card */}
            <Card className={styles.levelCard}>
              <div className={styles.levelBadge} style={{ background: level.bg }}>
                <span className={styles.levelIcon}>{level.icon}</span>
              </div>
              <div className={styles.levelInfo}>
                <div className={styles.levelHeader}>
                  <h3 className={styles.levelName}>{level.name}</h3>
                  <span className={styles.levelTotal}>{formatCurrency(totalWakaf)}</span>
                </div>
                <div className={styles.levelBarWrap}>
                  <div className={styles.levelBar}>
                    <div
                      className={styles.levelBarFill}
                      style={{ width: `${progress}%`, background: level.bg }}
                    />
                  </div>
                  <span className={styles.levelPercent}>{progress}%</span>
                </div>
                {level.next && (
                  <p className={styles.levelNext}>
                    Tambahkan lagi {formatCurrency(getLevel(totalWakaf).max - totalWakaf)} untuk mencapai <strong>{level.next}</strong>
                  </p>
                )}
                {!level.next && (
                  <p className={styles.levelNext} style={{ color: '#0f766e' }}>🎉 Anda telah mencapai level tertinggi!</p>
                )}
              </div>
            </Card>

            {/* Badges Card */}
            <Card className={styles.badgesCard}>
              <h3 className={styles.badgesTitle}>Badge Penghargaan</h3>
              {badges.length === 0 ? (
                <p className={styles.emptyBadge}>Lakukan wakaf untuk meraih badge pertama Anda!</p>
              ) : (
                <div className={styles.badgesGrid}>
                  {badges.map((b) => (
                    <div key={b.label} className={styles.badge} title={b.desc}>
                      <span className={styles.badgeIcon}>{b.icon}</span>
                      <span className={styles.badgeLabel}>{b.label}</span>
                    </div>
                  ))}
                  {/* Locked badges as motivation */}
                  {contributions.length < 3 && (
                    <div className={styles.badge} style={{ opacity: 0.35 }} title="Dukung 3+ program untuk membuka badge ini">
                      <span className={styles.badgeIcon}>🔒</span>
                      <span className={styles.badgeLabel}>Wakif Konsisten</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* ── BERITA & TRANSPARANSI SECTION ── */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📰</span>
            <h2>Berita Program & Transparansi</h2>
            <span className={styles.sectionPill}>{allNews.length} Update</span>
          </div>
          <p className={styles.sectionDesc}>
            Laporan perkembangan langsung dari lapangan — kemana setiap rupiah wakaf Anda pergi.
          </p>

          <div className={styles.newsGrid}>
            {allNews.map((news) => {
              const typeMeta = NEWS_TYPE_META[news.type];
              return (
                <Card key={news.id} className={styles.newsCard}>
                  {news.imageUrl && (
                    <div
                      className={styles.newsImage}
                      style={{ backgroundImage: `url('${news.imageUrl}')` }}
                    />
                  )}
                  <div className={styles.newsBody}>
                    <div className={styles.newsMeta}>
                      <span
                        className={styles.newsTypeBadge}
                        style={{ color: typeMeta.color, background: typeMeta.bg }}
                      >
                        {typeMeta.icon} {typeMeta.label}
                      </span>
                      <span className={styles.newsDate}>{formatDate(news.date)}</span>
                    </div>
                    <p className={styles.newsCampaign}>{news.campaignTitle}</p>
                    <h3 className={styles.newsTitle}>{news.title}</h3>
                    <p className={styles.newsContent}>{news.content}</p>

                    {/* Impact stats */}
                    {news.impactStats && (
                      <div className={styles.impactGrid}>
                        {news.impactStats.map((s) => (
                          <div key={s.label} className={styles.impactItem}>
                            <span className={styles.impactIcon}>{s.icon}</span>
                            <strong>{s.value}</strong>
                            <span>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Budget breakdown */}
                    {news.budgetBreakdown && (
                      <div className={styles.budgetSection}>
                        <p className={styles.budgetTitle}>
                          💰 Dana Dicairkan: <strong>{formatCurrency(news.totalDisbursed!)}</strong>
                        </p>
                        <div className={styles.budgetBars}>
                          {news.budgetBreakdown.map((b) => (
                            <div key={b.label} className={styles.budgetRow}>
                              <div className={styles.budgetRowTop}>
                                <span>{b.label}</span>
                                <span>{formatCurrency(b.amount)}</span>
                              </div>
                              <div className={styles.budgetBar}>
                                <div
                                  className={styles.budgetBarFill}
                                  style={{ width: `${b.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Milestone Timeline */}
                    {news.timeline && news.timeline.length > 0 && (
                      <div className={styles.timelineSection}>
                        <p className={styles.timelineTitle}>🗓 Timeline Milestone</p>
                        <div className={styles.timeline}>
                          {news.timeline.map((step, idx) => (
                            <div
                              key={step.id}
                              className={`${styles.timelineStep} ${
                                step.status === 'completed'
                                  ? styles.timelineDone
                                  : step.status === 'in_progress'
                                  ? styles.timelineActive
                                  : styles.timelinePending
                              }`}
                            >
                              <div className={styles.timelineDotCol}>
                                <div className={styles.timelineDot} />
                                {idx < news.timeline!.length - 1 && (
                                  <div className={styles.timelineLine} />
                                )}
                              </div>
                              <div className={styles.timelineContent}>
                                <div className={styles.timelineRow}>
                                  <strong className={styles.timelineStepName}>{step.name}</strong>
                                  <span className={styles.timelineAmount}>{formatCurrency(step.amount)}</span>
                                </div>
                                {step.date && (
                                  <span className={styles.timelineDate}>{step.date}</span>
                                )}
                                <span className={`${styles.timelineStatusBadge} ${
                                  step.status === 'completed' ? styles.timelineBadgeDone
                                  : step.status === 'in_progress' ? styles.timelineBadgeActive
                                  : styles.timelineBadgePending
                                }`}>
                                  {step.status === 'completed' ? '✓ Selesai' : step.status === 'in_progress' ? '⚡ Sedang Berjalan' : '⏳ Menunggu'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {news.milestoneCompleted && (
                      <div className={styles.milestoneTag}>
                        🏁 Milestone Selesai: <strong>{news.milestoneCompleted}</strong>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── HISTORY TABLE ── */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📋</span>
            <h2>Riwayat Wakaf</h2>
          </div>
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
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c) => (
                    <tr key={c.id}>
                      <td>{new Date(c.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      <td>{c.campaignTitle}</td>
                      <td className={styles.amount}>{formatCurrency(c.amount)}</td>
                      <td><span className={styles.statusSuccess}>✓ Berhasil</span></td>
                      <td>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCert(c)}>Lihat Piagam</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {selectedCert && (
        <CertificateModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          campaignTitle={selectedCert.campaignTitle}
          amount={selectedCert.amount}
          wakifName={selectedCert.wakifName || 'Hamba Allah'}
          date={selectedCert.date}
        />
      )}
    </div>
  );
}
