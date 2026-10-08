import type { L } from "@/lib/i18n";

export type UseCase = {
  slug: string;
  icon: "beef" | "milk" | "users" | "goat" | "landmark" | "banknote" | "factory";
  title: L;
  short: L;
  hero: L;
  pains: L[];
  features: { title: L; body: L }[];
  metrics: { value: string; label: L }[];
  demoTab: string;
};

export const useCases: UseCase[] = [
  {
    slug: "sapi-potong",
    icon: "beef",
    title: { id: "Sapi Potong & Penggemukan", en: "Beef & Feedlot" },
    short: { id: "Naikkan ADG, tekan biaya pakan per kg bobot.", en: "Lift daily gain, cut feed cost per kg." },
    hero: {
      id: "Setiap kilogram bobot harian yang hilang adalah margin yang hilang. Ternakin memantau aktivitas, ruminasi dan bobot estimasi per ekor agar Anda tahu siapa yang tumbuh — dan siapa yang membebani pakan.",
      en: "Every lost kilogram of daily gain is lost margin. Ternakin tracks activity, rumination and estimated weight per animal so you know who's growing — and who's eating your feed budget.",
    },
    pains: [
      { id: "Bobot hanya ditimbang saat masuk & keluar — sapi bermasalah baru ketahuan di akhir periode.", en: "Weight is checked only at entry and exit — poor performers surface at the end of the cycle." },
      { id: "Biaya pakan ±60–70% biaya operasional, tapi FCR per ekor tidak terukur.", en: "Feed is ~60–70% of operating cost, yet per-head FCR isn't measured." },
      { id: "Harga jual fluktuatif; momen jual (Iduladha, Ramadan) sering terlewat.", en: "Volatile prices; key selling windows (Eid al-Adha, Ramadan) get missed." },
    ],
    features: [
      { title: { id: "Kurva bobot & ADG per ekor", en: "Per-head weight curve & ADG" }, body: { id: "Estimasi bobot dari timbangan walk-over atau foto, dibandingkan target harian.", en: "Weight estimates from walk-over scales or photos, compared against daily targets." } },
      { title: { id: "HPP per kg & proyeksi margin", en: "Cost per kg & margin projection" }, body: { id: "Biaya pakan, obat, tenaga dihitung per ekor dan dibandingkan harga pasar acuan.", en: "Feed, medicine and labour cost per head, compared with reference market prices." } },
      { title: { id: "Rekomendasi waktu jual", en: "Sell-timing recommendations" }, body: { id: "Kombinasi target bobot, tren harga, dan kalender hari raya.", en: "Combining target weight, price trends and the festive calendar." } },
    ],
    metrics: [
      { value: "+8–12%", label: { id: "target kenaikan ADG", en: "ADG uplift target" } },
      { value: "−10%", label: { id: "target biaya pakan per kg", en: "feed cost per kg target" } },
      { value: "2–3 hari", label: { id: "deteksi sakit lebih awal", en: "earlier illness detection" } },
    ],
    demoTab: "growth",
  },
  {
    slug: "sapi-perah",
    icon: "milk",
    title: { id: "Sapi Perah & Koperasi Susu", en: "Dairy & Milk Co-ops" },
    short: { id: "Deteksi birahi, jaga produksi susu, siap pasok MBG.", en: "Catch heats, protect yield, supply school-meal milk." },
    hero: {
      id: "Satu siklus birahi yang terlewat berarti ±21 hari tanpa kebuntingan. Ternakin mendeteksi birahi dan penurunan ruminasi otomatis, lalu mengirim notifikasi WhatsApp ke peternak dan inseminator koperasi.",
      en: "One missed heat costs ~21 days without pregnancy. Ternakin detects heats and rumination drops automatically and pings farmers and co-op inseminators on WhatsApp.",
    },
    pains: [
      { id: "Calving interval panjang karena birahi tenang tak terdeteksi.", en: "Long calving intervals because silent heats go unnoticed." },
      { id: "PMK/LSD 2022–2023 membuat produksi susu anjlok dan tak pulih setahun kemudian.", en: "FMD/LSD in 2022–2023 cut milk yield, still not recovered a year later." },
      { id: "Ribuan sapi perah impor baru (program MBG) butuh pemantauan adaptasi.", en: "Thousands of newly imported dairy cows (school-meal programme) need adaptation monitoring." },
    ],
    features: [
      { title: { id: "Deteksi birahi & jadwal IB", en: "Heat detection & AI scheduling" }, body: { id: "Pola aktivitas naik + ruminasi turun → jendela IB optimal dikirim ke inseminator.", en: "Activity spike + rumination dip → optimal AI window sent to the inseminator." } },
      { title: { id: "Dashboard koperasi", en: "Co-op dashboard" }, body: { id: "Semua anggota dalam satu peta: kesehatan, kebuntingan, estimasi setoran susu.", en: "All members on one map: health, pregnancies, expected milk deliveries." } },
      { title: { id: "Ketertelusuran susu", en: "Milk traceability" }, body: { id: "Riwayat kesehatan per sapi untuk mutu susu dan syarat pasokan program pemerintah.", en: "Per-cow health history for milk quality and government supply requirements." } },
    ],
    metrics: [
      { value: "−30 hari", label: { id: "target calving interval", en: "calving interval target" } },
      { value: "90%", label: { id: "target deteksi birahi", en: "heat detection target" } },
      { value: "1 peta", label: { id: "untuk semua anggota koperasi", en: "for every co-op member" } },
    ],
    demoTab: "repro",
  },
  {
    slug: "peternak-rakyat",
    icon: "users",
    title: { id: "Peternak Rakyat & Kelompok Ternak", en: "Smallholders & Farmer Groups" },
    short: { id: "Satu gateway untuk satu desa. Cukup WhatsApp.", en: "One gateway per village. Just WhatsApp." },
    hero: {
      id: "Lebih dari 90% sapi Indonesia ada di kandang rakyat, 2–5 ekor per keluarga. Ternakin dirancang untuk mereka: ear tag murah, satu gateway berbagi untuk satu kelompok, dan semua notifikasi lewat WhatsApp.",
      en: "Over 90% of Indonesia's cattle live with smallholders, 2–5 head per family. Ternakin is built for them: low-cost ear tags, one shared gateway per group, and every alert via WhatsApp.",
    },
    pains: [
      { id: "Teknologi impor dihargai per ekor setara biaya pakan seminggu.", en: "Imported tech costs as much per head as a week of feed." },
      { id: "Tidak ada catatan → sulit akses KUR & asuransi.", en: "No records → hard to access KUR loans and insurance." },
      { id: "Jaringan seluler tidak stabil di desa.", en: "Patchy mobile coverage in villages." },
    ],
    features: [
      { title: { id: "Gateway LoRa berbagi", en: "Shared LoRa gateway" }, body: { id: "Satu gateway tenaga surya menjangkau ±2–5 km kandang; biaya dibagi kelompok.", en: "One solar gateway covers ~2–5 km of pens; cost is shared by the group." } },
      { title: { id: "Bot WhatsApp Bahasa Indonesia", en: "Bahasa Indonesia WhatsApp bot" }, body: { id: "\"Sapi 07 ruminasi turun 35%, cek nafsu makan & suhu.\" — tanpa install aplikasi.", en: "\"Cow 07 rumination down 35%, check appetite & temperature.\" — no app install." } },
      { title: { id: "Catatan otomatis = rekam jejak kredit", en: "Automatic records = credit history" }, body: { id: "Setiap hari data tercatat menjadi Skor Ternak yang bisa dibagikan ke bank.", en: "Daily data becomes a Skor Ternak you can share with lenders." } },
    ],
    metrics: [
      { value: "1", label: { id: "gateway untuk ±30–150 ekor", en: "gateway per ~30–150 head" } },
      { value: "0", label: { id: "aplikasi wajib di-install", en: "apps to install" } },
      { value: "24/7", label: { id: "pemantauan otomatis", en: "automatic monitoring" } },
    ],
    demoTab: "overview",
  },
  {
    slug: "kambing-domba",
    icon: "goat",
    title: { id: "Kambing, Domba & Qurban", en: "Goats, Sheep & Qurban" },
    short: { id: "Tepat bobot & tepat waktu untuk Iduladha dan aqiqah.", en: "Right weight, right time for Eid al-Adha and aqiqah." },
    hero: {
      id: "Permintaan hewan qurban memuncak sekali setahun. Qurban Planner menghitung mundur dari tanggal Iduladha: berapa bobot target, berapa pakan, dan kapan harga terbaik untuk menjual.",
      en: "Qurban demand peaks once a year. Qurban Planner works backwards from Eid al-Adha: target weight, feed plan, and when prices are best to sell.",
    },
    pains: [
      { id: "Hewan tidak memenuhi syarat bobot/umur saat musim qurban.", en: "Animals miss weight/age requirements at qurban season." },
      { id: "Pembeli kota ragu soal kesehatan & asal-usul hewan.", en: "Urban buyers doubt animal health and provenance." },
      { id: "Stok menumpuk setelah hari raya.", en: "Unsold stock piles up after the holiday." },
    ],
    features: [
      { title: { id: "Qurban Planner", en: "Qurban Planner" }, body: { id: "Hitung mundur dari tanggal Iduladha dengan target bobot per ekor.", en: "Countdown from Eid al-Adha with per-head weight targets." } },
      { title: { id: "Sertifikat digital sehat", en: "Digital health certificate" }, body: { id: "QR pada ear tag menampilkan riwayat vaksin & kesehatan untuk pembeli.", en: "QR on the ear tag shows vaccine & health history to buyers." } },
      { title: { id: "Ear tag ringan untuk ruminansia kecil", en: "Lightweight tags for small ruminants" }, body: { id: "Versi tag yang lebih kecil untuk kambing & domba.", en: "A smaller tag variant for goats & sheep." } },
    ],
    metrics: [
      { value: "95%", label: { id: "target hewan lolos syarat qurban", en: "target qurban-eligible rate" } },
      { value: "QR", label: { id: "riwayat sehat untuk pembeli", en: "health history for buyers" } },
      { value: "H-120", label: { id: "mulai perencanaan otomatis", en: "automatic planning starts" } },
    ],
    demoTab: "qurban",
  },
  {
    slug: "pemerintah-dinas",
    icon: "landmark",
    title: { id: "Pemerintah & Dinas Peternakan", en: "Government & Livestock Agencies" },
    short: { id: "Peta wabah real-time & laporan siap kirim.", en: "Real-time outbreak maps & ready-to-send reports." },
    hero: {
      id: "Saat PMK menyebar 2022, data kasus antar instansi berbeda-beda. Ternakin memberi dinas peta anomali kesehatan real-time per desa dan draf laporan yang siap diverifikasi petugas.",
      en: "When FMD spread in 2022, case numbers differed between agencies. Ternakin gives agencies a real-time, village-level health-anomaly map and report drafts ready for officer verification.",
    },
    pains: [
      { id: "Laporan wabah terlambat dan tidak sinkron antar instansi.", en: "Outbreak reports arrive late and out of sync between agencies." },
      { id: "Sulit memantau sapi bantuan pemerintah & sapi impor.", en: "Hard to monitor government-aid and imported cattle." },
      { id: "Vaksinasi & ear tag manual sulit diverifikasi.", en: "Manual vaccination and tagging are hard to verify." },
    ],
    features: [
      { title: { id: "Peta klaster anomali", en: "Anomaly cluster map" }, body: { id: "Lonjakan sapi dengan ruminasi turun di satu desa ditandai sebagai klaster.", en: "Spikes of low-rumination animals in a village are flagged as clusters." } },
      { title: { id: "Draf laporan format iSIKHNAS", en: "iSIKHNAS-format report drafts" }, body: { id: "Petugas memverifikasi, lalu meneruskan — bukan mengetik ulang.", en: "Officers verify then forward — no re-typing." } },
      { title: { id: "Pemantauan aset bantuan", en: "Aid-asset monitoring" }, body: { id: "Status hidup, lokasi, dan kebuntingan sapi bantuan per penerima.", en: "Alive status, location and pregnancy of aid cattle per recipient." } },
    ],
    metrics: [
      { value: "Real-time", label: { id: "peta kesehatan per desa", en: "village-level health map" } },
      { value: "1 klik", label: { id: "draf laporan ke petugas", en: "report draft to officers" } },
      { value: "100%", label: { id: "aset bantuan terlacak", en: "aid assets tracked" } },
    ],
    demoTab: "health",
  },
  {
    slug: "bank-asuransi",
    icon: "banknote",
    title: { id: "Bank, Koperasi Simpan Pinjam & Asuransi", en: "Banks, Lenders & Insurers" },
    short: { id: "Ternak yang terpantau = agunan yang bisa dibiayai.", en: "Monitored livestock = financeable collateral." },
    hero: {
      id: "Bank ragu membiayai peternak karena agunannya bergerak, bisa sakit, dan sulit diverifikasi. Skor Ternak mengubah data harian menjadi profil risiko yang bisa diaudit — dan memantau agunan sepanjang tenor.",
      en: "Banks hesitate to lend to farmers because the collateral moves, gets sick and is hard to verify. Skor Ternak turns daily data into an auditable risk profile — and monitors collateral for the life of the loan.",
    },
    pains: [
      { id: "Tidak ada data historis peternak untuk analisis kredit.", en: "No historical farmer data for credit analysis." },
      { id: "Agunan ternak bisa dijual atau mati tanpa diketahui.", en: "Livestock collateral can be sold or die unnoticed." },
      { id: "Klaim AUTS butuh bukti yang sering tidak lengkap.", en: "AUTS claims need evidence that's often incomplete." },
    ],
    features: [
      { title: { id: "Skor Ternak (0–850)", en: "Skor Ternak (0–850)" }, body: { id: "Komponen: kesehatan kawanan, pertumbuhan, reproduksi, kepatuhan vaksin, stabilitas lokasi.", en: "Components: herd health, growth, reproduction, vaccine compliance, location stability." } },
      { title: { id: "Pemantauan agunan", en: "Collateral monitoring" }, body: { id: "Notifikasi ke bank bila ternak agunan keluar geofence, tidak aktif, atau mati.", en: "Lender alerts when pledged animals leave the geofence, go inactive, or die." } },
      { title: { id: "Paket bukti klaim AUTS", en: "AUTS claim evidence pack" }, body: { id: "Timeline sensor, lokasi GPS, foto, dan catatan dokter hewan dalam satu PDF.", en: "Sensor timeline, GPS location, photos and vet notes in one PDF." } },
    ],
    metrics: [
      { value: "0–850", label: { id: "Skor Ternak per peternak", en: "Skor Ternak per farmer" } },
      { value: "24/7", label: { id: "pemantauan agunan", en: "collateral monitoring" } },
      { value: "< 7 hari", label: { id: "target waktu klaim AUTS", en: "AUTS claim time target" } },
    ],
    demoTab: "score",
  },
  {
    slug: "offtaker-rph",
    icon: "factory",
    title: { id: "Offtaker, RPH & Industri", en: "Offtakers, Abattoirs & Industry" },
    short: { id: "Pasokan terprediksi, asal-usul terverifikasi.", en: "Predictable supply, verified provenance." },
    hero: {
      id: "Offtaker butuh tahu kapan dan berapa banyak sapi siap potong dari ribuan peternak plasma. Ternakin menyediakan proyeksi pasokan dan riwayat kesehatan per ekor untuk ketertelusuran.",
      en: "Offtakers need to know when and how many cattle will be slaughter-ready across thousands of contract farmers. Ternakin provides supply forecasts and per-head health histories for traceability.",
    },
    pains: [
      { id: "Pasokan dari plasma tidak terprediksi.", en: "Contract-farmer supply is unpredictable." },
      { id: "Ketertelusuran & status bebas penyakit sulit dibuktikan.", en: "Traceability and disease-free status are hard to prove." },
      { id: "Rendemen karkas bervariasi tanpa data pemeliharaan.", en: "Carcass yield varies without husbandry data." },
    ],
    features: [
      { title: { id: "Proyeksi pasokan 30/60/90 hari", en: "30/60/90-day supply forecast" }, body: { id: "Jumlah ekor yang mencapai target bobot per minggu.", en: "Head count reaching target weight each week." } },
      { title: { id: "Paspor ternak digital", en: "Digital livestock passport" }, body: { id: "Riwayat vaksin, pengobatan, dan lokasi dari lahir hingga RPH.", en: "Vaccine, treatment and location history from birth to abattoir." } },
      { title: { id: "Manajemen plasma", en: "Contract-farmer management" }, body: { id: "Pantau performa ratusan peternak mitra dalam satu dashboard.", en: "Track hundreds of partner farmers in one dashboard." } },
    ],
    metrics: [
      { value: "90 hari", label: { id: "horizon proyeksi pasokan", en: "supply forecast horizon" } },
      { value: "Per ekor", label: { id: "ketertelusuran", en: "traceability" } },
      { value: "1 dashboard", label: { id: "untuk semua plasma", en: "for all contract farmers" } },
    ],
    demoTab: "market",
  },
];

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug);
