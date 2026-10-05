import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale } from "@/lib/locale";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <section className="hero">
      <p className="motto">“{t.motto}”</p>
      <h1>Aprende JavaScript</h1>
      <p className="lead">{t.tagline}</p>
      <Link className="button button-large" href={`/${locale}/arbol`}>
        {t.start}
      </Link>
    </section>
  );
}
