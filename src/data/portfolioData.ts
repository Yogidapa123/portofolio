export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: 'web' | 'mobile' | 'uiux' | 'graphic' | 'admin'
  categoryLabel: string
  description: string
  longDescription: string
  features: string[]
  tools: string[]
  stats?: { label: string; value: string }[]
  date: string
  mockupType: 'laptop' | 'mobile' | 'dual-mobile' | 'instagram' | 'apparel' | 'dashboard'
  imageUrl?: string // Jalur gambar proyek (contoh: '/projects/proyek-1.png' di folder public)
  previewUrl?: string // Link tujuan saat proyek diklik (contoh: website, Figma, atau GitHub)
  githubUrl?: string
  accentColor: string
}

export const PERSONAL_INFO = {
  name: 'Yogi Pratama Nusantara',
  nickname: 'Yogi',
  titles: ['Web Developer', 'UI/UX Designer', 'Graphic Designer', 'Administrasi'],
  roleSubtitle: 'Fresh Graduate S1 Teknik Informatika Universitas Muhammadiyah Malang',
  gpa: '3.79 / 4.00 (Cum Laude)',
  email: 'yogipnusantara@gmail.com',
  emailAlt: 'yogidapa@gmail.com',
  phone: '+6283105247681',
  phoneFormatted: '+62 831-0524-7681',
  location: 'Malang, Jawa Timur, Indonesia (65323)',
  linkedin: 'https://www.linkedin.com/in/yogipratamanusantara',
  instagram: 'https://instagram.com/yyogi_',
  instagramHandle: '@yyogi_',
  cvPdf: '/CV_Yogi_Pratama_Nusantara.pdf',
  portfolioPdf: '/Portofolio_Yogi_Pratama_Nusantara.pdf',
  photoUrl: '/yogi-photo.jpg',
  photoDarkUrl: '/yogi-photo.jpg',
  photoLightUrl: '/yogi-suit.jpg',
  aboutBio: `Fresh graduate Program Studi Informatika dari Universitas Muhammadiyah Malang dengan keahlian komprehensif di bidang Web Development, UI/UX Design, Graphic Design, dan Administrasi Digital.

Berpengalaman merancang serta membangun aplikasi web full-stack (Laravel, PHP, MySQL) untuk instansi pemerintah seperti Diskominfo Kab. Malang, mendesain antarmuka pengguna untuk program digitalisasi pemantauan kesehatan posyandu, serta mengelola administrasi akademik dan perkantoran dengan tingkat akurasi tinggi.

Aktif memimpin organisasi mahasiswa berskala besar (Ketua HMIF UMM), menjalin kemitraan strategis dengan 20+ sponsor korporasi, serta mengoptimalkan efisiensi operasional dan komunikasi internal. Siap memberikan kontribusi optimal dalam peran teknis maupun operasional modern.`,
}

export const STATS = [
  { value: '3.79', suffix: '/4.0', label: 'IPK Cum Laude' },
  { value: '22', suffix: '+', label: 'Sertifikasi Resmi' },
  { value: '15', suffix: '+', label: 'Program Kerja Sukses' },
  { value: '20', suffix: '+', label: 'Mitra & Sponsor Korporasi' },
  { value: '100', suffix: '+', label: 'Berkas Kemahasiswaan' },
  { value: '15', suffix: '+', label: 'Desain Feed Instagram BUMN' },
]

export const EDUCATION = [
  {
    institution: 'Universitas Muhammadiyah Malang',
    degree: 'S1 Teknik Informatika',
    period: '2022 - 2026',
    gpa: '3.79 / 4.00',
    description:
      'Lulus dengan predikat sangat memuaskan (Cum Laude). Aktif dalam kepengurusan himpunan dan berbagai riset pengembangan perangkat lunak terapan.',
    courses: [
      'Pemrograman Orientasi Objek (OOP)',
      'Pemrograman Web',
      'Pemrograman Dasar',
      'Pemrograman Mobile',
      'Rekayasa Kebutuhan',
      'Interaksi Manusia dan Komputer (IMK)',
      'Basis Data & MySQL',
    ],
  },
]

export interface ExperienceItem {
  role: string
  company: string
  period: string
  type: string
  imageUrl?: string
  imageCaption?: string
  highlights: string[]
  tech: string[]
}

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Web Developer (Internship)',
    company: 'DISKOMINFO Kab. Malang',
    period: 'Januari - Maret 2025',
    type: 'Magang',
    imageUrl: '/experience/diskominfo-malang.jpg',
    imageCaption: 'Tim Mahasiswa Magang Web Developer di Dinas Kominfo Kab. Malang',
    highlights: [
      'Merancang wireframe dan prototipe interaktif UI/UX menggunakan Figma untuk sistem peminjaman ruang rapat berbasis web, diselesaikan dalam 2 minggu dan mendapat approval langsung dari stakeholder.',
      'Membangun website full-stack sistem peminjaman ruang rapat dari desain Figma hingga implementasi production menggunakan framework Laravel (PHP) dan basis data MySQL dalam 1 bulan.',
      'Mengembangkan fitur utama: jadwal ketersediaan real-time, form pengajuan booking, manajemen data 5 divisi, serta integrasi notifikasi WhatsApp sehingga setiap divisi dapat mengecek jadwal tanpa wajib login ke website.',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Figma', 'WhatsApp Gateway', 'Bootstrap / Tailwind'],
  },
  {
    role: 'Graphic Designer (Internship)',
    company: 'RUMAH BUMN KOTA MALANG',
    period: 'April - Juni 2025',
    type: 'Magang',
    imageUrl: '/experience/rumah-bumn.jpg',
    imageCaption: 'Presentasi Hasil Proyek & Tim Magang Graphic Design di Rumah BUMN Kota Malang',
    highlights: [
      'Merancang 15+ konten visual kreatif feed & story menggunakan Canva untuk akun Instagram resmi Rumah BUMN Kota Malang dan Rumah BUMN Jatim.',
      'Membuat pamflet informasi, pengumuman pelatihan UMKM, serta poster hari besar nasional dengan penerapan konsisten layout, tipografi, dan color theory.',
      'Berkolaborasi erat bersama tim media sosial dalam menyelaraskan visual dengan content calendar dan strategi digital marketing, meningkatkan engagement audiens.',
      'Melakukan data entry dan migrasi data profil 100+ UMKM mitra dari Excel ke dalam sistem aplikasi "Naksir UMKM BRI" secara presisi.',
    ],
    tech: ['Canva', 'Social Media Design', 'Data Entry', 'Branding Guide', 'Excel'],
  },
  {
    role: 'Staff Administrasi Tata Usaha Biro Kemahasiswaan',
    company: 'Universitas Muhammadiyah Malang',
    period: 'Maret - April 2026',
    type: 'Part-Time',
    imageUrl: '/experience/kemahasiswaan-umm.jpg',
    imageCaption: 'Pelayanan Akademik & Rapat Koordinasi Biro Kemahasiswaan UMM',
    highlights: [
      'Mengelola administrasi berkas akademik Tata Usaha Kemahasiswaan — mencakup berkas Warek III, Ketua Kemahasiswaan, surat aktif kuliah, dan dokumen acara kemahasiswaan menangani 100+ berkas dengan tingkat akurasi tinggi.',
      'Mengoperasikan Microsoft Office (Word, Excel, PowerPoint) dan Google Workspace (Docs, Sheets, Drive) untuk digitalisasi arsip data kemahasiswaan.',
      'Merancang desain jaket kontingen resmi UKM Karate UMM menggunakan Figma untuk 30 atlet pada Kejuaraan UMM Championship tingkat nasional.',
    ],
    tech: ['Microsoft Office', 'Google Workspace', 'Figma', 'Arsip Digital'],
  },
  {
    role: 'Staff Administrasi Tata Usaha Teknik Industri',
    company: 'Universitas Muhammadiyah Malang',
    period: 'Oktober 2025 - Maret 2026',
    type: 'Part-Time',
    imageUrl: '/experience/teknik-industri-umm.jpg',
    imageCaption: 'Staf & Pembina Tata Usaha Program Studi Teknik Industri FT-UMM',
    highlights: [
      'Mengelola administrasi berkas akademik Tata Usaha Teknik Industri meliputi transkrip nilai, berkas yudisium, seminar proposal, sidang tugas akhir, cek plagiasi, dan magang (50+ berkas per bulan).',
      'Memindahkan sistem pencatatan berkas dari pencatatan manual fisik ke Google Sheets tersinkronisasi, mempermudah monitoring status berkas oleh Ketua Jurusan.',
      'Merancang konten feeds Instagram dan visual promosi kegiatan workshop program studi Teknik Industri menggunakan Canva.',
    ],
    tech: ['Google Sheets Cloud', 'Excel', 'Canva', 'Administrasi Akademik'],
  },
]

export interface OrganizationItem {
  role: string
  organization: string
  period: string
  imageUrl?: string
  imageCaption?: string
  highlights: string[]
}

export const ORGANIZATIONS: OrganizationItem[] = [
  {
    role: 'Ketua Himpunan',
    organization: 'Himpunan Mahasiswa Informatika (HMIF) UMM',
    period: 'Agustus 2024 - Juni 2025',
    imageUrl: '/organizations/ketua-himpunan.jpg',
    imageCaption: 'Fungsionaris HMIF FT-UMM Cyber Army Periode 2024-2025',
    highlights: [
      'Memimpin dan bertanggung jawab penuh atas arah gerak internal & eksternal organisasi dengan 40 fungsionaris aktif yang terbagi ke dalam 7 divisi (BPH, PSDM, PENMAS, Non-Akademik, Akademik, Ekraf, Kominfo).',
      'Mengoordinasikan dan mengeksekusi 15+ program kerja berskala jurusan hingga nasional dalam satu periode kepengurusan.',
      'Membangun dan merawat kemitraan strategis dengan 20+ sponsor serta 2 mitra perusahaan korporasi tetap (PT Pelabuhan Indonesia Regional 3 & BitPreneur Technology).',
      'Mencapai efisiensi anggaran belanja organisasi hingga 15% per program kerja tanpa mengurangi standar mutu kegiatan.',
      'Meningkatkan partisipasi aktif fungsionaris dari 50% menjadi 83% lewat pendekatan komunikasi personal dan sistem evaluasi berkala.',
    ],
  },
  {
    role: 'Wakil Ketua Himpunan',
    organization: 'Himpunan Mahasiswa Informatika (HMIF) UMM',
    period: 'Agustus 2023 - Juni 2024',
    imageUrl: '/organizations/wakil-ketua-himpunan.jpg',
    imageCaption: 'Badan Pengurus Harian HMIF FT-UMM Periode 2023-2024',
    highlights: [
      'Mendampingi Ketua Himpunan dalam mengoordinasikan 50 fungsionaris, berfokus pada penguatan komunikasi internal dan resolusi kendala struktural.',
      'Memimpin forum evaluasi bulanan lintas bidang selama 6 bulan berturut-turut dan menghasilkan 5 rekomendasi perbaikan per divisi.',
      'Mendorong kenaikan kualitas komunikasi dan koordinasi internal dari 60% menjadi 91%.',
      'Memantau jalannya 20+ program kerja dengan penekanan pada efisiensi proses dan ketepatan timeline.',
    ],
  },
  {
    role: 'Anggota Bidang Organisasi',
    organization: 'Permikomnas Wilayah IX (Jawa Timur)',
    period: 'September 2023 - Maret 2024',
    imageUrl: '/organizations/anggota-permikomnas.jpg',
    imageCaption: 'Permikomnas Wilayah IX Jawa Timur (Gedung F KH Ali Maksum)',
    highlights: [
      'Melakukan kajian serta verifikasi kesesuaian AD/ART dan Term of Reference (ToR) seluruh kegiatan himpunan mahasiswa informatika se-wilayah.',
      'Merencanakan dan mengoordinasikan agenda roadshow kunjungan ke 30+ kampus jurusan Informatika se-Jawa Timur.',
      'Merancang 8 draf usulan program kerja strategis bidang organisasi.',
    ],
  },
  {
    role: 'Anggota Bidang PSDM',
    organization: 'Ikatan Mahasiswa Kota Batu (IMABA)',
    period: 'November 2024 - Juni 2025',
    imageUrl: '/organizations/anggota-psdm-imaba.jpg',
    imageCaption: 'Musyawarah Besar Ikatan Mahasiswa Kota Batu (IMABA) 2024/2025',
    highlights: [
      'Merancang program kerja berbasis riset minat dan kebutuhan masyarakat Kota Batu pada sektor pendidikan daerah.',
      'Merumuskan program beasiswa pendidikan bagi pelajar dan mahasiswa Kota Batu mencakup panduan seleksi, strategi lolos, dan mentoring alumni penerima beasiswa.',
    ],
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'web-ruang-rapat',
    title: 'Sistem Peminjaman Ruang Rapat Web',
    subtitle: 'Dinas Komunikasi & Informatika Kab. Malang',
    category: 'web',
    categoryLabel: 'Web Development',
    date: 'Februari 2025',
    accentColor: '#2c67ed',
    mockupType: 'laptop',
    // GANTI LINK DI SINI:
    previewUrl: 'https://github.com/Yogidapa123/PKPL.git',
    // GANTI GAMBAR DI SINI (simpan file di folder public/):
    imageUrl: '/projects/Diskominfo.png', 
    githubUrl: '',
    description:
      'Aplikasi web full-stack untuk pengelolaan reservasi ruang rapat 5 divisi Diskominfo dengan notifikasi otomatis & integrasi jadwal WhatsApp.',
    longDescription:
      'Website ini dikembangkan untuk memecahkan masalah bentrok jadwal reservasi ruang rapat antar 5 divisi di Dinas Kominfo Kab. Malang. Setiap divisi memiliki hak akses login khusus. Dilengkapi sinkronisasi status ketersediaan dan notifikasi WhatsApp gateway, memungkinkan staf mengecek ketersediaan ruangan maupun mengajukan permohonan langsung lewat pesan WhatsApp tanpa wajib login manual.',
    features: [
      'Sistem Multi-Account untuk 5 divisi internal Diskominfo',
      'Real-time Room Availability & Conflict Detection',
      'Integrasi WhatsApp API untuk notifikasi status & verifikasi instan',
      'Dashboard Admin untuk approval dan monitoring riwayat peminjaman',
      'Arsitektur MVC Laravel yang terstruktur dan aman dengan basis data MySQL',
    ],
    tools: ['Laravel (PHP)', 'MySQL', 'Figma', 'WhatsApp Gateway API', 'Bootstrap / CSS', 'Git'],
    stats: [
      { label: 'Divisi Terhubung', value: '5 Divisi' },
      { label: 'Waktu Perancangan UI', value: '2 Minggu' },
      { label: 'Waktu Implementasi', value: '1 Bulan' },
      { label: 'Efisiensi Booking', value: '100% Digital' },
    ],
  },
  {
    id: 'aplikasi-snack',
    title: 'Aplikasi Penjualan Snack Mobile',
    subtitle: 'Aplikasi POS & Katalog Mobile Toko Snack',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    date: '2024 - 2025',
    accentColor: '#3b82f6',
    mockupType: 'mobile',
    // GANTI LINK DI SINI:
    previewUrl: 'https://github.com/Yogidapa123/E-commerce-Snack.git',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/snack.png',
    githubUrl: '',
    description:
      'Aplikasi mobile Flutter untuk digitalisasi pemesanan snack, katalog harga stok real-time, keranjang belanja dan pembukuan transaksi otomatis.',
    longDescription:
      'Aplikasi mobile yang dirancang dari nol untuk mengatasi permasalahan pencatatan manual pemilik toko snack dan keluhan pembeli yang sering menanyakan ketersediaan produk. Menghadirkan katalog dinamis berfoto, keranjang pintar, kalkulasi diskon otomatis, dan rekap mutasi transaksi yang terhubung dengan backend MySQL.',
    features: [
      'Katalog produk interaktif dengan filter kategori snack & minuman',
      'Keranjang belanja (cart) dengan kalkulasi harga & potongan diskon',
      'Riwayat transaksi pembelian dan invoice digital',
      'Manajemen stok bagi pengelola toko snack',
      'UI responsif dibangun dengan framework Flutter lintas perangkat Android',
    ],
    tools: ['Flutter', 'Dart', 'Android Studio', 'MySQL', 'Figma', 'REST API'],
    stats: [
      { label: 'Platform', value: 'Android' },
      { label: 'Framework', value: 'Flutter' },
      { label: 'Arsitektur', value: 'State Management' },
    ],
  },
  {
    id: 'posyandu-anak',
    title: 'Prototype Aplikasi Pemantauan Anak (E-Posyandu Mawar)',
    subtitle: 'UI/UX Design & Prototyping Kesehatan Anak',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    date: '2024',
    accentColor: '#6366f1',
    mockupType: 'dual-mobile',
    // GANTI LINK DI SINI (misal link Figma prototype):
    previewUrl: 'https://www.figma.com/design/o0zB6bVVvkz0d4vwiE7D66/Project-Yogi?node-id=2012-2&t=fgTAWsVxiiG9zPzb-1',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/posyandu.png',
    description:
      'Prototipe desain antarmuka aplikasi pemantauan pertumbuhan balita dan pencegahan stunting untuk kader Posyandu Mawar.',
    longDescription:
      'Rancangan antarmuka komprehensif yang dirancang untuk mempermudah kader Posyandu mencatat berat badan, tinggi badan, status gizi anak, dan memetakan risiko stunting dalam grafik KMS digital. Dilengkapi artikel edukasi gizi bagi orang tua dan sistem rekapitulasi data bulanan posyandu.',
    features: [
      'Dashboard data anak dengan visualisasi status risiko stunting',
      'Grafik pertumbuhan balita berbasis standar WHO & Kemenkes',
      'Pusat artikel edukasi penanganan dan nutrisi anak',
      'Form pencatatan berkala yang simpel untuk kader lapangan',
      'High-fidelity interactive prototype diuji kepada user target',
    ],
    tools: ['Figma', 'UI/UX Design', 'Design System', 'User Flow', 'Wireframing'],
    stats: [
      { label: 'User Persona', value: 'Kader & Ibu Balita' },
      { label: 'Figma Screens', value: '25+ Screens' },
      { label: 'Tingkat Kepuasan', value: 'High Usability' },
    ],
  },
  {
    id: 'rumah-bumn-malang',
    title: 'Desain Konten Visual & Branding Rumah BUMN',
    subtitle: 'Instagram Feeds & Story Rumah BUMN Malang & Jatim',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    date: 'April - Juni 2025',
    accentColor: '#2c67ed',
    mockupType: 'instagram',
    // GANTI LINK DI SINI (misal akun Instagram atau link Canva):
    previewUrl: 'https://drive.google.com/drive/folders/1C-SsgOK86C895ij2n4i9rIbfUiYLb4fX?usp=sharing',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/rumahbumn.jpeg',
    description:
      'Koleksi 15+ desain feeds & stories Instagram untuk program pelatihan, event nasional, dan promosi UMKM binaan Rumah BUMN.',
    longDescription:
      'Perancangan materi promosi visual digital menggunakan Canva dengan konsistensi guideline warna korporasi biru BUMN, tipografi bersih, dan layout modern. Konten meliputi materi webinar AI untuk UMKM, program konsultasi legalitas usaha, poster hari besar keagamaan, serta pengumuman open recruitment magang.',
    features: [
      '15+ Desain Carousel & Single Feed Instagram',
      'Template pengumuman pelatihan & sertifikasi halal UMKM',
      'Poster peringatan hari nasional & keagamaan',
      'Peningkatan konsistensi visual feed resmi Rumah BUMN Malang & Jatim',
      'Dukungan content calendar dan strategi social media marketing',
    ],
    tools: ['Canva', 'Adobe Suite', 'Visual Identity', 'Typography', 'Color Theory'],
    stats: [
      { label: 'Desain Dipublikasi', value: '15+ Visual' },
      { label: 'Akun Terkelola', value: 'Malang & Jatim' },
      { label: 'Kategori Konten', value: 'Edukasi & Event' },
    ],
  },
  {
    id: 'jaket-karate-umm',
    title: 'Desain Jaket Kontingen Atlet Karate UMM',
    subtitle: 'National Championship Apparel Design',
    category: 'graphic',
    categoryLabel: 'Graphic Design & Apparel',
    date: '2025 - 2026',
    accentColor: '#ef4444',
    mockupType: 'apparel',
    // GANTI LINK DI SINI:
    previewUrl: 'https://drive.google.com/drive/folders/1owAErIVahlCCckC64MFv64G7GyKwYW6W?usp=sharing',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/jaket.jpg',
    description:
      'Desain busana olahraga jaket kontingen resmi 30 atlet UKM Karate UMM untuk ajang kejuaraan nasional.',
    longDescription:
      'Merancang jaket olahraga kontingen berkerah tinggi dengan perpaduan gradasi warna merah, putih, dan aksen garis kuning dinamis. Dilengkapi bordir lambang UMM, emblem tim kejuaraan, dan bendera merah putih yang mencerminkan sportivitas, keberanian, dan identitas juara tingkat nasional.',
    features: [
      'Konsep visual apparel dinamis dengan palet merah-putih-kuning',
      '3 varian warna referensi (Merah, Biru Dongker, Hitam Elegan)',
      'Penempatan proporsional logo UMM dan badge kejuaraan',
      'Digunakan oleh 30 kontingen atlet karate UMM yang memborong medali',
    ],
    tools: ['Figma', 'Vector Illustration', 'Apparel Mockup', 'Merchandise Design'],
    stats: [
      { label: 'Jumlah Kontingen', value: '30 Atlet' },
      { label: 'Skala Ajang', value: 'Tingkat Nasional' },
      { label: 'Varian Referensi', value: '3 Warna' },
    ],
  },
  {
    id: 'SMART TIME',
    title: 'Prototype Sistem Penjadwalan Tugas',
    subtitle: 'Project Mata Kuliah',
    category: 'uiux',
    categoryLabel: 'UI/UX Design & Prototyping',
    date: '2025',
    accentColor: '#10b981',
    mockupType: 'dual-mobile',
    // GANTI LINK DI SINI:
    previewUrl: 'https://www.figma.com/design/o0zB6bVVvkz0d4vwiE7D66/Project-Yogi?node-id=2085-1581&t=fgTAWsVxiiG9zPzb-1',
    
    githubUrl: 'https://github.com/Yogidapa123/SmarttimeNew.git',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/smarttime.png',
    description:
      'Penjadwalan Mahasiswa untuk mengatur dalam penugasan dari pencatatan waktu sampai tugas itu selesai agar mahasiswa dapat mengumpulkan tugas dengan tepat waktu.',
    longDescription:
      'Inovasi alur sistem penjadwalan mahasiswa, pengingat waktu pengumpulan tugas dll.',
    features: [
      'Sistem Pengingat secara otomatis untuk pengumpulan tugas',
      'Penambahan fitur untuk mengatur jadwal tugas yang akan datang',
      'Progess pengerjaan tugas dapat dilihat secara real-time',
      'Penanganan tugas yang sudah selesai dapat diarsipkan untuk referensi kedepannya',
    ],
    tools: ['Figma', 'UI/UX Design', 'Design System', 'User Flow', 'Wireframing'],
    stats: [
      { label: 'user persona', value: 'Mahasiswa' },
      { label: 'Figma Screens', value: '20+ Screens' },
    ],
  },
  {
    id: 'Web Perumahan Myskill',
    title: 'Prototype Bottcamp Perumahan Myskill',
    subtitle: 'Project Bootcamp',
    category: 'uiux',
    categoryLabel: 'UI/UX Design & Prototyping',
    date: '2024',
    accentColor: '#10b981',
    mockupType: 'dual-mobile',
    // GANTI LINK DI SINI:
    previewUrl: 'https://www.figma.com/design/o0zB6bVVvkz0d4vwiE7D66/Project-Yogi?node-id=2320-377&t=Q3j2mgevGIBB8Wal-1',
    // GANTI GAMBAR DI SINI:
    imageUrl: '/projects/Homepage.png',
    description:
      'E-commerce Perumahan Myskill untuk mempermudah calon pembeli dalam melihat daftar perumahan yang tersedia, melihat detail perumahan, dan melakukan pemesanan secara online.',
    longDescription:
      'Perancangan alur sistem e-commerce perumahan Myskill, mempermudah calon pembeli dalam melihat daftar perumahan yang tersedia, melihat detail perumahan, dan melakukan pemesanan secara online.',
    features: [
      'Sistem Pencarian Perumahan dengan filter harga, lokasi, dan tipe rumah',
      'Tampilan detail perumahan dengan galeri foto, spesifikasi, dan fasilitas',
    ],
    tools: ['Figma', 'UI/UX Design', 'Design System', 'User Flow', 'Wireframing'],
    stats: [
      { label: 'user persona', value: 'Mahasiswa' },
      { label: 'Figma Screens', value: '3 Screens' },
    ],
  },
]


export const SKILL_CATEGORIES = [
  {
    title: 'Software & Web Development',
    skills: [
      { name: 'Laravel (PHP)', level: 'Advanced', icon: 'Code2' },
      { name: 'MySQL & Database Design', level: 'Advanced', icon: 'Database' },
      { name: 'HTML5 & Modern CSS3', level: 'Expert', icon: 'Layout' },
      { name: 'JavaScript & React', level: 'Intermediate', icon: 'Atom' },
      { name: 'Flutter & Dart', level: 'Intermediate', icon: 'Smartphone' },
      { name: 'Git & Version Control', level: 'Proficient', icon: 'GitBranch' },
    ],
  },
  {
    title: 'UI/UX & Creative Graphic Design',
    skills: [
      { name: 'Figma (UI/UX Prototyping)', level: 'Expert', icon: 'Figma' },
      { name: 'Canva Design & Branding', level: 'Expert', icon: 'Palette' },
      { name: 'Wireframing & User Flow', level: 'Advanced', icon: 'Layers' },
      { name: 'Typography & Color Theory', level: 'Advanced', icon: 'Sparkles' },
      { name: 'Social Media Visuals', level: 'Expert', icon: 'Share2' },
    ],
  },
  {
    title: 'Administrasi & Office Tools',
    skills: [
      { name: 'Google Sheets & Cloud Drive', level: 'Expert', icon: 'Sheet' },
      { name: 'Microsoft Office (Word, Excel, PPT)', level: 'Expert', icon: 'FileSpreadsheet' },
      { name: 'Pengarsipan Digital & Notulensi', level: 'Expert', icon: 'FolderArchive' },
      { name: 'Verifikasi & Data Entry Presisi', level: 'Advanced', icon: 'CheckCircle2' },
    ],
  },
  {
    title: 'Core Leadership & Soft Skills',
    skills: [
      { name: 'Public Speaking & Moderasi', level: 'Advanced', icon: 'Mic' },
      { name: 'Kepemimpinan Organisasi', level: 'Experienced (Ketua HMIF)', icon: 'Award' },
      { name: 'Komunikasi Strategis & Negosiasi', level: 'Advanced (20+ Sponsor)', icon: 'Users' },
      { name: 'Problem Solving & Analisis', level: 'Advanced', icon: 'Cpu' },
    ],
  },
]
