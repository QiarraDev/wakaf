export type MitraType = 'Arsitek' | 'Kontraktor' | 'Toko Bangunan';
export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export interface MitraProject {
  campaignId: string;
  campaignTitle: string;
  role: string;
  value: number;
  status: 'active' | 'completed';
  year: number;
}

export interface MitraReview {
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Mitra {
  id: string;
  name: string;
  type: MitraType;
  logo: string; // emoji placeholder
  tagline: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  verificationStatus: VerificationStatus;
  sniCertified: boolean;
  pbgExperience: boolean;
  foundedYear: number;
  employeeCount: string;
  completedProjects: number;
  totalProjectValue: number;
  rating: number;
  reviewCount: number;
  specializations: string[];
  projects: MitraProject[];
  reviews: MitraReview[];
  portfolioImages?: string[];
}

export const mockMitra: Mitra[] = [
  // ── ARSITEK ──────────────────────────────────────────────
  {
    id: 'a1',
    name: 'Rancang Amanah Studio',
    type: 'Arsitek',
    logo: '🏛️',
    tagline: 'Desain Islami yang Fungsional & Berkelanjutan',
    description:
      'Studio arsitektur berpengalaman dalam desain fasilitas ibadah dan sosial. Spesialis dalam desain masjid, pesantren, dan klinik yang memadukan nilai estetika Islami dengan fungsi modern. Semua proyek berstandar SNI dan ramah lingkungan.',
    location: 'Jakarta Selatan, DKI Jakarta',
    phone: '+62 21 7654-3210',
    email: 'studio@rancangamanah.co.id',
    website: 'rancangamanah.co.id',
    verificationStatus: 'verified',
    sniCertified: true,
    pbgExperience: true,
    foundedYear: 2015,
    employeeCount: '12–25',
    completedProjects: 34,
    totalProjectValue: 18500000000,
    rating: 4.9,
    reviewCount: 28,
    specializations: ['Desain Masjid', 'Fasilitas Pendidikan', 'Klinik Komunitas', 'IMB/PBG', 'Interior Islami'],
    projects: [
      { campaignId: '1', campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas', role: 'Arsitek Utama', value: 45000000, status: 'active', year: 2026 },
      { campaignId: '3', campaignTitle: 'Pusat Pendidikan Anak Yatim', role: 'Arsitek Konsultan', value: 60000000, status: 'active', year: 2026 },
    ],
    reviews: [
      { reviewer: 'Nazhir Al-Ikhlas Foundation', rating: 5, comment: 'Desain sangat memperhatikan detail arsitektur Islami. Tim responsif dan profesional.', date: '2026-06-15' },
      { reviewer: 'Yayasan Peduli Yatim', rating: 5, comment: 'Proses revisi cepat, hasil akhir melebihi ekspektasi kami.', date: '2026-05-20' },
    ],
  },
  {
    id: 'a2',
    name: 'Konsultan Arsitektur Nusantara',
    type: 'Arsitek',
    logo: '📐',
    tagline: 'Membangun Fasilitas Umat dengan Standar Terbaik',
    description:
      'Firma arsitektur dengan portofolio lebih dari 50 proyek fasilitas publik. Berpengalaman dalam pengurusan PBG, IMB, dan sertifikasi SNI. Melayani seluruh Indonesia dengan tim di 5 kota besar.',
    location: 'Surabaya, Jawa Timur',
    phone: '+62 31 8765-4321',
    email: 'info@kan-arsitektur.id',
    verificationStatus: 'verified',
    sniCertified: true,
    pbgExperience: true,
    foundedYear: 2010,
    employeeCount: '25–50',
    completedProjects: 52,
    totalProjectValue: 35000000000,
    rating: 4.7,
    reviewCount: 41,
    specializations: ['Fasilitas Kesehatan', 'Masjid & Musholla', 'Gedung Pendidikan', 'Pengurusan PBG/IMB'],
    projects: [
      { campaignId: '4', campaignTitle: 'Klinik Kesehatan Gratis Dhuafa', role: 'Arsitek & Pengawas', value: 25000000, status: 'completed', year: 2025 },
    ],
    reviews: [
      { reviewer: 'Dinas Sosial Surabaya', rating: 5, comment: 'Pengurusan PBG sangat cepat dan tidak berbelit. Sangat direkomendasikan.', date: '2026-03-10' },
      { reviewer: 'Yayasan Dhuafa Sehat', rating: 4, comment: 'Desain fungsional dan sesuai kebutuhan klinik kami.', date: '2025-12-05' },
    ],
  },

  // ── KONTRAKTOR ───────────────────────────────────────────
  {
    id: 'k1',
    name: 'CV. Bangun Berkah Konstruksi',
    type: 'Kontraktor',
    logo: '🏗️',
    tagline: 'Konstruksi Amanah, Selesai Tepat Waktu',
    description:
      'Kontraktor berpengalaman 15 tahun di bidang konstruksi fasilitas umum dan ibadah. Memiliki sertifikasi SKK Konstruksi, terdaftar di LPJK, dan berpengalaman dalam sistem pencairan dana Escrow per-milestone. Pekerjaan selalu diawasi QC internal.',
    location: 'Depok, Jawa Barat',
    phone: '+62 21 9876-5432',
    email: 'project@bangunkonstruksi.co.id',
    website: 'bangunkonstruksi.co.id',
    verificationStatus: 'verified',
    sniCertified: true,
    pbgExperience: true,
    foundedYear: 2009,
    employeeCount: '50–100',
    completedProjects: 87,
    totalProjectValue: 65000000000,
    rating: 4.8,
    reviewCount: 62,
    specializations: ['Konstruksi Masjid', 'Struktur Beton Bertulang', 'Renovasi Klinik', 'Manajemen Milestone', 'SNI Compliance'],
    projects: [
      { campaignId: '1', campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas', role: 'Kontraktor Utama', value: 320000000, status: 'active', year: 2026 },
      { campaignId: '4', campaignTitle: 'Klinik Kesehatan Gratis Dhuafa', role: 'Kontraktor Renovasi', value: 150000000, status: 'completed', year: 2025 },
    ],
    reviews: [
      { reviewer: 'Al-Ikhlas Foundation', rating: 5, comment: 'Progress sesuai timeline, laporan harian selalu transparan. Tim sangat profesional.', date: '2026-06-28' },
      { reviewer: 'Klinik Dhuafa Sehat', rating: 5, comment: 'Renovasi selesai 2 minggu lebih cepat dari jadwal. Kualitas sangat bagus!', date: '2025-11-15' },
    ],
  },
  {
    id: 'k2',
    name: 'PT. Tirta Konstruksi Mandiri',
    type: 'Kontraktor',
    logo: '🔧',
    tagline: 'Spesialis Infrastruktur Air & Sanitasi',
    description:
      'Kontraktor spesialis pembangunan sumur bor, sistem sanitasi, dan infrastruktur air bersih. Memiliki alat pengeboran modern dan teknisi bersertifikat. Berpengalaman di daerah terpencil termasuk NTT, NTB, Papua, dan Kalimantan.',
    location: 'Kupang, Nusa Tenggara Timur',
    phone: '+62 380 7654-321',
    email: 'proyek@tirtakonstruksi.id',
    verificationStatus: 'verified',
    sniCertified: false,
    pbgExperience: false,
    foundedYear: 2013,
    employeeCount: '25–50',
    completedProjects: 143,
    totalProjectValue: 28000000000,
    rating: 4.9,
    reviewCount: 89,
    specializations: ['Sumur Bor Dalam', 'Geolistrik', 'Instalasi Pipa', 'Pompa Air Tenaga Surya', 'WASH Program'],
    projects: [
      { campaignId: '2', campaignTitle: 'Sumur Wakaf untuk Pelosok NTT', role: 'Kontraktor Pengeboran', value: 85000000, status: 'active', year: 2026 },
    ],
    reviews: [
      { reviewer: 'Wakaf Air Indonesia', rating: 5, comment: 'Tim sangat berpengalaman di NTT. Menemukan sumber air di kedalaman 48m, luar biasa!', date: '2026-06-30' },
      { reviewer: 'Dinas PU NTT', rating: 5, comment: 'Paling terpercaya untuk proyek sumur bor di wilayah terpencil NTT.', date: '2026-02-14' },
    ],
  },
  {
    id: 'k3',
    name: 'UD. Pondasi Kokoh Nusantara',
    type: 'Kontraktor',
    logo: '🧱',
    tagline: 'Pondasi Kuat, Bangunan Bertahan Generasi',
    description:
      'Kontraktor dengan keahlian khusus dalam pekerjaan tanah, pondasi, dan struktur bawah. Dilengkapi alat berat sendiri (excavator, crane, concrete mixer). Semua material berstandar SNI dan bersumber dari supplier terverifikasi.',
    location: 'Bandung, Jawa Barat',
    phone: '+62 22 8765-4320',
    email: 'info@pondasikokoh.id',
    verificationStatus: 'pending',
    sniCertified: true,
    pbgExperience: false,
    foundedYear: 2018,
    employeeCount: '25–50',
    completedProjects: 28,
    totalProjectValue: 15000000000,
    rating: 4.6,
    reviewCount: 19,
    specializations: ['Pondasi Bore Pile', 'Pekerjaan Tanah', 'Struktur Baja', 'Tiang Pancang'],
    projects: [],
    reviews: [
      { reviewer: 'Developer Perumahan Bandung', rating: 5, comment: 'Pekerjaan pondasi sangat rapi dan sesuai spesifikasi teknis.', date: '2026-01-20' },
    ],
  },

  // ── TOKO BANGUNAN ─────────────────────────────────────────
  {
    id: 't1',
    name: 'Toko Material Amanah',
    type: 'Toko Bangunan',
    logo: '🏪',
    tagline: 'Material Berkualitas, Harga Transparan untuk Wakaf',
    description:
      'Distributor material bangunan terpercaya khusus untuk proyek wakaf dan sosial. Memberikan harga spesial (diskon 5–15%) dan laporan penggunaan material lengkap untuk keperluan audit dan transparansi wakaf. Stok lengkap dengan pengiriman ke seluruh Jabodetabek.',
    location: 'Bekasi, Jawa Barat',
    phone: '+62 21 8888-7777',
    email: 'order@materialamanah.co.id',
    website: 'materialamanah.co.id',
    verificationStatus: 'verified',
    sniCertified: true,
    pbgExperience: false,
    foundedYear: 2012,
    employeeCount: '25–50',
    completedProjects: 210,
    totalProjectValue: 12000000000,
    rating: 4.8,
    reviewCount: 156,
    specializations: ['Semen & Beton', 'Besi Beton SNI', 'Bata & Hebel', 'Keramik & Granit', 'Material Atap', 'Laporan Material'],
    projects: [
      { campaignId: '1', campaignTitle: 'Pembangunan Masjid Jami Al-Ikhlas', role: 'Supplier Material Utama', value: 55000000, status: 'active', year: 2026 },
    ],
    reviews: [
      { reviewer: 'CV. Bangun Berkah Konstruksi', rating: 5, comment: 'Laporan material sangat detail dan membantu proses audit wakaf. Pengiriman selalu tepat waktu.', date: '2026-07-01' },
      { reviewer: 'Al-Ikhlas Foundation', rating: 5, comment: 'Transparansi harga dan laporan sangat membantu kami melaporkan ke wakif.', date: '2026-06-10' },
    ],
  },
  {
    id: 't2',
    name: 'CV. Surya Bangunan NTT',
    type: 'Toko Bangunan',
    logo: '🛒',
    tagline: 'Solusi Material Terlengkap di NTT',
    description:
      'Toko bangunan terbesar di NTT dengan cabang di Kupang, Atambua, dan Maumere. Menyediakan semua kebutuhan material konstruksi termasuk pipa PVC, pompa air, panel surya, dan material khusus daerah terpencil. Pengiriman gratis untuk proyek sosial & wakaf.',
    location: 'Kupang, Nusa Tenggara Timur',
    phone: '+62 380 8765-432',
    email: 'info@suryabangunan-ntt.id',
    verificationStatus: 'verified',
    sniCertified: false,
    pbgExperience: false,
    foundedYear: 2008,
    employeeCount: '25–50',
    completedProjects: 380,
    totalProjectValue: 8500000000,
    rating: 4.7,
    reviewCount: 234,
    specializations: ['Pipa & Fitting PVC', 'Pompa Air', 'Panel Surya', 'Material Lokal NTT', 'Pengiriman Pelosok'],
    projects: [
      { campaignId: '2', campaignTitle: 'Sumur Wakaf untuk Pelosok NTT', role: 'Supplier Pipa & Pompa', value: 8000000, status: 'active', year: 2026 },
    ],
    reviews: [
      { reviewer: 'PT. Tirta Konstruksi Mandiri', rating: 5, comment: 'Satu-satunya supplier yang bisa kirim ke lokasi terpencil di NTT. Sangat membantu!', date: '2026-06-25' },
    ],
  },
  {
    id: 't3',
    name: 'Pusat Medis Supply Indonesia',
    type: 'Toko Bangunan',
    logo: '🏥',
    tagline: 'Peralatan Medis & Klinik Terlengkap',
    description:
      'Distributor resmi peralatan medis dan perlengkapan klinik. Menyediakan alat kesehatan berstandar Kemenkes, steril dan bersertifikat. Menawarkan paket lengkap klinik dasar hingga klinik pratama untuk proyek sosial & wakaf dengan harga khusus.',
    location: 'Jakarta Pusat, DKI Jakarta',
    phone: '+62 21 5555-6666',
    email: 'sales@pusatmedissupply.co.id',
    website: 'pusatmedissupply.co.id',
    verificationStatus: 'verified',
    sniCertified: true,
    pbgExperience: false,
    foundedYear: 2005,
    employeeCount: '50–100',
    completedProjects: 95,
    totalProjectValue: 22000000000,
    rating: 4.9,
    reviewCount: 78,
    specializations: ['Alat Diagnostik', 'Furnitur Medis', 'Sterilisasi', 'Farmasi Dasar', 'Kalibrasi Alat'],
    projects: [
      { campaignId: '4', campaignTitle: 'Klinik Kesehatan Gratis Dhuafa', role: 'Supplier Alat Medis', value: 150000000, status: 'active', year: 2026 },
    ],
    reviews: [
      { reviewer: 'Klinik Dhuafa Sehat', rating: 5, comment: 'Paket klinik sangat lengkap, harga kompetitif, dan semua alat sudah terkalibrasi.', date: '2026-07-02' },
      { reviewer: 'RS Umum Daerah Terpencil', rating: 5, comment: 'Sangat profesional, dokumentasi alat lengkap untuk keperluan izin operasional.', date: '2026-04-18' },
    ],
  },
];
