"use client";
import { motion } from "framer-motion";
import { Activity, HeartPulse, ThermometerSun, TrendingUp } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const cows = Array.from({ length: 34 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 10 + ((i * 7) % 28);
  const zone = i % 3;
  const cx = [150, 330, 250][zone] + Math.cos(a) * r * 1.4;
  const cy = [140, 150, 300][zone] + Math.sin(a) * r;
  return { cx, cy, alert: i === 5 || i === 21, heat: i === 12 };
});

export default function HeroVisual({ lang }: { lang: Lang }) {
  const id = lang === "id";
  const cards = [
    { icon: HeartPulse, tone: "text-clay-400", title: id ? "Ruminasi turun 38%" : "Rumination down 38%", sub: id ? "Melati · TK-1006 · cek suhu & nafsu makan" : "Melati · TK-1006 · check temp & appetite", pos: "left-0 top-6 sm:-left-6" },
    { icon: Activity, tone: "text-lime", title: id ? "Birahi terdeteksi" : "Heat detected", sub: id ? "Sekar · TK-1013 · IB ideal 08:00–14:00" : "Sekar · TK-1013 · best AI window 08:00–14:00", pos: "right-0 top-1/3 sm:-right-8" },
    { icon: ThermometerSun, tone: "text-clay-400", title: "THI 79", sub: id ? "Heat stress sedang · BMKG Kab. Malang" : "Moderate heat stress · BMKG Malang", pos: "left-2 bottom-24 sm:-left-10" },
    { icon: TrendingUp, tone: "text-lime", title: id ? "Skor Ternak 712 ▲18" : "Skor Ternak 712 ▲18", sub: id ? "Layak KUR · siap dibagikan ke bank" : "KUR-eligible · ready to share with lender", pos: "right-4 bottom-4 sm:-right-4" },
  ];

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#13241b] shadow-2xl">
        <svg viewBox="0 0 480 384" className="h-full w-full">
          <defs>
            <pattern id="grass" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#2f5a2a" />
              <circle cx="6" cy="5" r="0.6" fill="#24472a" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8F169" stopOpacity=".35" />
              <stop offset="100%" stopColor="#C8F169" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="480" height="384" fill="#16291f" />
          <path d="M20 30 L250 20 L240 230 L30 240Z" fill="#1d3a26" />
          <path d="M20 30 L250 20 L240 230 L30 240Z" fill="url(#grass)" />
          <path d="M262 22 L460 34 L452 250 L252 236Z" fill="#244a2c" />
          <path d="M262 22 L460 34 L452 250 L252 236Z" fill="url(#grass)" />
          <path d="M34 252 L448 262 L440 368 L40 362Z" fill="#1a3423" />
          <path d="M34 252 L448 262 L440 368 L40 362Z" fill="url(#grass)" />
          <path d="M0 246 C120 240 200 250 480 256" stroke="#c8b27a" strokeOpacity=".35" strokeWidth="6" fill="none" />
          <path d="M60 100 C120 60 200 70 220 140" stroke="#5aa0c8" strokeOpacity=".5" strokeWidth="3" fill="none" />
          {/* geofences */}
          <path d="M40 48 L232 40 L224 214 L48 222Z" fill="none" stroke="#C8F169" strokeOpacity=".7" strokeDasharray="6 6" strokeWidth="1.5" />
          <path d="M276 44 L440 52 L434 232 L268 222Z" fill="none" stroke="#C8F169" strokeOpacity=".45" strokeDasharray="6 6" strokeWidth="1.5" />
          {/* barns */}
          <rect x="370" y="290" width="54" height="30" rx="3" fill="#a8885a" opacity=".85" />
          <rect x="300" y="300" width="40" height="22" rx="3" fill="#8f7550" opacity=".85" />
          {/* gateway */}
          <circle cx="240" cy="240" r="70" fill="url(#glow)" />
          <circle cx="240" cy="240" r="10" fill="none" stroke="#C8F169" strokeWidth="1.5" className="pulse-ring" />
          <circle cx="240" cy="240" r="5" fill="#C8F169" />
          {cows.map((c, i) => (
            <g key={i}>
              {(c.alert || c.heat) && <circle cx={c.cx} cy={c.cy} r="5" fill="none" stroke={c.alert ? "#E0895A" : "#C8F169"} strokeWidth="1.5" className="pulse-ring" />}
              <motion.circle
                cx={c.cx}
                cy={c.cy}
                r="3.4"
                fill={c.alert ? "#E0895A" : c.heat ? "#C8F169" : "#F3EFE4"}
                animate={{ cx: [c.cx, c.cx + ((i % 5) - 2) * 3, c.cx], cy: [c.cy, c.cy + ((i % 3) - 1) * 3, c.cy] }}
                transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-4 left-4 rounded-full bg-ink/70 sm:bottom-auto sm:left-auto sm:right-4 sm:top-4 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur">
          ● {id ? "Live · Kelompok Tani Ternak Sumber Rejeki" : "Live · Sumber Rejeki Farmer Group"}
        </div>
      </div>

      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.25, duration: 0.5 }}
          className={`absolute ${c.pos} hidden w-60 rounded-2xl border border-white/10 bg-ink/85 p-3.5 shadow-2xl backdrop-blur-md sm:block`}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
              <c.icon className={`h-4 w-4 ${c.tone}`} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-white/55">{c.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
