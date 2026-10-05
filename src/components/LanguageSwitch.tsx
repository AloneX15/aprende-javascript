"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "es" ? "en" : "es";
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${other}`);
  return (
    <Link href={href} hrefLang={other}>
      {label}
    </Link>
  );
}
