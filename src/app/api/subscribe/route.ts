import { NextResponse } from "next/server";

const TYPES = new Set(["newsletter", "trial", "kredit", "kontak", "waitlist"]);
const ALLOWED = ["type", "lang", "page", "name", "email", "phone", "org", "province", "herd", "species", "role", "amount", "message", "tenor"];

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field.
  if (body.website) return NextResponse.json({ ok: true });

  const type = String(body.type ?? "");
  const email = String(body.email ?? "").trim();
  if (!TYPES.has(type)) return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });

  const row: Record<string, string> = { ts: new Date().toISOString() };
  for (const k of ALLOWED) if (body[k] != null) row[k] = String(body[k]).slice(0, 2000);

  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.log("[subscribe] SHEETS_WEBHOOK_URL not set, lead:", row);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, secret: process.env.SHEETS_WEBHOOK_SECRET ?? "" }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`sheets ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("[subscribe] failed", e);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
