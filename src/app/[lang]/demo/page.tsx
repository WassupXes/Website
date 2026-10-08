import type { Metadata } from "next";
import { href, t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { CtaLink, Eyebrow } from "@/components/ui";
import DashboardDemo from "@/components/DashboardDemo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.demo) };
}

export default async function Demo({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const tours = [
    { k: id ? "Ringkasan" : "Overview", b: id ? "Pagi hari peternak: siapa yang sakit, siapa birahi, dan pesan WhatsApp yang dikirim." : "A farmer's morning: who's sick, who's in heat, and the WhatsApp messages sent." },
    { k: id ? "Kesehatan" : "Health", b: id ? "Kurva ruminasi Melati turun 38% → klaster desa → draf laporan dinas." : "Melati's rumination drops 38% → village cluster → agency report draft." },
    { k: "Skor Ternak", b: id ? "Profil risiko kelompok yang dibagikan ke bank untuk KUR, plus pemantauan agunan." : "Group risk profile shared with a bank for KUR, plus collateral monitoring." },
    { k: "Qurban Planner", b: id ? "Geser slider: apakah sapi Anda mencapai target bobot saat Iduladha?" : "Move the sliders: will your bull hit target weight by Eid al-Adha?" },
  ];
  return (
    <section className="bg-ink pb-24 pt-32 text-white sm:pt-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-end">
          <div className="lg:col-span-2">
            <Eyebrow dark>{t(lang, nav.demo)}</Eyebrow>
            <h1 className="h-display mt-5 text-5xl sm:text-6xl lg:text-7xl">{id ? "Jelajahi dashboard Ternakin." : "Explore the Ternakin dashboard."}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/65">{id ? "Kelompok Tani Ternak \"Sumber Rejeki\", Kab. Malang — 48 ekor, 9 peternak, 1 gateway. Semua data di bawah adalah simulasi yang disusun dari pola nyata." : "\"Sumber Rejeki\" farmer group, Malang — 48 head, 9 farmers, 1 gateway. All data below is simulated from realistic patterns."}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CtaLink href={href(lang, "/uji-coba")}>{t(lang, nav.trial)}</CtaLink>
          </div>
        </div>
        <div className="mt-12">
          <DashboardDemo lang={lang} />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((x, i) => (
            <div key={x.k} className="card-dark p-6">
              <p className="font-mono text-xs text-lime">0{i + 1}</p>
              <p className="mt-3 font-display text-lg font-semibold">{x.k}</p>
              <p className="mt-2 text-sm text-white/60">{x.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
