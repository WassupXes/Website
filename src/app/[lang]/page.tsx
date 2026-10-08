import Link from "next/link";
import { ArrowUpRight, BellRing, CalendarHeart, CloudSun, HeartPulse, Radio, Scale, Smartphone, Tag, TrendingUp, Wallet } from "lucide-react";
import { href, t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { CtaLink, Eyebrow, SectionHead, SourceLink, Pill } from "@/components/ui";
import HeroVisual from "@/components/HeroVisual";
import DashboardDemo from "@/components/DashboardDemo";
import Reveal from "@/components/Reveal";
import { UseCaseIcon } from "@/components/icons";
import { useCases } from "@/lib/content/usecases";
import { research } from "@/lib/content/research";
import { advantages, faqs } from "@/lib/content/home";

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const stats = [research[3], research[0], research[2], research[4]];

  const features = [
    { icon: HeartPulse, t: id ? "Kesehatan" : "Health", b: id ? "Ruminasi & aktivitas per ekor, peringatan 2–3 hari sebelum gejala terlihat." : "Per-animal rumination & activity, alerts 2–3 days before symptoms show." },
    { icon: CalendarHeart, t: id ? "Reproduksi" : "Breeding", b: id ? "Deteksi birahi otomatis & jendela IB dikirim ke inseminator." : "Automatic heat detection & AI windows sent to inseminators." },
    { icon: Scale, t: id ? "Pertumbuhan" : "Growth", b: id ? "Kurva bobot, ADG dan HPP pakan per kg bobot." : "Weight curves, ADG and feed cost per kg gained." },
    { icon: CloudSun, t: id ? "Cuaca & THI" : "Weather & THI", b: id ? "Heat stress dari prakiraan BMKG tingkat desa." : "Heat stress from BMKG village-level forecasts." },
    { icon: TrendingUp, t: id ? "Pasar" : "Markets", b: id ? "Harga acuan & populasi BPS untuk waktu jual terbaik." : "Reference prices & BPS population for best sell timing." },
    { icon: Wallet, t: id ? "Keuangan" : "Finance", b: id ? "Skor Ternak, pemantauan agunan & klaim AUTS." : "Skor Ternak, collateral monitoring & AUTS claims." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-white sm:pt-36 lg:pb-24">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute -left-40 top-20 h-[560px] w-[560px] rounded-full bg-moss-500/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Link href={href(lang, "/kredit")} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-xs text-white/80 hover:bg-white/10">
                <span className="rounded-full bg-lime px-2 py-0.5 font-semibold text-ink">{id ? "Baru" : "New"}</span>
                {id ? "Uji coba gratis 30 hari + cicilan perangkat" : "Free 30-day trial + device installments"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="h-display mt-7 text-[3.2rem] sm:text-7xl lg:text-[5.5rem]">
                {id ? (
                  <>Setiap ternak <span className="text-lime">terpantau.</span> Setiap peternak bisa dibiayai.</>
                ) : (
                  <>Every animal <span className="text-lime">monitored.</span> Every farmer financeable.</>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
                {id
                  ? "Ear tag pintar, gateway desa berbagi, dan notifikasi WhatsApp yang mengubah setiap sapi menjadi data — untuk kesehatan, pertumbuhan, kredit, dan asuransi. Dibuat untuk peternakan Indonesia."
                  : "Smart ear tags, shared village gateways and WhatsApp alerts that turn every cow into data — for health, growth, credit and insurance. Built for Indonesian livestock."}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
              <CtaLink href={href(lang, "/uji-coba")}>{t(lang, nav.trial)}</CtaLink>
              <CtaLink href={href(lang, "/demo")} variant="ghost-light">{t(lang, common.seeDemo)}</CtaLink>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <HeroVisual lang={lang} />
          </Reveal>
        </div>

        <div className="container-x relative mt-16 border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-widest text-white/35">{id ? "Data & program yang terhubung" : "Connected data & programmes"}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm font-semibold text-white/55">
            <span>BMKG</span><span>BPS WebAPI</span><span>Panel Harga Bapanas</span><span>KUR</span><span>AUTS / Jasindo</span><span>iSIKHNAS <span className="font-normal text-white/35">(roadmap)</span></span>
          </div>
        </div>
      </section>

      {/* PROBLEM STATS */}
      <section className="bg-sand-50 py-24 sm:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow={id ? "Kenapa sekarang" : "Why now"}
            title={id ? "Indonesia kekurangan daging & susu — dan kehilangan triliunan karena penyakit yang terlambat terdeteksi." : "Indonesia is short on beef & milk — and loses trillions to diseases caught too late."}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="flex flex-col bg-white p-7">
                <p className="h-display text-5xl text-ink">{s.stat}</p>
                <p className="mt-3 text-sm font-medium text-ink/75">{t(lang, s.statLabel)}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/55">{t(lang, s.implication)}</p>
                <div className="mt-5"><SourceLink href={s.url} label={`${s.source}, ${s.year}`} /></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Cara kerja" : "How it works"} title={id ? "Pasang hari ini. Insight besok pagi." : "Install today. Insights tomorrow morning."} />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              { n: "01", icon: Tag, t: id ? "Pasang TernakTag" : "Fit TernakTag", b: id ? "Ear tag tenaga surya dengan akselerometer 3-sumbu & suhu. Pemasangan 2 menit per ekor, oleh tim kami atau mantri setempat." : "Solar ear tag with 3-axis accelerometer & temperature. Two-minute fitting per animal, by our team or local paravets." },
              { n: "02", icon: Radio, t: id ? "Gateway desa berbagi" : "Shared village gateway", b: id ? "Satu gateway LoRa tenaga surya menjangkau ±2–5 km kandang. Data tetap tersimpan saat sinyal putus." : "One solar LoRa gateway covers ~2–5 km of pens. Data is buffered when the signal drops." },
              { n: "03", icon: Smartphone, t: id ? "Insight via WhatsApp & web" : "Insights via WhatsApp & web", b: id ? "Peternak menerima notifikasi WhatsApp. Koperasi, bank & dinas memantau dari dashboard web." : "Farmers get WhatsApp alerts. Co-ops, lenders and agencies monitor from a web dashboard." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="card relative overflow-hidden p-8">
                <span className="absolute right-6 top-4 font-display text-7xl font-semibold text-sand-100">{s.n}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime"><s.icon className="h-5 w-5" /></span>
                <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
                <p className="relative mt-3 leading-relaxed text-ink/60">{s.b}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="flex gap-4 rounded-2xl border border-ink/10 p-5">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-moss-600" />
                <div>
                  <p className="font-semibold">{f.t}</p>
                  <p className="mt-1 text-sm text-ink/60">{f.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD DEMO */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHead dark eyebrow={id ? "Dashboard" : "Dashboard"} title={id ? "Satu layar untuk seluruh kawanan." : "One screen for your whole herd."} body={id ? "Coba langsung: klik tab di samping. Data simulasi dari kelompok ternak 48 ekor." : "Try it: click the tabs. Simulated data from a 48-head farmer group."} />
            <CtaLink href={href(lang, "/demo")} variant="ghost-light">{id ? "Buka demo lengkap" : "Open full demo"}</CtaLink>
          </div>
          <Reveal className="mt-12">
            <DashboardDemo lang={lang} compact />
          </Reveal>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-sand-50 py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow={id ? "Hasil" : "Results"}
              title={id ? "Data per ekor terbukti menaikkan profit." : "Per-animal data is proven to lift profit."}
              body={id ? "Riset independen pada pengguna Halter di Selandia Baru menunjukkan dampak nyata. Target pilot Ternakin kami tetapkan konservatif dan akan dipublikasikan terbuka." : "Independent research on Halter users in New Zealand shows real impact. Ternakin's pilot targets are set conservatively and will be published openly."}
            />
            <div className="mt-6"><SourceLink href={research[7].url} label="AgFirst & Transform Agri via Halter, 2024" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6 sm:col-span-2">
              <div className="flex items-center justify-between"><p className="text-sm font-semibold">Benchmark · Halter (NZ dairy, n=10)</p><Pill tone="sand">{id ? "Terverifikasi" : "Published"}</Pill></div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {[["+13,2%", id ? "laba (EBIT)" : "profit (EBIT)"], ["+9,5%", id ? "padatan susu/ha" : "milk solids/ha"], ["+8,9%", id ? "rumput terpanen" : "pasture harvested"]].map(([v, l]) => (
                  <div key={l}><p className="h-display text-3xl sm:text-4xl">{id ? v : v.replace(",", ".")}</p><p className="mt-1 text-xs text-ink/55">{l}</p></div>
                ))}
              </div>
            </div>
            {[
              ["2–3 " + (id ? "hari" : "days"), id ? "deteksi sakit lebih awal" : "earlier illness detection"],
              ["90%", id ? "birahi terdeteksi" : "heats detected"],
              ["+8–12%", id ? "ADG penggemukan" : "feedlot ADG"],
              ["−30 " + (id ? "hari" : "days"), "calving interval"],
            ].map(([v, l]) => (
              <div key={l} className="card p-6">
                <Pill tone="lime">{t(lang, common.projection)}</Pill>
                <p className="h-display mt-4 text-4xl">{v}</p>
                <p className="mt-1 text-sm text-ink/55">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <SectionHead eyebrow={t(lang, nav.solutions)} title={id ? "Dibuat untuk seluruh rantai nilai ternak." : "Built for the whole livestock value chain."} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u, i) => (
              <Reveal key={u.slug} delay={i * 0.04} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i === useCases.length - 1 ? "lg:col-span-2" : ""}>
                <Link href={href(lang, `/solusi/${u.slug}`)} className={`group flex h-full flex-col justify-between rounded-3xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-card ${i === 0 ? "bg-ink text-white" : "bg-sand-50"}`}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${i === 0 ? "bg-lime text-ink" : "bg-white text-moss-600"}`}><UseCaseIcon name={u.icon} className="h-5 w-5" /></span>
                  <div className="mt-10">
                    <h3 className={`font-display font-semibold tracking-tight ${i === 0 ? "text-4xl" : "text-xl"}`}>{t(lang, u.title)}</h3>
                    <p className={`mt-2 text-sm ${i === 0 ? "text-white/60" : "text-ink/60"}`}>{t(lang, u.short)}</p>
                    <span className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${i === 0 ? "text-lime" : "text-moss-600"}`}>{t(lang, common.learnMore)} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Link href={href(lang, "/kontak")} className="group flex flex-col justify-between rounded-3xl border border-dashed border-ink/20 p-6 hover:border-moss-500">
              <p className="text-sm text-ink/60">{id ? "Kasus Anda berbeda? Integrasi khusus, riset, atau program pemerintah." : "Different use case? Custom integrations, research or government programmes."}</p>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-moss-600">{t(lang, common.talkToUs)} <ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-x">
          <SectionHead dark eyebrow={t(lang, nav.advantage)} title={id ? "Yang belum dikerjakan siapa pun — dan realistis untuk Indonesia." : "What nobody else does yet — and what's realistic for Indonesia."} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.05} className="card-dark p-7">
                <Pill tone="lime">{t(lang, a.tag)}</Pill>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t(lang, a.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{t(lang, a.body)}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><CtaLink href={href(lang, "/keunggulan")} variant="ghost-light">{id ? "Lihat perbandingan lengkap" : "See full comparison"}</CtaLink></div>
        </div>
      </section>

      {/* CREDIT + TRIAL */}
      <section className="bg-lime py-20 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow className="!text-ink"><BellRing className="h-3.5 w-3.5" /> {id ? "Program peluncuran" : "Launch programme"}</Eyebrow>
            <h2 className="h-display mt-4 text-4xl text-ink sm:text-6xl">{id ? "Coba 30 hari gratis. Lanjut dengan cicilan." : "Try free for 30 days. Continue with installments."}</h2>
            <p className="mt-5 max-w-lg text-lg text-ink/70">{id ? "Hingga 10 ear tag + 1 gateway terpasang tanpa biaya. Setelahnya, cicil perangkat lewat mitra bank/koperasi — terhubung ke KUR dan asuransi AUTS." : "Up to 10 ear tags + 1 gateway installed free. Afterwards, pay for devices in installments via partner banks/co-ops — linked to KUR and AUTS insurance."}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <CtaLink href={href(lang, "/uji-coba")} variant="dark">{t(lang, nav.trial)}</CtaLink>
            <CtaLink href={href(lang, "/kredit")} variant="ghost">{t(lang, nav.credit)}</CtaLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50 py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <SectionHead eyebrow="FAQ" title={id ? "Pertanyaan umum" : "Common questions"} />
          <div className="divide-y divide-ink/10 lg:col-span-2">
            {faqs.map((f) => (
              <details key={f.q.id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {t(lang, f.q)}
                  <span className="text-2xl text-moss-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink/65">{t(lang, f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
