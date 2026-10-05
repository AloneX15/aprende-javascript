import { NextResponse, type NextRequest } from "next/server";

/** Redirige la raíz al idioma preferido del navegador (español por defecto). */
export function proxy(request: NextRequest) {
  const preferred = request.headers.get("accept-language") ?? "";
  const locale = /^en\b/i.test(preferred.trim()) ? "en" : "es";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
