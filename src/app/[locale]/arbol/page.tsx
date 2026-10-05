import Link from "next/link";
import { auth } from "@/auth";
import { tree } from "@/content/tree";
import type { SkillNode } from "@/content/types";
import { getDictionary } from "@/i18n/dictionaries";
import { solvedChallengeIds } from "@/lib/db";
import { resolveLocale } from "@/lib/locale";

/** Agrupa los nodos por nivel: un nodo está un nivel por debajo de su prerrequisito más profundo. */
function levels(nodes: SkillNode[]): SkillNode[][] {
  const depth = new Map<string, number>();
  const depthOf = (node: SkillNode): number => {
    const known = depth.get(node.id);
    if (known !== undefined) return known;
    const d = node.requires.length
      ? 1 + Math.max(...node.requires.map((id) => depthOf(nodes.find((n) => n.id === id)!)))
      : 0;
    depth.set(node.id, d);
    return d;
  };
  const rows: SkillNode[][] = [];
  for (const node of nodes) (rows[depthOf(node)] ??= []).push(node);
  return rows;
}

export default async function TreePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const session = await auth();
  const solved = session ? solvedChallengeIds(session.user.githubId) : new Set<string>();

  return (
    <section>
      <h1>{t.tree.title}</h1>
      <p className="lead">{t.tree.intro}</p>
      <div className="tree">
        {levels(tree).map((row, i) => (
          <div className="tree-row" key={i}>
            {row.map((node) => {
              const available = node.challenges.length > 0;
              return (
                <article key={node.id} className={`tree-node ${available ? "is-available" : "is-locked"}`}>
                  <h2>{node.title[locale]}</h2>
                  <p>{node.summary[locale]}</p>
                  {available ? (
                    <ol className="challenge-list">
                      {node.challenges.map((c) => (
                        <li key={c.id}>
                          <Link href={`/${locale}/reto/${c.id}`}>{c.title[locale]}</Link>
                          {solved.has(c.id) && <span className="badge badge-done">{t.tree.solved}</span>}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <span className="badge">{t.tree.comingSoon}</span>
                  )}
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
