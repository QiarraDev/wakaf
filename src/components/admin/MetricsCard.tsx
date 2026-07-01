import React from 'react';
import styles from './MetricsCard.module.css';

interface MetricsCardProps {
  label: string;
  value: string | number;
  change?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  change,
  variant = 'primary',
  icon,
}) => {
  const isPositive = change && change >= 0;

  return (
    <div className={`${styles.metricsCard} ${styles[variant]}`}>
      <div className={styles.label}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {label}
      </div>
      <div className={styles.value}>{value}</div>
      {change !== undefined && (
        <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
          <span className={styles.changeIcon}>
            {isPositive ? '↑' : '↓'}
          </span>
          {Math.abs(change)}% dari bulan lalu
        </div>
      )}
    </div>
  );
};
