"use client";
import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Activity, AlertTriangle, BadgeCheck, Banknote, CalendarHeart, CloudSun, Gauge, HeartPulse, LayoutDashboard, Map, MessageCircle,
  Scale, ShieldCheck, TrendingUp, Moon,
} from "lucide-react";
import clsx from "clsx";
import { idr, num, type Lang } from "@/lib/i18n";
import { bpsSnapshot, heatSeries, makeHerd, priceSeries, ruminationSeries, scoreHistory, thiForecast, weightSeries, type Animal } from "@/lib/mock";

type Tab = "overview" | "health" | "growth" | "repro" | "map" | "weather" | "market" | "score" | "qurban";

const C = { lime: "#A9D545", moss: "#487A23", clay: "#D06A36", ink: "#0B1410", grid: "#E7E0CC", sand: "#D4C9A8" };

export default function DashboardDemo({ lang, initial = "overview", compact = false }: { lang: Lang; initial?: string; compact?: boolean }) {
  const id = lang === "id";
  const [tab, setTab] = useState<Tab>((initial as Tab) ?? "overview");
  const herd = useMemo(() => makeHerd(), []);

  const tabs: { k: Tab; icon: typeof Activity; label: string }[] = [
    { k: "overview", icon: LayoutDashboard, label: id ? "Ringkasan" : "Overview" },
    { k: "health", icon: HeartPulse, label: id ? "Kesehatan" : "Health" },
    { k: "growth", icon: Scale, label: id ? "Bobot & Pakan" : "Growth & Feed" },
    { k: "repro", icon: CalendarHeart, label: id ? "Reproduksi" : "Breeding" },
    { k: "map", icon: Map, label: id ? "Peta & Geofence" : "Map & Geofence" },
    { k: "weather", icon: CloudSun, label: id ? "Cuaca & THI" : "Weather & THI" },
    { k: "market", icon: TrendingUp, label: id ? "Harga & Data" : "Prices & Data" },
    { k: "score", icon: Banknote, label: "Skor Ternak" },
    { k: "qurban", icon: Moon, label: "Qurban Planner" },
  ];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-sand-50 text-ink shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 hidden rounded-md bg-sand-100 px-3 py-1 text-xs text-ink/50 sm:block">app.ternakin.ai/kelompok/sumber-rejeki</span>
        </div>
        <span className="rounded-full bg-lime/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink/70">{id ? "Data simulasi" : "Simulated data"}</span>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="border-b border-ink/10 bg-ink p-2 md:w-56 md:shrink-0 md:border-b-0 md:p-3">
          <p className="hidden px-3 pb-3 pt-1 text-[10px] font-semibold uppercase tracking-widest text-white/35 md:block">KTT Sumber Rejeki · 48 {id ? "ekor" : "head"}</p>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {tabs.map((tb) => (
              <button
                key={tb.k}
                onClick={() => setTab(tb.k)}
                className={clsx(
                  "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium transition md:text-sm",
                  tab === tb.k ? "bg-lime text-ink" : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <tb.icon className="h-4 w-4" />
                {tb.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className={clsx("min-w-0 flex-1 p-4 sm:p-6", compact ? "min-h-[520px]" : "min-h-[600px]")}>
          {tab === "overview" && <Overview herd={herd} lang={lang} />}
          {tab === "health" && <Health herd={herd} lang={lang} />}
          {tab === "growth" && <Growth lang={lang} />}
          {tab === "repro" && <Repro herd={herd} lang={lang} />}
          {tab === "map" && <FarmMap herd={herd} lang={lang} />}
          {tab === "weather" && <Weather lang={lang} />}
          {tab === "market" && <Market lang={lang} />}
          {tab === "score" && <Score lang={lang} />}
          {tab === "qurban" && <Qurban lang={lang} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- building blocks ---------- */

function Kpi({ label, value, delta, tone = "moss", icon: Icon }: { label: string; value: string; delta?: string; tone?: "moss" | "clay" | "ink"; icon?: typeof Activity }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink/50">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-ink/30" />}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {delta && <p className={clsx("mt-1 text-xs font-medium", tone === "clay" ? "text-clay-500" : tone === "ink" ? "text-ink/50" : "text-moss-600")}>{delta}</p>}
    </div>
  );
}

function Panel({ title, children, right, className }: { title: string; children: React.ReactNode; right?: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-2xl border border-ink/10 bg-white p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{title}</p>
        {right}
      </div>
      {children}
    </div>
  );
}

function H({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-ink/55">{sub}</p>
    </div>
  );
}

const statusStyle: Record<Animal["status"], string> = {
  sehat: "bg-moss-100 text-moss-700",
  pantau: "bg-[#FFF1C2] text-[#8A6A00]",
  sakit: "bg-clay-400/15 text-clay-500",
  birahi: "bg-lime/30 text-ink",
  bunting: "bg-sand-100 text-ink/70",
};
const statusLabel = (s: Animal["status"], lang: Lang) =>
  lang === "id" ? s : ({ sehat: "healthy", pantau: "watch", sakit: "sick", birahi: "in heat", bunting: "pregnant" } as const)[s];

const tooltipStyle = { borderRadius: 12, border: "1px solid #E7E0CC", fontSize: 12 };

/* ---------- tabs ---------- */

function Overview({ herd, lang }: { herd: Animal[]; lang: Lang }) {
  const id = lang === "id";
  const sick = herd.filter((a) => a.status === "sakit").length;
  const watch = herd.filter((a) => a.status === "pantau").length;
  const heat = herd.filter((a) => a.status === "birahi").length;
  const avgAdg = herd.reduce((s, a) => s + a.adg, 0) / herd.length;
  const counts = (["sehat", "pantau", "sakit", "birahi", "bunting"] as const).map((s) => ({ s: statusLabel(s, lang), n: herd.filter((a) => a.status === s).length }));
  return (
    <>
      <H title={id ? "Selamat pagi, Pak Slamet 👋" : "Good morning, Pak Slamet 👋"} sub={id ? "Kamis, 08:12 · 3 hal butuh perhatian hari ini" : "Thursday, 08:12 · 3 things need attention today"} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={id ? "Total ternak" : "Total head"} value={`${herd.length}`} delta={id ? "4 kandang · 9 peternak" : "4 pens · 9 farmers"} tone="ink" icon={Gauge} />
        <Kpi label={id ? "Butuh perhatian" : "Need attention"} value={`${sick + watch}`} delta={`${sick} ${id ? "sakit" : "sick"} · ${watch} ${id ? "pantau" : "watch"}`} tone="clay" icon={AlertTriangle} />
        <Kpi label={id ? "ADG rata-rata" : "Avg daily gain"} value={`${num(avgAdg, lang, 2)} kg`} delta={id ? "▲ 0,06 vs bulan lalu" : "▲ 0.06 vs last month"} icon={Scale} />
        <Kpi label={id ? "Birahi hari ini" : "In heat today"} value={`${heat}`} delta={id ? "Inseminator dijadwalkan" : "Inseminator scheduled"} icon={CalendarHeart} />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Panel title={id ? "Aktivitas & ruminasi kawanan (14 hari)" : "Herd activity & rumination (14 days)"} className="lg:col-span-3">
          <div className="h-48">
            <ResponsiveContainer>
              <AreaChart data={ruminationSeries(4).map((d) => ({ ...d, rumination: d.rumination + (d.baseline - d.rumination) * 0.85 }))}>
                <defs>
                  <linearGradient id="gr1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.lime} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.lime} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={32} domain={[400, 560]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area dataKey="rumination" name={id ? "Ruminasi (mnt/hari)" : "Rumination (min/day)"} stroke={C.moss} fill="url(#gr1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title={id ? "Status kawanan" : "Herd status"} className="lg:col-span-2">
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={counts} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="s" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={64} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="n" fill={C.moss} radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Panel title={id ? "Notifikasi terbaru" : "Latest alerts"}>
          <ul className="space-y-2.5 text-sm">
            {[
              { c: "text-clay-500", i: HeartPulse, t: id ? "Melati (TK-1006): ruminasi turun 38% dalam 48 jam" : "Melati (TK-1006): rumination down 38% in 48h", m: "07:41" },
              { c: "text-moss-600", i: CalendarHeart, t: id ? "Sekar (TK-1013): birahi — IB ideal 08:00–14:00" : "Sekar (TK-1013): heat — best AI 08:00–14:00", m: "06:15" },
              { c: "text-[#8A6A00]", i: CloudSun, t: id ? "THI 79 siang ini — tambah air minum & naungan" : "THI 79 this afternoon — add water & shade", m: "05:00" },
              { c: "text-moss-600", i: BadgeCheck, t: id ? "Vaksin LSD terjadwal untuk 12 ekor (Sabtu)" : "LSD vaccination scheduled for 12 head (Sat)", m: id ? "Kemarin" : "Yesterday" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <a.i className={clsx("mt-0.5 h-4 w-4 shrink-0", a.c)} />
                <span className="flex-1 text-ink/80">{a.t}</span>
                <span className="text-xs text-ink/40">{a.m}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={id ? "Pratinjau WhatsApp peternak" : "Farmer WhatsApp preview"} right={<MessageCircle className="h-4 w-4 text-[#25D366]" />}>
          <div className="space-y-2 rounded-xl bg-[#ECE5DD] p-3 text-[13px]">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
              🐄 <b>Ternakin</b>: {id ? "Pak Slamet, sapi Melati (TK-1006) ruminasinya turun 38%. Mohon cek suhu & nafsu makan. Balas 1 = sudah dicek, 2 = panggil mantri." : "Pak Slamet, Melati (TK-1006) rumination is down 38%. Please check temperature & appetite. Reply 1 = checked, 2 = call the vet."}
              <span className="block text-right text-[10px] text-ink/40">07:42</span>
            </div>
            <div className="ml-auto max-w-[40%] rounded-lg rounded-tr-none bg-[#DCF8C6] p-2.5 text-right shadow-sm">
              2 <span className="block text-[10px] text-ink/40">07:50 ✓✓</span>
            </div>
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
              ✅ {id ? "Drh. Rina (Puskeswan Pujon) sudah dihubungi, estimasi tiba 09:30." : "Dr. Rina (Pujon animal clinic) notified, ETA 09:30."}
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Health({ herd, lang }: { herd: Animal[]; lang: Lang }) {
  const id = lang === "id";
  const flagged = herd.filter((a) => a.status === "sakit" || a.status === "pantau").slice(0, 6);
  return (
    <>
      <H title={id ? "Kesehatan & Early Warning PMK/LSD" : "Health & FMD/LSD Early Warning"} sub={id ? "Anomali ruminasi + aktivitas dibandingkan baseline tiap ekor" : "Rumination + activity anomalies against each animal's baseline"} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="Melati · TK-1006" right={<span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-semibold", statusStyle.sakit)}>{id ? "Risiko tinggi" : "High risk"}</span>} className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={ruminationSeries()}>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={tooltipStyle} />
                <ReferenceLine y={500} stroke={C.sand} strokeDasharray="4 4" label={{ value: "baseline", fontSize: 10, fill: "#9a8f6f", position: "insideTopLeft" }} />
                <Line dataKey="rumination" name={id ? "Ruminasi (mnt)" : "Rumination (min)"} stroke={C.clay} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-ink/55">{id ? "Penurunan ruminasi 2–3 hari sebelum gejala klinis terlihat adalah sinyal umum penyakit pada sapi." : "Rumination drops 2–3 days before visible clinical signs are a common illness signal in cattle."}</p>
        </Panel>
        <Panel title={id ? "Klaster wilayah (radius 10 km)" : "Area cluster (10 km radius)"}>
          <div className="space-y-3">
            <div className="rounded-xl bg-clay-400/10 p-3">
              <p className="text-xs font-semibold text-clay-500">{id ? "⚠ Klaster anomali: Desa Ngabab" : "⚠ Anomaly cluster: Ngabab village"}</p>
              <p className="mt-1 text-xs text-ink/65">{id ? "7 ekor dari 3 peternak dengan ruminasi turun >30% dalam 72 jam." : "7 head across 3 farmers with rumination down >30% within 72h."}</p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-3 py-2.5 text-xs font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-lime" /> {id ? "Buat draf laporan untuk dinas" : "Draft report for district office"}
            </button>
            <p className="text-[11px] text-ink/45">{id ? "Draf diverifikasi petugas sebelum diteruskan (format iSIKHNAS — roadmap kemitraan)." : "Officer verifies before forwarding (iSIKHNAS format — partnership roadmap)."}</p>
          </div>
        </Panel>
      </div>
      <Panel title={id ? "Ternak yang perlu dicek" : "Animals to check"} className="mt-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-ink/45">
              <tr>
                <th className="pb-2">ID</th><th className="pb-2">{id ? "Nama" : "Name"}</th><th className="pb-2">{id ? "Ruminasi" : "Rumination"}</th><th className="pb-2">{id ? "Aktivitas" : "Activity"}</th><th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {flagged.map((a) => (
                <tr key={a.id}>
                  <td className="py-2 font-mono text-xs text-ink/60">{a.id}</td>
                  <td className="py-2 font-medium">{a.name}</td>
                  <td className="py-2">{a.rumination} {id ? "mnt" : "min"}</td>
                  <td className="py-2">{a.activity}</td>
                  <td className="py-2"><span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-semibold", statusStyle[a.status])}>{statusLabel(a.status, lang)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function Growth({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const ws = weightSeries();
  const last = ws[ws.length - 1];
  const feedCostPerDay = 38000;
  const adg = 0.74;
  const costPerKg = feedCostPerDay / adg;
  return (
    <>
      <H title={id ? "Bobot, ADG & Biaya Pakan" : "Weight, ADG & Feed Cost"} sub={id ? "Kurva pertumbuhan Bima (TK-1002, Limousin X) vs target penggemukan" : "Growth curve for Bima (TK-1002, Limousin X) vs fattening target"} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={id ? "Bobot saat ini" : "Current weight"} value={`${last.actual} kg`} delta={`${id ? "Target" : "Target"} ${last.target} kg`} tone="ink" />
        <Kpi label="ADG" value={`${num(adg, lang, 2)} kg`} delta={id ? "Target 0,80 kg" : "Target 0.80 kg"} tone="clay" />
        <Kpi label={id ? "Biaya pakan / hari" : "Feed cost / day"} value={idr(feedCostPerDay)} delta={id ? "Hijauan + konsentrat" : "Forage + concentrate"} tone="ink" />
        <Kpi label={id ? "HPP pakan / kg bobot" : "Feed cost / kg gain"} value={idr(costPerKg)} delta={id ? "vs harga hidup ±Rp52 rb/kg" : "vs live price ~Rp52k/kg"} />
      </div>
      <Panel title={id ? "Kurva bobot mingguan" : "Weekly weight curve"} className="mt-3">
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={ws}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={36} domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line dataKey="target" name="Target" stroke={C.sand} strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line dataKey="actual" name={id ? "Aktual" : "Actual"} stroke={C.moss} strokeWidth={2.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 rounded-xl bg-[#FFF1C2]/60 p-3 text-xs text-ink/70">
          💡 {id ? "Minggu ke-9 bobot turun 6 kg (bersamaan THI tinggi). Rekomendasi: geser jam pemberian konsentrat ke 05:30 & 17:30." : "Week 9 weight dipped 6 kg (during high THI). Recommendation: shift concentrate feeding to 05:30 & 17:30."}
        </p>
      </Panel>
    </>
  );
}

function Repro({ herd, lang }: { herd: Animal[]; lang: Lang }) {
  const id = lang === "id";
  const preg = herd.filter((a) => a.status === "bunting").length;
  const heats = herd.filter((a) => a.status === "birahi").length;
  return (
    <>
      <H title={id ? "Reproduksi & Deteksi Birahi" : "Breeding & Heat Detection"} sub={id ? "Lonjakan aktivitas 6–12 jam menandakan birahi — jendela IB dikirim ke inseminator" : "A 6–12h activity spike signals heat — the AI window goes to the inseminator"} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={id ? "Bunting" : "Pregnant"} value={`${preg}`} delta={id ? "Konfirmasi PKB" : "Confirmed by palpation"} tone="ink" />
        <Kpi label={id ? "Birahi 24 jam" : "Heats (24h)"} value={`${heats}`} delta={id ? "IB terjadwal" : "AI scheduled"} />
        <Kpi label="Service / conception" value="1,6" delta={id ? "Target ≤ 1,5" : "Target ≤ 1.5"} tone="clay" />
        <Kpi label="Calving interval" value={id ? "14,2 bln" : "14.2 mo"} delta={id ? "▼ 1,1 bln (6 bln)" : "▼ 1.1 mo (6 mo)"} />
      </div>
      <Panel title={id ? "Sekar · TK-1013 — aktivitas 24 jam" : "Sekar · TK-1013 — 24h activity"} className="mt-3">
        <div className="h-56">
          <ResponsiveContainer>
            <AreaChart data={heatSeries()}>
              <defs>
                <linearGradient id="gr2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.lime} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={C.lime} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={5} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="activity" name={id ? "Indeks aktivitas" : "Activity index"} stroke={C.moss} fill="url(#gr2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            { k: id ? "Puncak birahi" : "Heat peak", v: "17:30" },
            { k: id ? "Jendela IB ideal" : "Best AI window", v: id ? "Besok 05:30–11:30" : "Tomorrow 05:30–11:30" },
            { k: id ? "Inseminator" : "Inseminator", v: id ? "Pak Darto · dikonfirmasi" : "Pak Darto · confirmed" },
          ].map((x) => (
            <div key={x.k} className="rounded-xl bg-sand-100 p-3">
              <p className="text-[11px] text-ink/50">{x.k}</p>
              <p className="text-sm font-semibold text-ink">{x.v}</p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function FarmMap({ herd, lang }: { herd: Animal[]; lang: Lang }) {
  const id = lang === "id";
  const [sel, setSel] = useState<Animal | null>(herd.find((a) => a.status === "sakit") ?? null);
  const color = (s: Animal["status"]) => (s === "sakit" ? C.clay : s === "pantau" ? "#E0B33A" : s === "birahi" ? C.lime : "#F3EFE4");
  return (
    <>
      <H title={id ? "Peta Kandang & Geofence" : "Pen Map & Geofence"} sub={id ? "Posisi terakhir tiap ekor via gateway LoRa · klik titik untuk detail" : "Last known position via LoRa gateway · tap a dot for details"} />
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-[#16291f] lg:col-span-2">
          <svg viewBox="0 0 100 100" className="aspect-square w-full sm:aspect-[4/3]" preserveAspectRatio="none">
            {[
              [8, 10, "A"], [52, 8, "B"], [10, 54, "C"], [54, 52, "D"],
            ].map(([x, y, l]) => (
              <g key={l as string}>
                <rect x={x as number} y={y as number} width="36" height="36" rx="2" fill="#1f3d29" stroke="#C8F169" strokeOpacity=".5" strokeDasharray="1.5 1.5" strokeWidth=".4" />
                <text x={(x as number) + 2} y={(y as number) + 4.5} fontSize="3" fill="#C8F169" fillOpacity=".8">{id ? "Kandang" : "Pen"} {l}</text>
              </g>
            ))}
            <circle cx="48" cy="48" r="2" fill="#C8F169" />
            <circle cx="48" cy="48" r="4" fill="none" stroke="#C8F169" strokeWidth=".4" className="pulse-ring" />
            {herd.map((a) => (
              <circle key={a.id} cx={a.x} cy={a.y} r={sel?.id === a.id ? 2 : 1.3} fill={color(a.status)} stroke={sel?.id === a.id ? "#fff" : "none"} strokeWidth=".5" className="cursor-pointer" onClick={() => setSel(a)} />
            ))}
          </svg>
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-[10px] text-white/80">
            {(["sehat", "pantau", "sakit", "birahi"] as const).map((s) => (
              <span key={s} className="flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1"><span className="h-2 w-2 rounded-full" style={{ background: color(s) }} />{statusLabel(s, lang)}</span>
            ))}
          </div>
        </div>
        <Panel title={sel ? `${sel.name} · ${sel.id}` : id ? "Pilih ternak" : "Select an animal"}>
          {sel && (
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                [id ? "Bangsa" : "Breed", sel.breed],
                [id ? "Kelamin" : "Sex", sel.sex === "J" ? (id ? "Jantan" : "Male") : id ? "Betina" : "Female"],
                [id ? "Umur" : "Age", `${sel.ageMonths} ${id ? "bln" : "mo"}`],
                [id ? "Bobot est." : "Est. weight", `${sel.weight} kg`],
                ["ADG", `${sel.adg} kg`],
                [id ? "Ruminasi" : "Rumination", `${sel.rumination} ${id ? "mnt" : "min"}`],
                [id ? "Kandang" : "Pen", sel.pen],
                ["Status", statusLabel(sel.status, lang)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] text-ink/45">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-4 rounded-xl bg-sand-100 p-3 text-xs text-ink/60">{id ? "Geofence: notifikasi ke peternak (dan bank, untuk ternak agunan) jika ternak keluar area." : "Geofence: farmer (and lender, for pledged animals) is alerted if an animal leaves the area."}</p>
        </Panel>
      </div>
    </>
  );
}

function Weather({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const f = thiForecast();
  const max = f.reduce((m, d) => (d.thi > m.thi ? d : m), f[0]);
  return (
    <>
      <H title={id ? "Cuaca & Heat Stress (THI)" : "Weather & Heat Stress (THI)"} sub={id ? "Prakiraan BMKG tingkat desa → Temperature-Humidity Index untuk sapi" : "BMKG village forecast → cattle Temperature-Humidity Index"} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={id ? "THI puncak (3 hari)" : "Peak THI (3 days)"} value={`${max.thi}`} delta={max.label} tone="clay" />
        <Kpi label={id ? "Suhu maks" : "Max temp"} value={`${Math.max(...f.map((d) => d.t))}°C`} tone="ink" delta="BMKG" />
        <Kpi label={id ? "Kelembapan" : "Humidity"} value={`${Math.round(f.reduce((s, d) => s + d.rh, 0) / f.length)}%`} tone="ink" delta={id ? "rata-rata" : "average"} />
        <Kpi label={id ? "Jam stres panas" : "Heat-stress hours"} value={`${f.filter((d) => d.thi >= 72).length * 3} ${id ? "jam" : "h"}`} delta={id ? "THI ≥ 72" : "THI ≥ 72"} tone="clay" />
      </div>
      <Panel title={id ? "Prakiraan THI 72 jam" : "72-hour THI forecast"} className="mt-3">
        <div className="h-60">
          <ResponsiveContainer>
            <AreaChart data={f}>
              <defs>
                <linearGradient id="gr3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.clay} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={C.clay} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={28} domain={[65, 85]} />
              <Tooltip contentStyle={tooltipStyle} />
              <ReferenceLine y={72} stroke="#E0B33A" strokeDasharray="4 4" label={{ value: id ? "Waspada 72" : "Alert 72", fontSize: 10, fill: "#8A6A00", position: "insideTopLeft" }} />
              <ReferenceLine y={79} stroke={C.clay} strokeDasharray="4 4" label={{ value: id ? "Bahaya 79" : "Danger 79", fontSize: 10, fill: C.clay, position: "insideTopLeft" }} />
              <Area dataKey="thi" name="THI" stroke={C.clay} fill="url(#gr3)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-ink/50">THI = 0,8·T + RH·(T−14,4) + 46,4. {id ? "Sumber prakiraan: api.bmkg.go.id (publik). Data di demo disimulasikan." : "Forecast source: api.bmkg.go.id (public). Demo data is simulated."}</p>
      </Panel>
    </>
  );
}

function Market({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const p = priceSeries();
  return (
    <>
      <H title={id ? "Harga Pasar & Data Nasional" : "Market Prices & National Data"} sub={id ? "Harga acuan daging sapi & populasi per provinsi" : "Reference beef prices & population by province"} />
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title={id ? "Harga daging sapi murni (Rp/kg)" : "Beef price (IDR/kg)"} right={<span className="text-[10px] text-ink/45">{id ? "Snapshot acuan · Panel Harga Bapanas" : "Reference snapshot · Bapanas"}</span>}>
          <div className="h-60">
            <ResponsiveContainer>
              <LineChart data={p}>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={44} domain={[120000, 145000]} tickFormatter={(v) => `${v / 1000}rb`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => idr(v)} />
                <ReferenceLine y={140000} stroke={C.clay} strokeDasharray="4 4" label={{ value: "HAP Rp140rb", fontSize: 10, fill: C.clay, position: "insideTopRight" }} />
                <Line dataKey="daging" name={id ? "Daging sapi" : "Beef"} stroke={C.moss} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title={id ? "Populasi sapi potong — 5 provinsi teratas" : "Beef cattle population — top 5 provinces"} right={<span className="text-[10px] text-ink/45">BPS 2024</span>}>
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={bpsSnapshot.map((d) => ({ ...d, jt: +(d.v / 1e6).toFixed(2) }))}>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="prov" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v} ${id ? "jt ekor" : "M head"}`} />
                <Bar dataKey="jt" name={id ? "Juta ekor" : "Million head"} fill={C.moss} radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <Panel title={id ? "Insight" : "Insight"} className="mt-3">
        <p className="text-sm text-ink/70">
          📈 {id ? "Harga cenderung naik menjelang Ramadan & Iduladha. 6 sapi Anda diproyeksikan mencapai 450 kg dalam 5 minggu — tepat sebelum puncak permintaan." : "Prices tend to rise ahead of Ramadan & Eid al-Adha. 6 of your cattle are projected to reach 450 kg in 5 weeks — just before peak demand."}
        </p>
      </Panel>
    </>
  );
}

function Score({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const comps = [
    { k: id ? "Kesehatan kawanan" : "Herd health", v: 82 },
    { k: id ? "Pertumbuhan (ADG)" : "Growth (ADG)", v: 74 },
    { k: id ? "Reproduksi" : "Reproduction", v: 68 },
    { k: id ? "Kepatuhan vaksin" : "Vaccine compliance", v: 91 },
    { k: id ? "Stabilitas lokasi" : "Location stability", v: 96 },
    { k: id ? "Konsistensi data" : "Data consistency", v: 88 },
  ];
  const score = 712;
  const loan = 48 * 0.3 * 18_000_000 * 0.6;
  return (
    <>
      <H title="Skor Ternak" sub={id ? "Profil risiko berbasis data harian — dibagikan ke bank/koperasi atas persetujuan peternak" : "Daily-data risk profile — shared with lenders only with the farmer's consent"} />
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-ink p-6 text-white">
          <svg viewBox="0 0 120 70" className="w-48">
            <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="#24392E" strokeWidth="10" strokeLinecap="round" />
            <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="#C8F169" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(score / 850) * 157} 157`} />
          </svg>
          <p className="-mt-6 font-display text-5xl font-semibold">{score}</p>
          <p className="text-xs text-white/50">/ 850 · {id ? "Kategori B+ (baik)" : "Grade B+ (good)"}</p>
          <p className="mt-4 rounded-full bg-lime/15 px-3 py-1 text-xs font-semibold text-lime">▲ 18 {id ? "bulan ini" : "this month"}</p>
        </div>
        <Panel title={id ? "Komponen skor" : "Score components"}>
          <ul className="space-y-2.5">
            {comps.map((c) => (
              <li key={c.k}>
                <div className="flex justify-between text-xs"><span className="text-ink/65">{c.k}</span><span className="font-semibold">{c.v}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-sand-100"><div className="h-1.5 rounded-full bg-moss-500" style={{ width: `${c.v}%` }} /></div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={id ? "Riwayat skor" : "Score history"}>
          <div className="h-40">
            <ResponsiveContainer>
              <LineChart data={scoreHistory()}>
                <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[580, 740]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line dataKey="score" stroke={C.moss} strokeWidth={2.5} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 rounded-xl bg-sand-100 p-3 text-xs">
            <p className="text-ink/55">{id ? "Indikasi plafon KUR kelompok" : "Indicative group KUR ceiling"}</p>
            <p className="text-base font-semibold text-ink">{idr(loan, true)}</p>
            <p className="text-[10px] text-ink/45">{id ? "Ilustrasi; keputusan kredit oleh bank penyalur" : "Illustration; credit decision by the lending bank"}</p>
          </div>
        </Panel>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Panel title={id ? "Pemantauan agunan" : "Collateral monitoring"}>
          <p className="text-sm text-ink/70">{id ? "14 ekor terdaftar sebagai agunan di BRI Unit Pujon. Semua berada dalam geofence, aktif, sehat." : "14 head pledged as collateral at BRI Pujon. All inside geofence, active and healthy."}</p>
        </Panel>
        <Panel title={id ? "Asuransi AUTS" : "AUTS insurance"}>
          <p className="text-sm text-ink/70">{id ? "11 sapi betina produktif terdaftar (premi peternak Rp40 rb/ekor/thn). Paket bukti klaim otomatis aktif." : "11 productive cows enrolled (farmer premium Rp40k/head/yr). Automatic claim evidence pack enabled."}</p>
        </Panel>
      </div>
    </>
  );
}

function Qurban({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const [target, setTarget] = useState(400);
  const [current, setCurrent] = useState(310);
  const [adg, setAdg] = useState(0.8);
  const daysLeft = 120;
  const projected = Math.round(current + adg * daysLeft);
  const needAdg = (target - current) / daysLeft;
  const ok = projected >= target;
  const price = 54000;
  return (
    <>
      <H title="Qurban Planner" sub={id ? "Hitung mundur ke Iduladha: target bobot, kebutuhan ADG, estimasi nilai jual" : "Countdown to Eid al-Adha: target weight, required ADG, estimated sale value"} />
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title={id ? "Simulasi per ekor" : "Per-animal simulation"} right={<span className="text-xs font-semibold text-moss-600">H-{daysLeft}</span>}>
          {[
            { l: id ? "Bobot saat ini (kg)" : "Current weight (kg)", v: current, set: setCurrent, min: 150, max: 500, step: 5 },
            { l: id ? "Target bobot qurban (kg)" : "Qurban target weight (kg)", v: target, set: setTarget, min: 250, max: 650, step: 5 },
            { l: id ? "ADG dengan pakan saat ini (kg/hari)" : "ADG on current ration (kg/day)", v: adg, set: setAdg, min: 0.3, max: 1.4, step: 0.05 },
          ].map((s) => (
            <label key={s.l} className="mb-4 block">
              <span className="flex justify-between text-xs text-ink/60"><span>{s.l}</span><b className="text-ink">{num(s.v, lang, 2)}</b></span>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={(e) => s.set(+e.target.value)} className="mt-2 w-full accent-[#487A23]" />
            </label>
          ))}
        </Panel>
        <div className={clsx("rounded-2xl p-5", ok ? "bg-ink text-white" : "bg-clay-400/15 text-ink")}>
          <p className="text-xs uppercase tracking-wider opacity-60">{id ? "Proyeksi saat Iduladha" : "Projection at Eid al-Adha"}</p>
          <p className="mt-2 font-display text-5xl font-semibold">{projected} kg</p>
          <p className={clsx("mt-2 text-sm font-semibold", ok ? "text-lime" : "text-clay-500")}>
            {ok ? (id ? "✓ Target tercapai" : "✓ Target reached") : id ? `✗ Kurang ${target - projected} kg — butuh ADG ${num(needAdg, lang, 2)} kg/hari` : `✗ ${target - projected} kg short — needs ADG ${num(needAdg, lang, 2)} kg/day`}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xs opacity-60">{id ? "Est. nilai jual" : "Est. sale value"}</p>
              <p className="font-semibold">{idr(projected * price)}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xs opacity-60">{id ? "Harga hidup acuan" : "Ref. live price"}</p>
              <p className="font-semibold">{idr(price)}/kg</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] opacity-50">{id ? "Harga hidup asumsi untuk ilustrasi; dapat diganti dengan harga lokal Anda." : "Live price is an illustrative assumption; replace with your local price."}</p>
        </div>
      </div>
    </>
  );
}
