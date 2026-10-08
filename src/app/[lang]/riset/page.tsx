import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { PageHero, Pill, SourceLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { research } from "@/lib/content/research";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.research) };
}

export default async function Riset({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.research)}
        title={id ? <>Dibangun di atas <span className="text-lime">data, bukan asumsi.</span></> : <>Built on <span className="text-lime">data, not assumptions.</span></>}
        body={id ? "Riset Indonesia 2023–2026 dan benchmark global yang membentuk produk kami. Setiap angka bisa ditelusuri ke sumbernya; keterbatasan studi kami tulis apa adanya." : "Indonesian research from 2023–2026 and global benchmarks that shaped our product. Every number links to its source; study limitations are stated plainly."}
      />
      <section className="bg-sand-50 py-24">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {research.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.05} className="card flex flex-col p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone={r.region === "ID" ? "moss" : "sand"}>{r.region === "ID" ? "🇮🇩 Indonesia" : "🌏 Global"}</Pill>
                <Pill tone="sand">{t(lang, r.tag)}</Pill>
                <span className="ml-auto text-xs font-semibold text-ink/40">{r.year}</span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight">{r.title}</h2>
              <div className="mt-5 flex items-baseline gap-3 rounded-2xl bg-ink p-5 text-white">
                <span className="h-display text-4xl text-lime">{r.stat}</span>
                <span className="text-sm text-white/65">{t(lang, r.statLabel)}</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">{t(lang, r.summary)}</p>
              <p className="mt-4 flex-1 border-l-2 border-lime pl-4 text-sm font-medium text-ink/80">{t(lang, r.implication)}</p>
              <div className="mt-6"><SourceLink href={r.url} label={r.source} /></div>
            </Reveal>
          ))}
        </div>
        <div className="container-x mt-10">
          <p className="max-w-3xl text-sm text-ink/50">
            {id
              ? "Catatan metodologi: sebagian besar studi Indonesia berskala lokal dengan sampel purposif sehingga tidak bisa digeneralisasi nasional. Angka populasi BPS berbeda antar rilis (mis. 11,75–13,27 jt ekor untuk 2024). Studi Halter dipublikasikan di situs perusahaan dengan sampel 10 peternakan. Status KUR 3% adalah usulan per Juli 2025."
              : "Methodology note: most Indonesian studies are local with purposive samples and cannot be generalised nationally. BPS population figures differ across releases (e.g. 11.75–13.27M head for 2024). The Halter study was published on the company's site with a 10-farm sample. The 3% KUR rate was a proposal as of July 2025."}
          </p>
        </div>
      </section>
    </>
  );
}
