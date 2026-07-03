"use client";

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { MetricsCard } from '@/components/admin/MetricsCard';
import { ProgressTimelineWithChrono } from '@/components/admin/ProgressTimelineWithChrono';
import { FinancialReport } from '@/components/admin/FinancialReport';
import { DonationReportTable } from '@/components/admin/DonationReportTable';
import { generatePDFReport, generateCSVReport } from '@/lib/pdf-export';
import {
  mockAdminMetrics,
  mockFinancialData,
  mockProjectProgress,
  mockDonationReports,
  expenseCategories,
} from '@/data/mock-admin';
import styles from './page.module.css';

interface Contribution {
  id: string;
  campaignTitle: string;
  amount: number;
  wakifName?: string;
  date: string;
}

export default function AdminDashboardPage() {
  const [allContributions, setAllContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => {
    // In a real app, this would be an API call fetching all users' data.
    // For MVP, we read the shared local storage.
    const saved = localStorage.getItem('wakaf_contributions');
    if (saved) {
      setAllContributions(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const handleExportPDF = () => {
    // Filter data berdasarkan tahun yang dipilih
    const filteredData = mockFinancialData.filter(item => {
      const yearMatch = item.month.match(/(\d{4})-\d{2}/);
      return yearMatch && parseInt(yearMatch[1]) === selectedYear;
    });

    const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
    const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0);
    
    const exportData = {
      title: `Laporan Keuangan & Progress Wakaf Konstruksi - Tahun ${selectedYear}`,
      generatedDate: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      metrics: {
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        netIncome: totalIncome - totalExpense,
        activeProjects: mockAdminMetrics.activeProjects,
        totalDonors: mockAdminMetrics.totalDonors,
      },
      financialData: filteredData,
      expenseCategories: expenseCategories,
      projectProgress: mockProjectProgress.map(proj => ({
        name: proj.name,
        targetAmount: proj.targetAmount,
        collectedAmount: proj.collectedAmount,
        status: proj.status,
      })),
      donations: mockDonationReports,
    };

    generatePDFReport(exportData);
  };

  const handleExportCSV = () => {
    // Filter data berdasarkan tahun yang dipilih
    const filteredData = mockFinancialData.filter(item => {
      const yearMatch = item.month.match(/(\d{4})-\d{2}/);
      return yearMatch && parseInt(yearMatch[1]) === selectedYear;
    });

    const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
    const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0);
    
    const exportData = {
      title: `Laporan Keuangan & Progress Wakaf Konstruksi - Tahun ${selectedYear}`,
      generatedDate: new Date().toLocaleDateString('id-ID'),
      metrics: {
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        netIncome: totalIncome - totalExpense,
        activeProjects: mockAdminMetrics.activeProjects,
        totalDonors: mockAdminMetrics.totalDonors,
      },
      financialData: filteredData,
      expenseCategories: expenseCategories,
      projectProgress: mockProjectProgress.map(proj => ({
        name: proj.name,
        targetAmount: proj.targetAmount,
        collectedAmount: proj.collectedAmount,
        status: proj.status,
      })),
      donations: mockDonationReports,
    };

    generateCSVReport(exportData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Nazhir</h1>
          <p className={styles.subtitle}>
            Pantau ringkasan keuangan, progress project, dan semua data transaksi wakaf secara real-time.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn} onClick={handleExportPDF} title="Export laporan sebagai PDF">
            📥 Export PDF
          </button>
          <button className={styles.actionBtn} onClick={handleExportCSV} title="Export data sebagai CSV">
            📊 Export CSV
          </button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <section className={styles.metricsSection}>
        <h2 className={styles.sectionTitle}>Ringkasan Metrik Utama</h2>
        <div className={styles.metricsGrid}>
          <MetricsCard
            label="Total Pemasukan"
            value={formatCurrency(mockAdminMetrics.totalIncome)}
            change={12}
            variant="primary"
            icon="📈"
          />
          <MetricsCard
            label="Dana Terkunci (Escrow)"
            value={formatCurrency(mockAdminMetrics.totalLocked)}
            change={5}
            variant="warning"
            icon="🔒"
          />
          <MetricsCard
            label="Dana Dilepaskan"
            value={formatCurrency(mockAdminMetrics.totalReleased)}
            change={8}
            variant="success"
            icon="✓"
          />
          <MetricsCard
            label="Target Total Program"
            value={formatCurrency(mockAdminMetrics.totalTargets)}
            change={0}
            variant="primary"
            icon="🎯"
          />
          <MetricsCard
            label="Project Aktif"
            value={mockAdminMetrics.activeProjects}
            change={0}
            variant="primary"
            icon="🏗️"
          />
          <MetricsCard
            label="Total Donatur"
            value={mockAdminMetrics.totalDonors.toLocaleString('id-ID')}
            change={18}
            variant="success"
            icon="👥"
          />
        </div>
      </section>

      {/* Financial Report Section */}
      <section className={styles.reportSection}>
        <FinancialReport
          financialData={mockFinancialData}
          expenseCategories={expenseCategories}
          onExportPDF={handleExportPDF}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </section>

      {/* Project Progress Section */}
      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Progress Timeline Project Wakaf</h2>
        <ProgressTimelineWithChrono projects={mockProjectProgress} mode="VERTICAL" autoplay={false} />
      </section>

      {/* Donation Report Section */}
      <section className={styles.donationSection}>
        <DonationReportTable reports={mockDonationReports} />
      </section>

      {/* Local Storage Contributions - Optional */}
      {allContributions.length > 0 && (
        <section className={styles.localStorageSection}>
          <h2 className={styles.sectionTitle}>Donasi dari Platform (Local Storage)</h2>
          <Card className={styles.storageCard}>
            <div className={styles.storageContent}>
              <p className={styles.storageInfo}>
                Total donasi dari platform: <strong>{formatCurrency(allContributions.reduce((sum, item) => sum + item.amount, 0))}</strong>
              </p>
              <p className={styles.storageInfo}>
                Jumlah transaksi: <strong>{allContributions.length}</strong>
              </p>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
