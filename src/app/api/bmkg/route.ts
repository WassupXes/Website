import { NextResponse } from "next/server";
import { thi, thiForecast } from "@/lib/mock";

// BMKG public forecast: https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=<kode wilayah tingkat IV>
type BmkgEntry = { local_datetime: string; t: number; hu: number; weather_desc?: string };

export async function GET(req: Request) {
  const adm4 = new URL(req.url).searchParams.get("adm4") ?? "31.71.01.1001";
  if (!/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/.test(adm4)) return NextResponse.json({ error: "invalid adm4" }, { status: 400 });

  try {
    const res = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`bmkg ${res.status}`);
    const json = await res.json();
    const lokasi = json?.lokasi ?? json?.data?.[0]?.lokasi ?? {};
    const entries: BmkgEntry[] = (json?.data?.[0]?.cuaca ?? []).flat();
    if (!entries.length) throw new Error("bmkg empty");
    const series = entries.map((e) => ({ time: e.local_datetime, t: e.t, rh: e.hu, thi: thi(e.t, e.hu), desc: e.weather_desc ?? "" }));
    return NextResponse.json({
      source: "live",
      location: [lokasi.desa, lokasi.kecamatan, lokasi.kotkab, lokasi.provinsi].filter(Boolean).join(", "),
      series,
    });
  } catch {
    const series = thiForecast().map((d) => ({ time: d.label, t: d.t, rh: d.rh, thi: d.thi, desc: "" }));
    return NextResponse.json({ source: "fallback", location: "Simulasi (BMKG tidak terjangkau)", series });
  }
}
