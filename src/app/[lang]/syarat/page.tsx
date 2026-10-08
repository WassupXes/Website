import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import Legal from "@/components/Legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.terms) };
}

const sections = [
  { h: { id: "Layanan", en: "Service" }, p: { id: "Ternakin.ai menyediakan perangkat pemantauan ternak, aplikasi, dan analitik. Informasi kesehatan bersifat pendukung keputusan dan tidak menggantikan diagnosis dokter hewan.", en: "Ternakin.ai provides livestock monitoring devices, software and analytics. Health insights support decisions and do not replace a veterinarian's diagnosis." } },
  { h: { id: "Uji coba 30 hari", en: "30-day trial" }, p: { id: "Perangkat uji coba tetap milik Ternakin. Peserta wajib menjaga perangkat secara wajar dan mengembalikannya bila tidak melanjutkan. Kuota terbatas dan tunduk pada verifikasi.", en: "Trial devices remain Ternakin property. Participants must take reasonable care of them and return them if not continuing. Slots are limited and subject to verification." } },
  { h: { id: "Pembiayaan", en: "Financing" }, p: { id: "Ternakin bukan lembaga keuangan. Keputusan kredit, bunga, dan syarat pembiayaan sepenuhnya ditentukan oleh mitra bank/koperasi/multifinance yang berizin OJK. Simulasi di situs ini hanya ilustrasi.", en: "Ternakin is not a financial institution. Credit decisions, rates and terms are set entirely by OJK-licensed partner banks/co-ops/multifinance companies. Simulations on this site are illustrative only." } },
  { h: { id: "Data & angka", en: "Data & figures" }, p: { id: "Angka riset dikutip dari sumber publik yang ditautkan. Angka bertanda \"proyeksi\" adalah target, bukan hasil yang dijamin. Data pada demo dashboard adalah simulasi.", en: "Research figures are quoted from linked public sources. Figures marked \"projection\" are targets, not guaranteed results. Dashboard demo data is simulated." } },
  { h: { id: "Hukum yang berlaku", en: "Governing law" }, p: { id: "Syarat ini diatur oleh hukum Republik Indonesia.", en: "These terms are governed by the laws of the Republic of Indonesia." } },
];

export default async function Syarat({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Legal lang={lang} title={nav.terms} sections={sections} />;
}
