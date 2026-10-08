import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { Eyebrow } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.trial) };
}

export default async function UjiCoba({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const includes = id
    ? ["Hingga 10 TernakTag + 1 gateway desa", "Pemasangan oleh tim Ternakin", "Notifikasi WhatsApp + akses dashboard", "Laporan hasil 30 hari & Skor Ternak awal", "Tanpa biaya, tanpa deposit, tanpa kontrak"]
    : ["Up to 10 TernakTags + 1 village gateway", "Installation by the Ternakin team", "WhatsApp alerts + dashboard access", "30-day results report & initial Skor Ternak", "No cost, no deposit, no contract"];
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-32 sm:pt-40">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="container-x relative grid gap-12 lg:grid-cols-2">
        <div className="text-white">
          <Eyebrow dark>{t(lang, nav.trial)}</Eyebrow>
          <h1 className="h-display mt-5 text-5xl sm:text-6xl">{id ? <>30 hari. Gratis. <span className="text-lime">Lihat sendiri hasilnya.</span></> : <>30 days. Free. <span className="text-lime">See the results yourself.</span></>}</h1>
          <p className="mt-6 max-w-lg text-lg text-white/65">{id ? "Slot uji coba terbatas per provinsi pada tahap peluncuran. Kami prioritaskan kelompok ternak dan koperasi." : "Trial slots are limited per province during launch. Farmer groups and co-ops get priority."}</p>
          <ul className="mt-8 space-y-3">
            {includes.map((x) => (
              <li key={x} className="flex gap-3 text-white/85"><CheckCircle2 className="h-5 w-5 shrink-0 text-lime" />{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 sm:p-8">
          <LeadForm lang={lang} type="trial" fields={["name", "phone", "email", "org", "province", "herd", "species", "role", "message"]} cta={id ? "Daftar uji coba" : "Request trial"} />
        </div>
      </div>
    </section>
  );
}
