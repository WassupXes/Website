import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { nav } from "@/dictionaries/ui";
import { Eyebrow } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.contact) };
}

export default async function Kontak({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  return (
    <section className="bg-ink pb-24 pt-32 sm:pt-40">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="text-white">
          <Eyebrow dark>{t(lang, nav.contact)}</Eyebrow>
          <h1 className="h-display mt-5 text-5xl sm:text-6xl">{id ? "Mari ngobrol." : "Let's talk."}</h1>
          <p className="mt-6 max-w-lg text-lg text-white/65">{id ? "Peternak, koperasi, bank, asuransi, dinas, investor, atau peneliti — kami ingin mendengar dari Anda." : "Farmers, co-ops, lenders, insurers, agencies, investors or researchers — we'd love to hear from you."}</p>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4"><Mail className="h-5 w-5 text-lime" /><span>hello@ternakin.ai</span></li>
            <li className="flex gap-4"><MessageCircle className="h-5 w-5 text-lime" /><span>WhatsApp: {id ? "segera tersedia" : "coming soon"}</span></li>
            <li className="flex gap-4"><MapPin className="h-5 w-5 text-lime" /><span>Indonesia</span></li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 sm:p-8">
          <LeadForm lang={lang} type="kontak" fields={["name", "email", "phone", "org", "role", "message"]} />
        </div>
      </div>
    </section>
  );
}
