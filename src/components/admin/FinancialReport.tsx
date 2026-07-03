'use client';

import React, { useRef, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { FinancialData } from '@/data/mock-admin';
import styles from './FinancialReport.module.css';

interface FinancialReportProps {
  financialData: FinancialData[];
  expenseCategories: Array<{ category: string; amount: number; percentage: number }>;
  onExportPDF?: () => void;
  selectedYear?: number;
  onYearChange?: (year: number) => void;
}

const AVAILABLE_YEARS = [2022, 2023, 2024, 2025, 2026];

export const FinancialReport: React.FC<FinancialReportProps> = ({
  financialData,
  expenseCategories,
  onExportPDF,
  selectedYear = 2026,
  onYearChange,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);

  // Filter data berdasarkan tahun
  const filteredData = financialData.filter(item => {
    const yearMatch = item.month.match(/(\d{4})-\d{2}/);
    return yearMatch && parseInt(yearMatch[1]) === selectedYear;
  });

  const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
  const netIncome = totalIncome - totalExpense;

  const maxValue = Math.max(
    ...filteredData.map(item => Math.max(item.income, item.expense)),
    1
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      handlePrint();
    }
  };

  const handleYearSelect = (year: number) => {
    onYearChange?.(year);
    setIsYearMenuOpen(false);
  };

  return (
    <div className={styles.reportContainer} ref={reportRef}>
      <div className={styles.reportHeader}>
        <h2 className={styles.reportTitle}>Laporan Keuangan & Pengeluaran</h2>
        <div className={styles.headerRight}>
          {/* Year Dropdown */}
          <div className={styles.yearFilterWrapper}>
            <button
              className={styles.yearDropdownBtn}
              onClick={() => setIsYearMenuOpen(!isYearMenuOpen)}
            >
              <span className={styles.yearIcon}>📅</span>
              <span className={styles.yearLabel}>Tahun {selectedYear}</span>
              <span className={styles.yearChevron}>▼</span>
            </button>
            
            {isYearMenuOpen && (
              <div className={styles.yearDropdownMenu}>
                {AVAILABLE_YEARS.map(year => (
                  <button
                    key={year}
                    className={`${styles.yearMenuItem} ${
                      year === selectedYear ? styles.yearMenuItemActive : ''
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    <span className={styles.yearMenuItemCheckmark}>
                      {year === selectedYear ? '✓' : ''}
                    </span>
                    Tahun {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Buttons */}
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
      </div>

      {/* Chart Section */}
      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Pemasukan & Pengeluaran - {selectedYear}</h3>
        <div className={styles.chartContainer}>
          <div className={styles.chartBars}>
            {filteredData.map((item, idx) => {
              const incomeHeight = (item.income / maxValue) * 100;
              const expenseHeight = (item.expense / maxValue) * 100;
              const monthMatch = item.month.match(/\d{4}-(\d{2})/);
              const monthNum = monthMatch ? parseInt(monthMatch[1]) : idx + 1;
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
                  <div className={styles.monthLabel}>{months[monthNum - 1]}</div>
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
