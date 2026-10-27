const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:/Users/ASUS/Downloads/pdf24_renderPdf (2)';
const targetDir = path.join(process.cwd(), 'public', 'certificates');

const certificateConfigs = [
  // 1. Google & Kominfo
  {
    folder: 'Sertifikat Pelatihan (1)',
    id: 'google-digital-entrepreneurship',
    title: 'Google Digital Entrepreneurship - Mahasiswa UMM',
    issuer: 'Google x Kominfo (Digitalent)',
    category: 'industry',
    categoryLabel: 'Industri & Profesional',
    date: '17 November 2022',
    credentialId: 'DEA/2022/4635/145463535101-91',
    description: 'Pelatihan Digital Entrepreneurship Academy Batch 2 kolaborasi Google, Kemkominfo RI, dan Universitas Muhammadiyah Malang.',
    skills: ['Entrepreneurship', 'Digital Marketing', 'Business Strategy'],
    hasPage2: true
  },
  // 2. Rumah BUMN
  {
    folder: 'Sertifikat Rumah BUMN Malang',
    id: 'rumah-bumn-graphic-design',
    title: 'Sertifikat Magang Graphic Design Rumah BUMN Malang',
    issuer: 'Rumah BUMN Kota Malang x BRI',
    category: 'internship',
    categoryLabel: 'Magang & Institusi',
    date: 'April - Juni 2025',
    credentialId: '0349129/RB-VIII/06/2025',
    grade: 'Memuaskan (A)',
    description: 'Program magang 3 bulan sebagai Graphic Designer mengelola visual branding, konten Instagram feeds, dan materi promosi UMKM binaan.',
    skills: ['Graphic Design', 'Visual Identity', 'Canva', 'Social Media Branding'],
    hasPage2: true
  },
  // 3. Magang PKN UMM
  {
    folder: 'Sertifikat Magang',
    id: 'magang-diskominfo-umm',
    title: 'Sertifikat Praktik Kerja Nyata (PKN) - Web Developer',
    issuer: 'Prodi Informatika FT-UMM x Diskominfo Kab. Malang',
    category: 'internship',
    categoryLabel: 'Magang & Institusi',
    date: '27 Februari 2025',
    credentialId: 'm740mdq5z0',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Penyelesaian magang perancangan dan pembangunan Sistem Informasi Peminjaman Ruang Rapat berbasis Web full-stack Laravel.',
    skills: ['Laravel', 'PHP', 'MySQL', 'Full-Stack Development'],
    hasPage2: false
  },
  // 4. PPK Ormawa
  {
    folder: 'Kumpulan Sertifikat PPK Ormawa-171',
    id: 'ppk-ormawa-pengusul',
    title: 'Sertifikat Pengusul Program Penguatan Kapasitas Organisasi Kemahasiswaan',
    issuer: 'Belmawa Diktisaintek x Wakil Rektor III UMM',
    category: 'internship',
    categoryLabel: 'Magang & Institusi',
    date: 'Juli 2025',
    credentialId: 'E.5.A/161/BKA-UMM/VII/2025',
    description: 'Apresiasi atas dedikasi dan kontribusi pengusulan proposal program penguatan kapasitas ormawa berorientasi pemberdayaan masyarakat & teknologi smart farming.',
    skills: ['Proposal Development', 'Leadership', 'Pemberdayaan Masyarakat'],
    hasPage2: false
  },
  // 5-8. MySkill Short Class
  {
    folder: 'Yogi Pratama Nusantara - E-Certif SC Wireframing in UI_UX Design MySkill',
    id: 'myskill-wireframing',
    title: 'Wireframing in UI/UX Design',
    issuer: 'MySkill x Lion Parcel',
    category: 'industry',
    categoryLabel: 'Industri & Profesional',
    date: '29 Mei 2024',
    credentialId: '151403/UIX/LM/05/2024',
    description: 'Short Class UI/UX Research and Design mengenai perancangan kerangka antarmuka pengguna (wireframing), information architecture, dan alur aplikasi.',
    skills: ['UI/UX Design', 'Wireframing', 'User Flow', 'Information Architecture'],
    hasPage2: false
  },
  {
    folder: 'Yogi Pratama Nusantara - E-Certif SC Design System in UI Design MySkill',
    id: 'myskill-design-system',
    title: 'Design System in UI Design',
    issuer: 'MySkill x Lion Parcel',
    category: 'industry',
    categoryLabel: 'Industri & Profesional',
    date: '2024',
    credentialId: 'MySkill-DS-2024',
    description: 'Perancangan konsistensi komponen visual, color palette, typography token, dan pattern library pada desain antarmuka digital berskala besar.',
    skills: ['Design System', 'UI Components', 'Design Tokens', 'Figma'],
    hasPage2: false
  },
  {
    folder: 'Yogi Pratama Nusantara - E-Certif SC Backend Development Fundamental MySkill',
    id: 'myskill-backend-fundamental',
    title: 'Backend Development Fundamental',
    issuer: 'MySkill',
    category: 'industry',
    categoryLabel: 'Industri & Profesional',
    date: '2024',
    credentialId: 'MySkill-BE-2024',
    description: 'Fondasi arsitektur backend, RESTful API design, database modeling, server routing, dan protokol komunikasi data web modern.',
    skills: ['Backend Development', 'REST API', 'Database', 'Server Architecture'],
    hasPage2: false
  },
  {
    folder: 'Yogi Pratama Nusantara - E-Certif Data Science Introduction MySkill',
    id: 'myskill-data-science',
    title: 'Data Science Introduction',
    issuer: 'MySkill',
    category: 'industry',
    categoryLabel: 'Industri & Profesional',
    date: '2024',
    credentialId: 'MySkill-DS-Intro-2024',
    description: 'Pengantar metodologi data science, eksplorasi data analitis, machine learning workflow, dan visualisasi data untuk pengambilan keputusan.',
    skills: ['Data Science', 'Data Analysis', 'Python', 'Machine Learning'],
    hasPage2: false
  },

  // 9-22. Laboratorium Informatika UMM (i-Lab)
  {
    folder: 'IF_Certificate_1506',
    id: 'ilab-pemrograman-dasar',
    title: 'Praktikum Pemrograman Dasar',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2022 - 2023',
    credentialId: 'E.5.d/10337/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Sertifikasi kompetensi laboratorium untuk sintaks dasar pemrograman, logika algoritma, percabangan, perulangan, array, dan fungsi modular.',
    skills: ['Algoritma', 'Struktur Kontrol', 'Modular Programming'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_1710',
    id: 'ilab-pbo',
    title: 'Praktikum Pemrograman Berorientasi Obyek (PBO)',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10338/LAB-INF/UMM/2026',
    grade: 'Nilai B+',
    description: 'Implementasi konsep Object-Oriented Programming: Class, Object, Encapsulation, Inheritance, Polymorphism, Abstraction, dan Exception Handling.',
    skills: ['Java', 'OOP', 'Inheritance', 'Polymorphism'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_1782',
    id: 'ilab-pemrograman-lanjut',
    title: 'Praktikum Pemrograman Lanjut',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10340/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Penerapan arsitektur software tingkat lanjut, GUI design, konektivitas database JDBC, design patterns, dan multithreading.',
    skills: ['Java Advanced', 'Design Patterns', 'Database Connectivity', 'GUI'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2064',
    id: 'ilab-struktur-data',
    title: 'Praktikum Struktur Data',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10344/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Pemahaman mendalam struktur data: Linked List, Stack, Queue, Binary Search Tree, Graph, Hashing, dan efisiensi algoritma Big O.',
    skills: ['Linked List', 'Trees & Graphs', 'Stack & Queue', 'Algoritma'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2085',
    id: 'ilab-basis-data',
    title: 'Praktikum Basis Data',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10343/LAB-INF/UMM/2026',
    grade: 'Nilai B',
    description: 'Perancangan Entity-Relationship Diagram (ERD), normalisasi basis data (1NF-3NF), query SQL kompleks, DDL/DML, index, dan view.',
    skills: ['MySQL', 'ERD Design', 'SQL Query', 'Database Normalization'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2148',
    id: 'ilab-pemrograman-web',
    title: 'Praktikum Pemrograman Web',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2024',
    credentialId: 'E.5.d/10345/LAB-INF/UMM/2026',
    grade: 'Nilai B',
    description: 'Pembangunan web responsif dari HTML5, CSS3, JavaScript, hingga backend PHP dan integrasi MySQL database.',
    skills: ['HTML/CSS', 'JavaScript', 'PHP', 'Web Architecture'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2158',
    id: 'ilab-pemrograman-mobile',
    title: 'Praktikum Pemrograman Mobile',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2024',
    credentialId: 'E.5.d/10346/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Pengembangan aplikasi mobile Android/Flutter, lifecycle activity, custom UI widgets, state management, dan konsumsi REST API.',
    skills: ['Flutter', 'Dart', 'Android Studio', 'Mobile Architecture'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_1914',
    id: 'ilab-jaringan-komputer',
    title: 'Praktikum Jaringan Komputer',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10341/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Konfigurasi topologi jaringan, IP addressing & subnetting, routing static & dinamis, VLAN switching, DHCP server, dan packet analysis.',
    skills: ['Cisco Packet Tracer', 'Subnetting', 'Routing & Switching', 'VLAN'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_1794',
    id: 'ilab-komunikasi-data',
    title: 'Praktikum Komunikasi Data',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10339/LAB-INF/UMM/2026',
    grade: 'Nilai B+',
    description: 'Prinsip transmisi sinyal data, encoding/decoding, modulasi analog & digital, error detection (CRC/Parity), dan multiplexing.',
    skills: ['Data Transmission', 'Signal Encoding', 'Error Detection'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2071',
    id: 'ilab-sistem-operasi',
    title: 'Praktikum Sistem Operasi',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2023',
    credentialId: 'E.5.d/10342/LAB-INF/UMM/2026',
    grade: 'Nilai B+',
    description: 'Manajemen proses, threads, CPU scheduling algorithms, memory virtualization, Linux CLI, shell scripting bash, dan file system permissions.',
    skills: ['Linux Ubuntu', 'Bash Scripting', 'Process Management', 'Memory Virtualization'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2188',
    id: 'ilab-piranti-cerdas',
    title: 'Praktikum Piranti Cerdas (IoT & Embedded)',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2024',
    credentialId: 'E.5.d/10348/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Pemrograman mikrokontroler (Arduino / ESP32), integrasi sensor digital & analog, aktuator, protokol MQTT, dan arsitektur IoT.',
    skills: ['ESP32 / Arduino', 'IoT Architecture', 'Sensors & Actuators', 'C++'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2168',
    id: 'ilab-pemrograman-fungsional',
    title: 'Praktikum Pemrograman Fungsional',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2024',
    credentialId: 'E.5.d/10347/LAB-INF/UMM/2026',
    grade: 'Nilai B',
    description: 'Paradigma functional programming: Pure functions, Immutability, Higher-Order Functions, Recursion, Lambda expressions, dan List comprehension.',
    skills: ['Haskell / Python FP', 'Higher Order Functions', 'Recursion', 'Immutability'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2350',
    id: 'ilab-manajemen-proyek',
    title: 'Praktikum Manajemen Proyek Perangkat Lunak',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2024',
    credentialId: 'E.5.d/10349/LAB-INF/UMM/2026',
    grade: 'Nilai B+',
    description: 'Metodologi Agile & Scrum, estimasi biaya Function Point, WBS, diagram Gantt, manajemen risiko proyek TI, dan monitoring sprint.',
    skills: ['Agile / Scrum', 'WBS & Gantt Chart', 'Risk Management', 'Project Planning'],
    hasPage2: true
  },
  {
    folder: 'IF_Certificate_2614',
    id: 'ilab-sqa',
    title: 'Praktikum Penjaminan Kualitas Perangkat Lunak (SQA)',
    issuer: 'Laboratorium Informatika FT-UMM',
    category: 'academic',
    categoryLabel: 'Praktikum Lab Informatika UMM',
    date: '2025',
    credentialId: 'E.5.d/10350/LAB-INF/UMM/2026',
    grade: 'Nilai A (Sangat Memuaskan)',
    description: 'Metodologi Black Box & White Box testing, pengujian fungsionalitas sistem, pembuatan test case komprehensif, automated testing, dan pelaporan bug.',
    skills: ['Software Quality Assurance', 'Black Box Testing', 'Test Case Design', 'Bug Tracking'],
    hasPage2: true
  }
];

async function copyCertificates() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const outputData = [];

  for (const cert of certificateConfigs) {
    const srcFolder = path.join(srcDir, cert.folder);
    console.log(`Processing certificate: ${cert.title}`);
    if (!fs.existsSync(srcFolder)) {
      console.warn(`Folder not found: ${srcFolder}`);
      continue;
    }

    const page1Src = path.join(srcFolder, '1.jpg');
    const page1Dest = path.join(targetDir, `${cert.id}-page1.jpg`);
    const page1Public = `/certificates/${cert.id}-page1.jpg`;

    // Optimize image (resize max 1600px width, progressive jpg, quality 85)
    await sharp(page1Src)
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 86, progressive: true })
      .toFile(page1Dest);

    let page2Public = null;
    const page2Src = path.join(srcFolder, '2.jpg');
    if (cert.hasPage2 && fs.existsSync(page2Src)) {
      const page2Dest = path.join(targetDir, `${cert.id}-page2.jpg`);
      await sharp(page2Src)
        .resize({ width: 1400, withoutEnlargement: true })
        .jpeg({ quality: 86, progressive: true })
        .toFile(page2Dest);
      page2Public = `/certificates/${cert.id}-page2.jpg`;
    }

    outputData.push({
      ...cert,
      page1Url: page1Public,
      page2Url: page2Public
    });
  }

  // Write certificate data to src/data/certificateData.ts
  const dataFileContent = `// Generated Certificate Data from pdf24_renderPdf (2)
export interface CertificateItem {
  id: string
  title: string
  issuer: string
  category: 'all' | 'industry' | 'internship' | 'academic'
  categoryLabel: string
  date: string
  credentialId?: string
  grade?: string
  description: string
  skills: string[]
  page1Url: string
  page2Url?: string | null
  hasPage2?: boolean
}

export const CERTIFICATES: CertificateItem[] = ${JSON.stringify(outputData, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'certificateData.ts'), dataFileContent, 'utf8');
  console.log(`Successfully generated ${outputData.length} certificates and wrote src/data/certificateData.ts!`);
}

copyCertificates().catch(err => {
  console.error('Error copying certificates:', err);
  process.exit(1);
});
