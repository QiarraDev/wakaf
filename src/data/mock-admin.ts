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
  { month: 'Januari', income: 45000000, expense: 12000000 },
  { month: 'Februari', income: 62500000, expense: 18500000 },
  { month: 'Maret', income: 78900000, expense: 25000000 },
  { month: 'April', income: 89200000, expense: 28500000 },
  { month: 'Mei', income: 125600000, expense: 35000000 },
  { month: 'Juni', income: 156200000, expense: 42000000 },
  { month: 'Juli', income: 188000000, expense: 48500000 },
  { month: 'Agustus', income: 145800000, expense: 38000000 },
  { month: 'September', income: 132500000, expense: 35500000 },
  { month: 'Oktober', income: 119800000, expense: 32000000 },
  { month: 'November', income: 95600000, expense: 28000000 },
  { month: 'Desember', income: 164400000, expense: 45000000 },
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
