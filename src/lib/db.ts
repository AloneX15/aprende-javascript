import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Base de datos SQLite integrada en Node (sin servicios externos ni costes).
 * Un único fichero, configurable con DATABASE_PATH.
 */
const path = process.env.DATABASE_PATH ?? "./data/aprende.db";
const inMemory = path === ":memory:";

function open(): DatabaseSync {
  if (!inMemory) mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      github_id   INTEGER PRIMARY KEY,
      login       TEXT NOT NULL,
      name        TEXT,
      avatar_url  TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS progress (
      github_id     INTEGER NOT NULL REFERENCES users(github_id),
      challenge_id  TEXT NOT NULL,
      attempts      INTEGER NOT NULL DEFAULT 0,
      failures      INTEGER NOT NULL DEFAULT 0,
      solved_at     TEXT,
      PRIMARY KEY (github_id, challenge_id)
    );
  `);
  return db;
}

const globalForDb = globalThis as unknown as { db?: DatabaseSync };
export const db = globalForDb.db ?? open();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;

export interface GitHubUser {
  githubId: number;
  login: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export function upsertUser(user: GitHubUser): void {
  db.prepare(
    `INSERT INTO users (github_id, login, name, avatar_url) VALUES (?, ?, ?, ?)
     ON CONFLICT(github_id) DO UPDATE SET login = excluded.login, name = excluded.name, avatar_url = excluded.avatar_url`,
  ).run(user.githubId, user.login, user.name ?? null, user.avatarUrl ?? null);
}

export interface AttemptOutcome {
  /** El reto se resolvió en este intento después de haber fallado antes. */
  recovered: boolean;
}

/** Registra un intento. Un fallo nunca resta: solo se cuenta como dato. */
export function recordAttempt(githubId: number, challengeId: string, passed: boolean): AttemptOutcome {
  const before = db
    .prepare(`SELECT failures, solved_at FROM progress WHERE github_id = ? AND challenge_id = ?`)
    .get(githubId, challengeId) as { failures: number; solved_at: string | null } | undefined;

  db.prepare(
    `INSERT INTO progress (github_id, challenge_id, attempts, failures, solved_at)
     VALUES (?, ?, 1, ?, CASE WHEN ? THEN datetime('now') END)
     ON CONFLICT(github_id, challenge_id) DO UPDATE SET
       attempts = attempts + 1,
       failures = failures + excluded.failures,
       solved_at = COALESCE(solved_at, excluded.solved_at)`,
  ).run(githubId, challengeId, passed ? 0 : 1, passed ? 1 : 0);

  return { recovered: passed && !before?.solved_at && (before?.failures ?? 0) > 0 };
}

export function solvedChallengeIds(githubId: number): Set<string> {
  const rows = db
    .prepare(`SELECT challenge_id FROM progress WHERE github_id = ? AND solved_at IS NOT NULL`)
    .all(githubId) as { challenge_id: string }[];
  return new Set(rows.map((r) => r.challenge_id));
}

export interface ProfileStats {
  solved: number;
  recovered: number;
  attempts: number;
}

export function profileStats(githubId: number): ProfileStats {
  const row = db
    .prepare(
      `SELECT
         COUNT(solved_at) AS solved,
         SUM(CASE WHEN solved_at IS NOT NULL AND failures > 0 THEN 1 ELSE 0 END) AS recovered,
         COALESCE(SUM(attempts), 0) AS attempts
       FROM progress WHERE github_id = ?`,
    )
    .get(githubId) as { solved: number; recovered: number | null; attempts: number };
  return { solved: row.solved, recovered: row.recovered ?? 0, attempts: row.attempts };
}
