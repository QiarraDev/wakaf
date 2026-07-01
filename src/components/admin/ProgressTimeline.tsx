import React from 'react';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import type { ProjectProgress } from '@/data/mock-admin';
import styles from './ProgressTimeline.module.css';

interface ProgressTimelineProps {
  projects: ProjectProgress[];
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ projects }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return styles.badgeActive;
      case 'pending': return styles.badgePending;
      case 'completed': return styles.badgeCompleted;
      default: return styles.badgeActive;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'pending': return 'Menunggu';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in_progress': return '◐';
      case 'pending': return '○';
      default: return '○';
    }
  };

  const getMilestoneClass = (status: string) => {
    switch (status) {
      case 'completed': return styles.completed;
      case 'in_progress': return styles.inProgress;
      case 'pending': return styles.pending;
      default: return '';
    }
  };

  return (
    <div className={styles.timelineContainer}>
      {projects.map((project) => {
        const progressPercentage = calculateProgress(project.collectedAmount, project.targetAmount);
        const fundingPercentage = Math.round((project.collectedAmount / project.targetAmount) * 100);

        return (
          <div key={project.id} className={styles.projectItem}>
            <div className={styles.projectHeader}>
              <div className={styles.projectInfo}>
                <h3>{project.name}</h3>
                <div className={styles.projectMeta}>
                  <span>{project.category}</span>
                  <span>Target: {formatCurrency(project.targetAmount)}</span>
                </div>
              </div>
              <div className={`${styles.projectBadge} ${getStatusBadgeClass(project.status)}`}>
                {getStatusLabel(project.status)}
              </div>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>Dana Terkumpul</span>
                <span>{fundingPercentage}%</span>
              </div>
              <div className={styles.progressBarContainer}>
                <div 
                  className={styles.progressBar}
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
            </div>

            <div className={styles.milestonesContainer}>
              {project.milestones.map((milestone, idx) => (
                <div key={idx} className={`${styles.milestone} ${getMilestoneClass(milestone.status)}`}>
                  <div className={styles.milestoneIcon}>
                    {getMilestoneIcon(milestone.status)}
                  </div>
                  <div className={styles.milestoneDetails}>
                    <div className={styles.milestoneName}>{milestone.name}</div>
                    <div className={styles.milestoneStatus}>
                      {milestone.status === 'completed' && 'Selesai'}
                      {milestone.status === 'in_progress' && 'Sedang Berlangsung'}
                      {milestone.status === 'pending' && 'Belum Dimulai'}
                    </div>
                  </div>
                  <div className={styles.milestoneBar}>
                    <div className={styles.percentageBar}>
                      <div 
                        className={styles.percentageFill}
                        style={{ width: `${milestone.percentage}%` }}
                      />
                    </div>
                    <span className={styles.percentageText}>{milestone.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.amountInfo}>
              <div className={styles.amountInfoItem}>
                <span className={styles.amountInfoLabel}>Terkumpul</span>
                <span className={styles.amountInfoValue}>
                  {formatCurrency(project.collectedAmount)}
                </span>
              </div>
              <div className={styles.amountInfoItem}>
                <span className={styles.amountInfoLabel}>Terkunci (Escrow)</span>
                <span className={styles.amountInfoValue}>
                  {formatCurrency(project.lockedAmount)}
                </span>
              </div>
              <div className={styles.amountInfoItem}>
                <span className={styles.amountInfoLabel}>Dilepaskan</span>
                <span className={styles.amountInfoValue}>
                  {formatCurrency(project.releasedAmount)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
