import clsx from "clsx";

export default function Logo({ dark = true, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 font-display text-xl font-semibold tracking-normal", dark ? "text-white" : "text-ink", className)}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
        <rect width="64" height="64" rx="16" fill={dark ? "#C8F169" : "#0B1410"} />
        <path d="M18 22h28v6H35v20h-6V28H18z" fill={dark ? "#0B1410" : "#C8F169"} />
        <circle cx="46" cy="44" r="5" fill={dark ? "#0B1410" : "#C8F169"} />
      </svg>
      <span>
        ternakin<span className={dark ? "text-lime" : "text-moss-600"}>.ai</span>
      </span>
    </span>
  );
}
