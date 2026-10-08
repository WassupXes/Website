import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import Legal from "@/components/Legal";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.privacy) };
}

const sections = [
  { h: { id: "Data yang kami kumpulkan", en: "Data we collect" }, p: { id: "Data kontak yang Anda kirim lewat formulir (nama, email, nomor WhatsApp, organisasi, provinsi, jumlah ternak), serta data sensor ternak (aktivitas, ruminasi, suhu, lokasi relatif) bila Anda menggunakan perangkat Ternakin.", en: "Contact data you submit via forms (name, email, WhatsApp number, organisation, province, herd size), plus livestock sensor data (activity, rumination, temperature, relative location) when you use Ternakin devices." } },
  { h: { id: "Dasar hukum", en: "Legal basis" }, p: { id: "Pemrosesan dilakukan sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi, berdasarkan persetujuan Anda dan pelaksanaan perjanjian layanan.", en: "Processing follows Indonesia's Law No. 27 of 2022 on Personal Data Protection, based on your consent and performance of the service agreement." } },
  { h: { id: "Penggunaan data", en: "How we use data" }, p: { id: "Untuk menghubungi Anda, menjalankan uji coba dan layanan, mengirim newsletter (bisa berhenti kapan saja), dan meningkatkan model analitik secara teragregasi.", en: "To contact you, run trials and services, send newsletters (unsubscribe anytime), and improve analytics models in aggregate." } },
  { h: { id: "Berbagi dengan pihak ketiga", en: "Sharing with third parties" }, p: { id: "Skor Ternak dan data ternak hanya dibagikan ke bank, koperasi, asuransi, atau instansi pemerintah setelah Anda memberikan persetujuan eksplisit, dan dapat dicabut kapan saja.", en: "Skor Ternak and livestock data are shared with lenders, co-ops, insurers or government agencies only after your explicit consent, which you can revoke at any time." } },
  { h: { id: "Hak Anda", en: "Your rights" }, p: { id: "Anda berhak mengakses, memperbaiki, menghapus, dan menarik persetujuan atas data pribadi Anda dengan menghubungi hello@ternakin.ai.", en: "You may access, correct, delete and withdraw consent for your personal data by contacting hello@ternakin.ai." } },
];

export default async function Privasi({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Legal lang={lang} title={nav.privacy} sections={sections} />;
}
