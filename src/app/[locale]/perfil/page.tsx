import { auth } from "@/auth";
import { allChallenges } from "@/content/tree";
import { getDictionary } from "@/i18n/dictionaries";
import { profileStats } from "@/lib/db";
import { resolveLocale } from "@/lib/locale";

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const session = await auth();

  if (!session) {
    return <p className="lead">{t.profile.signInFirst}</p>;
  }

  const stats = profileStats(session.user.githubId);
  return (
    <section>
      <div className="profile-head">
        {session.user.image && <img src={session.user.image} alt="" width={64} height={64} />}
        <div>
          <h1>{t.profile.title}</h1>
          <p className="muted">@{session.user.login}</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat stat-accent">
          <span className="stat-value">{stats.recovered}</span>
          <span>{t.profile.recovered}</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {stats.solved}/{allChallenges.length}
          </span>
          <span>{t.profile.solved}</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.attempts}</span>
          <span>{t.profile.attempts}</span>
        </div>
      </div>
      <p className="muted">{t.profile.note}</p>
    </section>
  );
}
