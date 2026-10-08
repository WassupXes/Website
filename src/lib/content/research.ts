import type { L } from "@/lib/i18n";

export type Research = {
  tag: L;
  year: string;
  region: "ID" | "Global";
  title: string;
  stat: string;
  statLabel: L;
  summary: L;
  implication: L;
  source: string;
  url: string;
};

export const research: Research[] = [
  {
    tag: { id: "Kesehatan · PMK", en: "Health · FMD" },
    year: "2023",
    region: "ID",
    title: "Kerugian ekonomi PMK pada peternak sapi perah KPBS Pangalengan",
    stat: "Rp6,29 jt",
    statLabel: { id: "kerugian per ekor dalam 29 hari wabah", en: "loss per head over a 29-day outbreak" },
    summary: {
      id: "Survei 100 peternak (Sep–Nov 2023): rata-rata kerugian Rp44 juta per peternak, naik menjadi Rp6,58 jt/ekor setelah setahun karena produksi susu tak pulih.",
      en: "Survey of 100 farmers (Sep–Nov 2023): average loss Rp44M per farmer, rising to Rp6.58M/head a year later as milk yield never fully recovered.",
    },
    implication: {
      id: "Deteksi dini 2–3 hari lebih cepat lewat anomali ruminasi = selisih jutaan rupiah per ekor.",
      en: "Detecting illness 2–3 days earlier via rumination anomalies is worth millions of rupiah per head.",
    },
    source: "Jurnal Sain Veteriner, UGM",
    url: "https://journal.ugm.ac.id/jsv/article/download/103474/42174",
  },
  {
    tag: { id: "Kesehatan · PMK & LSD", en: "Health · FMD & LSD" },
    year: "2023",
    region: "ID",
    title: "Dampak PMK dan LSD pada usaha sapi perah di Koperasi Margomulyo, Malang",
    stat: "Rp7,25 M",
    statLabel: { id: "total kerugian 63 peternak", en: "total loss across 63 farmers" },
    summary: {
      id: "45,21% kerugian berasal dari jual paksa, 18,88% kematian, 14,02% penurunan produksi susu, 13,28% biaya pemulihan, 8,62% gangguan reproduksi.",
      en: "45.21% of losses came from forced sales, 18.88% deaths, 14.02% lower milk output, 13.28% recovery costs, 8.62% reproductive problems.",
    },
    implication: {
      id: "Jual paksa adalah kerugian terbesar — data kesehatan + asuransi + akses kredit mencegah panic selling.",
      en: "Forced sales are the biggest loss — health data + insurance + credit access prevents panic selling.",
    },
    source: "Agrinimal, Universitas Pattimura",
    url: "https://ojs3.unpatti.ac.id/index.php/agrinimal/article/view/20565",
  },
  {
    tag: { id: "Pasokan · Daging", en: "Supply · Beef" },
    year: "2025",
    region: "ID",
    title: "Produksi daging sapi nasional vs kebutuhan",
    stat: "445 rb ton",
    statLabel: { id: "proyeksi produksi 2025 vs kebutuhan 739,7 rb ton", en: "2025 projected output vs 739.7k t demand" },
    summary: {
      id: "Produksi 2024 tercatat 478.852 ton dan diperkirakan turun ke 445.118 ton pada 2025, sementara kebutuhan 739.668 ton. Kuota impor swasta 2026 dipangkas ke ±30 rb ton.",
      en: "Output was 478,852 t in 2024, projected to fall to 445,118 t in 2025 against 739,668 t demand. Private import quota for 2026 cut to ~30k t.",
    },
    implication: {
      id: "Gap pasokan ±40% — tiap kenaikan ADG dan efisiensi reproduksi lokal punya nilai ekonomi langsung.",
      en: "A ~40% supply gap — every gain in local daily weight gain and fertility has direct economic value.",
    },
    source: "Kontan Insight; Bisnis.com",
    url: "https://insight.kontan.co.id/news/produksi-daging-sapi-2025-diprediksikan-lebih-rendah-ketimbang-saat-pandemi",
  },
  {
    tag: { id: "Populasi", en: "Population" },
    year: "2025",
    region: "ID",
    title: "Populasi sapi potong pulih bertahap setelah anjlok 2023",
    stat: "12,12 jt",
    statLabel: { id: "ekor sapi potong (2025), ±5,6 jt di Jawa", en: "beef cattle (2025), ~5.6M on Java" },
    summary: {
      id: "BPS mencatat penurunan tajam nasional pada 2023, lalu pemulihan bertahap 2024–2025. Lebih dari 90% populasi dipelihara peternakan rakyat skala kecil.",
      en: "BPS recorded a sharp national drop in 2023, followed by gradual recovery in 2024–2025. Over 90% of the herd sits with smallholders.",
    },
    implication: {
      id: "Produk harus terjangkau untuk peternak 2–10 ekor — bukan hanya feedlot besar.",
      en: "The product must be affordable for 2–10 head farmers — not only large feedlots.",
    },
    source: "BPS via GoodNews from Indonesia",
    url: "https://www.goodnewsfromindonesia.id/short/populasi-ternak-nasional-2025-mulai-pulih-secara-bertahap",
  },
  {
    tag: { id: "Susu · MBG", en: "Dairy · Free Meals" },
    year: "2025",
    region: "ID",
    title: "Program Makan Bergizi Gratis dan ketergantungan susu impor",
    stat: "±80%",
    statLabel: { id: "kebutuhan susu nasional masih impor", en: "of national milk demand still imported" },
    summary: {
      id: "Pemerintah merencanakan impor 1–2 juta sapi (perah & potong) dalam 5 tahun; realisasi per Juli 2025: 11.375 sapi perah dan 13.722 sapi pedaging.",
      en: "Government plans to import 1–2M cattle (dairy & beef) over 5 years; by July 2025: 11,375 dairy and 13,722 beef cattle arrived.",
    },
    implication: {
      id: "Ribuan sapi impor baru butuh monitoring adaptasi, birahi & kesehatan — pasar langsung untuk koperasi.",
      en: "Thousands of newly imported cattle need adaptation, heat and health monitoring — an immediate market via co-ops.",
    },
    source: "Detik Finance; Kontan; Bisnis.com",
    url: "https://finance.detik.com/berita-ekonomi-bisnis/d-7536300/ri-bakal-impor-1-3-juta-sapi-buat-program-makan-bergizi-gratis",
  },
  {
    tag: { id: "Pembiayaan · KUR", en: "Finance · KUR" },
    year: "2025",
    region: "ID",
    title: "Usulan KUR khusus peternak: bunga 3% + masa tenggang 1 tahun",
    stat: "6% → 3%",
    statLabel: { id: "usulan bunga KUR peternakan (Juli 2025)", en: "proposed livestock KUR rate (Jul 2025)" },
    summary: {
      id: "Ditjen PKH mengusulkan KUR budidaya sapi 3%/tahun dengan grace period 1 tahun. Peternak kecil 2–3 ekor masih sulit mengakses KUR reguler 6%. Status final perlu dikonfirmasi ke bank penyalur.",
      en: "The Livestock Directorate proposed 3%/yr cattle KUR with a 1-year grace period. Smallholders with 2–3 head still struggle with regular 6% KUR. Final status to be confirmed with lending banks.",
    },
    implication: {
      id: "Bank butuh data agunan ternak yang bisa diverifikasi — celah yang diisi Skor Ternak.",
      en: "Banks need verifiable livestock-collateral data — the gap Skor Ternak fills.",
    },
    source: "Bisnis.com; Kontan",
    url: "https://ekonomi.bisnis.com/read/20250716/99/1893835/wacana-kur-3-jadi-angin-segar-bagi-peternak-sapi",
  },
  {
    tag: { id: "Asuransi · AUTS", en: "Insurance · AUTS" },
    year: "2023–2026",
    region: "ID",
    title: "Asuransi Usaha Ternak Sapi/Kerbau (Permentan 30/2023)",
    stat: "Rp40 rb",
    statLabel: { id: "premi peternak per ekor/tahun (80% disubsidi)", en: "farmer premium per head/yr (80% subsidised)" },
    summary: {
      id: "Premi Rp200 rb/ekor/tahun, pemerintah menanggung Rp160 rb. Partisipasi masih fluktuatif antar wilayah; klaim butuh bukti kematian/kehilangan yang terdokumentasi.",
      en: "Premium Rp200k/head/yr, government pays Rp160k. Uptake varies by region; claims need documented proof of death or loss.",
    },
    implication: {
      id: "Event log + GPS + foto dari Ternakin bisa jadi paket bukti klaim otomatis.",
      en: "Ternakin's event log + GPS + photos can become an automatic claim evidence pack.",
    },
    source: "Kementan e-Publikasi; Diskanak Kab. Bogor",
    url: "https://epublikasi.pertanian.go.id/berkala/jae/article/view/3438",
  },
  {
    tag: { id: "Benchmark · Halter", en: "Benchmark · Halter" },
    year: "2024",
    region: "Global",
    title: "AgFirst & Transform Agri: dampak Halter di 10 peternakan sapi perah NZ",
    stat: "+13,2%",
    statLabel: { id: "laba sebelum pajak (EBIT) rata-rata", en: "average profit before tax (EBIT)" },
    summary: {
      id: "Rata-rata +8,9% rumput terpanen dan +9,5% padatan susu per hektar. Catatan: sampel kecil, dipublikasikan di situs Halter. Klaim hemat tenaga \"40+ jam/minggu\" adalah testimoni pemasaran.",
      en: "Average +8.9% pasture harvested and +9.5% milk solids per hectare. Caveat: small sample, published on Halter's site. The \"40+ hrs/week\" labour claim is marketing testimony.",
    },
    implication: {
      id: "Bukti bahwa data per-ekor menghasilkan profit — namun model pastoral NZ ≠ kandang rakyat Indonesia.",
      en: "Proof that per-animal data drives profit — but NZ pastoral systems ≠ Indonesian smallholder pens.",
    },
    source: "Halter News",
    url: "https://www.halterhq.com/news/independent-research-confirms-profit-gains-from-halter-technology-on-nz-dairy-farms",
  },
  {
    tag: { id: "Benchmark · Kalung sapi", en: "Benchmark · Cow collars" },
    year: "2024",
    region: "Global",
    title: "Our Land and Water (NZ): evaluasi kalung sapi",
    stat: "$40–197",
    statLabel: { id: "biaya teknologi kalung per sapi/tahun (NZD)", en: "collar tech cost per cow/yr (NZD)" },
    summary: {
      id: "Kalung mengurangi kebutuhan tenaga kerja terampil dan membebaskan staf. Biaya bervariasi lebar; ±6% kalung lepas per tahun di satu peternakan.",
      en: "Collars reduce skilled-labour needs and free up staff. Costs vary widely; ~6% of collars fell off per year on one farm.",
    },
    implication: {
      id: "Harga harus 5–10× lebih murah untuk Indonesia → ear tag + gateway bersama, bukan kalung premium.",
      en: "Price must be 5–10× lower for Indonesia → ear tags + shared gateways, not premium collars.",
    },
    source: "Our Land and Water",
    url: "https://ourlandandwater.nz/news/cow-collars-proving-their-worth-for-dairy-farmers/",
  },
];
