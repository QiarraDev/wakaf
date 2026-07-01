import React, { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import type { DonationReport } from '@/data/mock-admin';
import styles from './DonationReportTable.module.css';

interface DonationReportTableProps {
  reports: DonationReport[];
}

type FilterStatus = 'all' | 'completed' | 'pending' | 'failed';

export const DonationReportTable: React.FC<DonationReportTableProps> = ({ reports }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const itemsPerPage = 10;

  const filteredReports = useMemo(() => {
    if (statusFilter === 'all') return reports;
    return reports.filter(report => report.status === statusFilter);
  }, [reports, statusFilter]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(start, start + itemsPerPage);
  }, [filteredReports, currentPage]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed': return styles.badgeCompleted;
      case 'pending': return styles.badgePending;
      case 'failed': return styles.badgeFailed;
      default: return styles.badgeCompleted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'pending': return '⏳';
      case 'failed': return '✕';
      default: return '○';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Berhasil';
      case 'pending': return 'Tertunda';
      case 'failed': return 'Gagal';
      default: return status;
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>Laporan Detail Donasi</h2>
        <div className={styles.filterControls}>
          <button
            className={`${styles.filterButton} ${statusFilter === 'all' ? styles.active : ''}`}
            onClick={() => {
              setStatusFilter('all');
              setCurrentPage(1);
            }}
          >
            Semua ({reports.length})
          </button>
          <button
            className={`${styles.filterButton} ${statusFilter === 'completed' ? styles.active : ''}`}
            onClick={() => {
              setStatusFilter('completed');
              setCurrentPage(1);
            }}
          >
            Berhasil ({reports.filter(r => r.status === 'completed').length})
          </button>
          <button
            className={`${styles.filterButton} ${statusFilter === 'pending' ? styles.active : ''}`}
            onClick={() => {
              setStatusFilter('pending');
              setCurrentPage(1);
            }}
          >
            Tertunda ({reports.filter(r => r.status === 'pending').length})
          </button>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <p className={styles.emptyText}>Tidak ada data donasi untuk filter ini.</p>
        </div>
      ) : (
        <>
          <div className={styles.tableOverflow}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Tanggal</th>
                  <th>Nama Wakif</th>
                  <th>Nama Program</th>
                  <th>Nominal</th>
                  <th>Metode Pembayaran</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((report) => (
                  <tr key={report.id}>
                    <td className={styles.txnId}>{report.id}</td>
                    <td>{new Date(report.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</td>
                    <td>
                      <strong>{report.wakifName}</strong>
                      {report.wakifEmail && (
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                          {report.wakifEmail}
                        </div>
                      )}
                    </td>
                    <td>{report.projectName}</td>
                    <td className={styles.amountCell}>{formatCurrency(report.amount)}</td>
                    <td>{report.paymentMethod}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(report.status)}`}>
                        <span className={styles.statusIcon}>{getStatusIcon(report.status)}</span>
                        {getStatusLabel(report.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Sebelumnya
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya →
              </button>

              <span className={styles.pageInfo}>
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
