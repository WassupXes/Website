import { NextResponse } from "next/server";
import { bpsSnapshot } from "@/lib/mock";

// BPS WebAPI dynamic data. Requires BPS_API_KEY (free, https://webapi.bps.go.id/developer/)
// and BPS_VAR_ID = variable id for "Populasi Sapi Potong menurut Provinsi" (find it via the subject/var list endpoints).
export async function GET() {
  const key = process.env.BPS_API_KEY;
  const v = process.env.BPS_VAR_ID;
  if (key && v) {
    try {
      const res = await fetch(`https://webapi.bps.go.id/v1/api/list/model/data/lang/ind/domain/0000/var/${v}/key/${key}`, {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(8000),
      });
      const json = await res.json();
      const vervar: { val: number; label: string }[] = json?.vervar ?? [];
      const content: Record<string, number> = json?.datacontent ?? {};
      const keys = Object.keys(content).sort();
      const rows = vervar
        .map((p) => {
          const k = keys.filter((x) => x.startsWith(String(p.val))).pop();
          return { prov: p.label, v: k ? Number(content[k]) : 0 };
        })
        .filter((r) => r.v > 0 && !/INDONESIA/i.test(r.prov))
        .sort((a, b) => b.v - a.v);
      if (rows.length) return NextResponse.json({ source: "live", rows });
    } catch {
      /* fall through to snapshot */
    }
  }
  return NextResponse.json({ source: "snapshot", note: "BPS 2024, Populasi Ternak Menurut Provinsi (sapi potong)", rows: bpsSnapshot });
}
