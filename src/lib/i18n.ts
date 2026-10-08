export const locales = ["id", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "id";

export type L = { id: string; en: string };

export function isLang(v: string): v is Lang {
  return (locales as readonly string[]).includes(v);
}

export function t(lang: Lang, s: L): string {
  return s[lang];
}

export function href(lang: Lang, path = "") {
  return `/${lang}${path === "/" ? "" : path}`;
}

export function idr(n: number, compact = false) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(n);
}

export function num(n: number, lang: Lang = "id", digits = 0) {
  return new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US", { maximumFractionDigits: digits }).format(n);
}
