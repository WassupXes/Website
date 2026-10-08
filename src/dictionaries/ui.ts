import type { L } from "@/lib/i18n";

export const nav = {
  product: { id: "Produk", en: "Product" },
  solutions: { id: "Solusi", en: "Solutions" },
  demo: { id: "Demo Dashboard", en: "Dashboard Demo" },
  advantage: { id: "Keunggulan", en: "Why Ternakin" },
  data: { id: "Data & Integrasi", en: "Data & Integrations" },
  research: { id: "Riset", en: "Research" },
  credit: { id: "Program Kredit", en: "Financing" },
  pricing: { id: "Harga", en: "Pricing" },
  about: { id: "Tentang", en: "About" },
  contact: { id: "Kontak", en: "Contact" },
  trial: { id: "Coba Gratis 30 Hari", en: "Start 30-Day Trial" },
  trialShort: { id: "Coba Gratis", en: "Free Trial" },
  resources: { id: "Sumber", en: "Resources" },
  company: { id: "Perusahaan", en: "Company" },
  privacy: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  terms: { id: "Syarat & Ketentuan", en: "Terms" },
} satisfies Record<string, L>;

export const common = {
  learnMore: { id: "Pelajari lebih lanjut", en: "Learn more" },
  seeDemo: { id: "Lihat demo dashboard", en: "See dashboard demo" },
  talkToUs: { id: "Hubungi tim kami", en: "Talk to our team" },
  applyCredit: { id: "Ajukan pembiayaan", en: "Apply for financing" },
  comingSoon: { id: "Segera Hadir", en: "Coming Soon" },
  source: { id: "Sumber", en: "Source" },
  projection: { id: "Target pilot / proyeksi", en: "Pilot target / projection" },
  illustration: { id: "Ilustrasi", en: "Illustration" },
  mockData: { id: "Data simulasi untuk demo", en: "Simulated data for demo" },
  live: { id: "API publik", en: "Public API" },
  snapshot: { id: "Snapshot data acuan", en: "Reference snapshot" },
  roadmap: { id: "Kemitraan (roadmap)", en: "Partnership (roadmap)" },
} satisfies Record<string, L>;

export const forms = {
  name: { id: "Nama lengkap", en: "Full name" },
  email: { id: "Email", en: "Email" },
  phone: { id: "No. WhatsApp", en: "WhatsApp number" },
  org: { id: "Nama peternakan / koperasi / instansi", en: "Farm / co-op / organisation" },
  province: { id: "Provinsi", en: "Province" },
  herd: { id: "Jumlah ternak (ekor)", en: "Herd size (head)" },
  species: { id: "Jenis ternak", en: "Livestock type" },
  role: { id: "Peran Anda", en: "Your role" },
  message: { id: "Pesan", en: "Message" },
  amount: { id: "Kebutuhan pembiayaan (Rp)", en: "Financing needed (IDR)" },
  submit: { id: "Kirim", en: "Submit" },
  subscribe: { id: "Berlangganan", en: "Subscribe" },
  sending: { id: "Mengirim…", en: "Sending…" },
  success: { id: "Terima kasih! Tim kami akan menghubungi Anda.", en: "Thank you! Our team will be in touch." },
  successNews: { id: "Berhasil! Cek inbox Anda untuk kabar terbaru Ternakin.", en: "You're in! Watch your inbox for Ternakin updates." },
  error: { id: "Gagal mengirim. Coba lagi atau hubungi kami via WhatsApp.", en: "Couldn't submit. Try again or reach us on WhatsApp." },
  emailPlaceholder: { id: "email@peternakan.id", en: "you@farm.com" },
  newsletterTitle: { id: "Kabar peternakan presisi, tiap bulan.", en: "Precision livestock news, monthly." },
  newsletterBody: {
    id: "Riset terbaru, harga pasar, jadwal uji coba, dan peluncuran harga resmi — langsung ke inbox Anda.",
    en: "Fresh research, market prices, trial slots and our official pricing launch — straight to your inbox.",
  },
  consent: {
    id: "Dengan mengirim, Anda setuju dihubungi oleh Ternakin.ai sesuai Kebijakan Privasi.",
    en: "By submitting you agree to be contacted by Ternakin.ai per our Privacy Policy.",
  },
} satisfies Record<string, L>;

export const speciesOptions: L[] = [
  { id: "Sapi potong", en: "Beef cattle" },
  { id: "Sapi perah", en: "Dairy cattle" },
  { id: "Kerbau", en: "Buffalo" },
  { id: "Kambing / domba", en: "Goat / sheep" },
  { id: "Campuran", en: "Mixed" },
];

export const roleOptions: L[] = [
  { id: "Peternak / kelompok ternak", en: "Farmer / farmer group" },
  { id: "Koperasi", en: "Cooperative" },
  { id: "Perusahaan feedlot / breeding", en: "Feedlot / breeding company" },
  { id: "Bank / lembaga keuangan / asuransi", en: "Bank / lender / insurer" },
  { id: "Pemerintah / dinas", en: "Government / agency" },
  { id: "Offtaker / RPH / industri", en: "Offtaker / abattoir / industry" },
  { id: "Investor / media / lainnya", en: "Investor / media / other" },
];

export const provinces = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung",
  "Kep. Bangka Belitung", "Kep. Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
  "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah",
  "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara",
  "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya",
];
