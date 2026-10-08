import type { Metadata } from "next";
import { t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { PageHero, SectionHead, SourceLink } from "@/components/ui";
import LiveData from "@/components/LiveData";
import { globalPlayers, nationalSources } from "@/lib/content/data";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.data) };
}

const statusStyle = { live: "bg-lime text-ink", snapshot: "bg-[#FFF1C2] text-[#8A6A00]", roadmap: "bg-sand-100 text-ink/60" };

export default async function DataIntegrasi({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";
  const statusLabel = { live: t(lang, common.live), snapshot: t(lang, common.snapshot), roadmap: t(lang, common.roadmap) };

  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.data)}
        title={id ? <>Data kandang Anda, <span className="text-lime">dalam konteks nasional.</span></> : <>Your farm data, <span className="text-lime">in national context.</span></>}
        body={id ? "Kami hanya menyebut \"terintegrasi\" bila API-nya memang tersedia untuk publik. Sisanya kami tandai jujur sebagai snapshot atau roadmap kemitraan." : "We only say \"integrated\" when a public API actually exists. Everything else is honestly labelled as a snapshot or partnership roadmap."}
      />

      <section className="bg-sand-50 py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Coba langsung" : "Try it live"} title={id ? "Data nasional, langsung dari sumbernya." : "National data, straight from the source."} body={id ? "Widget di bawah memanggil API BMKG dan BPS lewat server kami. Bila sumber tidak terjangkau, kami menampilkan fallback berlabel." : "The widgets below call the BMKG and BPS APIs through our server. If a source is unreachable we show a labelled fallback."} />
          <div className="mt-10"><LiveData lang={lang} /></div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead eyebrow={id ? "Sumber data Indonesia" : "Indonesian data sources"} title={id ? "Status integrasi." : "Integration status."} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {nationalSources.map((s) => (
              <div key={s.name} className="card flex flex-col p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight">{s.name}</p>
                    <p className="text-sm text-ink/50">{s.owner}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyle[s.status]}`}>{statusLabel[s.status]}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{t(lang, s.what)}</p>
                <p className="mt-3 flex-1 border-l-2 border-lime pl-4 text-sm text-ink/80">{t(lang, s.use)}</p>
                <div className="mt-5"><SourceLink href={s.url} label={new URL(s.url).hostname} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <SectionHead dark eyebrow={id ? "Relevansi global" : "Global relevance"} title={id ? "Standar data yang kami ikuti." : "Data standards we follow."} body={id ? "Pemain global menetapkan standar ketertelusuran & interoperabilitas. Kami merancang skema data agar kompatibel — sehingga ekspor sapi/daging dan kemitraan internasional lebih mudah di masa depan." : "Global players set the bar for traceability and interoperability. We design our data schema to be compatible — easing future cattle/beef exports and international partnerships."} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {globalPlayers.map((g) => (
              <div key={g.name} className="card-dark p-6">
                <p className="font-display text-xl font-semibold">{g.name}</p>
                <p className="text-xs text-white/45">{g.country}</p>
                <p className="mt-4 text-sm text-white/65">{t(lang, g.model)}</p>
              </div>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <li className="rounded-2xl border border-white/10 p-5">{id ? "ID ternak unik + QR, kompatibel dengan pola ketertelusuran seperti NLIS (Australia)." : "Unique animal ID + QR, compatible with traceability patterns like Australia's NLIS."}</li>
            <li className="rounded-2xl border border-white/10 p-5">{id ? "API terbuka untuk mitra (bank, asuransi, koperasi) dengan izin peternak." : "Open partner API (banks, insurers, co-ops) with farmer consent."}</li>
            <li className="rounded-2xl border border-white/10 p-5">{id ? "Target: data disimpan di Indonesia sesuai UU PDP 27/2022." : "Target: data stored in Indonesia per PDP Law 27/2022."}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
