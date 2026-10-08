import type { L } from "@/lib/i18n";

export type Integration = {
  name: string;
  owner: string;
  status: "live" | "snapshot" | "roadmap";
  what: L;
  use: L;
  url: string;
};

export const nationalSources: Integration[] = [
  {
    name: "BMKG Prakiraan Cuaca",
    owner: "BMKG",
    status: "live",
    what: {
      id: "Prakiraan 3 hari per desa (kode adm4), update tiap 3 jam: suhu, kelembapan, angin, awan. JSON publik, ±60 req/menit.",
      en: "3-day village-level forecast (adm4 code), updated every 3 hours: temperature, humidity, wind, cloud. Public JSON, ~60 req/min.",
    },
    use: {
      id: "Dihitung menjadi Temperature-Humidity Index (THI) → peringatan heat stress, jadwal pakan & minum.",
      en: "Converted into a Temperature-Humidity Index (THI) → heat-stress alerts, feeding and water scheduling.",
    },
    url: "https://data.bmkg.go.id/",
  },
  {
    name: "BPS WebAPI",
    owner: "Badan Pusat Statistik",
    status: "live",
    what: {
      id: "API resmi tabel statis & dinamis BPS (perlu token gratis). Populasi ternak per provinsi/kabupaten, produksi daging & susu.",
      en: "Official BPS API for static & dynamic tables (free token). Livestock population by province/regency, meat & milk output.",
    },
    use: {
      id: "Benchmark kawanan Anda terhadap rata-rata daerah, peta populasi, & analisis pasar untuk bank/dinas.",
      en: "Benchmark your herd vs regional averages, population maps, market analysis for lenders and agencies.",
    },
    url: "https://webapi.bps.go.id/developer/",
  },
  {
    name: "Panel Harga Pangan",
    owner: "Badan Pangan Nasional",
    status: "snapshot",
    what: {
      id: "Harga harian produsen & konsumen di 512 kab/kota. Belum ada dokumentasi API publik — kami tampilkan snapshot berlabel.",
      en: "Daily producer & consumer prices across 512 regencies. No documented public API yet — shown as labelled snapshots.",
    },
    use: {
      id: "Waktu jual terbaik, proyeksi margin, Qurban Planner. Integrasi resmi diajukan ke Bapanas.",
      en: "Best time to sell, margin projections, Qurban Planner. Official integration requested from Bapanas.",
    },
    url: "https://panelharga.badanpangan.go.id/",
  },
  {
    name: "iSIKHNAS",
    owner: "Kementan · Ditjen PKH",
    status: "roadmap",
    what: {
      id: "Sistem informasi kesehatan hewan nasional (pelaporan penyakit, IB, kelahiran). Bukan open API.",
      en: "National animal-health information system (disease, AI and birth reporting). Not an open API.",
    },
    use: {
      id: "Draf laporan otomatis format iSIKHNAS untuk petugas dinas — integrasi lewat kemitraan resmi.",
      en: "Auto-drafted reports in iSIKHNAS format for district officers — integration via formal partnership.",
    },
    url: "https://rr-asia.woah.org/app/uploads/2020/01/4-2-isikhnas_indonesia.pdf",
  },
  {
    name: "Satu Data Pertanian",
    owner: "Kementan · Pusdatin",
    status: "roadmap",
    what: {
      id: "Portal data pertanian di bawah Satu Data Indonesia. Akses programatik belum terdokumentasi.",
      en: "Agriculture data portal under Satu Data Indonesia. Programmatic access not yet documented.",
    },
    use: {
      id: "Sinkronisasi data populasi & program bantuan; dijajaki via Pusdatin.",
      en: "Sync population & aid-programme data; being explored with Pusdatin.",
    },
    url: "https://satudata.pertanian.go.id/",
  },
  {
    name: "Portal Satu Data Daerah (CKAN)",
    owner: "Pemprov / Pemkab",
    status: "live",
    what: {
      id: "Banyak portal daerah (mis. Jabar, Lampung, Inhil) menyediakan dataset ternak via CKAN API (JSON/CSV).",
      en: "Many regional portals (e.g. West Java, Lampung, Inhil) expose livestock datasets via CKAN API (JSON/CSV).",
    },
    use: {
      id: "Data kabupaten yang lebih rinci untuk dashboard dinas dan analisis kredit wilayah.",
      en: "Finer regency-level data for agency dashboards and regional credit analysis.",
    },
    url: "https://opendata.jabarprov.go.id/id/dataset/jumlah-populasi-sapi-potong-berdasarkan-kabupatenkota-di-jawa-barat",
  },
];

export type Competitor = {
  name: string;
  country: string;
  model: L;
  price: L;
  strengths: L;
  gap: L;
  url: string;
};

export const globalPlayers: Competitor[] = [
  {
    name: "Halter",
    country: "🇳🇿 New Zealand",
    model: { id: "Kalung surya + virtual fencing, menara LoRa / satelit, AI \"Cowgorithm\"", en: "Solar collar + virtual fencing, LoRa towers / satellite, \"Cowgorithm\" AI" },
    price: { id: "±US$5–10/ekor/bulan + menara (±NZ$7.800)", en: "~US$5–10/cow/month + towers (~NZ$7,800)" },
    strengths: { id: "Gerakkan kawanan dari HP, data kesehatan & birahi, pendanaan Seri E US$220 jt", en: "Move herds from a phone, health & heat data, US$220M Series E" },
    gap: { id: "Dirancang untuk pastoral luas; terlalu mahal untuk peternak rakyat; tanpa layanan keuangan", en: "Built for large pastoral farms; too expensive for smallholders; no financial services" },
    url: "https://www.halterhq.com/our-technology",
  },
  {
    name: "Nofence",
    country: "🇳🇴 Norway",
    model: { id: "Kalung GPS virtual fencing untuk sapi, kambing, domba", en: "GPS virtual-fencing collars for cattle, goats, sheep" },
    price: { id: "Berlangganan per kalung", en: "Per-collar subscription" },
    strengths: { id: "Tanpa menara, cocok untuk kambing/domba", en: "No towers, works for goats/sheep" },
    gap: { id: "Fokus penggembalaan; minim analitik kesehatan & pasar lokal", en: "Grazing focus; little health or local-market analytics" },
    url: "https://www.nofence.no/en/",
  },
  {
    name: "Ceres Tag",
    country: "🇦🇺 Australia",
    model: { id: "Ear tag langsung ke satelit (dikembangkan bersama CSIRO)", en: "Direct-to-satellite ear tag (developed with CSIRO)" },
    price: { id: "Pembelian tag, klaim tanpa langganan", en: "Tag purchase, claims no subscription" },
    strengths: { id: "Tanpa infrastruktur, ketertelusuran (NLIS)", en: "No infrastructure, traceability (NLIS)" },
    gap: { id: "Fokus lokasi & ketertelusuran; tidak menyasar kandang rakyat & kredit", en: "Location & traceability focus; not built for smallholder pens or credit" },
    url: "https://research.csiro.au/livestock/our-focus/health-and-resilience/ceres-tag-smart-ear-tags-for-livestock",
  },
  {
    name: "CattleEye",
    country: "🇬🇧 UK",
    model: { id: "Computer vision dari kamera kandang, tanpa wearable", en: "Computer vision from barn cameras, no wearables" },
    price: { id: "Langganan per peternakan", en: "Per-farm subscription" },
    strengths: { id: "Skor kepincangan & kondisi tubuh otomatis", en: "Automated lameness & body-condition scoring" },
    gap: { id: "Butuh kandang tertutup & internet stabil", en: "Needs enclosed barns & stable internet" },
    url: "https://agfundernews.com/cattleeye-comes-out-of-stealth-with-computer-vision-based-livestock-management-platform",
  },
];

export const localPlayers: Competitor[] = [
  {
    name: "SMARTernak (DycodeX)",
    country: "🇮🇩 Indonesia",
    model: { id: "Kalung IoT tenaga surya", en: "Solar IoT collar" },
    price: { id: "—", en: "—" },
    strengths: { id: "Pionir IoT ternak lokal sejak 2019", en: "Local livestock IoT pioneer since 2019" },
    gap: { id: "Fokus perangkat; belum ada lapisan kredit/asuransi", en: "Hardware focus; no credit/insurance layer" },
    url: "https://www.liputan6.com/tekno/read/4037822/smarternak-perangkat-iot-yang-bisa-pantau-perkembangan-hewan-ternak",
  },
  {
    name: "Ternak Pintar",
    country: "🇮🇩 Indonesia",
    model: { id: "Software manajemen + RFID UHF", en: "Management software + UHF RFID" },
    price: { id: "—", en: "—" },
    strengths: { id: "Pencatatan, RFID scanner, laporan operasional", en: "Records, RFID scanners, operational reports" },
    gap: { id: "Pencatatan manual/scan — bukan sensor perilaku real-time", en: "Manual/scan records — no real-time behaviour sensing" },
    url: "https://ternakpintar.com/",
  },
  {
    name: "Prototipe kampus (MooSmartHealthGuard, StegoIoT, TeDi)",
    country: "🇮🇩 Indonesia",
    model: { id: "Kalung sensor suhu/detak jantung, RFID reader", en: "Temperature/heart-rate collars, RFID readers" },
    price: { id: "Riset / hibah", en: "Research / grants" },
    strengths: { id: "Dirancang untuk kondisi lapangan lokal", en: "Designed for local field conditions" },
    gap: { id: "Belum komersial & belum skala", en: "Not yet commercial or scaled" },
    url: "https://banjarmasin.tribunnews.com/kalsel/1363924/kalung-pintar-deteksi-kesehatan-sapi-inovasi-5-mahasiswa-umb-bantu-peternak-di-batola",
  },
];

export const comparisonRows: { feature: L; values: [boolean | "partial", boolean | "partial", boolean | "partial", boolean | "partial"] }[] = [
  { feature: { id: "Monitoring perilaku & kesehatan per ekor", en: "Per-animal behaviour & health monitoring" }, values: [true, true, "partial", "partial"] },
  { feature: { id: "Terjangkau untuk peternak 2–10 ekor", en: "Affordable for 2–10 head farmers" }, values: [true, false, false, "partial"] },
  { feature: { id: "Gateway berbagi per kelompok ternak", en: "Shared gateway per farmer group" }, values: [true, false, false, false] },
  { feature: { id: "WhatsApp-first (tanpa install app)", en: "WhatsApp-first (no app install)" }, values: [true, false, false, false] },
  { feature: { id: "Early warning PMK/LSD + draf laporan dinas", en: "FMD/LSD early warning + agency report draft" }, values: [true, false, false, false] },
  { feature: { id: "Skor kredit dari data ternak (KUR)", en: "Credit score from herd data (KUR)" }, values: [true, false, false, false] },
  { feature: { id: "Paket bukti klaim asuransi AUTS", en: "AUTS insurance claim evidence pack" }, values: [true, false, false, false] },
  { feature: { id: "Data nasional (BMKG, BPS, harga pangan)", en: "National data (BMKG, BPS, food prices)" }, values: [true, false, false, false] },
  { feature: { id: "Qurban & aqiqah planner", en: "Qurban & aqiqah planner" }, values: [true, false, false, false] },
  { feature: { id: "Virtual fencing / menggiring kawanan", en: "Virtual fencing / herding" }, values: ["partial", true, false, false] },
];
