import type { Metadata } from "next";
import { Check, Minus, X } from "lucide-react";
import { href, t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { CtaLink, PageHero, Pill, SectionHead, SourceLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { advantages } from "@/lib/content/home";
import { comparisonRows, globalPlayers, localPlayers } from "@/lib/content/data";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.advantage) };
}

function Mark({ v }: { v: boolean | "partial" }) {
  if (v === "partial") return <Minus className="mx-auto h-5 w-5 text-[#C9A227]" />;
  return v ? <Check className="mx-auto h-5 w-5 text-moss-600" /> : <X className="mx-auto h-5 w-5 text-ink/25" />;
}

export default async function Keunggulan({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const cols = ["Ternakin.ai", "Halter / Nofence", "Ceres Tag / CattleEye", id ? "Pemain lokal" : "Local players"];

  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.advantage)}
        title={id ? <>Belajar dari yang terbaik di dunia. <span className="text-lime">Dibangun untuk Indonesia.</span></> : <>Learning from the world&apos;s best. <span className="text-lime">Built for Indonesia.</span></>}
        body={id ? "Halter membuktikan bahwa data per ekor menaikkan profit. Tapi model mereka — kalung premium, padang luas, peternak bermodal besar — tidak cocok untuk 90% peternakan Indonesia. Di situlah celahnya." : "Halter proved per-animal data lifts profit. But its model — premium collars, open pasture, well-capitalised ranchers — doesn't fit 90% of Indonesian farms. That's the gap."}
      />

      <section className="bg-sand-50 py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "6 keunggulan" : "6 advantages"} title={id ? "Lapisan yang belum dibangun siapa pun." : "Layers nobody has built yet."} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.04} className="card p-7">
                <Pill tone="lime">{t(lang, a.tag)}</Pill>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t(lang, a.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{t(lang, a.body)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Perbandingan" : "Comparison"} title={id ? "Ternakin vs pemain global & lokal." : "Ternakin vs global & local players."} />
          <div className="mt-12 overflow-x-auto rounded-3xl border border-ink/10">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-sand-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-ink/60">{id ? "Kemampuan" : "Capability"}</th>
                  {cols.map((c, i) => (
                    <th key={c} className={`p-4 text-center font-semibold ${i === 0 ? "bg-ink text-lime" : "text-ink/70"}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {comparisonRows.map((r) => (
                  <tr key={r.feature.id}>
                    <td className="p-4 text-ink/80">{t(lang, r.feature)}</td>
                    {r.values.map((v, i) => (
                      <td key={i} className={`p-4 ${i === 0 ? "bg-lime/10" : ""}`}><Mark v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink/45">{id ? "Berdasarkan informasi publik per 2025–2026. — = sebagian. Virtual fencing Ternakin terbatas pada notifikasi geofence (tanpa isyarat suara/getar)." : "Based on public information as of 2025–2026. — = partial. Ternakin's virtual fencing is limited to geofence alerts (no sound/vibration cues)."}</p>
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <SectionHead dark eyebrow={id ? "Referensi global" : "Global references"} title={id ? "Siapa mereka, dan apa yang kami pelajari." : "Who they are, and what we learned."} />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {[...globalPlayers, ...localPlayers].map((c) => (
              <div key={c.name} className="card-dark p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-2xl font-semibold">{c.name}</p>
                  <span className="text-xs text-white/50">{c.country}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{t(lang, c.model)}</p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                  <div><dt className="text-[11px] uppercase tracking-wider text-white/35">{id ? "Harga" : "Price"}</dt><dd className="mt-1 text-white/80">{t(lang, c.price)}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-wider text-white/35">{id ? "Kekuatan" : "Strengths"}</dt><dd className="mt-1 text-white/80">{t(lang, c.strengths)}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-wider text-lime/70">{id ? "Celah" : "Gap"}</dt><dd className="mt-1 text-white/80">{t(lang, c.gap)}</dd></div>
                </dl>
                <div className="mt-5 [&_a]:text-white/40"><SourceLink href={c.url} label={id ? "Sumber" : "Source"} /></div>
              </div>
            ))}
          </div>
          <div className="mt-12"><CtaLink href={href(lang, "/demo")}>{id ? "Lihat sendiri di demo" : "See it in the demo"}</CtaLink></div>
        </div>
      </section>
    </>
  );
}
