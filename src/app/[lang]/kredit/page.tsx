import type { Metadata } from "next";
import { BadgeCheck, CalendarClock, FileCheck2, HandCoins, ShieldCheck, Tag } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { PageHero, Pill, SectionHead, SourceLink } from "@/components/ui";
import KurSimulator from "@/components/KurSimulator";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.credit) };
}

export default async function Kredit({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";

  const programs = [
    {
      icon: Tag,
      t: id ? "Uji coba gratis 30 hari" : "Free 30-day trial",
      b: id ? "Hingga 10 TernakTag + 1 gateway terpasang tanpa biaya dan tanpa deposit. Setelah 30 hari: lanjut atau perangkat kami ambil kembali." : "Up to 10 TernakTags + 1 gateway, installed free with no deposit. After 30 days: continue or we collect the devices.",
      tag: id ? "Mulai di sini" : "Start here",
    },
    {
      icon: HandCoins,
      t: id ? "Cicilan perangkat" : "Device installments",
      b: id ? "Bayar perangkat bertahap 6–24 bulan lewat mitra bank, koperasi, atau multifinance. Cicilan dirancang agar lebih kecil dari penghematan bulanan." : "Pay for devices over 6–24 months via partner banks, co-ops or multifinance. Installments are designed to stay below monthly savings.",
      tag: id ? "Skema mitra" : "Partner scheme",
    },
    {
      icon: BadgeCheck,
      t: id ? "Jalur KUR dengan Skor Ternak" : "KUR pathway with Skor Ternak",
      b: id ? "Setelah 60–90 hari data, Skor Ternak dapat dibagikan (atas izin Anda) ke bank penyalur KUR sebagai data pendukung untuk pembelian bakalan, indukan, atau pakan." : "After 60–90 days of data, Skor Ternak can be shared (with your consent) with KUR lenders as supporting data for buying feeders, breeding cows or feed.",
      tag: id ? "Kredit usaha" : "Business credit",
    },
    {
      icon: ShieldCheck,
      t: id ? "Bundling asuransi AUTS" : "AUTS insurance bundle",
      b: id ? "Kami bantu daftarkan sapi betina produktif ke AUTS (premi peternak Rp40 rb/ekor/tahun, 80% disubsidi pemerintah) dan siapkan paket bukti klaim otomatis." : "We help enrol productive cows in AUTS (farmer premium Rp40k/head/yr, 80% government-subsidised) and prepare automatic claim evidence packs.",
      tag: id ? "Lindungi agunan" : "Protect collateral",
    },
  ];

  const steps = [
    { icon: FileCheck2, t: id ? "Daftar" : "Apply", b: id ? "Isi formulir; tim kami menghubungi via WhatsApp dalam 2 hari kerja." : "Fill in the form; our team contacts you on WhatsApp within 2 business days." },
    { icon: Tag, t: id ? "Pasang & uji coba" : "Install & trial", b: id ? "Pemasangan tag + gateway, 30 hari gratis." : "Tags + gateway installed, 30 days free." },
    { icon: CalendarClock, t: id ? "Data terbentuk" : "Data builds up", b: id ? "Skor Ternak terbentuk dari 60–90 hari data harian." : "Skor Ternak forms from 60–90 days of daily data." },
    { icon: HandCoins, t: id ? "Pengajuan ke mitra" : "Lender application", b: id ? "Pengajuan cicilan/KUR ke mitra; keputusan tetap di bank." : "Installment/KUR application to partners; the bank decides." },
    { icon: ShieldCheck, t: id ? "Pantau & lindungi" : "Monitor & protect", b: id ? "Agunan dipantau, AUTS aktif, notifikasi ke Anda & mitra." : "Collateral monitored, AUTS active, alerts to you & partners." },
  ];

  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.credit)}
        title={id ? <>Mulai tanpa modal. <span className="text-lime">Tumbuh dengan data.</span></> : <>Start with no capital. <span className="text-lime">Grow with data.</span></>}
        body={id ? "Program peluncuran Ternakin: uji coba gratis 30 hari, cicilan perangkat, jalur KUR, dan asuransi AUTS — dalam satu alur." : "Ternakin launch programme: free 30-day trial, device installments, KUR pathway and AUTS insurance — in one flow."}
      />

      <section className="bg-sand-50 py-24">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {programs.map((p) => (
            <div key={p.t} className="card p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime"><p.icon className="h-5 w-5" /></span>
                <Pill tone="lime">{p.tag}</Pill>
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">{p.t}</h2>
              <p className="mt-3 leading-relaxed text-ink/65">{p.b}</p>
            </div>
          ))}
        </div>
        <p className="container-x mt-4 text-xs text-ink/45">{id ? "Syarat program peluncuran bersifat draf dan dapat berubah. Mitra pembiayaan sedang dalam proses penjajakan." : "Launch programme terms are draft and may change. Financing partners are being onboarded."}</p>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Alur" : "Flow"} title={id ? "Dari uji coba ke pembiayaan, 5 langkah." : "From trial to financing in 5 steps."} />
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.t} className="relative rounded-3xl border border-ink/10 p-6">
                <span className="font-mono text-xs text-moss-600">0{i + 1}</span>
                <s.icon className="mt-4 h-6 w-6 text-ink" />
                <p className="mt-4 font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-ink/60">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand-50 py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Simulasi KUR" : "KUR simulator"} title={id ? "Berapa cicilan KUR ternak Anda?" : "What would your livestock KUR cost?"} body={id ? "Bandingkan KUR reguler 6% dengan usulan KUR khusus peternak 3% + masa tenggang 12 bulan." : "Compare regular 6% KUR with the proposed 3% livestock KUR + 12-month grace period."} />
          <div className="mt-6 flex flex-wrap gap-4">
            <SourceLink href="https://ekonomi.bisnis.com/read/20250716/99/1893835/wacana-kur-3-jadi-angin-segar-bagi-peternak-sapi" label="Bisnis.com, Jul 2025" />
            <SourceLink href="https://epublikasi.pertanian.go.id/berkala/jae/article/view/3438" label="AUTS · Kementan" />
          </div>
          <div className="mt-10"><KurSimulator lang={lang} /></div>
        </div>
      </section>

      <section id="ajukan" className="bg-ink py-24">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="text-white lg:col-span-2">
            <SectionHead dark eyebrow={id ? "Ajukan" : "Apply"} title={id ? "Ajukan uji coba & pembiayaan." : "Apply for trial & financing."} body={id ? "Prioritas untuk kelompok ternak, koperasi, dan peternak dengan ≥5 ekor sapi." : "Priority for farmer groups, co-ops and farmers with ≥5 cattle."} />
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8 lg:col-span-3">
            <LeadForm lang={lang} type="kredit" fields={["name", "phone", "email", "org", "province", "herd", "species", "role", "amount", "message"]} cta={id ? "Ajukan sekarang" : "Apply now"} />
          </div>
        </div>
      </section>
    </>
  );
}
