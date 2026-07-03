'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/lib/utils';
import type { ProjectProgress } from '@/data/mock-admin';
import styles from './ProgressTimeline.module.css';

// Dynamically import Chrono dengan ssr: false
const Chrono = dynamic(
  () => import('react-chrono').then(m => m.Chrono),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.emptyState} style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading timeline...</p>
      </div>
    )
  }
);

interface ProgressTimelineWithChronoProps {
  projects: ProjectProgress[];
  mode?: 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
  autoplay?: boolean;
}

export const ProgressTimelineWithChrono: React.FC<ProgressTimelineWithChronoProps> = ({
  projects,
  mode = 'VERTICAL',
  autoplay = false,
}) => {
  // Format data untuk React-Chrono
  const chronoItems = useMemo(() => {
    return projects.flatMap((project) => {
      const fundingPercentage = Math.round(
        (project.collectedAmount / project.targetAmount) * 100
      );

      return project.milestones.map((milestone) => ({
        title: project.name,
        cardTitle: milestone.name,
        cardSubtitle: formatCurrency(project.collectedAmount),
        cardDetailedText: `📊 Progress: ${fundingPercentage}%\n💰 Terkumpul: ${formatCurrency(project.collectedAmount)} / ${formatCurrency(project.targetAmount)}\n🔒 Terkunci: ${formatCurrency(project.lockedAmount)}\n✓ Dilepaskan: ${formatCurrency(project.releasedAmount)}\n\nStatus: ${
          milestone.status === 'completed'
            ? '✓ Selesai'
            : milestone.status === 'in_progress'
              ? '◐ Sedang Berlangsung'
              : '○ Belum Dimulai'
        }`,
      }));
    });
  }, [projects]);

  if (projects.length === 0) {
    return <div className={styles.emptyState}>Tidak ada data project</div>;
  }

  return (
    <div className={styles.enhancedTimelineContainer}>
      <div className={styles.timelineHeader}>
        <h2 className={styles.title}>Timeline Konstruksi (Milestones) - React-Chrono</h2>
        <p className={styles.subtitle}>
          Pantau progress setiap tahapan konstruksi dari {projects.length} project aktif
        </p>
      </div>

      <div className={styles.chronoWrapper}>
        <Chrono
          items={chronoItems}
          mode={mode}
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
          autoPlay={autoplay}
          autoPlayDelay={3000}
        />
      </div>

      {/* Summary Cards */}
      <div className={styles.timelineSummary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>📊</div>
          <div className={styles.summaryContent}>
            <h4>Total Project</h4>
            <p className={styles.summaryValue}>{projects.length}</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>💰</div>
          <div className={styles.summaryContent}>
            <h4>Total Terkumpul</h4>
            <p className={styles.summaryValue}>
              {formatCurrency(
                projects.reduce((sum, p) => sum + p.collectedAmount, 0)
              )}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>🔒</div>
          <div className={styles.summaryContent}>
            <h4>Total Terkunci</h4>
            <p className={styles.summaryValue}>
              {formatCurrency(
                projects.reduce((sum, p) => sum + p.lockedAmount, 0)
              )}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>✓</div>
          <div className={styles.summaryContent}>
            <h4>Total Dilepaskan</h4>
            <p className={styles.summaryValue}>
              {formatCurrency(
                projects.reduce((sum, p) => sum + p.releasedAmount, 0)
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Detail Project Cards */}
      <div className={styles.timelineDetailContainer}>
        <h3 className={styles.detailTitle}>Detail Project</h3>
        <div className={styles.projectsGrid}>
          {projects.map((project) => {
            const fundingPercentage = Math.round(
              (project.collectedAmount / project.targetAmount) * 100
            );
            const statusColor =
              project.status === 'completed'
                ? '#16a34a'
                : project.status === 'active'
                  ? '#1e40af'
                  : '#d97706';

            return (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectCardHeader}>
                  <h4>{project.name}</h4>
                  <span
                    className={styles.statusBadge}
                    style={{ backgroundColor: statusColor }}
                  >
                    {project.status === 'completed'
                      ? 'Selesai'
                      : project.status === 'active'
                        ? 'Aktif'
                        : 'Menunggu'}
                  </span>
                </div>

                <div className={styles.projectCardProgress}>
                  <div className={styles.progressLabelRow}>
                    <span>Progress</span>
                    <span className={styles.percentageValue}>{fundingPercentage}%</span>
                  </div>
                  <div className={styles.progressBarSmall}>
                    <div
                      className={styles.progressBarSmallFill}
                      style={{ width: `${fundingPercentage}%` }}
                    />
                  </div>
                </div>

                <div className={styles.projectCardAmounts}>
                  <div className={styles.amountRow}>
                    <span>Terkumpul</span>
                    <span>{formatCurrency(project.collectedAmount)}</span>
                  </div>
                  <div className={styles.amountRow}>
                    <span>Target</span>
                    <span>{formatCurrency(project.targetAmount)}</span>
                  </div>
                </div>

                <div className={styles.projectCardMilestones}>
                  <span className={styles.milestonesLabel}>Milestones</span>
                  <div className={styles.milestonesList}>
                    {project.milestones.map((m, idx) => (
                      <div key={idx} className={styles.milestoneBadge}>
                        <span className={styles.milestoneBadgeIcon}>
                          {m.status === 'completed'
                            ? '✓'
                            : m.status === 'in_progress'
                              ? '◐'
                              : '○'}
                        </span>
                        <span>{m.name.substring(0, 10)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTimelineWithChrono;
