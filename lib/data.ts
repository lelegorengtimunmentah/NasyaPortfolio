export interface BiodataField {
  label: string
  value: string
  icon: string // Lucide icon name, resolved dynamically in BiodataSection
}

export interface Achievement {
  title: string
  eventName: string
  level: string
  organizer: string
  date: string
  imageFilename: string // filename only, e.g. "prestasi1.webp"
  team?: string[]       // optional; omit or empty array for individual achievement
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
  gallery: string[]       // array of image filenames in /public/prestasi/
  motivationalQuote: string
  footer: FooterData
}

export const siteData: SiteData = {
  hero: {
    name: 'Muhammad Choirun Nasya',
    title: 'Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang',
    description:
      'Saya adalah mahasiswa Psikologi yang memiliki semangat tinggi dalam mengeksplorasi ilmu pengetahuan, kesehatan mental, dan pengembangan diri. Melalui pendidikan dan pengalaman akademik, saya terus berupaya memahami perilaku manusia secara mendalam. Tujuan saya adalah memberikan kontribusi nyata bagi masyarakat melalui ilmu psikologi yang saya pelajari.',
  },

  about: {
    biography:
      'Saya, Muhammad Choirun Nasya, adalah mahasiswa Fakultas Psikologi di Universitas Islam Negeri Maulana Malik Ibrahim Malang. Sejak kecil, saya tertarik pada bagaimana pikiran dan emosi manusia bekerja, yang mendorong saya untuk memilih psikologi sebagai bidang studi utama. Selama masa perkuliahan, saya aktif terlibat dalam berbagai kegiatan akademik dan kompetisi ilmiah yang memperluas wawasan serta keterampilan saya. Saya memiliki ketertarikan khusus pada bidang psikologi klinis, kesehatan mental, dan psikologi pendidikan. Di luar akademik, saya gemar membaca literatur psikologi, mengikuti seminar, dan berdiskusi tentang isu-isu kesehatan mental terkini. Saya percaya bahwa pemahaman mendalam tentang psikologi dapat membawa perubahan positif, baik bagi individu maupun masyarakat luas. Ke depannya, saya bercita-cita untuk terus mengembangkan diri dan berkontribusi pada dunia psikologi melalui penelitian maupun praktik profesional.',
  },

  biodata: [
    { label: 'Nama', value: 'Muhammad Choirun Nasya', icon: 'User' },
    { label: 'Universitas', value: 'UIN Maulana Malik Ibrahim Malang', icon: 'GraduationCap' },
    { label: 'Fakultas', value: 'Psikologi', icon: 'BookOpen' },
    { label: 'Program Studi', value: 'Psikologi', icon: 'Brain' },
    { label: 'Alamat', value: 'Malang, Jawa Timur', icon: 'MapPin' },
    { label: 'Umur', value: '21 Tahun', icon: 'Calendar' },
  ],

  achievements: [
    {
      title: 'Juara 1 Lomba Karya Tulis Ilmiah',
      eventName: 'Olimpiade Sains Airlangga 2023',
      level: 'Nasional',
      organizer: 'Universitas Airlangga',
      date: 'Oktober 2023',
      imageFilename: 'prestasiolimpiadesainsairlangga.webp',
      team: ['Muhammad Choirun Nasya', 'Siti Rahmawati', 'Ahmad Fauzi'],
    },
    {
      title: 'Wisudawan Terbaik Fakultas Psikologi',
      eventName: 'Wisuda dan Penghargaan Akademik 2024',
      level: 'Institusi',
      organizer: 'UIN Maulana Malik Ibrahim Malang',
      date: 'Maret 2024',
      imageFilename: 'wisudadanpenghargaan.webp',
    },
    {
      title: 'Peserta Terbaik Pelatihan Konseling',
      eventName: 'Workshop Konseling Berbasis Islami',
      level: 'Regional',
      organizer: 'Asosiasi Psikologi Jawa Timur',
      date: 'Juli 2023',
      imageFilename: 'prestasi1.webp',
    },
    {
      title: 'Juara 2 Debat Psikologi',
      eventName: 'Pekan Ilmiah Mahasiswa Psikologi 2022',
      level: 'Nasional',
      organizer: 'Himpunan Mahasiswa Psikologi Indonesia',
      date: 'November 2022',
      imageFilename: 'prestasiolimpiadesainsairlangga.webp',
      team: ['Muhammad Choirun Nasya', 'Laila Nur Azizah'],
    },
    {
      title: 'Finalis Kompetisi Riset Psikologi',
      eventName: 'Psychology Research Competition 2023',
      level: 'Nasional',
      organizer: 'Universitas Gadjah Mada',
      date: 'Agustus 2023',
      imageFilename: 'wisudadanpenghargaan.webp',
    },
    {
      title: 'Penghargaan Mahasiswa Berprestasi',
      eventName: 'Penganugerahan Mahasiswa Berprestasi UIN Malang 2023',
      level: 'Institusi',
      organizer: 'UIN Maulana Malik Ibrahim Malang',
      date: 'Desember 2023',
      imageFilename: 'prestasi1.webp',
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
    role: 'Mahasiswa',
    institution: 'UIN Maulana Malik Ibrahim Malang',
    copyrightYear: 2025,
  },
}
