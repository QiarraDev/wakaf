import { formatCurrency } from './utils';

interface PDFExportData {
  title: string;
  generatedDate: string;
  metrics: {
    totalIncome: number;
    totalExpense: number;
    netIncome: number;
    activeProjects: number;
    totalDonors: number;
  };
  financialData: Array<{
    month: string;
    income: number;
    expense: number;
  }>;
  expenseCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  projectProgress: Array<{
    name: string;
    targetAmount: number;
    collectedAmount: number;
    status: string;
  }>;
  donations: Array<{
    id: string;
    wakifName: string;
    projectName: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

/**
 * Export financial data as PDF using iframe and print capability
 * This is a more reliable approach that ensures content is properly rendered
 */
export const generatePDFReport = async (data: PDFExportData): Promise<void> => {
  // Create iframe for better isolation and rendering
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    console.error('Failed to access iframe document');
    return;
  }

  // Build complete HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Laporan Keuangan Wakaf Konstruksi</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A4;
          margin: 20mm;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none;
          }
          table {
            page-break-inside: avoid;
          }
          .section {
            page-break-inside: avoid;
          }
        }
        
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #1f2937;
          padding: 20px;
          background: white;
        }
        
        .header {
          margin-bottom: 30px;
          border-bottom: 3px solid #1e40af;
          padding-bottom: 15px;
        }
        
        .header h1 {
          color: #1e40af;
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .header p {
          color: #6b7280;
          font-size: 11px;
        }
        
        h2 {
          color: #1f2937;
          font-size: 16px;
          margin: 25px 0 15px 0;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .summary-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .summary-card {
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        
        .summary-card.income {
          background-color: #f0fdf4;
          border-color: #86efac;
        }
        
        .summary-card.expense {
          background-color: #fef3c7;
          border-color: #fcd34d;
        }
        
        .summary-card.net {
          background-color: #dbeafe;
          border-color: #7dd3fc;
        }
        
        .summary-label {
          font-size: 10px;
          color: #6b7280;
          font-weight: 600;
          margin-bottom: 6px;
        }
        
        .summary-value {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          background: white;
        }
        
        thead {
          background-color: #f3f4f6;
        }
        
        th {
          padding: 10px;
          text-align: left;
          font-weight: 600;
          font-size: 10px;
          border: 1px solid #d1d5db;
          color: #374151;
        }
        
        td {
          padding: 8px 10px;
          border: 1px solid #e5e7eb;
          font-size: 10px;
        }
        
        tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        tbody tr:hover {
          background-color: #f3f4f6;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-center {
          text-align: center;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 8px;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .badge-active {
          background-color: #dcfce7;
          color: #16a34a;
        }
        
        .badge-completed {
          background-color: #dbeafe;
          color: #0284c7;
        }
        
        .badge-pending {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 9px;
        }
        
        strong {
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.title}</h1>
        <p>Tanggal Laporan: ${data.generatedDate}</p>
      </div>

      <div class="section">
        <h2>Ringkasan Metrik Utama</h2>
        <div class="summary-cards">
          <div class="summary-card income">
            <div class="summary-label">Total Pemasukan</div>
            <div class="summary-value">${formatCurrency(data.metrics.totalIncome)}</div>
          </div>
          <div class="summary-card expense">
            <div class="summary-label">Total Pengeluaran</div>
            <div class="summary-value">${formatCurrency(data.metrics.totalExpense)}</div>
          </div>
          <div class="summary-card net">
            <div class="summary-label">Netto Surplus</div>
            <div class="summary-value">${formatCurrency(data.metrics.netIncome)}</div>
          </div>
        </div>
        <table>
          <tr>
            <td><strong>Project Aktif</strong></td>
            <td class="text-right">${data.metrics.activeProjects}</td>
          </tr>
          <tr>
            <td><strong>Total Donatur</strong></td>
            <td class="text-right">${data.metrics.totalDonors}</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2>Data Keuangan Bulanan (2022-2026)</h2>
        <table>
          <thead>
            <tr>
              <th>Periode</th>
              <th class="text-right">Pemasukan</th>
              <th class="text-right">Pengeluaran</th>
              <th class="text-right">Netto</th>
            </tr>
          </thead>
          <tbody>
            ${data.financialData.map(item => `
              <tr>
                <td>${item.month}</td>
                <td class="text-right">${formatCurrency(item.income)}</td>
                <td class="text-right">${formatCurrency(item.expense)}</td>
                <td class="text-right"><strong>${formatCurrency(item.income - item.expense)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Rincian Pengeluaran per Kategori</h2>
        <table>
          <thead>
            <tr>
              <th>Kategori</th>
              <th class="text-right">Jumlah</th>
              <th class="text-right">Persentase</th>
            </tr>
          </thead>
          <tbody>
            ${data.expenseCategories.map(cat => `
              <tr>
                <td>${cat.category}</td>
                <td class="text-right">${formatCurrency(cat.amount)}</td>
                <td class="text-right">${cat.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Progress Project Wakaf</h2>
        <table>
          <thead>
            <tr>
              <th>Nama Project</th>
              <th class="text-right">Target</th>
              <th class="text-right">Terkumpul</th>
              <th class="text-right">Progress</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.projectProgress.map(proj => {
              const progress = Math.round((proj.collectedAmount / proj.targetAmount) * 100);
              const badgeClass = proj.status === 'active' ? 'badge-active' : 
                                proj.status === 'completed' ? 'badge-completed' : 
                                'badge-pending';
              const statusText = proj.status === 'active' ? 'Aktif' : 
                                proj.status === 'completed' ? 'Selesai' : 
                                'Menunggu';
              return `
              <tr>
                <td>${proj.name}</td>
                <td class="text-right">${formatCurrency(proj.targetAmount)}</td>
                <td class="text-right">${formatCurrency(proj.collectedAmount)}</td>
                <td class="text-right"><strong>${progress}%</strong></td>
                <td class="text-center"><span class="badge ${badgeClass}">${statusText}</span></td>
              </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Donasi Terbaru</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Wakif</th>
              <th>Project</th>
              <th class="text-right">Nominal</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.donations.slice(0, 25).map(donation => `
              <tr>
                <td style="font-family: monospace; font-size: 9px;">${donation.id}</td>
                <td>${donation.wakifName}</td>
                <td>${donation.projectName}</td>
                <td class="text-right">${formatCurrency(donation.amount)}</td>
                <td class="text-center">${donation.status === 'completed' ? '✓ Selesai' : '⏳ Proses'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Laporan ini dibuat secara otomatis oleh Sistem Wakaf Konstruksi</p>
        <p>Dokumen ini adalah milik resmi dan harus disimpan dengan aman</p>
        <p style="margin-top: 10px; font-size: 8px;">${new Date().toLocaleString('id-ID')}</p>
      </div>
    </body>
    </html>
  `;

  // Write content to iframe
  iframeDoc.open();
  iframeDoc.write(htmlContent);
  iframeDoc.close();

  // Wait for content to fully load, then print
  iframe.onload = () => {
    setTimeout(() => {
      iframe.focus();
      iframe.contentWindow?.print();
    }, 250);
  };

  // Cleanup after print
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 2000);
};

/**
 * Export financial data as CSV
 */
export const generateCSVReport = (data: PDFExportData): void => {
  let csv = 'Laporan Keuangan Wakaf Konstruksi\n';
  csv += `Tanggal: ${data.generatedDate}\n\n`;

  // Metrics
  csv += 'RINGKASAN METRIK\n';
  csv += `Total Pemasukan,${data.metrics.totalIncome}\n`;
  csv += `Total Pengeluaran,${data.metrics.totalExpense}\n`;
  csv += `Netto Surplus,${data.metrics.netIncome}\n`;
  csv += `Project Aktif,${data.metrics.activeProjects}\n`;
  csv += `Total Donatur,${data.metrics.totalDonors}\n\n`;

  // Financial Data
  csv += 'DATA KEUANGAN BULANAN\n';
  csv += 'Bulan,Pemasukan,Pengeluaran,Netto\n';
  data.financialData.forEach(item => {
    csv += `${item.month},${item.income},${item.expense},${item.income - item.expense}\n`;
  });
  csv += '\n';

  // Expense Categories
  csv += 'RINCIAN PENGELUARAN PER KATEGORI\n';
  csv += 'Kategori,Jumlah,Persentase\n';
  data.expenseCategories.forEach(cat => {
    csv += `${cat.category},${cat.amount},${cat.percentage}%\n`;
  });

  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wakaf-report-${data.generatedDate.replace(/\//g, '-')}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
