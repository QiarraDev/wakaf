export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl: string;
  category: 'Mosque' | 'Education' | 'Water' | 'Health';
  daysLeft: number;
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Pembangunan Masjid Jami Al-Ikhlas',
    description: 'Bantu kami membangun masjid untuk memfasilitasi ibadah warga desa Sukamaju. Masjid ini akan menjadi pusat kegiatan keagamaan dan sosial.',
    targetAmount: 500000000,
    currentAmount: 320500000,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    category: 'Mosque',
    daysLeft: 45
  },
  {
    id: '2',
    title: 'Sumur Wakaf untuk Pelosok NTT',
    description: 'Banyak warga di pelosok NTT kesulitan mendapatkan air bersih. Mari berwakaf untuk pembangunan sumur air bersih yang mengalirkan manfaat tiada henti.',
    targetAmount: 150000000,
    currentAmount: 85000000,
    imageUrl: 'https://images.unsplash.com/photo-1541888043681-70bf815e616c?auto=format&fit=crop&w=800&q=80',
    category: 'Water',
    daysLeft: 12
  },
  {
    id: '3',
    title: 'Pusat Pendidikan Anak Yatim',
    description: 'Wakaf pembebasan lahan dan pembangunan fasilitas pendidikan untuk anak-anak yatim agar mereka mendapatkan akses pendidikan yang layak dan berkualitas.',
    targetAmount: 1200000000,
    currentAmount: 150000000,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    daysLeft: 90
  },
  {
    id: '4',
    title: 'Klinik Kesehatan Gratis Dhuafa',
    description: 'Wakaf alat kesehatan dan renovasi klinik gratis untuk melayani kaum dhuafa yang tidak mampu membayar biaya pengobatan.',
    targetAmount: 300000000,
    currentAmount: 290000000,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    category: 'Health',
    daysLeft: 5
  }
];
