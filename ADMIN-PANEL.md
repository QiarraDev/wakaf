# Admin Panel Documentation - Wakaf Konstruksi

## Overview

Admin Panel adalah dashboard komprehensif untuk **Nazhir** (pengelola wakaf) untuk memonitor metrik keuangan, progress project, dan laporan donasi secara real-time.

## Features

### 1. **Dashboard Overview** - Key Metrics Cards
Menampilkan 6 kartu metrik utama dengan:
- **Total Pemasukan**: Total dana yang masuk dengan indikator trend
- **Dana Terkunci (Escrow)**: Dana yang belum dilepaskan dengan indikator trend
- **Dana Dilepaskan**: Dana yang sudah direalisasikan dengan indikator trend
- **Target Total Program**: Target gabungan semua project
- **Project Aktif**: Jumlah project yang sedang berjalan
- **Total Donatur**: Jumlah orang yang telah berwakaf dengan indikator trend

Setiap card menampilkan:
- Label dengan icon
- Nilai utama dalam format currency (IDR)
- Perubahan persentase dari bulan sebelumnya
- Animasi smooth saat hover
- Warna gradient yang konsisten dengan brand

### 2. **Financial Report Section**
Laporan keuangan komprehensif dengan:

#### Chart Interaktif
- Bar chart menampilkan pemasukan vs pengeluaran per bulan
- Hover untuk melihat nilai detail
- Legend untuk membedakan income vs expense
- Responsive design untuk mobile

#### Summary Cards
Tiga card ringkasan:
- Total Pemasukan (Gradient Blue)
- Total Pengeluaran (Gradient Amber)
- Netto Surplus (Gradient Green)

#### Expense Breakdown Table
Tabel detail pengeluaran dengan:
- Kategori pengeluaran (Material, Tenaga Kerja, dll)
- Nominal per kategori
- Percentage bar visual dengan persentase

### 3. **Progress Results Timeline**
Visual timeline untuk setiap wakaf project menampilkan:

#### Per Project:
- Project name dan category
- Target vs collected amount
- Status badge (Aktif/Menunggu/Selesai)
- Progress bar utama (% terkumpul)
- Amount breakdown: Terkumpul / Terkunci / Dilepaskan

#### Milestones:
- Visual milestone dengan icon status (✓ / ◐ / ○)
- Milestone name dan status deskriptif
- Progress percentage per milestone
- Colored borders berdasarkan status

### 4. **Donation Report Table**
Tabel laporan donasi dengan:

#### Features:
- Pagination (10 items per page)
- Filter by status (Semua / Berhasil / Tertunda)
- Sortable columns
- Status badge dengan icon
- Responsive scroll pada mobile
- Empty state message

#### Columns:
- ID Transaksi (Transaction ID format)
- Tanggal
- Nama Wakif
- Nama Program (clickable untuk detail)
- Nominal (format currency)
- Metode Pembayaran
- Status

### 5. **Export Functionality**

#### PDF Export
- Menggunakan browser print API (client-side, production-ready)
- Format laporan profesional A4 dengan:
  - Header dengan branding
  - Key metrics ringkasan
  - Monthly financial data table
  - Expense breakdown
  - Project progress summary
  - Recent donations list
  - Footer dengan disclaimer
- Terlihat sempurna saat diprint atau save as PDF

#### CSV Export
- Export data terstruktur untuk analisis lebih lanjut
- Filename: `wakaf-report-[date].csv`
- Includes metrics, financial data, expenses, projects

#### Print Button
- Trigger sistem print native browser
- Styling print-optimized (hide buttons, adjust spacing)

## Technical Details

### Architecture

```
/src/app/admin/
├── page.tsx                 # Main admin page component
└── page.module.css          # Page styles

/src/components/admin/
├── MetricsCard.tsx          # Reusable metrics card component
├── MetricsCard.module.css
├── ProgressTimeline.tsx     # Timeline dengan project progress
├── ProgressTimeline.module.css
├── FinancialReport.tsx      # Financial chart & breakdown
├── FinancialReport.module.css
├── DonationReportTable.tsx  # Donation table dengan pagination
└── DonationReportTable.module.css

/src/data/
├── mock-admin.ts            # Mock data untuk admin panel
└── mock-campaigns.ts        # Existing campaign data

/src/lib/
├── pdf-export.ts            # PDF & CSV export utilities
└── utils.ts                 # Utility functions (formatCurrency, etc)
```

### Dependencies

```json
{
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "pdfkit": "^0.14.0"  // Added for PDF support
}
```

### Component Props

#### MetricsCard
```typescript
interface MetricsCardProps {
  label: string;              // Card label
  value: string | number;     // Main value to display
  change?: number;            // % change from last month
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;     // Optional emoji/icon
}
```

#### ProgressTimeline
```typescript
interface ProgressTimelineProps {
  projects: ProjectProgress[];
}

interface ProjectProgress {
  id: string;
  name: string;
  category: string;
  targetAmount: number;
  collectedAmount: number;
  lockedAmount: number;
  releasedAmount: number;
  status: 'active' | 'completed' | 'pending';
  milestones: {
    name: string;
    status: 'completed' | 'in_progress' | 'pending';
    percentage: number;
  }[];
}
```

#### FinancialReport
```typescript
interface FinancialReportProps {
  financialData: FinancialData[];
  expenseCategories: Array<{ 
    category: string; 
    amount: number; 
    percentage: number 
  }>;
  onExportPDF?: () => void;
}
```

#### DonationReportTable
```typescript
interface DonationReportTableProps {
  reports: DonationReport[];
}

interface DonationReport {
  id: string;
  wakifName: string;
  wakifEmail?: string;
  projectName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}
```

### Styling Approach

- **CSS Modules**: Semua styling menggunakan CSS Modules untuk scoped styles
- **CSS Variables**: Menggunakan CSS custom properties untuk warna & shadows
- **Responsive**: Mobile-first approach dengan breakpoints di 768px dan 1024px
- **Print Styles**: Media queries untuk styling saat print

### Design System Integration

Menggunakan existing design system dari project:
- **Primary Blue**: `#1e40af`
- **Success Green**: `#16a34a`
- **Warning Amber**: `#d97706`
- **Danger Red**: `#dc2626`
- **Neutral Grays**: `#6b7280`, `#9ca3af`, dll

Shadows dan typography dari globals.css:
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Font: Inter system-ui

## Usage

### Starting the Dev Server

```bash
npm run dev
# Navigate to http://localhost:3000/admin
```

### Building for Production

```bash
npm run build
npm start
```

### Exporting Reports

1. **PDF Export**: Click "📥 Export PDF" button
   - Opens browser print dialog
   - Save as PDF or print to physical printer

2. **CSV Export**: Click "📊 Export CSV" button
   - Downloads file: `wakaf-report-[date].csv`
   - Open dengan Excel/Google Sheets

3. **Print**: Via Financial Report section
   - Optimized print layout
   - Hide navigation & controls

## Mock Data Structure

### mockAdminMetrics
```typescript
{
  totalIncome: 845500000,
  totalLocked: 420000000,
  totalReleased: 425500000,
  activeProjects: 4,
  totalTargets: 2150000000,
  totalDonors: 1245,
  averageDonation: 678800,
}
```

### mockFinancialData (12 months)
```typescript
[
  { month: 'Januari', income: 45000000, expense: 12000000 },
  // ... 11 more months
]
```

### mockProjectProgress (4 projects)
```typescript
[
  {
    id: '1',
    name: 'Pembangunan Masjid Jami Al-Ikhlas',
    category: 'Mosque',
    targetAmount: 500000000,
    collectedAmount: 320500000,
    lockedAmount: 200000000,
    releasedAmount: 120500000,
    status: 'active',
    milestones: [
      { name: 'Pondasi & Struktur Bawah', status: 'completed', percentage: 100 },
      // ... more milestones
    ]
  }
  // ... 3 more projects
]
```

### mockDonationReports (6+ donations)
```typescript
[
  {
    id: 'TXN-001',
    wakifName: 'Ahmad Suryanto',
    wakifEmail: 'ahmad@example.com',
    projectName: 'Pembangunan Masjid Jami Al-Ikhlas',
    amount: 10000000,
    date: '2024-01-15',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  }
  // ... more donations
]
```

## Responsiveness

### Desktop (1200px+)
- 6-column metrics grid
- Full chart with legend
- Side-by-side tables
- All controls visible

### Tablet (768px - 1199px)
- 3-column metrics grid
- Compact chart
- Stacked layout
- Adjusted padding

### Mobile (<768px)
- 1-2 column metrics grid
- Full-width chart
- Horizontal scroll tables
- Simplified controls
- Touch-optimized buttons

## Performance Optimizations

1. **Mock Data**: Semua data adalah mock (hardcoded) untuk demo
2. **No API Calls**: Tidak ada network requests untuk menghindari latency
3. **CSS Modules**: Scoped styles mengurangi CSS parsing
4. **Client-side Export**: PDF & CSV generation di browser
5. **Lazy Loading**: Components rendered on-demand

## Future Enhancements

### Proposed Improvements
1. **Real API Integration**: Connect ke backend untuk live data
2. **Data Filtering**: Date range picker, project filter
3. **Download Excel**: Native Excel export (XLSX) via library
4. **Interactive Charts**: Chart.js / D3.js untuk interactive visualization
5. **Real-time Updates**: WebSocket untuk live metrics update
6. **User Permissions**: Role-based access control
7. **Audit Logs**: Track semua perubahan data
8. **Email Reports**: Scheduled email delivery of reports
9. **Dark Mode**: Toggle untuk dark theme
10. **Advanced Analytics**: Trend analysis, forecasting

## Troubleshooting

### Issue: Export PDF tidak berfungsi
**Solusi**: Pastikan popup blocker tidak aktif dan browser support print API

### Issue: Tabel terlihat terpotong di mobile
**Solusi**: Gunakan horizontal scroll di wrapper, atau enable responsive design

### Issue: Chart tidak terlihat
**Solusi**: Pastikan JavaScript enabled, check console untuk errors

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11: Partial support (no CSS Grid)

## Accessibility

- ✅ Semantic HTML tags
- ✅ ARIA labels pada interactive elements
- ✅ Keyboard navigation
- ✅ Color contrast ratio > 4.5:1
- ✅ Alt text untuk icons
- ⚠️ Full WCAG compliance: Requires manual testing

## Security Considerations

- ✅ No sensitive data in localStorage
- ✅ Client-side export (no data sent to server)
- ✅ XSS protection via React
- ✅ CSRF tokens not needed (no state-changing requests)
- ⚠️ For production: Add authentication & authorization

## Maintenance

### Update Mock Data
Edit `/src/data/mock-admin.ts` untuk mengubah metrics, financial data, atau project progress.

### Customize Colors
Update CSS variables di `/src/app/globals.css`:
```css
--primary-blue: #1e40af;
--success-green: #16a34a;
--warning-amber: #d97706;
```

### Add New Metrics
1. Tambah card di `mockAdminMetrics`
2. Import di admin page
3. Render `<MetricsCard>` dengan props

## Contact & Support

Untuk questions atau issues, hubungi tim development.
