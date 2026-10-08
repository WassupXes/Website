import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLang, locales, type Lang } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ternakin.ai"),
    title: { default: en ? "Ternakin.ai — Precision livestock for Indonesia" : "Ternakin.ai — Peternakan presisi untuk Indonesia", template: "%s · Ternakin.ai" },
    description: en
      ? "Smart ear tags, shared village gateways and WhatsApp alerts that turn every animal into data — for health, growth, credit and insurance."
      : "Ear tag pintar, gateway desa berbagi, dan notifikasi WhatsApp yang mengubah setiap ternak menjadi data — untuk kesehatan, pertumbuhan, kredit dan asuransi.",
    alternates: { languages: { id: "/id", en: "/en" } },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <Navbar lang={lang as Lang} />
        <main>{children}</main>
        <Footer lang={lang as Lang} />
      </body>
    </html>
  );
}
