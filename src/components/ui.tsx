import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import clsx from "clsx";

export function Eyebrow({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <span className={clsx("eyebrow", dark ? "text-lime" : "text-moss-600", className)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", dark ? "bg-lime" : "bg-moss-500")} />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, body, dark = false, center = false }: { eyebrow?: string; title: React.ReactNode; body?: React.ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={clsx("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={clsx("h-display mt-4 text-4xl sm:text-5xl lg:text-6xl", dark ? "text-white" : "text-ink")}>{title}</h2>
      {body && <p className={clsx("mt-5 text-lg leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>{body}</p>}
    </div>
  );
}

export function CtaLink({ href, children, variant = "lime", className }: { href: string; children: React.ReactNode; variant?: "lime" | "dark" | "ghost" | "ghost-light"; className?: string }) {
  return (
    <Link href={href} className={clsx(`btn-${variant}`, "group", className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-ink/50 underline-offset-2 hover:text-moss-600 hover:underline">
      {label} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function Pill({ children, tone = "moss" }: { children: React.ReactNode; tone?: "moss" | "lime" | "clay" | "ink" | "sand" }) {
  const tones = {
    moss: "bg-moss-100 text-moss-700",
    lime: "bg-lime/20 text-ink",
    clay: "bg-clay-400/15 text-clay-500",
    ink: "bg-ink text-white",
    sand: "bg-sand-100 text-ink/70",
  };
  return <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold", tones[tone])}>{children}</span>;
}

export function PageHero({ eyebrow, title, body, children }: { eyebrow: string; title: React.ReactNode; body?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-moss-500/20 blur-3xl" />
      <div className="container-x relative">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="h-display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {body && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{body}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
