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
  container.style.fontSize = '11px';
  container.style.lineHeight = '1.6';
  container.style.color = '#1f2937';

  // Create HTML content
  const htmlContent = `
    <div style="margin-bottom: 30px;">
      <h1 style="color: #1e40af; margin: 0 0 10px 0; font-size: 28px; border-bottom: 3px solid #1e40af; padding-bottom: 10px;">
        ${data.title}
      </h1>
      <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 11px;">
        Tanggal Laporan: ${data.generatedDate}
      </p>
    </div>

    <!-- Key Metrics Section -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1f2937; font-size: 16px; margin: 20px 0 15px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        Ringkasan Metrik Utama
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
            <strong>Total Pemasukan:</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #1e40af;">
            <strong>${formatCurrency(data.metrics.totalIncome)}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
            <strong>Total Pengeluaran:</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #d97706;">
            <strong>${formatCurrency(data.metrics.totalExpense)}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
            <strong>Netto Surplus:</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #16a34a;">
            <strong>${formatCurrency(data.metrics.netIncome)}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">Project Aktif</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right;">
            ${data.metrics.activeProjects}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
            <strong>Total Donatur:</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right;">
            <strong>${data.metrics.totalDonors}</strong>
          </td>
        </tr>
      </table>
    </div>

    <!-- Monthly Financial Data -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1f2937; font-size: 16px; margin: 20px 0 15px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        Data Keuangan Bulanan
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">Bulan</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Pemasukan</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Pengeluaran</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Netto</th>
          </tr>
        </thead>
        <tbody>
          ${data.financialData.map(item => `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.month}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.income)}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.expense)}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; color: #1e40af;">
                ${formatCurrency(item.income - item.expense)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Expense Categories -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1f2937; font-size: 16px; margin: 20px 0 15px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        Rincian Pengeluaran per Kategori
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">Kategori</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Jumlah</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Persentase</th>
          </tr>
        </thead>
        <tbody>
          ${data.expenseCategories.map(cat => `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${cat.category}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(cat.amount)}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${cat.percentage}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Project Progress -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1f2937; font-size: 16px; margin: 20px 0 15px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        Progress Project Wakaf
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">Nama Project</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Target</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Terkumpul</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Progress</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${data.projectProgress.map(proj => {
            const progress = Math.round((proj.collectedAmount / proj.targetAmount) * 100);
            return `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${proj.name}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(proj.targetAmount)}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(proj.collectedAmount)}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; color: #1e40af; font-weight: 600;">
                ${progress}%
              </td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center; font-size: 9px;">
                <span style="padding: 3px 8px; background-color: ${
                  proj.status === 'active' ? '#dcfce7' : proj.status === 'completed' ? '#dbeafe' : '#fef3c7'
                }; color: ${
                  proj.status === 'active' ? '#16a34a' : proj.status === 'completed' ? '#0284c7' : '#d97706'
                }; border-radius: 3px; display: inline-block;">
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
    <div style="page-break-inside: avoid;">
      <h2 style="color: #1f2937; font-size: 16px; margin: 20px 0 15px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        Donasi Terbaru
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 6px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">ID</th>
            <th style="padding: 6px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">Wakif</th>
            <th style="padding: 6px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600;">Project</th>
            <th style="padding: 6px; border: 1px solid #e5e7eb; text-align: right; font-weight: 600;">Nominal</th>
            <th style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; font-weight: 600;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${data.donations.slice(0, 15).map(donation => `
            <tr>
              <td style="padding: 6px; border: 1px solid #e5e7eb; font-family: monospace;">${donation.id}</td>
              <td style="padding: 6px; border: 1px solid #e5e7eb;">${donation.wakifName}</td>
              <td style="padding: 6px; border: 1px solid #e5e7eb; font-size: 8px;">${donation.projectName.substring(0, 20)}...</td>
              <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(donation.amount)}</td>
              <td style="padding: 6px; border: 1px solid #e5e7eb; text-align: center; font-size: 8px;">
                ${donation.status === 'completed' ? '✓' : '⏳'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 9px;">
      <p>Laporan ini dibuat secara otomatis oleh Sistem Wakaf Konstruksi</p>
      <p>Dokumen ini adalah milik resmi dan harus disimpan dengan aman</p>
    </div>
  `;

  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  // Trigger print dialog
  window.print();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(container);
  }, 1000);
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
