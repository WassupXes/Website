"use client";
import { useState } from "react";
import clsx from "clsx";
import { idr, num, type Lang } from "@/lib/i18n";

export default function KurSimulator({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const [plafon, setPlafon] = useState(50_000_000);
  const [rate, setRate] = useState(6);
  const [tenor, setTenor] = useState(36);
  const [grace, setGrace] = useState(0);

  const r = rate / 100 / 12;
  const n = Math.max(1, tenor - grace);
  const graceInterest = plafon * r;
  const annuity = r === 0 ? plafon / n : (plafon * r) / (1 - Math.pow(1 + r, -n));
  const total = graceInterest * grace + annuity * n;

  const sliders = [
    { l: id ? "Plafon pinjaman" : "Loan amount", v: plafon, set: setPlafon, min: 5_000_000, max: 500_000_000, step: 5_000_000, fmt: (v: number) => idr(v) },
    { l: id ? "Tenor (bulan)" : "Term (months)", v: tenor, set: setTenor, min: 12, max: 60, step: 6, fmt: (v: number) => `${v}` },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="card p-6 lg:col-span-3">
        <p className="text-sm font-semibold">{id ? "Skema bunga" : "Interest scheme"}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { r: 6, g: 0, l: id ? "KUR reguler 6%" : "Regular KUR 6%", s: id ? "Berlaku" : "Current" },
            { r: 3, g: 12, l: id ? "KUR peternak 3% + tenggang 12 bln" : "Livestock KUR 3% + 12-mo grace", s: id ? "Usulan Jul 2025" : "Proposed Jul 2025" },
          ].map((o) => (
            <button
              key={o.r}
              onClick={() => {
                setRate(o.r);
                setGrace(o.g);
              }}
              className={clsx("rounded-2xl border p-4 text-left transition", rate === o.r ? "border-ink bg-ink text-white" : "border-ink/10 hover:border-ink/30")}
            >
              <p className="text-sm font-semibold">{o.l}</p>
              <p className={clsx("mt-1 text-xs", rate === o.r ? "text-lime" : "text-ink/50")}>{o.s}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-5">
          {sliders.map((s) => (
            <label key={s.l} className="block">
              <span className="flex justify-between text-sm"><span className="text-ink/60">{s.l}</span><b>{s.fmt(s.v)}</b></span>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={(e) => s.set(+e.target.value)} className="mt-2 w-full accent-[#487A23]" />
            </label>
          ))}
          <label className="flex items-center justify-between gap-4 text-sm">
            <span className="text-ink/60">{id ? "Masa tenggang (bulan)" : "Grace period (months)"}</span>
            <select value={grace} onChange={(e) => setGrace(+e.target.value)} className="input !w-28 !py-2">
              {[0, 6, 12].map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-3xl bg-ink p-6 text-white lg:col-span-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/50">{id ? "Angsuran per bulan" : "Monthly installment"}</p>
          <p className="h-display mt-2 text-4xl text-lime sm:text-5xl">{idr(annuity)}</p>
          {grace > 0 && (
            <p className="mt-2 text-sm text-white/65">{id ? `${grace} bulan pertama: bunga saja ${idr(graceInterest)}/bln` : `First ${grace} months: interest only ${idr(graceInterest)}/mo`}</p>
          )}
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-white/45">{id ? "Bunga / tahun" : "Rate / year"}</dt><dd className="font-semibold">{num(rate, lang)}%</dd></div>
          <div><dt className="text-white/45">{id ? "Total bayar" : "Total repaid"}</dt><dd className="font-semibold">{idr(total, true)}</dd></div>
          <div><dt className="text-white/45">{id ? "Total bunga" : "Total interest"}</dt><dd className="font-semibold">{idr(total - plafon, true)}</dd></div>
          <div><dt className="text-white/45">{id ? "Setara sapi bakalan*" : "Feeder cattle equiv.*"}</dt><dd className="font-semibold">±{Math.floor(plafon / 18_000_000)} {id ? "ekor" : "head"}</dd></div>
        </dl>
        <p className="mt-6 text-[11px] leading-relaxed text-white/45">
          {id
            ? "Simulasi anuitas untuk ilustrasi, bukan penawaran. Skema, bunga & persetujuan ditentukan bank penyalur KUR. *Asumsi harga bakalan ±Rp18 jt/ekor."
            : "Annuity simulation for illustration, not an offer. Scheme, rate & approval are set by the KUR lending bank. *Assumes ~Rp18M per feeder head."}
        </p>
      </div>
    </div>
  );
}
