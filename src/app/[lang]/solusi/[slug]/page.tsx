import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { href, locales, t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { CtaLink, PageHero, Pill, SectionHead } from "@/components/ui";
import DashboardDemo from "@/components/DashboardDemo";
import Reveal from "@/components/Reveal";
import { UseCaseIcon } from "@/components/icons";
import { getUseCase, useCases } from "@/lib/content/usecases";

export function generateStaticParams() {
  return locales.flatMap((lang) => useCases.map((u) => ({ lang, slug: u.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const u = getUseCase(slug);
  return u ? { title: t(lang, u.title), description: t(lang, u.short) } : {};
}

export default async function Solusi({ params }: { params: Promise<{ lang: Lang; slug: string }> }) {
  const { lang, slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  const id = lang === "id";

  return (
    <>
      <PageHero eyebrow={`${t(lang, nav.solutions)} · ${t(lang, u.title)}`} title={t(lang, u.short)} body={t(lang, u.hero)}>
        <CtaLink href={href(lang, "/uji-coba")}>{t(lang, nav.trial)}</CtaLink>
        <CtaLink href={href(lang, "/kontak")} variant="ghost-light">{t(lang, common.talkToUs)}</CtaLink>
      </PageHero>

      <section className="bg-sand-50 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={id ? "Masalah di lapangan" : "On-the-ground problems"} title={id ? "Yang kami dengar dari peternak." : "What we hear from the field."} />
            <ul className="mt-10 space-y-4">
              {u.pains.map((p) => (
                <li key={p.id} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                  <span className="text-ink/75">{t(lang, p)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow={id ? "Solusi Ternakin" : "The Ternakin answer"} title={id ? "Fitur yang relevan." : "Features that matter."} />
            <ul className="mt-10 space-y-4">
              {u.features.map((f) => (
                <li key={f.title.id} className="flex gap-4 rounded-2xl bg-ink p-5 text-white">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                  <span>
                    <span className="block font-semibold">{t(lang, f.title)}</span>
                    <span className="mt-1 block text-sm text-white/60">{t(lang, f.body)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          {u.metrics.map((m) => (
            <div key={m.label.id} className="card p-7">
              <Pill tone="lime">{t(lang, common.projection)}</Pill>
              <p className="h-display mt-4 text-5xl">{m.value}</p>
              <p className="mt-2 text-ink/60">{t(lang, m.label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24">
        <div className="container-x">
          <SectionHead dark eyebrow="Demo" title={id ? "Lihat bagaimana tampilannya." : "See what it looks like."} />
          <Reveal className="mt-10">
            <DashboardDemo lang={lang} initial={u.demoTab} compact />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-50 py-20">
        <div className="container-x">
          <p className="eyebrow text-moss-600">{id ? "Solusi lainnya" : "Other solutions"}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.filter((x) => x.slug !== u.slug).map((x) => (
              <Link key={x.slug} href={href(lang, `/solusi/${x.slug}`)} className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 hover:border-moss-500">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-moss-600"><UseCaseIcon name={x.icon} className="h-5 w-5" /></span>
                <span className="flex-1 font-semibold">{t(lang, x.title)}</span>
                <ArrowUpRight className="h-4 w-4 text-ink/40 group-hover:text-moss-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
