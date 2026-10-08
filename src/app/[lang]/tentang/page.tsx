import type { Metadata } from "next";
import { href, t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { CtaLink, PageHero, SectionHead } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.about) };
}

export default async function Tentang({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const values = [
    { t: id ? "Peternak dulu" : "Farmers first", b: id ? "Jika peternak 3 ekor tidak bisa memakainya, produknya belum selesai." : "If a 3-head farmer can't use it, the product isn't done." },
    { t: id ? "Jujur soal data" : "Honest about data", b: id ? "Kami membedakan data nyata, snapshot, proyeksi, dan simulasi — selalu." : "We always distinguish real data, snapshots, projections and simulations." },
    { t: id ? "Data milik peternak" : "Farmers own their data", b: id ? "Tidak ada data dibagikan ke bank atau pihak lain tanpa izin." : "No data is shared with lenders or third parties without consent." },
    { t: id ? "Bangun bersama ekosistem" : "Build with the ecosystem", b: id ? "Dinas, koperasi, bank, asuransi, dan kampus adalah mitra, bukan pesaing." : "Agencies, co-ops, lenders, insurers and universities are partners, not competitors." },
  ];
  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.about)}
        title={id ? <>Kami membangun infrastruktur data <span className="text-lime">untuk 12 juta sapi Indonesia.</span></> : <>We&apos;re building the data infrastructure <span className="text-lime">for Indonesia&apos;s 12 million cattle.</span></>}
        body={id ? "Ternakin.ai lahir dari satu pertanyaan: kenapa teknologi peternakan terbaik dunia hanya bisa dinikmati peternak besar di Selandia Baru dan Australia — sementara Indonesia masih mengimpor ±80% susunya?" : "Ternakin.ai started with one question: why is the world's best livestock technology only available to large ranchers in New Zealand and Australia — while Indonesia still imports ~80% of its milk?"}
      />
      <section className="bg-sand-50 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow={id ? "Misi" : "Mission"} title={id ? "Membuat setiap ternak terpantau dan setiap peternak bisa dibiayai." : "Make every animal monitored and every farmer financeable."} />
          <div className="space-y-5 text-lg leading-relaxed text-ink/70">
            <p>{id ? "Lebih dari 90% sapi Indonesia dipelihara peternak rakyat. Mereka kehilangan jutaan rupiah per ekor saat wabah, kesulitan mengakses kredit karena tidak punya catatan, dan menjual paksa saat panik." : "Over 90% of Indonesia's cattle are kept by smallholders. They lose millions of rupiah per head in outbreaks, struggle to access credit for lack of records, and sell in panic."}</p>
            <p>{id ? "Kami percaya jawabannya bukan sekadar sensor, tetapi data yang mengalir ke orang yang tepat: peternak, mantri, koperasi, bank, asuransi, dan dinas." : "We believe the answer isn't just sensors, but data flowing to the right people: farmers, paravets, co-ops, lenders, insurers and agencies."}</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Nilai" : "Values"} title={id ? "Cara kami bekerja." : "How we work."} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.t} className="card p-7">
                <p className="font-mono text-xs text-moss-600">0{i + 1}</p>
                <p className="mt-4 font-display text-xl font-semibold">{v.t}</p>
                <p className="mt-2 text-sm text-ink/60">{v.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <CtaLink href={href(lang, "/kontak")} variant="dark">{t(lang, common.talkToUs)}</CtaLink>
            <CtaLink href={href(lang, "/riset")} variant="ghost">{t(lang, nav.research)}</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
