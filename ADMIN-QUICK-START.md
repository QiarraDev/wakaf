# Admin Panel - Quick Start Guide

## Installation

### 1. Install Dependencies
```bash
npm install
# atau jika sudah terinstall
npm install pdfkit @types/pdfkit --save
```

### 2. Verify Build
```bash
npm run build
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
Buka browser: `http://localhost:3000/admin`

## What You'll See

### Top Section: Header + Action Buttons
- Dashboard title
- Subtitle dengan keterangan
- **Export PDF** button - Generate laporan PDF
- **Export CSV** button - Download data CSV

### Section 1: Ringkasan Metrik Utama
6 metric cards dengan warna dan icon berbeda:
- 📈 Total Pemasukan (Blue) - Rp 845.5M
- 🔒 Dana Terkunci (Amber) - Rp 420M
- ✓ Dana Dilepaskan (Green) - Rp 425.5M
- 🎯 Target Total Program (Blue) - Rp 2.15T
- 🏗️ Project Aktif (Blue) - 4 projects
- 👥 Total Donatur (Green) - 1.245 donatur

Setiap card menunjukkan perubahan % dari bulan sebelumnya (↑/↓)

### Section 2: Laporan Keuangan & Pengeluaran
#### Chart Bulanan
Visual bar chart menampilkan:
- **Pemasukan per bulan** (Blue bars)
- **Pengeluaran per bulan** (Amber bars)
- Hover untuk melihat nominal
- 12 bulan data (Januari - Desember)

#### Summary Cards
- **Total Pemasukan**: Rp 1.602.4M
- **Total Pengeluaran**: Rp 456.5M
- **Netto Surplus**: Rp 1.145.9M

#### Expense Breakdown Table
Rincian pengeluaran per kategori:
| Kategori | Jumlah | % |
|----------|--------|---|
| Material & Bahan Baku | Rp 125M | 30% |
| Tenaga Kerja | Rp 110M | 26% |
| Pondasi & Struktur | Rp 85M | 20% |
| ... | ... | ... |

### Section 3: Progress Timeline Project Wakaf
Untuk setiap project (4 total):

**Header Project:**
- Nama project
- Kategori (Mosque, Water, Education, Health)
- Target amount
- Status badge (Aktif/Menunggu/Selesai)

**Progress Bar:**
- Visual % yang sudah terkumpul vs target
- Contoh: 64% collected

**Milestones:**
Setiap project punya beberapa milestone:
- ✓ Completed (Green)
- ◐ In Progress (Amber)
- ○ Pending (Gray)

Dengan detail:
- Milestone name
- Status deskriptif
- Progress % visual bar

**Amount Info:**
- Terkumpul
- Terkunci (Escrow)
- Dilepaskan

### Section 4: Laporan Detail Donasi
Table dengan filter & pagination:

**Filter Buttons:**
- Semua (6) - Tampilkan semua donasi
- Berhasil (5) - Hanya yang completed
- Tertunda (1) - Hanya yang pending

**Table Columns:**
| ID Transaksi | Tanggal | Nama Wakif | Program | Nominal | Metode | Status |
|---|---|---|---|---|---|---|
| TXN-001 | 15 Jan 2024 | Ahmad Suryanto | Masjid Al-Ikhlas | Rp 10M | Bank Transfer | ✓ Berhasil |
| ... | ... | ... | ... | ... | ... | ... |

**Pagination:**
- 10 items per halaman
- Previous/Next buttons
- Direct page selection
- Page info (Halaman 1 dari 1)

## Interacting with the Dashboard

### Export PDF
1. Click **"📥 Export PDF"** button
2. Browser print dialog terbuka
3. Opsi:
   - Print ke printer fisik
   - Save as PDF → "wakaf-report-date.pdf"
4. PDF akan berisi:
   - Key metrics ringkasan
   - Financial data table (12 bulan)
   - Expense breakdown
   - Project progress summary
   - Recent donations (15 terakhir)

### Export CSV
1. Click **"📊 Export CSV"** button
2. File otomatis download: `wakaf-report-[date].csv`
3. Buka dengan:
   - Excel
   - Google Sheets
   - Atau text editor

### Print Report
1. Scroll ke section "Laporan Keuangan & Pengeluaran"
2. Click **"🖨️ Cetak"** button
3. Browser print dialog terbuka
4. Pilih printer atau "Save as PDF"

### Filter Donations
1. Scroll ke section "Laporan Detail Donasi"
2. Click salah satu filter button:
   - **Semua** - Show all donations
   - **Berhasil** - Show only completed
   - **Tertunda** - Show only pending
3. Tabel otomatis update dan reset ke page 1

### Paginate Donations Table
1. Jika ada banyak donation, pagination buttons muncul
2. Click:
   - **← Sebelumnya** - Previous page
   - **Page number** (1, 2, 3, dll) - Jump to page
   - **Selanjutnya →** - Next page
3. Setiap halaman menampilkan 10 donation

## Mock Data Overview

Semua data di admin panel adalah **mock/hardcoded** untuk demo:

### Metrics (Overall)
- Total Income: Rp 845.5M
- Locked (Escrow): Rp 420M
- Released: Rp 425.5M
- Active Projects: 4
- Total Targets: Rp 2.15T
- Total Donors: 1.245

### Financial Data
12 bulan data dengan income & expense yang realistis
- Terendah: Januari (Income: Rp 45M)
- Tertinggi: Juli (Income: Rp 188M)

### Projects (4 total)
1. **Pembangunan Masjid Jami Al-Ikhlas** (Mosque)
   - Target: Rp 500M
   - Collected: Rp 320.5M (64%)
   - Status: Aktif
   - 3 milestones (1 completed, 1 in progress, 1 pending)

2. **Sumur Wakaf untuk Pelosok NTT** (Water)
   - Target: Rp 150M
   - Collected: Rp 85M (57%)
   - Status: Aktif
   - 3 milestones

3. **Pusat Pendidikan Anak Yatim** (Education)
   - Target: Rp 1.2T
   - Collected: Rp 150M (12%)
   - Status: Menunggu
   - 3 milestones

4. **Klinik Kesehatan Gratis Dhuafa** (Health)
   - Target: Rp 300M
   - Collected: Rp 290M (97%)
   - Status: Selesai
   - 2 milestones (both completed)

### Donations (6 recent)
- TXN-001 s/d TXN-006
- Mix dari completed & pending status
- Dari berbagai project
- Different payment methods (Bank Transfer, E-Wallet)

## Responsive Behavior

### Desktop (1200px+)
- 6-column metrics grid
- Full width chart
- 3-column expense summary
- Full table visible

### Tablet (768px - 1199px)
- 3-column metrics grid
- Chart compressed
- Single column expense summary
- Table horizontal scrollable

### Mobile (<768px)
- 2-column metrics grid
- Full-width chart
- Stacked expense section
- Table requires horizontal scroll
- Buttons stack vertically

## Customizing Mock Data

### Edit Metrics
File: `/src/data/mock-admin.ts`
```typescript
export const mockAdminMetrics = {
  totalIncome: 845500000,      // Change this
  totalLocked: 420000000,      // Or this
  // ... other metrics
};
```

### Edit Financial Data
Add/remove/modify months:
```typescript
export const mockFinancialData: FinancialData[] = [
  { month: 'Januari', income: 45000000, expense: 12000000 },
  // Add more or change values
];
```

### Edit Projects
Add/modify projects dalam `mockProjectProgress`:
```typescript
{
  id: '1',
  name: 'Your Project Name',
  category: 'Mosque' | 'Water' | 'Education' | 'Health',
  targetAmount: 500000000,
  collectedAmount: 320500000,
  // ... other fields
}
```

### Edit Donations
Modify `mockDonationReports` array untuk mengubah donation data

## Troubleshooting

### Q: Dashboard tidak muncul
**A:** 
- Pastikan dev server running (`npm run dev`)
- Check URL: `http://localhost:3000/admin`
- Clear browser cache (Ctrl+Shift+Del)

### Q: Chart tidak terlihat
**A:**
- JavaScript harus enabled
- Check browser console untuk errors (F12)
- Try refresh page

### Q: Export PDF tidak bekerja
**A:**
- Popup blocker mungkin aktif - disable untuk site ini
- Browser harus support print API (semua modern browser support)
- Try using Ctrl+P / Cmd+P untuk print manual

### Q: Tabel terlihat aneh di mobile
**A:**
- Ini normal - table bisa di-scroll horizontal
- Atau resize browser untuk desktop view
- Mobile design tetap readable

### Q: Pagination tidak muncul
**A:**
- Pagination hanya muncul jika ada lebih dari 10 items
- Dengan 6 donation saat ini, pagination tidak muncul
- Add more donations untuk test pagination

## Next Steps

### For Development
1. Modify mock data untuk match real project needs
2. Connect ke real API endpoint untuk live data
3. Add authentication & authorization
4. Implement date range filters
5. Add data export ke Excel (XLSX format)

### For Production
1. Setup authentication (JWT, OAuth2, dll)
2. Setup backend API dengan proper database
3. Add caching layer untuk performance
4. Setup monitoring & error tracking
5. Configure CDN untuk asset delivery
6. Add rate limiting & security headers
7. Setup automated backups
8. Configure email alerts untuk anomalies

## Files Reference

### Main Files
- `/src/app/admin/page.tsx` - Main admin page
- `/src/app/admin/page.module.css` - Admin page styles
- `/src/data/mock-admin.ts` - Mock data
- `/src/lib/pdf-export.ts` - Export utilities

### Components
- `/src/components/admin/MetricsCard.tsx`
- `/src/components/admin/ProgressTimeline.tsx`
- `/src/components/admin/FinancialReport.tsx`
- `/src/components/admin/DonationReportTable.tsx`

### Styling
- `/src/components/admin/MetricsCard.module.css`
- `/src/components/admin/ProgressTimeline.module.css`
- `/src/components/admin/FinancialReport.module.css`
- `/src/components/admin/DonationReportTable.module.css`

## Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [CSS Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Browser Print API](https://developer.mozilla.org/en-US/docs/Web/API/Window/print)

---

**Happy Admin Dashboard Experience!** 🚀
