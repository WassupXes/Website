import Link from "next/link";
import Logo from "./Logo";
import { NewsletterForm } from "./LeadForm";
import { href, t, type Lang } from "@/lib/i18n";
import { forms, nav } from "@/dictionaries/ui";
import { useCases } from "@/lib/content/usecases";

export default function Footer({ lang }: { lang: Lang }) {
  const cols = [
    {
      title: nav.product,
      links: [
        { l: nav.product, p: "/produk" },
        { l: nav.demo, p: "/demo" },
        { l: nav.pricing, p: "/harga" },
        { l: nav.credit, p: "/kredit" },
        { l: nav.trial, p: "/uji-coba" },
      ],
    },
    { title: nav.solutions, links: useCases.map((u) => ({ l: u.title, p: `/solusi/${u.slug}` })) },
    {
      title: nav.resources,
      links: [
        { l: nav.advantage, p: "/keunggulan" },
        { l: nav.data, p: "/data-integrasi" },
        { l: nav.research, p: "/riset" },
      ],
    },
    {
      title: nav.company,
      links: [
        { l: nav.about, p: "/tentang" },
        { l: nav.contact, p: "/kontak" },
        { l: nav.privacy, p: "/privasi" },
        { l: nav.terms, p: "/syarat" },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="container-x border-b border-white/10 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <h3 className="h-display text-3xl sm:text-4xl">{t(lang, forms.newsletterTitle)}</h3>
            <p className="mt-3 max-w-lg text-white/60">{t(lang, forms.newsletterBody)}</p>
          </div>
          <NewsletterForm lang={lang} />
        </div>
      </div>
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            {lang === "id"
              ? "Peternakan presisi untuk Indonesia. Setiap ternak terpantau, setiap peternak bisa dibiayai."
              : "Precision livestock for Indonesia. Every animal monitored, every farmer financeable."}
          </p>
          <p className="mt-6 text-sm text-white/55">hello@ternakin.ai</p>
        </div>
        {cols.map((c) => (
          <div key={c.title.id}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{t(lang, c.title)}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.p}>
                  <Link href={href(lang, l.p)} className="text-sm text-white/70 hover:text-lime">
                    {t(lang, l.l)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Ternakin.ai. {lang === "id" ? "Hak cipta dilindungi." : "All rights reserved."}</p>
        <p>{lang === "id" ? "Dibuat di Indonesia 🇮🇩 untuk peternak Indonesia." : "Built in Indonesia 🇮🇩 for Indonesian farmers."}</p>
      </div>
    </footer>
  );
}
