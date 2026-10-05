import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { allChallenges, findChallenge, mdnUrl } from "@/content/tree";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale } from "@/lib/locale";
import { ChallengeRunner } from "./ChallengeRunner";

export function generateStaticParams() {
  return locales.flatMap((locale) => allChallenges.map((c) => ({ locale, id: c.id })));
}

export default async function ChallengePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const found = findChallenge(id);
  if (!found) notFound();
  const { challenge, next } = found;
  const session = await auth();

  return (
    <ChallengeRunner
      locale={locale}
      t={getDictionary(locale)}
      signedIn={Boolean(session)}
      challenge={{
        id: challenge.id,
        kind: challenge.kind,
        title: challenge.title[locale],
        prompt: challenge.prompt[locale],
        hint: challenge.hint[locale],
        functionName: challenge.functionName[locale],
        starter: challenge.starter[locale],
        tests: challenge.tests,
        sourceUrl: mdnUrl(challenge.mdnPath, locale),
      }}
      nextId={next?.id}
    />
  );
}
