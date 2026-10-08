"use client";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Loader2, RefreshCw } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Bmkg = { source: "live" | "fallback"; location: string; series: { time: string; t: number; rh: number; thi: number }[] };
type Bps = { source: "live" | "snapshot"; rows: { prov: string; v: number }[] };

export default function LiveData({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const [adm4, setAdm4] = useState("31.71.01.1001");
  const [bmkg, setBmkg] = useState<Bmkg | null>(null);
  const [bps, setBps] = useState<Bps | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (code: string) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/bmkg?adm4=${encodeURIComponent(code)}`);
      if (r.ok) setBmkg(await r.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load("31.71.01.1001");
    fetch("/api/bps").then((r) => r.json()).then(setBps).catch(() => null);
  }, [load]);

  const badge = (live: boolean) => (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${live ? "bg-lime text-ink" : "bg-sand-100 text-ink/60"}`}>
      {live ? "● Live" : id ? "Fallback / snapshot" : "Fallback / snapshot"}
    </span>
  );

  const max = bmkg?.series.reduce((m, d) => Math.max(m, d.thi), 0) ?? 0;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">BMKG → THI</p>
          {bmkg && badge(bmkg.source === "live")}
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            load(adm4);
          }}
        >
          <input value={adm4} onChange={(e) => setAdm4(e.target.value)} className="input !py-2 font-mono" aria-label="adm4" placeholder="31.71.01.1001" />
          <button className="btn-dark !py-2">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}</button>
        </form>
        <p className="mt-2 text-xs text-ink/50">{id ? "Kode wilayah tingkat desa (adm4, Kepmendagri)." : "Village-level area code (adm4, Ministry of Home Affairs)."} {bmkg?.location}</p>
        <div className="mt-4 h-56">
          {bmkg && (
            <ResponsiveContainer>
              <LineChart data={bmkg.series}>
                <CartesianGrid stroke="#E7E0CC" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={Math.max(1, Math.floor(bmkg.series.length / 6))} tickFormatter={(v: string) => v.slice(5, 16)} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={28} domain={[60, 90]} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <ReferenceLine y={72} stroke="#E0B33A" strokeDasharray="4 4" />
                <Line dataKey="thi" name="THI" stroke="#D06A36" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-2 text-sm text-ink/70">
          {id ? "THI tertinggi 3 hari ke depan:" : "Peak THI over the next 3 days:"} <b>{max || "–"}</b> {max >= 79 ? (id ? "· bahaya" : "· danger") : max >= 72 ? (id ? "· waspada" : "· alert") : ""}
        </p>
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">{id ? "BPS → populasi sapi potong" : "BPS → beef cattle population"}</p>
          {bps && badge(bps.source === "live")}
        </div>
        <p className="mt-2 text-xs text-ink/50">{id ? "Live bila BPS_API_KEY & BPS_VAR_ID diisi; selain itu snapshot tabel BPS 2024." : "Live when BPS_API_KEY & BPS_VAR_ID are set; otherwise the 2024 BPS table snapshot."}</p>
        <div className="mt-4 h-72">
          {bps && (
            <ResponsiveContainer>
              <BarChart data={bps.rows.slice(0, 8).map((r) => ({ ...r, jt: +(r.v / 1e6).toFixed(2) }))} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid stroke="#E7E0CC" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="prov" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v: number) => `${v} ${id ? "jt ekor" : "M head"}`} />
                <Bar dataKey="jt" fill="#487A23" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
