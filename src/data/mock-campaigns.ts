export interface Milestone {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  escrowReleased: boolean;
  amount: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl: string;
  bgColor: string;
  bgGradient: string;
  category: 'Mosque' | 'Education' | 'Water' | 'Health';
  daysLeft: number;
  pbgStatus: 'Verified' | 'Pending' | 'Not Required';
  milestones: Milestone[];
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Pembangunan Masjid Jami Al-Ikhlas',
    description: 'Bantu kami membangun masjid untuk memfasilitasi ibadah warga desa Sukamaju. Masjid ini akan menjadi pusat kegiatan keagamaan dan sosial.',
    targetAmount: 500000000,
    currentAmount: 320500000,
    imageUrl: '/images/campaigns/masjid-al-ikhlas.jpg',
    bgColor: '#1e40af',
    bgGradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    category: 'Mosque',
    daysLeft: 45,
    pbgStatus: 'Verified',
    milestones: [
      { id: 'm1', name: 'Pondasi & Struktur Bawah', status: 'completed', escrowReleased: true, amount: 100000000 },
      { id: 'm2', name: 'Struktur Dinding & Kolom', status: 'in_progress', escrowReleased: false, amount: 150000000 },
      { id: 'm3', name: 'Atap & Finishing', status: 'pending', escrowReleased: false, amount: 250000000 },
    ]
  },
  {
    id: '2',
    title: 'Sumur Wakaf untuk Pelosok NTT',
    description: 'Banyak warga di pelosok NTT kesulitan mendapatkan air bersih. Mari berwakaf untuk pembangunan sumur air bersih yang mengalirkan manfaat tiada henti.',
    targetAmount: 150000000,
    currentAmount: 85000000,
    imageUrl: '/images/campaigns/wakaf-air.jpg',
    bgColor: '#0f766e',
    bgGradient: 'linear-gradient(135deg, #0f766e 0%, #10b981 100%)',
    category: 'Water',
    daysLeft: 12,
    pbgStatus: 'Not Required',
    milestones: [
      { id: 'm4', name: 'Survei Geolistrik & Pengeboran', status: 'completed', escrowReleased: true, amount: 50000000 },
      { id: 'm5', name: 'Instalasi Pipa & Tandon', status: 'in_progress', escrowReleased: false, amount: 50000000 },
      { id: 'm6', name: 'Mesin Pompa & Finishing', status: 'pending', escrowReleased: false, amount: 50000000 },
    ]
  },
  {
    id: '3',
    title: 'Pusat Pendidikan Anak Yatim',
    description: 'Wakaf pembebasan lahan dan pembangunan fasilitas pendidikan untuk anak-anak yatim agar mereka mendapatkan akses pendidikan yang layak dan berkualitas.',
    targetAmount: 1200000000,
    currentAmount: 150000000,
    imageUrl: '/images/campaigns/pendidikan-anak-yatim.jpg',
    bgColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    category: 'Education',
    daysLeft: 90,
    pbgStatus: 'Verified',
    milestones: [
      { id: 'm7', name: 'Pembebasan Lahan', status: 'completed', escrowReleased: true, amount: 500000000 },
      { id: 'm8', name: 'Pondasi Bangunan', status: 'pending', escrowReleased: false, amount: 300000000 },
      { id: 'm9', name: 'Dinding & Atap', status: 'pending', escrowReleased: false, amount: 400000000 },
    ]
  },
  {
    id: '4',
    title: 'Klinik Kesehatan Gratis Dhuafa',
    description: 'Wakaf alat kesehatan dan renovasi klinik gratis untuk melayani kaum dhuafa yang tidak mampu membayar biaya pengobatan.',
    targetAmount: 300000000,
    currentAmount: 290000000,
    imageUrl: '/images/campaigns/pembangunan-klinik-bagi-dhuafa.jpeg',
    bgColor: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    category: 'Health',
    daysLeft: 5,
    pbgStatus: 'Pending',
    milestones: [
      { id: 'm10', name: 'Renovasi Fisik Klinik', status: 'completed', escrowReleased: true, amount: 150000000 },
      { id: 'm11', name: 'Pengadaan Alat Medis', status: 'in_progress', escrowReleased: false, amount: 150000000 },
    ]
  },
  {
    id: '5',
    title: 'Pembangunan Rumah Sakit Umum Daerah',
    description: 'Wakaf pembangunan rumah sakit umum untuk melayani masyarakat daerah terpencil yang belum memiliki fasilitas kesehatan memadai. Dilengkapi dengan ruang rawat inap, ICU, dan fasilitas pendukung modern.',
    targetAmount: 2500000000,
    currentAmount: 450000000,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    bgColor: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    category: 'Health',
    daysLeft: 120,
    pbgStatus: 'Verified',
    milestones: [
      { id: 'm12', name: 'Pembelian Lahan & Persiapan', status: 'completed', escrowReleased: true, amount: 500000000 },
      { id: 'm13', name: 'Konstruksi Bangunan Utama', status: 'in_progress', escrowReleased: false, amount: 1000000000 },
      { id: 'm14', name: 'Instalasi Utilitas & MEP', status: 'pending', escrowReleased: false, amount: 700000000 },
      { id: 'm15', name: 'Pengadaan Peralatan Medis', status: 'pending', escrowReleased: false, amount: 300000000 },
    ]
  }
];

