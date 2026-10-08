import type { L } from "@/lib/i18n";

export const advantages: { key: string; title: L; body: L; tag: L }[] = [
  {
    key: "score",
    title: { id: "Skor Ternak untuk KUR", en: "Skor Ternak for KUR loans" },
    body: {
      id: "Data harian kesehatan, pertumbuhan & reproduksi menjadi skor kredit yang bisa diaudit bank — plus pemantauan agunan ternak sepanjang tenor.",
      en: "Daily health, growth and breeding data becomes a bank-auditable credit score — plus livestock-collateral monitoring for the whole loan term.",
    },
    tag: { id: "Belum ada di Halter / Ceres Tag", en: "Not offered by Halter / Ceres Tag" },
  },
  {
    key: "auts",
    title: { id: "Klaim AUTS otomatis", en: "Automatic AUTS claims" },
    body: {
      id: "Saat ternak mati atau hilang, timeline sensor + GPS + foto langsung jadi paket bukti klaim Asuransi Usaha Ternak Sapi.",
      en: "When an animal dies or goes missing, the sensor timeline + GPS + photos become an AUTS insurance claim evidence pack.",
    },
    tag: { id: "Spesifik Indonesia", en: "Indonesia-specific" },
  },
  {
    key: "gateway",
    title: { id: "Gateway berbagi per desa", en: "Shared village gateway" },
    body: {
      id: "Satu gateway LoRa tenaga surya untuk satu kelompok ternak. Biaya infrastruktur dibagi, cocok untuk peternak 2–5 ekor.",
      en: "One solar LoRa gateway per farmer group. Infrastructure cost is shared — right-sized for 2–5 head farmers.",
    },
    tag: { id: "Model untuk peternakan rakyat", en: "Built for smallholders" },
  },
  {
    key: "wa",
    title: { id: "WhatsApp-first", en: "WhatsApp-first" },
    body: {
      id: "Notifikasi & perintah lewat WhatsApp dalam Bahasa Indonesia. Dashboard web untuk koperasi, bank & dinas.",
      en: "Alerts and commands via WhatsApp in Bahasa Indonesia. Web dashboards for co-ops, lenders and agencies.",
    },
    tag: { id: "Tanpa install aplikasi", en: "No app install" },
  },
  {
    key: "ews",
    title: { id: "Early warning PMK/LSD", en: "FMD/LSD early warning" },
    body: {
      id: "Anomali ruminasi di beberapa kandang dalam satu desa ditandai sebagai klaster, lengkap dengan draf laporan untuk petugas dinas.",
      en: "Rumination anomalies across pens in one village are flagged as a cluster, with a report draft for district officers.",
    },
    tag: { id: "Belajar dari wabah 2022", en: "Lessons from the 2022 outbreak" },
  },
  {
    key: "qurban",
    title: { id: "Qurban Planner + data nasional", en: "Qurban Planner + national data" },
    body: {
      id: "Target bobot hitung mundur ke Iduladha, heat stress dari BMKG, harga acuan & populasi BPS dalam satu layar.",
      en: "Weight targets counting down to Eid al-Adha, heat stress from BMKG, reference prices and BPS population on one screen.",
    },
    tag: { id: "Konteks lokal", en: "Local context" },
  },
];

export const faqs: { q: L; a: L }[] = [
  {
    q: { id: "Apa bedanya Ternakin dengan Halter?", en: "How is Ternakin different from Halter?" },
    a: {
      id: "Halter adalah kalung virtual fencing premium untuk peternakan pastoral luas di NZ, Australia & AS (±US$5–10/ekor/bulan + menara). Ternakin dirancang untuk kandang rakyat Indonesia: ear tag hemat, gateway berbagi per desa, WhatsApp, serta lapisan kredit & asuransi yang tidak dimiliki Halter.",
      en: "Halter is a premium virtual-fencing collar for large pastoral farms in NZ, Australia & the US (~US$5–10/cow/month + towers). Ternakin is built for Indonesian smallholder pens: low-cost ear tags, shared village gateways, WhatsApp, plus credit and insurance layers Halter doesn't offer.",
    },
  },
  {
    q: { id: "Apakah butuh sinyal internet di kandang?", en: "Do I need internet at the pen?" },
    a: {
      id: "Tidak. Ear tag mengirim data ke gateway LoRa (jangkauan ±2–5 km). Cukup gateway yang terhubung ke 4G/WiFi; data tersimpan sementara saat sinyal putus.",
      en: "No. Ear tags send data to a LoRa gateway (~2–5 km range). Only the gateway needs 4G/WiFi; data is buffered when the signal drops.",
    },
  },
  {
    q: { id: "Berapa harganya?", en: "How much does it cost?" },
    a: {
      id: "Harga resmi segera diumumkan. Daftar newsletter untuk harga peluncuran, atau ajukan uji coba gratis 30 hari dan program cicilan perangkat.",
      en: "Official pricing is coming soon. Join the newsletter for launch pricing, or apply for a free 30-day trial and device installment programme.",
    },
  },
  {
    q: { id: "Bagaimana program uji coba 30 hari?", en: "How does the 30-day trial work?" },
    a: {
      id: "Kami pasang hingga 10 ear tag + 1 gateway di kandang Anda selama 30 hari tanpa biaya. Setelah itu Anda memilih lanjut (beli/cicil) atau perangkat kami ambil kembali.",
      en: "We install up to 10 ear tags + 1 gateway on your farm for 30 days at no cost. Afterwards you choose to continue (buy/installments) or we collect the devices.",
    },
  },
  {
    q: { id: "Data saya milik siapa?", en: "Who owns my data?" },
    a: {
      id: "Milik Anda. Skor Ternak hanya dibagikan ke bank, koperasi, atau asuransi setelah Anda menyetujuinya, sesuai UU Pelindungan Data Pribadi (UU 27/2022).",
      en: "You do. Skor Ternak is shared with banks, co-ops or insurers only after your consent, in line with Indonesia's Personal Data Protection Law (Law 27/2022).",
    },
  },
  {
    q: { id: "Ternak apa saja yang didukung?", en: "Which livestock are supported?" },
    a: {
      id: "Sapi potong, sapi perah, dan kerbau saat peluncuran. Versi tag untuk kambing & domba sedang diuji.",
      en: "Beef cattle, dairy cattle and buffalo at launch. A tag variant for goats & sheep is in testing.",
    },
  },
];
