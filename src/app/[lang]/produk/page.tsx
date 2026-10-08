import type { Metadata } from "next";
import { BatteryCharging, Cpu, MessageCircle, Monitor, Radio, ShieldCheck, Sun, Tag, Thermometer, Wifi } from "lucide-react";
import { href, t, type Lang } from "@/lib/i18n";
import { common, nav } from "@/dictionaries/ui";
import { CtaLink, PageHero, Pill, SectionHead } from "@/components/ui";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: t(lang, nav.product) };
}

export default async function Produk({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const id = lang === "id";

  const parts = [
    {
      icon: Tag,
      name: "TernakTag",
      tag: id ? "Ear tag pintar" : "Smart ear tag",
      body: id
        ? "Tag telinga ringan (±35 g) dengan akselerometer 3-sumbu, sensor suhu, dan panel surya mini. Mengklasifikasikan perilaku — makan, ruminasi, istirahat, aktif — setiap menit di dalam tag (edge AI), lalu mengirim ringkasan ke gateway."
        : "Lightweight (~35 g) ear tag with a 3-axis accelerometer, temperature sensor and mini solar panel. Classifies behaviour — eating, ruminating, resting, active — every minute on-device (edge AI), then sends summaries to the gateway.",
      specs: id
        ? ["Akselerometer 3-sumbu + suhu", "Surya + baterai cadangan ±12 bulan", "LoRa 920–923 MHz (AS923 Indonesia)", "Tahan air & debu IP67", "QR + nomor visual untuk pembeli & petugas"]
        : ["3-axis accelerometer + temperature", "Solar + ~12-month backup battery", "LoRa 920–923 MHz (AS923 Indonesia)", "IP67 water & dust proof", "QR + visual number for buyers & officers"],
    },
    {
      icon: Radio,
      name: "Gateway Desa",
      tag: id ? "Infrastruktur berbagi" : "Shared infrastructure",
      body: id
        ? "Satu gateway tenaga surya untuk satu kelompok ternak atau koperasi. Jangkauan ±2–5 km tergantung kontur, menyimpan data saat internet putus, dan mengirim ke cloud via 4G atau WiFi."
        : "One solar gateway per farmer group or co-op. ~2–5 km range depending on terrain, buffers data when the internet drops, and uploads to the cloud via 4G or WiFi.",
      specs: id
        ? ["Panel surya + baterai LiFePO4", "4G LTE / WiFi / Ethernet", "Hingga ±1.000 tag per gateway", "Buffer data offline 7 hari", "Dipasang di balai desa / kandang kelompok"]
        : ["Solar panel + LiFePO4 battery", "4G LTE / WiFi / Ethernet", "Up to ~1,000 tags per gateway", "7-day offline data buffer", "Mounted at village hall / group pen"],
    },
    {
      icon: MessageCircle,
      name: "Ternakin WhatsApp",
      tag: id ? "Untuk peternak" : "For farmers",
      body: id
        ? "Peternak tidak perlu install aplikasi. Notifikasi kesehatan, birahi, cuaca, dan jadwal vaksin dikirim via WhatsApp dalam Bahasa Indonesia. Balas dengan angka untuk konfirmasi atau memanggil mantri."
        : "Farmers don't need to install an app. Health, heat, weather and vaccination alerts arrive via WhatsApp in Bahasa Indonesia. Reply with a number to confirm or call a paravet.",
      specs: id ? ["Notifikasi real-time", "Ringkasan harian 06:00", "Balas 1/2/3 untuk aksi cepat", "Kirim foto ke catatan ternak", "Bahasa Indonesia (Jawa & Sunda: roadmap)"] : ["Real-time alerts", "Daily 06:00 summary", "Reply 1/2/3 for quick actions", "Send photos to animal records", "Bahasa Indonesia (Javanese & Sundanese: roadmap)"],
    },
    {
      icon: Monitor,
      name: "Ternakin Dashboard",
      tag: id ? "Untuk koperasi, bank & dinas" : "For co-ops, lenders & agencies",
      body: id
        ? "Dashboard web untuk memantau ratusan peternak sekaligus: peta, kesehatan, reproduksi, pertumbuhan, Skor Ternak, dan laporan yang bisa diekspor."
        : "Web dashboard to monitor hundreds of farmers at once: map, health, breeding, growth, Skor Ternak and exportable reports.",
      specs: id ? ["Multi-peternak & multi-kandang", "Peran & izin akses (peternak, koperasi, bank, dinas)", "Ekspor PDF/Excel", "API untuk mitra", "Integrasi BMKG & BPS"] : ["Multi-farmer & multi-pen", "Roles & permissions (farmer, co-op, lender, agency)", "PDF/Excel export", "Partner API", "BMKG & BPS integration"],
    },
  ];

  const signals = [
    { icon: Cpu, t: id ? "Ruminasi" : "Rumination", b: id ? "Menit mengunyah per hari — indikator kesehatan paling awal." : "Chewing minutes per day — the earliest health indicator." },
    { icon: BatteryCharging, t: id ? "Aktivitas" : "Activity", b: id ? "Lonjakan = birahi; penurunan = sakit atau pincang." : "Spikes = heat; drops = illness or lameness." },
    { icon: Thermometer, t: id ? "Suhu" : "Temperature", b: id ? "Suhu permukaan telinga + THI lingkungan dari BMKG." : "Ear-surface temperature + ambient THI from BMKG." },
    { icon: Wifi, t: id ? "Lokasi" : "Location", b: id ? "Posisi relatif via gateway; geofence untuk agunan." : "Relative position via gateway; geofence for collateral." },
  ];

  return (
    <>
      <PageHero
        eyebrow={t(lang, nav.product)}
        title={id ? <>Hardware sederhana. <span className="text-lime">Insight yang dalam.</span></> : <>Simple hardware. <span className="text-lime">Deep insight.</span></>}
        body={id ? "Empat komponen yang bekerja bersama — dirancang untuk kandang rakyat Indonesia, listrik terbatas, dan sinyal yang tidak selalu ada." : "Four components working together — designed for Indonesian smallholder pens, limited power and patchy signal."}
      >
        <CtaLink href={href(lang, "/uji-coba")}>{t(lang, nav.trial)}</CtaLink>
        <CtaLink href={href(lang, "/demo")} variant="ghost-light">{t(lang, common.seeDemo)}</CtaLink>
      </PageHero>

      <section className="bg-sand-50 py-24">
        <div className="container-x space-y-6">
          {parts.map((p, i) => (
            <Reveal key={p.name} className="card grid gap-8 overflow-hidden p-8 lg:grid-cols-5 lg:p-12">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime"><p.icon className="h-5 w-5" /></span>
                  <Pill tone="sand">0{i + 1} · {p.tag}</Pill>
                </div>
                <h2 className="h-display mt-6 text-4xl sm:text-5xl">{p.name}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65">{p.body}</p>
              </div>
              <ul className="space-y-3 rounded-2xl bg-sand-50 p-6 lg:col-span-2">
                {p.specs.map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-ink/75"><ShieldCheck className="h-4 w-4 shrink-0 text-moss-600" />{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
          <p className="text-xs text-ink/45">{id ? "Spesifikasi adalah target desain prototipe dan dapat berubah sebelum produksi massal." : "Specifications are prototype design targets and may change before mass production."}</p>
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <SectionHead dark eyebrow={id ? "Sinyal yang diukur" : "Signals we measure"} title={id ? "Empat sinyal, puluhan insight." : "Four signals, dozens of insights."} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {signals.map((s) => (
              <div key={s.t} className="card-dark p-6">
                <s.icon className="h-6 w-6 text-lime" />
                <p className="mt-5 font-display text-xl font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-white/60">{s.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 rounded-3xl border border-white/10 p-8 lg:grid-cols-3">
            <div className="flex items-center gap-3"><Sun className="h-8 w-8 text-lime" /><p className="font-display text-2xl font-semibold">{id ? "Kenapa ear tag, bukan kalung?" : "Why ear tags, not collars?"}</p></div>
            <p className="text-white/65 lg:col-span-2">{id ? "Kalung premium seperti Halter dirancang untuk virtual fencing di padang luas — fitur yang jarang dibutuhkan di kandang rakyat. Ear tag lebih murah, tidak lepas (evaluasi NZ mencatat ±6% kalung lepas per tahun), dan sudah familiar bagi peternak dan petugas Indonesia yang terbiasa dengan ear tag vaksinasi." : "Premium collars like Halter's are built for virtual fencing on open pasture — a feature smallholder pens rarely need. Ear tags are cheaper, don't fall off (an NZ review recorded ~6% of collars lost per year), and are already familiar to Indonesian farmers and officers from vaccination tags."}</p>
          </div>
        </div>
      </section>
    </>
  );
}
