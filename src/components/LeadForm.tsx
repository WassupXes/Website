"use client";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import clsx from "clsx";
import { t, type Lang } from "@/lib/i18n";
import { forms, provinces, roleOptions, speciesOptions } from "@/dictionaries/ui";

type Field = "name" | "email" | "phone" | "org" | "province" | "herd" | "species" | "role" | "amount" | "message";
type FormType = "newsletter" | "trial" | "kredit" | "kontak" | "waitlist";

async function submit(type: FormType, lang: Lang, data: Record<string, string>) {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, lang, ...data, page: window.location.pathname }),
  });
  if (!res.ok) throw new Error("failed");
}

export function NewsletterForm({ lang, dark = true, type = "newsletter" }: { lang: Lang; dark?: boolean; type?: FormType }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  return state === "done" ? (
    <p className={clsx("flex items-center gap-2 text-sm font-medium", dark ? "text-lime" : "text-moss-600")}>
      <CheckCircle2 className="h-5 w-5" /> {t(lang, forms.successNews)}
    </p>
  ) : (
    <form
      className="flex w-full flex-col gap-2 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setState("loading");
        try {
          await submit(type, lang, { email: String(fd.get("email")), website: String(fd.get("website") ?? "") });
          setState("done");
        } catch {
          setState("error");
        }
      }}
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <input
        required
        type="email"
        name="email"
        placeholder={t(lang, forms.emailPlaceholder)}
        aria-label={t(lang, forms.email)}
        className={clsx(
          "min-w-0 flex-1 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2",
          dark ? "border border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:ring-lime/50" : "border border-ink/15 bg-white text-ink placeholder:text-ink/40 focus:ring-moss-200",
        )}
      />
      <button disabled={state === "loading"} className="btn-lime shrink-0">
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : t(lang, forms.subscribe)}
      </button>
      {state === "error" && <p className="text-xs text-clay-400 sm:hidden">{t(lang, forms.error)}</p>}
    </form>
  );
}

export default function LeadForm({ lang, type, fields, cta }: { lang: Lang; type: FormType; fields: Field[]; cta?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  if (state === "done")
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-moss-500" />
        <p className="text-lg font-semibold text-ink">{t(lang, forms.success)}</p>
      </div>
    );

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        fd.forEach((v, k) => (data[k] = String(v)));
        setState("loading");
        try {
          await submit(type, lang, data);
          setState("done");
        } catch {
          setState("error");
        }
      }}
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      {fields.map((f) => (
        <label key={f} className={clsx("block", (f === "message" || f === "org") && "sm:col-span-2")}>
          <span className="mb-1.5 block text-xs font-semibold text-ink/70">{t(lang, forms[f])}</span>
          {f === "province" ? (
            <select name={f} required className="input" defaultValue="">
              <option value="" disabled>—</option>
              {provinces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          ) : f === "species" || f === "role" ? (
            <select name={f} required className="input" defaultValue="">
              <option value="" disabled>—</option>
              {(f === "species" ? speciesOptions : roleOptions).map((o) => (
                <option key={o.id} value={o.id}>
                  {t(lang, o)}
                </option>
              ))}
            </select>
          ) : f === "message" ? (
            <textarea name={f} rows={4} className="input" />
          ) : (
            <input
              name={f}
              required={f === "name" || f === "email" || f === "phone"}
              type={f === "email" ? "email" : f === "herd" || f === "amount" ? "number" : f === "phone" ? "tel" : "text"}
              min={f === "herd" || f === "amount" ? 1 : undefined}
              placeholder={f === "phone" ? "08xx-xxxx-xxxx" : f === "email" ? t(lang, forms.emailPlaceholder) : undefined}
              className="input"
            />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button disabled={state === "loading"} className="btn-dark w-full sm:w-auto">
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : cta ?? t(lang, forms.submit)}
        </button>
        {state === "error" && <p className="mt-3 text-sm text-clay-500">{t(lang, forms.error)}</p>}
        <p className="mt-3 text-xs text-ink/45">{t(lang, forms.consent)}</p>
      </div>
    </form>
  );
}
