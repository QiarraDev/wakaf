export interface FinancialData {
  month: string;
  income: number;
  expense: number;
}

export interface ProjectProgress {
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

export interface DonationReport {
  id: string;
  wakifName: string;
  wakifEmail?: string;
  projectName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export const mockAdminMetrics = {
  totalIncome: 845500000,
  totalLocked: 420000000,
  totalReleased: 425500000,
  activeProjects: 4,
  totalTargets: 2150000000,
  totalDonors: 1245,
  averageDonation: 678800,
};

export const mockFinancialData: FinancialData[] = [
  // 2022 Data
  { month: '2022-01 (Januari)', income: 15000000, expense: 4000000 },
  { month: '2022-02 (Februari)', income: 18500000, expense: 5200000 },
  { month: '2022-03 (Maret)', income: 22000000, expense: 6500000 },
  { month: '2022-04 (April)', income: 25500000, expense: 7200000 },
  { month: '2022-05 (Mei)', income: 28000000, expense: 8000000 },
  { month: '2022-06 (Juni)', income: 32000000, expense: 9500000 },
  { month: '2022-07 (Juli)', income: 35500000, expense: 10000000 },
  { month: '2022-08 (Agustus)', income: 38000000, expense: 11000000 },
  { month: '2022-09 (September)', income: 42000000, expense: 12500000 },
  { month: '2022-10 (Oktober)', income: 45500000, expense: 13000000 },
  { month: '2022-11 (November)', income: 48000000, expense: 14000000 },
  { month: '2022-12 (Desember)', income: 55000000, expense: 15500000 },
  
  // 2023 Data
  { month: '2023-01 (Januari)', income: 35000000, expense: 10000000 },
  { month: '2023-02 (Februari)', income: 42000000, expense: 12000000 },
  { month: '2023-03 (Maret)', income: 50000000, expense: 14500000 },
  { month: '2023-04 (April)', income: 58000000, expense: 16500000 },
  { month: '2023-05 (Mei)', income: 65000000, expense: 18500000 },
  { month: '2023-06 (Juni)', income: 75000000, expense: 21000000 },
  { month: '2023-07 (Juli)', income: 85000000, expense: 24000000 },
  { month: '2023-08 (Agustus)', income: 92000000, expense: 26000000 },
  { month: '2023-09 (September)', income: 88000000, expense: 25000000 },
  { month: '2023-10 (Oktober)', income: 82000000, expense: 23000000 },
  { month: '2023-11 (November)', income: 78000000, expense: 22000000 },
  { month: '2023-12 (Desember)', income: 105000000, expense: 30000000 },
  
  // 2024 Data
  { month: '2024-01 (Januari)', income: 45000000, expense: 12000000 },
  { month: '2024-02 (Februari)', income: 62500000, expense: 18500000 },
  { month: '2024-03 (Maret)', income: 78900000, expense: 25000000 },
  { month: '2024-04 (April)', income: 89200000, expense: 28500000 },
  { month: '2024-05 (Mei)', income: 125600000, expense: 35000000 },
  { month: '2024-06 (Juni)', income: 156200000, expense: 42000000 },
  { month: '2024-07 (Juli)', income: 188000000, expense: 48500000 },
  { month: '2024-08 (Agustus)', income: 145800000, expense: 38000000 },
  { month: '2024-09 (September)', income: 132500000, expense: 35500000 },
  { month: '2024-10 (Oktober)', income: 119800000, expense: 32000000 },
  { month: '2024-11 (November)', income: 95600000, expense: 28000000 },
  { month: '2024-12 (Desember)', income: 164400000, expense: 45000000 },
  
  // 2025 Data
  { month: '2025-01 (Januari)', income: 125000000, expense: 35000000 },
  { month: '2025-02 (Februari)', income: 135000000, expense: 38000000 },
  { month: '2025-03 (Maret)', income: 145000000, expense: 40000000 },
  { month: '2025-04 (April)', income: 155000000, expense: 42000000 },
  { month: '2025-05 (Mei)', income: 165000000, expense: 45000000 },
  { month: '2025-06 (Juni)', income: 175000000, expense: 48000000 },
  
  // 2026 Data (Jan-Jun, current year)
  { month: '2026-01 (Januari)', income: 185000000, expense: 50000000 },
  { month: '2026-02 (Februari)', income: 195000000, expense: 52000000 },
  { month: '2026-03 (Maret)', income: 205000000, expense: 55000000 },
  { month: '2026-04 (April)', income: 215000000, expense: 58000000 },
  { month: '2026-05 (Mei)', income: 225000000, expense: 60000000 },
  { month: '2026-06 (Juni)', income: 235000000, expense: 63000000 },
];

export const mockProjectProgress: ProjectProgress[] = [
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
      { name: 'Struktur Dinding & Kolom', status: 'in_progress', percentage: 65 },
      { name: 'Atap & Finishing', status: 'pending', percentage: 0 },
    ]
  },
  {
    id: '2',
    name: 'Sumur Wakaf untuk Pelosok NTT',
    category: 'Water',
    targetAmount: 150000000,
    collectedAmount: 85000000,
    lockedAmount: 50000000,
    releasedAmount: 35000000,
    status: 'active',
    milestones: [
      { name: 'Survei Geolistrik & Pengeboran', status: 'completed', percentage: 100 },
      { name: 'Instalasi Pipa & Tandon', status: 'in_progress', percentage: 55 },
      { name: 'Mesin Pompa & Finishing', status: 'pending', percentage: 0 },
    ]
  },
  {
    id: '3',
    name: 'Pusat Pendidikan Anak Yatim',
    category: 'Education',
    targetAmount: 1200000000,
    collectedAmount: 150000000,
    lockedAmount: 150000000,
    releasedAmount: 0,
    status: 'pending',
    milestones: [
      { name: 'Pembebasan Lahan', status: 'completed', percentage: 100 },
      { name: 'Pondasi Bangunan', status: 'pending', percentage: 0 },
      { name: 'Dinding & Atap', status: 'pending', percentage: 0 },
    ]
  },
  {
    id: '4',
    name: 'Klinik Kesehatan Gratis Dhuafa',
    category: 'Health',
    targetAmount: 300000000,
    collectedAmount: 290000000,
    lockedAmount: 20000000,
    releasedAmount: 270000000,
    status: 'completed',
    milestones: [
      { name: 'Renovasi Fisik Klinik', status: 'completed', percentage: 100 },
      { name: 'Pengadaan Alat Medis', status: 'completed', percentage: 100 },
    ]
  },
];

export const mockDonationReports: DonationReport[] = [
  {
    id: 'TXN-001',
    wakifName: 'Ahmad Suryanto',
    wakifEmail: 'ahmad@example.com',
    projectName: 'Pembangunan Masjid Jami Al-Ikhlas',
    amount: 10000000,
    date: '2024-01-15',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'TXN-002',
    wakifName: 'Siti Nur Azizah',
    wakifEmail: 'siti@example.com',
    projectName: 'Sumur Wakaf untuk Pelosok NTT',
    amount: 5000000,
    date: '2024-01-16',
    status: 'completed',
    paymentMethod: 'E-Wallet',
  },
  {
    id: 'TXN-003',
    wakifName: 'Muhammad Ridho',
    projectName: 'Pusat Pendidikan Anak Yatim',
    amount: 25000000,
    date: '2024-01-18',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'TXN-004',
    wakifName: 'Putri Ramadhani',
    projectName: 'Klinik Kesehatan Gratis Dhuafa',
    amount: 3500000,
    date: '2024-01-19',
    status: 'completed',
    paymentMethod: 'E-Wallet',
  },
  {
    id: 'TXN-005',
    wakifName: 'Budi Santoso',
    projectName: 'Pembangunan Masjid Jami Al-Ikhlas',
    amount: 15000000,
    date: '2024-01-20',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'TXN-006',
    wakifName: 'Rina Wijaya',
    projectName: 'Sumur Wakaf untuk Pelosok NTT',
    amount: 7500000,
    date: '2024-01-22',
    status: 'pending',
    paymentMethod: 'Bank Transfer',
  },
];

export const expenseCategories = [
  { category: 'Pondasi & Struktur', amount: 85000000, percentage: 20 },
  { category: 'Material & Bahan Baku', amount: 125000000, percentage: 30 },
  { category: 'Tenaga Kerja', amount: 110000000, percentage: 26 },
  { category: 'Pengawasan & Manajemen', amount: 62000000, percentage: 15 },
  { category: 'Perizinan & Administrasi', amount: 38000000, percentage: 9 },
];
