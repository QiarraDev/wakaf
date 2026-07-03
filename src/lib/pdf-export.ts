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
 * Export financial data as PDF using browser's print capability
 * This is a client-side approach compatible with Next.js
 */
export const generatePDFReport = async (data: PDFExportData): Promise<void> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  container.style.minHeight = '297mm';
  container.style.padding = '20mm';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.fontSize = '10px';
  container.style.lineHeight = '1.5';
  container.style.color = '#1f2937';

  // Create HTML content
  const htmlContent = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Laporan Keuangan Wakaf Konstruksi</title>
      <style>
        @media print {
          body { margin: 0; padding: 0; }
          .page-break { page-break-after: always; }
          table { page-break-inside: avoid; }
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.4;
          color: #1f2937;
          margin: 0;
          padding: 20mm;
        }
        .header {
          margin-bottom: 30px;
          border-bottom: 3px solid #1e40af;
          padding-bottom: 15px;
        }
        .header h1 {
          color: #1e40af;
          margin: 0 0 5px 0;
          font-size: 22px;
        }
        .header p {
          color: #6b7280;
          margin: 5px 0 0 0;
          font-size: 9px;
        }
        h2 {
          color: #1f2937;
          font-size: 14px;
          margin: 20px 0 12px 0;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 6px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        th {
          background-color: #f3f4f6;
          padding: 8px;
          border: 1px solid #e5e7eb;
          text-align: left;
          font-weight: 600;
          font-size: 9px;
        }
        td {
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          font-size: 9px;
        }
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .summary-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .summary-card {
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
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
          font-size: 8px;
          color: #6b7280;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .summary-value {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
        }
        .footer {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 8px;
        }
        .text-right {
          text-align: right;
        }
        .text-center {
          text-align: center;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 7px;
          font-weight: 600;
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
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <h1>${data.title}</h1>
        <p>Tanggal Laporan: ${data.generatedDate}</p>
      </div>

      <!-- Key Metrics Section -->
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

      <!-- Monthly Financial Data -->
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

      <!-- Expense Categories -->
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

      <!-- Project Progress -->
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
              return `
              <tr>
                <td>${proj.name}</td>
                <td class="text-right">${formatCurrency(proj.targetAmount)}</td>
                <td class="text-right">${formatCurrency(proj.collectedAmount)}</td>
                <td class="text-right"><strong>${progress}%</strong></td>
                <td class="text-center">
                  <span class="badge ${
                    proj.status === 'active' ? 'badge-active' : 
                    proj.status === 'completed' ? 'badge-completed' : 
                    'badge-pending'
                  }">
                    ${proj.status === 'active' ? 'Aktif' : proj.status === 'completed' ? 'Selesai' : 'Menunggu'}
                  </span>
                </td>
              </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Recent Donations -->
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
            ${data.donations.slice(0, 20).map(donation => `
              <tr>
                <td style="font-family: monospace; font-size: 8px;">${donation.id}</td>
                <td>${donation.wakifName}</td>
                <td style="font-size: 8px;">${donation.projectName}</td>
                <td class="text-right">${formatCurrency(donation.amount)}</td>
                <td class="text-center">${donation.status === 'completed' ? '✓ Selesai' : '⏳ Proses'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Laporan ini dibuat secara otomatis oleh Sistem Wakaf Konstruksi</p>
        <p>Dokumen ini adalah milik resmi dan harus disimpan dengan aman</p>
      </div>
    </body>
    </html>
  `;

  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  // Give browser time to render HTML properly
  setTimeout(() => {
    window.print();
    // Clean up after print dialog closes
    setTimeout(() => {
      document.body.removeChild(container);
    }, 1000);
  }, 500);
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
