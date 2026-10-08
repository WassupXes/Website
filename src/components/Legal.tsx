import type { L, Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { Eyebrow } from "./ui";

export default function Legal({ lang, title, sections }: { lang: Lang; title: L; sections: { h: L; p: L }[] }) {
  const id = lang === "id";
  return (
    <>
      <section className="bg-ink pb-16 pt-32 text-white sm:pt-40">
        <div className="container-x">
          <Eyebrow dark>Legal</Eyebrow>
          <h1 className="h-display mt-5 text-5xl sm:text-6xl">{t(lang, title)}</h1>
          <p className="mt-4 text-sm text-white/50">{id ? "Draf — berlaku efektif saat peluncuran resmi. Terakhir diperbarui: Oktober 2026." : "Draft — effective at official launch. Last updated: October 2026."}</p>
        </div>
      </section>
      <section className="bg-sand-50 py-20">
        <div className="container-x max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-display text-2xl font-semibold tracking-tight">{i + 1}. {t(lang, s.h)}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{t(lang, s.p)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
