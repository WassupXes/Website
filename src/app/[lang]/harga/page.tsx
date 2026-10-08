import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { href, t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { CtaLink, Eyebrow } from "@/components/ui";
import { NewsletterForm } from "@/components/LeadForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.pricing) };
}

export default async function Harga({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const tiers = [
    { n: id ? "Peternak" : "Farmer", d: id ? "Untuk peternak & kelompok ternak kecil" : "For farmers & small groups", f: id ? ["Ear tag + gateway berbagi", "WhatsApp alerts", "Qurban Planner"] : ["Ear tags + shared gateway", "WhatsApp alerts", "Qurban Planner"] },
    { n: id ? "Koperasi" : "Co-op", d: id ? "Untuk koperasi & feedlot" : "For co-ops & feedlots", f: id ? ["Dashboard multi-anggota", "Reproduksi & IB", "Laporan & ekspor"] : ["Multi-member dashboard", "Breeding & AI", "Reports & export"], hi: true },
    { n: id ? "Mitra" : "Partner", d: id ? "Untuk bank, asuransi & pemerintah" : "For lenders, insurers & government", f: id ? ["Skor Ternak & API", "Pemantauan agunan", "Peta wilayah"] : ["Skor Ternak & API", "Collateral monitoring", "Regional maps"] },
  ];
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-32 text-white sm:pt-40">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow dark>{t(lang, nav.pricing)}</Eyebrow>
          <h1 className="h-display mt-5 text-5xl sm:text-7xl">{t(lang, common.comingSoon)}.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">{id ? "Kami sedang menyelesaikan uji lapangan untuk memastikan harga yang masuk akal bagi peternak rakyat. Daftar untuk jadi yang pertama tahu — dan dapatkan harga peluncuran." : "We're finishing field trials to make sure pricing makes sense for smallholders. Sign up to be first to know — and lock in launch pricing."}</p>
          <div className="mx-auto mt-8 max-w-lg"><NewsletterForm lang={lang} type="waitlist" /></div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {tiers.map((tr) => (
            <div key={tr.n} className={`relative overflow-hidden rounded-3xl border p-8 ${tr.hi ? "border-lime/40 bg-ink-700" : "border-white/10 bg-ink-800"}`}>
              <p className="font-display text-2xl font-semibold">{tr.n}</p>
              <p className="mt-1 text-sm text-white/55">{tr.d}</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="select-none font-display text-4xl font-semibold blur-md" aria-hidden>Rp•••</span>
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs"><Lock className="h-3 w-3" /> {t(lang, common.comingSoon)}</span>
              </div>
              <ul className="mt-8 space-y-2 text-sm text-white/70">
                {tr.f.map((f) => <li key={f}>— {f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <p className="text-white/60">{id ? "Tidak mau menunggu?" : "Don't want to wait?"}</p>
          <CtaLink href={href(lang, "/uji-coba")}>{t(lang, nav.trial)}</CtaLink>
          <CtaLink href={href(lang, "/kredit")} variant="ghost-light">{t(lang, nav.credit)}</CtaLink>
        </div>
      </div>
    </section>
  );
}
