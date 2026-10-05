"use client";

import { useState } from "react";
import Link from "next/link";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import type { ChallengeTest } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RunResult } from "@/lib/runner/harness";
import { runInWorker } from "@/lib/runner/run-in-worker";
import { InlineCode } from "@/components/InlineCode";

interface Props {
  locale: Locale;
  t: Dictionary;
  signedIn: boolean;
  challenge: {
    id: string;
    kind: "build" | "debug";
    title: string;
    prompt: string;
    hint: string;
    functionName: string;
    starter: string;
    tests: ChallengeTest[];
    sourceUrl: string;
  };
  nextId?: string;
}

const show = (value: unknown) => (value === undefined ? "undefined" : JSON.stringify(value));

export function ChallengeRunner({ locale, t, signedIn, challenge, nextId }: Props) {
  const [code, setCode] = useState(challenge.starter);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [failedBefore, setFailedBefore] = useState(false);

  const firstError = result?.error ?? result?.tests.find((r) => !r.passed)?.error;

  async function run() {
    setRunning(true);
    const outcome = await runInWorker(code, challenge.functionName, challenge.tests);
    setResult(outcome);
    setRunning(false);
    if (!outcome.passed) setFailedBefore(true);
    if (signedIn) {
      // El progreso se guarda en segundo plano; un fallo de red no interrumpe al alumno.
      fetch("/api/progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ challengeId: challenge.id, passed: outcome.passed }),
      }).catch(() => {});
    }
  }

  return (
    <section className="challenge">
      <Link href={`/${locale}/arbol`} className="back">
        ← {t.challenge.back}
      </Link>
      <h1>{challenge.title}</h1>
      {challenge.kind === "debug" && <span className="badge badge-debug">{t.challenge.debugBadge}</span>}
      <p className="lead">
        <InlineCode text={challenge.prompt} />
      </p>
      <p className="source">
        <a href={challenge.sourceUrl} target="_blank" rel="noreferrer">
          MDN ↗
        </a>
      </p>

      <div className="editor">
        <CodeMirror value={code} onChange={setCode} extensions={[javascript()]} minHeight="180px" />
      </div>

      <div className="actions">
        <button className="button" onClick={run} disabled={running}>
          {running ? t.challenge.running : t.challenge.run}
        </button>
        <button className="link-button" onClick={() => setShowHint(true)}>
          {t.challenge.hint}
        </button>
        <button className="link-button" onClick={() => setCode(challenge.starter)}>
          {t.challenge.reset}
        </button>
      </div>

      {showHint && (
        <p className="hint">
          <InlineCode text={challenge.hint} />
        </p>
      )}
      {!signedIn && <p className="muted">{t.challenge.signInToSave}</p>}

      {result && (
        <div className="results" aria-live="polite">
          {result.passed ? (
            <div className="feedback success">
              <strong>{t.challenge.allPassed}</strong>
              {failedBefore && <p>{t.challenge.recovered}</p>}
              {nextId && (
                <Link className="button" href={`/${locale}/reto/${nextId}`}>
                  {t.challenge.next} →
                </Link>
              )}
            </div>
          ) : (
            firstError && (
              <div className="feedback error">
                {result.tests.length > 0 && (
                  <strong>
                    {t.challenge.summary
                      .replace("{passed}", String(result.tests.filter((r) => r.passed).length))
                      .replace("{total}", String(result.tests.length))}
                  </strong>
                )}
                <p>{t.errors[firstError.kind]}</p>
                {result.error && <pre>{result.error.message}</pre>}
              </div>
            )
          )}

          {result.tests.length > 0 && (
            <>
              <h2>{t.challenge.tests}</h2>
              <ul className="test-list">
                {result.tests.map((test, i) => (
                  <li key={i} className={test.passed ? "pass" : "fail"}>
                    <code>
                      {test.passed ? "✓" : "✗"} {challenge.functionName}({test.args.map(show).join(", ")})
                    </code>
                    {!test.passed && (
                      <div className="test-detail">
                        <span>
                          {t.challenge.expected}: <code>{show(test.expected)}</code>
                        </span>
                        {test.error?.kind === "wrongResult" ? (
                          <span>
                            {t.challenge.received}: <code>{show(test.received)}</code>
                          </span>
                        ) : (
                          test.error && <code>{test.error.message}</code>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
