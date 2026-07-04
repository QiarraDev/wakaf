export type NewsType = 'progress' | 'budget' | 'milestone' | 'impact';

export interface BudgetItem {
  label: string;
  amount: number;
  percentage: number;
}

export interface NewsTimeline {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  date?: string;
  amount: number;
}

export interface ProgramNews {
  id: string;
  campaignId: string;
  campaignTitle: string;
  title: string;
  date: string;
  type: NewsType;
  content: string;
  imageUrl?: string;
  milestoneCompleted?: string;
  budgetBreakdown?: BudgetItem[];
  totalDisbursed?: number;
  impactStats?: { label: string; value: string; icon: string }[];
  timeline?: NewsTimeline[];
}

export const mockProgramNews: ProgramNews[] = [
  {
    id: 'n1',
    campaignId: '1',
    campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas',
    title: 'Milestone Pondasi Selesai — Dana Escrow Dicairkan',
    date: '2026-07-01T08:00:00Z',
    type: 'milestone',
    milestoneCompleted: 'Pondasi & Struktur Bawah',
    content:
      'Alhamdulillah, pekerjaan pondasi dan struktur bawah Masjid Jami Al-Ikhlas telah rampung 100% dan lolos inspeksi SNI. Dana Escrow sebesar Rp 100.000.000 resmi dicairkan ke kontraktor terverifikasi.',
    imageUrl: '/images/campaigns/masjid-al-ikhlas.jpg',
    timeline: [
      { id: 'm1', name: 'Pondasi & Struktur Bawah', status: 'completed', date: '2026-06-10', amount: 100000000 },
      { id: 'm2', name: 'Struktur Dinding & Kolom', status: 'in_progress', date: 'Est. Jul 2026', amount: 150000000 },
      { id: 'm3', name: 'Atap & Finishing', status: 'pending', amount: 250000000 },
    ],
    budgetBreakdown: [
      { label: 'Material Beton & Besi', amount: 55000000, percentage: 55 },
      { label: 'Upah Tenaga Kerja', amount: 30000000, percentage: 30 },
      { label: 'Sewa Alat Berat', amount: 10000000, percentage: 10 },
      { label: 'Biaya Pengawas SNI', amount: 5000000, percentage: 5 },
    ],
    totalDisbursed: 100000000,
    impactStats: [
      { label: 'Pekerja Lokal', value: '24 Orang', icon: '👷' },
      { label: 'Volume Beton', value: '120 m³', icon: '🏗️' },
      { label: 'Inspeksi SNI', value: 'Lulus', icon: '✅' },
    ],
  },
  {
    id: 'n2',
    campaignId: '1',
    campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas',
    title: 'Update Minggu Ini: Pekerjaan Dinding Berjalan Lancar',
    date: '2026-07-02T10:30:00Z',
    type: 'progress',
    content:
      'Tim kontraktor berhasil menyelesaikan pemasangan 60% dinding utama masjid. Estimasi penyelesaian struktur dinding & kolom adalah akhir bulan Juli 2026.',
    imageUrl: '/images/campaigns/masjid-al-ikhlas.jpg',
    timeline: [
      { id: 'm1', name: 'Pondasi & Struktur Bawah', status: 'completed', date: '10 Jun 2026', amount: 100000000 },
      { id: 'm2', name: 'Struktur Dinding & Kolom', status: 'in_progress', date: 'Est. Jul 2026', amount: 150000000 },
      { id: 'm3', name: 'Atap & Finishing', status: 'pending', amount: 250000000 },
    ],
    impactStats: [
      { label: 'Progress Dinding', value: '60%', icon: '🧱' },
      { label: 'Estimasi Selesai', value: 'Jul 2026', icon: '📅' },
    ],
  },
  {
    id: 'n3',
    campaignId: '2',
    campaignTitle: 'Sumur Wakaf untuk Pelosok NTT',
    title: 'Laporan Transparansi: Pengeboran Berhasil di Desa Fatulotu',
    date: '2026-06-28T09:00:00Z',
    type: 'budget',
    content:
      'Survei geolistrik menemukan sumber air di kedalaman 48m. Pengeboran selesai dan kini air bersih sudah mengalir ke 3 RT di Desa Fatulotu, Kupang. Dana digunakan secara transparan sesuai laporan di bawah.',
    imageUrl: '/images/campaigns/wakaf-air.jpg',
    timeline: [
      { id: 'm4', name: 'Survei Geolistrik & Pengeboran', status: 'completed', date: '5 Jun 2026', amount: 50000000 },
      { id: 'm5', name: 'Instalasi Pipa & Tandon', status: 'in_progress', date: 'Est. Jul 2026', amount: 50000000 },
      { id: 'm6', name: 'Mesin Pompa & Finishing', status: 'pending', amount: 50000000 },
    ],
    budgetBreakdown: [
      { label: 'Survei Geolistrik', amount: 15000000, percentage: 30 },
      { label: 'Pengeboran 48m', amount: 22000000, percentage: 44 },
      { label: 'Casing & Pipa PVC', amount: 8000000, percentage: 16 },
      { label: 'Dokumentasi & Laporan', amount: 5000000, percentage: 10 },
    ],
    totalDisbursed: 50000000,
    impactStats: [
      { label: 'Kepala Keluarga', value: '89 KK', icon: '🏠' },
      { label: 'Kedalaman Sumur', value: '48 Meter', icon: '💧' },
      { label: 'Kualitas Air', value: 'Layak Minum', icon: '✅' },
    ],
  },
  {
    id: 'n4',
    campaignId: '3',
    campaignTitle: 'Pusat Pendidikan Anak Yatim',
    title: 'Lahan Seluas 2.500 m² Berhasil Dibebaskan',
    date: '2026-06-25T14:00:00Z',
    type: 'milestone',
    milestoneCompleted: 'Pembebasan Lahan',
    content:
      'Lahan seluas 2.500 m² di lokasi strategis kini sah menjadi aset wakaf. Dokumen akta notaris dan sertifikat tanah telah diserahkan kepada Nazhir. Proses selanjutnya: perencanaan arsitektur.',
    timeline: [
      { id: 'm7', name: 'Pembebasan Lahan', status: 'completed', date: '25 Jun 2026', amount: 500000000 },
      { id: 'm8', name: 'Pondasi Bangunan', status: 'pending', date: 'Est. Okt 2026', amount: 300000000 },
      { id: 'm9', name: 'Dinding & Atap', status: 'pending', amount: 400000000 },
    ],
    budgetBreakdown: [
      { label: 'Harga Lahan', amount: 420000000, percentage: 84 },
      { label: 'Biaya Notaris & BPHTB', amount: 50000000, percentage: 10 },
      { label: 'Pengukuran & Sertifikasi', amount: 30000000, percentage: 6 },
    ],
    totalDisbursed: 500000000,
    impactStats: [
      { label: 'Luas Lahan', value: '2.500 m²', icon: '📐' },
      { label: 'Kapasitas Siswa', value: '300 Anak', icon: '🧒' },
      { label: 'Status Lahan', value: 'Wakaf Produktif', icon: '📜' },
    ],
  },
  {
    id: 'n5',
    campaignId: '4',
    campaignTitle: 'Klinik Kesehatan Gratis Dhuafa',
    title: 'Dampak Nyata: 512 Pasien Dhuafa Telah Dilayani',
    date: '2026-07-03T07:00:00Z',
    type: 'impact',
    content:
      'Sejak klinik dibuka, total 512 pasien dari kalangan dhuafa mendapatkan pelayanan kesehatan gratis. Terima kasih atas wakaf Anda yang menjadi jembatan kesehatan bagi mereka yang membutuhkan.',
    imageUrl: '/images/campaigns/pembangunan-klinik-bagi-dhuafa.jpeg',
    timeline: [
      { id: 'm10', name: 'Renovasi Fisik Klinik', status: 'completed', date: '1 Mei 2026', amount: 150000000 },
      { id: 'm11', name: 'Pengadaan Alat Medis', status: 'in_progress', date: 'Est. Agu 2026', amount: 150000000 },
    ],
    impactStats: [
      { label: 'Pasien Dilayani', value: '512 Orang', icon: '🏥' },
      { label: 'Konsultasi Gratis', value: '1.024 Sesi', icon: '⚕️' },
      { label: 'Obat Diberikan', value: 'Gratis 100%', icon: '💊' },
    ],
  },
];
