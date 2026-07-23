export interface BiodataField {
  label: string
  value: string
  icon: string
}

export interface Achievement {
  title: string
  eventName: string
  level: string
  organizer: string
  date: string
  imageFilename: string
  team?: string[]
}

export interface RiwayatPrestasi {
  medal: string       // e.g. "Medali Emas", "Juara 1", "Peringkat 3"
  subject: string     // e.g. "Olimpiade Bahasa Indonesia"
  event: string       // event/competition name
  level: string
  organizer: string
  date: string
  team?: string[]
}

export interface RiwayatPendidikan {
  institution: string
  level: string       // e.g. "SMP", "SMA", "Perguruan Tinggi"
  major?: string
  year: string        // e.g. "2019 – 2022"
  logo: string        // filename in /public/school/
}

export interface Organisasi {
  name: string
  role: string
  period: string
  logo: string        // filename in /public/organisasi/
  description?: string
}

export interface HeroData {
  name: string
  title: string
  description: string
}

export interface AboutData {
  biography: string
}

export interface FooterData {
  name: string
  role: string
  institution: string
  copyrightYear: number
}

export interface SiteData {
  hero: HeroData
  about: AboutData
  biodata: BiodataField[]
  achievements: Achievement[]
  riwayatPrestasi: RiwayatPrestasi[]
  riwayatPendidikan: RiwayatPendidikan[]
  organisasi: Organisasi[]
  gallery: string[]
  motivationalQuote: string
  footer: FooterData
}

export const siteData: SiteData = {
  hero: {
    name: 'Muhammad Choirun Nasya',
    title: 'Bachelor of Psychology',
    description:
      'Pemuda berprestasi dari Jember dengan semangat tinggi dalam ilmu pengetahuan, bahasa, dan pengembangan diri. Aktif di berbagai olimpiade sains nasional dan organisasi.',
  },

  about: {
    biography:
      'Saya, Muhammad Choirun Nasya, adalah siswa SMA Nurul Islam (Nuris) Jember yang memiliki rekam jejak prestasi gemilang di tingkat nasional. Sejak kecil, saya memiliki ketertarikan mendalam pada ilmu pengetahuan dan bahasa, yang mendorong saya untuk aktif mengikuti berbagai kompetisi akademik. Selama bersekolah, saya berhasil meraih sejumlah medali emas, perak, dan perunggu dalam olimpiade sains nasional di bidang Bahasa Indonesia, Bahasa Arab, dan Bahasa Inggris. Saya juga aktif dalam kegiatan organisasi, khususnya di bidang bahasa dan teknologi informasi. Di luar akademik, saya gemar membaca, berdiskusi tentang isu-isu pendidikan, dan mengeksplorasi dunia digital. Ke depannya, saya bercita-cita melanjutkan studi di bidang Psikologi untuk memahami perilaku manusia secara lebih mendalam dan memberikan kontribusi positif bagi masyarakat.',
  },

  biodata: [
    { label: 'Nama', value: 'Muhammad Choirun Nasya', icon: 'User' },
    { label: 'Universitas', value: 'UIN Malik Ibrahim Malang', icon: 'GraduationCap' },
    { label: 'Prodi', value: 'Ilmu Psikologi', icon: 'BookOpen' },
    { label: 'Fakultas', value: 'Psikologi', icon: 'Brain' },
    { label: 'Alamat', value: 'Jember, Jawa Timur', icon: 'MapPin' },
    { label: 'Umur', value: '18 Tahun', icon: 'Calendar' },
  ],

  achievements: [
    {
      title: 'Siswa SMA Nuris Jember Sabet Medali Perunggu di Universitas Airlangga, Jejak Prestasi Nasional yang Membanggakan',
      eventName: 'Olimpiade Sains Airlangga 2025',
      level: 'Nasional',
      organizer: 'Universitas Airlangga',
      date: '14 Desember 2025',
      imageFilename: 'prestasiolimpiadesainsairlangga.webp',
    },
    {
      title: 'Enam Tahun Istiqomah Mengaji, M. Choirun Nasya Siswa SMA Nuris Jember Sukses Khatamkan 16 Kitab dalam Wisuda ke-X',
      eventName: 'Wisuda Kitab dan Tahfidz',
      level: 'Sekolah',
      organizer: 'Pondok Pesantren Nuris Jember',
      date: '18 April 2026',
      imageFilename: 'wisudadanpenghargaan.webp',
    },
  ],

  riwayatPrestasi: [
    {
      medal: 'Medali Emas',
      subject: 'Olimpiade Bahasa Indonesia',
      event: 'Olimpiade Sains Pemuda Indonesia',
      level: 'Nasional',
      organizer: 'Pusat Kejuaraan Sains Nasional',
      date: '02 November 2023',
    },
    {
      medal: 'Juara 1',
      subject: 'Lomba Video TikTok',
      event: 'Semarak Bulan Pancasila 2024',
      level: 'Nasional',
      organizer: 'Universitas Jember',
      date: '05 Juli 2024',
      team: ['Jakfar Muhammad Aqilla', 'Adam Maulana', 'Ridloi Rahmadani', 'Ahmad Afwan', 'Muh Auni Sahansyah', 'M. Choirun Nasya'],
    },
    {
      medal: 'Medali Perak',
      subject: 'Olimpiade Bahasa Arab',
      event: 'Olimpiade Sains Pelajar Nasional',
      level: 'Nasional',
      organizer: 'Lembaga NOSAC',
      date: '25 Agustus 2024',
    },
    {
      medal: 'Medali Emas',
      subject: 'Olimpiade Bahasa Indonesia',
      event: 'KSN HP 2024',
      level: 'Nasional',
      organizer: 'Pusat Kejuaraan Sains Nasional',
      date: '05 Juli 2024',
    },
    {
      medal: 'Medali Perunggu',
      subject: 'Olimpiade Bahasa Inggris',
      event: 'Olimpiade Pelajar Nasional',
      level: 'Nasional',
      organizer: 'Pusat Prestasi',
      date: '18 September 2024',
    },
    {
      medal: 'Peringkat 3',
      subject: 'Penilaian Akhir Semester Genap',
      event: 'Kelas XI IPS 1',
      level: 'Sekolah',
      organizer: 'SMA Nuris Jember',
      date: 'Tahun Ajaran 2024/2025',
    },
    {
      medal: 'Medali Perunggu',
      subject: 'Olimpiade Sosial Humaniora',
      event: 'Olimpiade Sains Airlangga 2025',
      level: 'Nasional',
      organizer: 'Universitas Airlangga',
      date: 'Mei 2025',
    },
  ],

  riwayatPendidikan: [
    {
      institution: 'SMP Nuris Jember',
      level: 'SMP',
      year: '2020 – 2023',
      logo: 'smpnurisjember.png',
    },
    {
      institution: 'SMA Nuris Jember',
      level: 'SMA',
      major: 'IPS',
      year: '2023 – 2026',
      logo: 'smanurisjember.png',
    },
    {
      institution: 'UIN Maulana Malik Ibrahim Malang',
      level: 'Perguruan Tinggi',
      major: 'Psikologi',
      year: '2026 – Sekarang',
      logo: 'uinmalikibrahim.png',
    },
  ],

  organisasi: [
    {
      name: 'GraParis (Gerakan Paskibra Nuris)',
      role: 'Purna',
      period: '2023 – 2025',
      logo: 'graparis.jpg',
      description: 'Organisasi Paskibra yang melatih kepemimpinan, kedisiplinan, dan kepedulian sosial.',
    },
    {
      name: 'M-Language Community',
      role: 'Mantan Ketua',
      period: '2024 – 2026',
      logo: 'mlanguage.png',
      description: 'Komunitas pengembangan kemampuan bahasa dan komunikasi untuk kompetisi akademik.',
    },
  ],

  gallery: [
    'prestasi1.webp',
    'prestasiolimpiadesainsairlangga.webp',
    'wisudadanpenghargaan.webp',
  ],

  motivationalQuote:
    'Ilmu adalah cahaya yang menerangi jalan menuju pemahaman diri dan empati kepada sesama — teruslah belajar, teruslah bertumbuh.',

  footer: {
    name: 'Muhammad Choirun Nasya',
    role: 'Siswa SMA Nuris Jember',
    institution: 'SMA Nurul Islam (Nuris) Jember',
    copyrightYear: 2025,
  },
}
