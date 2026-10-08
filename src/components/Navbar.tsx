"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import { href, t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { useCases } from "@/lib/content/usecases";
import { UseCaseIcon } from "./icons";

export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<null | "solutions" | "resources">(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  const other: Lang = lang === "id" ? "en" : "id";
  const switchHref = pathname.replace(/^\/(id|en)(?=\/|$)/, `/${other}`);

  const resources = [
    { label: nav.advantage, path: "/keunggulan" },
    { label: nav.data, path: "/data-integrasi" },
    { label: nav.research, path: "/riset" },
    { label: nav.about, path: "/tentang" },
  ];

  return (
    <header className={clsx("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-ink/90 backdrop-blur-xl" : "bg-transparent")}>
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href={href(lang, "/")} aria-label="Ternakin.ai">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMenu(null)}>
          <NavLink href={href(lang, "/produk")}>{t(lang, nav.product)}</NavLink>
          <div className="relative" onMouseEnter={() => setMenu("solutions")}>
            <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/80 hover:text-white" onClick={() => setMenu(menu === "solutions" ? null : "solutions")}>
              {t(lang, nav.solutions)} <ChevronDown className="h-4 w-4" />
            </button>
            {menu === "solutions" && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-3xl border border-white/10 bg-ink-800 p-3 shadow-2xl">
                  {useCases.map((u) => (
                    <Link key={u.slug} href={href(lang, `/solusi/${u.slug}`)} className="group flex gap-3 rounded-2xl p-3 hover:bg-white/5">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime/10 text-lime">
                        <UseCaseIcon name={u.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{t(lang, u.title)}</span>
                        <span className="block text-xs leading-snug text-white/55">{t(lang, u.short)}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink href={href(lang, "/demo")}>{t(lang, nav.demo)}</NavLink>
          <NavLink href={href(lang, "/kredit")}>{t(lang, nav.credit)}</NavLink>
          <NavLink href={href(lang, "/harga")}>{t(lang, nav.pricing)}</NavLink>
          <div className="relative" onMouseEnter={() => setMenu("resources")}>
            <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/80 hover:text-white" onClick={() => setMenu(menu === "resources" ? null : "resources")}>
              {t(lang, nav.resources)} <ChevronDown className="h-4 w-4" />
            </button>
            {menu === "resources" && (
              <div className="absolute right-0 top-full w-56 pt-3">
                <div className="rounded-2xl border border-white/10 bg-ink-800 p-2 shadow-2xl">
                  {resources.map((r) => (
                    <Link key={r.path} href={href(lang, r.path)} className="block rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white">
                      {t(lang, r.label)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={switchHref} className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold uppercase text-white/80 hover:text-white sm:flex" aria-label="Switch language">
            <Globe className="h-3.5 w-3.5" /> {other}
          </Link>
          <Link href={href(lang, "/uji-coba")} className="btn-lime hidden !py-2.5 sm:inline-flex">
            {t(lang, nav.trialShort)}
          </Link>
          <button className="rounded-full p-2 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 lg:hidden">
          <div className="container-x space-y-1 py-4">
            <MobileLink href={href(lang, "/produk")}>{t(lang, nav.product)}</MobileLink>
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-widest text-white/40">{t(lang, nav.solutions)}</p>
            {useCases.map((u) => (
              <MobileLink key={u.slug} href={href(lang, `/solusi/${u.slug}`)} sub>
                {t(lang, u.title)}
              </MobileLink>
            ))}
            <div className="pt-3" />
            <MobileLink href={href(lang, "/demo")}>{t(lang, nav.demo)}</MobileLink>
            <MobileLink href={href(lang, "/kredit")}>{t(lang, nav.credit)}</MobileLink>
            <MobileLink href={href(lang, "/harga")}>{t(lang, nav.pricing)}</MobileLink>
            {resources.map((r) => (
              <MobileLink key={r.path} href={href(lang, r.path)}>
                {t(lang, r.label)}
              </MobileLink>
            ))}
            <MobileLink href={href(lang, "/kontak")}>{t(lang, nav.contact)}</MobileLink>
            <div className="flex gap-2 pt-4">
              <Link href={href(lang, "/uji-coba")} className="btn-lime flex-1">
                {t(lang, nav.trial)}
              </Link>
              <Link href={switchHref} className="btn-ghost-light uppercase">
                <Globe className="h-4 w-4" /> {other}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
      {children}
    </Link>
  );
}

function MobileLink({ href, children, sub }: { href: string; children: React.ReactNode; sub?: boolean }) {
  return (
    <Link href={href} className={clsx("block rounded-xl px-3 py-2.5 text-white/85 hover:bg-white/5", sub ? "text-sm" : "text-base font-medium")}>
      {children}
    </Link>
  );
}
