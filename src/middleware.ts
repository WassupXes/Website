import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLang } from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const accept = req.headers.get("accept-language") ?? "";
  const lang = accept.toLowerCase().startsWith("en") ? "en" : defaultLang;
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
