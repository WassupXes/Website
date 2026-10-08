// Seeded, deterministic mock data for the dashboard demo (same output on server & client).
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type Animal = {
  id: string;
  name: string;
  breed: string;
  sex: "J" | "B";
  ageMonths: number;
  weight: number;
  adg: number;
  rumination: number; // minutes/day
  activity: number; // index 0-100
  status: "sehat" | "pantau" | "sakit" | "birahi" | "bunting";
  pen: string;
  x: number;
  y: number;
};

const breeds = ["Bali", "PO", "Limousin X", "Simmental X", "Madura", "Brahman X"];
const names = ["Melati", "Bima", "Sekar", "Jalu", "Kenanga", "Gatot", "Ayu", "Bayu", "Dewi", "Rangga", "Sri", "Gagah", "Lestari", "Wira", "Mawar", "Tegar", "Putri", "Satria", "Intan", "Bagas", "Ratna", "Jaka", "Wulan", "Arya"];

export function makeHerd(n = 48, seed = 7): Animal[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const sex = r() > 0.45 ? "J" : "B";
    const roll = r();
    const status: Animal["status"] =
      roll < 0.05 ? "sakit" : roll < 0.13 ? "pantau" : sex === "B" && roll < 0.2 ? "birahi" : sex === "B" && roll < 0.38 ? "bunting" : "sehat";
    const pen = ["A", "B", "C", "D"][Math.floor(r() * 4)];
    const penOrigin = { A: [12, 14], B: [56, 12], C: [14, 58], D: [58, 56] }[pen]!;
    return {
      id: `TK-${String(1001 + i)}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
      breed: breeds[Math.floor(r() * breeds.length)],
      sex,
      ageMonths: 14 + Math.floor(r() * 30),
      weight: Math.round(260 + r() * 210),
      adg: +(status === "sakit" ? 0.15 + r() * 0.2 : 0.55 + r() * 0.5).toFixed(2),
      rumination: Math.round(status === "sakit" ? 240 + r() * 90 : status === "pantau" ? 360 + r() * 60 : 450 + r() * 110),
      activity: Math.round(status === "birahi" ? 85 + r() * 15 : status === "sakit" ? 15 + r() * 15 : 40 + r() * 30),
      status,
      pen,
      x: penOrigin[0] + r() * 28,
      y: penOrigin[1] + r() * 28,
    };
  });
}

export function weightSeries(days = 120, seed = 3) {
  const r = rng(seed);
  let w = 285;
  let target = 285;
  return Array.from({ length: days / 7 + 1 }, (_, i) => {
    w += 7 * (0.72 + (r() - 0.5) * 0.18) - (i === 9 ? 6 : 0);
    target += 7 * 0.8;
    return { week: `M${i}`, actual: Math.round(w), target: Math.round(target) };
  });
}

export function ruminationSeries(seed = 11) {
  const r = rng(seed);
  return Array.from({ length: 14 }, (_, i) => {
    const drop = i >= 10 ? (i - 9) * 55 : 0;
    return {
      day: `H-${13 - i}`,
      rumination: Math.round(500 + (r() - 0.5) * 40 - drop),
      activity: Math.round(55 + (r() - 0.5) * 10 - drop / 8),
      baseline: 500,
    };
  });
}

export function heatSeries(seed = 5) {
  const r = rng(seed);
  return Array.from({ length: 48 }, (_, i) => {
    const h = i / 2;
    const spike = i > 30 && i < 40 ? 45 * Math.sin(((i - 30) / 10) * Math.PI) : 0;
    return { hour: `${String(Math.floor(h)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`, activity: Math.round(40 + (r() - 0.5) * 12 + spike) };
  });
}

// THI = 0.8*T + RH/100*(T-14.4) + 46.4  (Thom / NRC 1971, °C)
export function thi(t: number, rh: number) {
  return +(0.8 * t + (rh / 100) * (t - 14.4) + 46.4).toFixed(1);
}

export function thiForecast(seed = 9) {
  const r = rng(seed);
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i * 3;
    const hh = hour % 24;
    const t = 24 + 8 * Math.max(0, Math.sin(((hh - 6) / 12) * Math.PI)) + (r() - 0.5) * 1.5;
    const rh = 92 - 30 * Math.max(0, Math.sin(((hh - 6) / 12) * Math.PI)) + (r() - 0.5) * 5;
    return { label: `${["Kam", "Jum", "Sab"][Math.floor(hour / 24)]} ${String(hh).padStart(2, "0")}:00`, t: +t.toFixed(1), rh: Math.round(rh), thi: thi(t, rh) };
  });
}

// Reference price snapshots (labelled in UI). Beef: Panel Harga Bapanas reports 2024–2025, ~Rp130–139k/kg; HAP Rp140k.
export function priceSeries(seed = 21) {
  const r = rng(seed);
  const months = ["Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep"];
  return months.map((m, i) => {
    const seasonal = m === "Mar" ? 6000 : m === "Mei" ? 5000 : m === "Jun" ? 3500 : 0;
    return {
      month: m,
      daging: Math.round(131000 + seasonal + (r() - 0.5) * 2500 + i * 120),
      hidup: Math.round(52000 + seasonal * 0.35 + (r() - 0.5) * 1500 + i * 60),
      hap: 140000,
    };
  });
}

// BPS 2024 table "Populasi Ternak Menurut Provinsi dan Jenis Ternak" (sapi potong, ekor). Sulsel from Databoks 2024.
export const bpsSnapshot = [
  { prov: "Jawa Timur", v: 3617392 },
  { prov: "NTB", v: 1308204 },
  { prov: "Jawa Tengah", v: 1284673 },
  { prov: "Sulawesi Selatan", v: 814180 },
  { prov: "NTT", v: 609414 },
];

export function scoreHistory() {
  return [
    { m: "Apr", score: 612 },
    { m: "Mei", score: 628 },
    { m: "Jun", score: 641 },
    { m: "Jul", score: 655 },
    { m: "Agu", score: 671 },
    { m: "Sep", score: 694 },
    { m: "Okt", score: 712 },
  ];
}
