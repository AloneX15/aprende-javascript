import type { Metadata } from "next";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale } from "@/lib/locale";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import "../globals.css";

export const metadata: Metadata = {
  title: "Aprende JavaScript",
  description: "El error no es un fracaso; es un dato.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const session = await auth();

  return (
    <html lang={locale}>
      <body>
        <header className="site-header">
          <Link href={`/${locale}`} className="brand">
            Aprende <span>JS</span>
          </Link>
          <nav>
            <Link href={`/${locale}/arbol`}>{t.nav.tree}</Link>
            {session && <Link href={`/${locale}/perfil`}>{t.nav.profile}</Link>}
            <LanguageSwitch locale={locale} label={t.language} />
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: `/${locale}` });
                }}
              >
                <button className="link-button">{t.signOut}</button>
              </form>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: `/${locale}/arbol` });
                }}
              >
                <button className="button">{t.signIn}</button>
              </form>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
