// Data statis untuk prototype HETS.
const HETSData = {
  trainings: [
    {
      id: 'orientation',
      title: 'Budaya Rumah Sakit',
      description: 'Pengenalan budaya kerja, struktur unit, dan alur layanan pasien.',
      status: 'Selesai',
      modules: [
        { id: 'intro', title: 'Pendahuluan', type: 'Materi', duration: '10 menit' },
        { id: 'video', title: 'Video SOP', type: 'Video', duration: '8 menit' },
        { id: 'pdf', title: 'Panduan Operasional', type: 'PDF', duration: '15 menit' }
      ]
    },
    {
      id: 'patient-safety',
      title: 'Keselamatan Pasien',
      description: 'Prinsip keselamatan pasien, identifikasi risiko, dan komunikasi tim.',
      status: 'Dalam Progress',
      modules: [
        { id: 'safety-1', title: 'Pengenalan Risiko', type: 'Materi', duration: '12 menit' },
        { id: 'safety-2', title: 'Video Simulasi', type: 'Video', duration: '7 menit' },
        { id: 'safety-3', title: 'Checklist', type: 'PDF', duration: '10 menit' }
      ]
    },
    {
      id: 'infection-control',
      title: 'Pencegahan Infeksi',
      description: 'Langkah pencegahan infeksi rumah sakit dan protokol kebersihan.',
      status: 'Belum Dimulai',
      modules: [
        { id: 'infection-1', title: 'Dasar Infeksi', type: 'Materi', duration: '10 menit' },
        { id: 'infection-2', title: 'Video Prosedur', type: 'Video', duration: '9 menit' },
        { id: 'infection-3', title: 'Standar PPE', type: 'PDF', duration: '8 menit' }
      ]
    },
    {
      id: 'k3',
      title: 'K3 Rumah Sakit',
      description: 'Keselamatan kerja, penanganan bahaya, dan emergency response.',
      status: 'Belum Dimulai',
      modules: [
        { id: 'k3-1', title: 'Pengenalan Bahaya', type: 'Materi', duration: '11 menit' },
        { id: 'k3-2', title: 'Simulasi Evakuasi', type: 'Video', duration: '6 menit' },
        { id: 'k3-3', title: 'Form K3', type: 'PDF', duration: '10 menit' }
      ]
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Apa tujuan utama pelatihan pegawai rumah sakit?',
      options: [
        'Meningkatkan kualitas layanan kesehatan',
        'Mengurangi jumlah pegawai',
        'Mengurangi waktu istirahat',
        'Membuat laporan keuangan'
      ],
      answer: 0
    },
    {
      id: 2,
      question: 'Apa yang paling penting sebelum memulai shift kerja?',
      options: [
        'Membaca SOP dan memahami prosedur',
        'Langsung berangkat tanpa persiapan',
        'Berkonsultasi dengan pelanggan',
        'Mengabaikan protokol keselamatan'
      ],
      answer: 0
    },
    {
      id: 3,
      question: 'Mengapa identifikasi pasien penting dilakukan?',
      options: [
        'Agar layanan lebih aman dan tepat',
        'Agar lebih cepat pulang',
        'Agar dokter tidak kewalahan',
        'Untuk mengurangi jumlah formulir'
      ],
      answer: 0
    },
    {
      id: 4,
      question: 'Apa yang harus dilakukan saat menemukan risiko keselamatan?',
      options: [
        'Melaporkannya segera ke atasan',
        'Menyembunyikannya agar tidak panik',
        'Membiarkannya sampai shift selesai',
        'Menunggu orang lain yang melapor'
      ],
      answer: 0
    },
    {
      id: 5,
      question: 'Pencegahan infeksi bertujuan untuk?',
      options: [
        'Melindungi pasien dan tenaga kesehatan',
        'Mempercepat jam kerja',
        'Memperbanyak stok obat',
        'Mengurangi jumlah kunjungan'
      ],
      answer: 0
    },
    {
      id: 6,
      question: 'Salah satu tindakan yang mendukung keselamatan kerja adalah?',
      options: [
        'Menggunakan APD sesuai prosedur',
        'Menghapus tanda bahaya',
        'Melerai anggota tim dengan kasar',
        'Mengabaikan rambu darurat'
      ],
      answer: 0
    },
    {
      id: 7,
      question: 'Bagaimana cara terbaik berkomunikasi di lingkungan klinis?',
      options: [
        'Jelas, singkat, dan sesuai prosedur',
        'Tidak perlu menjelaskan detail',
        'Banyak menggunakan bahasa informal',
        'Menyampaikan informasi sambil tergesa'
      ],
      answer: 0
    },
    {
      id: 8,
      question: 'Apa yang sebaiknya dilakukan saat ada kejadian darurat?',
      options: [
        'Ikuti alur respons darurat dan panggil bantuan',
        'Tunggu sampai semua tenang',
        'Pindahkan pasien tanpa koordinasi',
        'Mengambil keputusan sendiri tanpa prosedur'
      ],
      answer: 0
    },
    {
      id: 9,
      question: 'Dokumen yang sering digunakan untuk memantau standar kerja adalah?',
      options: [
        'Checklist dan SOP',
        'Daftar belanja',
        'Catatan pribadi',
        'Jadwal rapat non-formal'
      ],
      answer: 0
    },
    {
      id: 10,
      question: 'Apa manfaat dari evaluasi pelatihan ini?',
      options: [
        'Mengukur pemahaman dan kesiapan kerja',
        'Mengganti semua sistem rumah sakit',
        'Mengurangi kebutuhan pelatihan berikutnya',
        'Menghapus SOP yang lama'
      ],
      answer: 0
    }
  ]
};
