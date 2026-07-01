'use client';

import React, { useRef } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { FinancialData } from '@/data/mock-admin';
import styles from './FinancialReport.module.css';

interface FinancialReportProps {
  financialData: FinancialData[];
  expenseCategories: Array<{ category: string; amount: number; percentage: number }>;
  onExportPDF?: () => void;
}

export const FinancialReport: React.FC<FinancialReportProps> = ({
  financialData,
  expenseCategories,
  onExportPDF,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const totalIncome = financialData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = financialData.reduce((sum, item) => sum + item.expense, 0);
  const netIncome = totalIncome - totalExpense;

  // Normalize untuk chart (jika ada data kosong atau anomali)
  const maxValue = Math.max(
    ...financialData.map(item => Math.max(item.income, item.expense))
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      // Fallback ke print
      handlePrint();
    }
  };

  return (
    <div className={styles.reportContainer} ref={reportRef}>
      <div className={styles.reportHeader}>
        <h2 className={styles.reportTitle}>Laporan Keuangan & Pengeluaran</h2>
        <div className={styles.reportControls}>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleExportPDF}
          >
            📥 Export PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrint}
          >
            🖨️ Cetak
          </Button>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Pemasukan & Pengeluaran Bulanan</h3>
        <div className={styles.chartContainer}>
          <div className={styles.chartBars}>
            {financialData.map((item, idx) => {
              const incomeHeight = (item.income / maxValue) * 100;
              const expenseHeight = (item.expense / maxValue) * 100;

              return (
                <div key={idx} className={styles.chartBarGroup}>
                  <div className={styles.chartBar}>
                    <div
                      className={`${styles.bar} ${styles.barIncome}`}
                      style={{ height: `${incomeHeight}%` }}
                      title={formatCurrency(item.income)}
                      data-value={formatCurrency(item.income)}
                    />
                    <div
                      className={`${styles.bar} ${styles.barExpense}`}
                      style={{ height: `${expenseHeight}%` }}
                      title={formatCurrency(item.expense)}
                      data-value={formatCurrency(item.expense)}
                    />
                  </div>
                  <div className={styles.monthLabel}>{item.month.substring(0, 3)}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendIncome}`} />
              <span>Pemasukan</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendExpense}`} />
              <span>Pengeluaran</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summarySection}>
        <div className={`${styles.summaryCard} ${styles.income}`}>
          <div className={styles.summaryLabel}>Total Pemasukan</div>
          <div className={styles.summaryValue}>{formatCurrency(totalIncome)}</div>
        </div>
        <div className={`${styles.summaryCard} ${styles.expense}`}>
          <div className={styles.summaryLabel}>Total Pengeluaran</div>
          <div className={styles.summaryValue}>{formatCurrency(totalExpense)}</div>
        </div>
        <div className={`${styles.summaryCard} ${styles.net}`}>
          <div className={styles.summaryLabel}>Netto Surplus</div>
          <div className={styles.summaryValue}>{formatCurrency(netIncome)}</div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className={styles.expenseBreakdown}>
        <h3 className={styles.chartTitle}>Rincian Pengeluaran per Kategori</h3>
        <table className={styles.breakdownTable}>
          <thead>
            <tr>
              <th>Kategori Pengeluaran</th>
              <th>Jumlah</th>
              <th>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategories.map((expense, idx) => (
              <tr key={idx}>
                <td className={styles.expenseCategory}>{expense.category}</td>
                <td className={styles.expenseAmount}>{formatCurrency(expense.amount)}</td>
                <td>
                  <div className={styles.expensePercentage}>
                    <div className={styles.percentageBar}>
                      <div
                        className={styles.percentageFill}
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                    <span className={styles.percentageText}>{expense.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
