import type { ChallengeTest } from "@/content/types";

/** Clasificación del error para explicarlo y, más adelante, alimentar el perfil de Flow. */
export type ErrorKind =
  | "SyntaxError"
  | "ReferenceError"
  | "TypeError"
  | "RangeError"
  | "missingFunction"
  | "wrongResult"
  | "timeout"
  | "other";

export interface TestResult {
  args: unknown[];
  expected: unknown;
  received?: unknown;
  passed: boolean;
  error?: { kind: ErrorKind; message: string };
}

export interface RunResult {
  passed: boolean;
  /** Error que impidió ejecutar los tests (sintaxis, función ausente…). */
  error?: { kind: ErrorKind; message: string };
  tests: TestResult[];
}

const KNOWN_ERRORS: ErrorKind[] = ["SyntaxError", "ReferenceError", "TypeError", "RangeError"];

export function classifyError(error: unknown): { kind: ErrorKind; message: string } {
  if (error instanceof Error) {
    const kind = (KNOWN_ERRORS as string[]).includes(error.name) ? (error.name as ErrorKind) : "other";
    return { kind, message: `${error.name}: ${error.message}` };
  }
  return { kind: "other", message: String(error) };
}

function sameValue(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Ejecuta el código del alumno y comprueba cada test.
 * Debe correr aislado (Web Worker); aquí no hay protección contra bucles infinitos.
 */
export function runTests(code: string, functionName: string, tests: ChallengeTest[]): RunResult {
  let fn: unknown;
  try {
    fn = new Function(
      `"use strict";\n${code}\n;return typeof ${functionName} !== "undefined" ? ${functionName} : undefined;`,
    )();
  } catch (error) {
    return { passed: false, error: classifyError(error), tests: [] };
  }

  if (typeof fn !== "function") {
    return {
      passed: false,
      error: { kind: "missingFunction", message: `${functionName} is not defined` },
      tests: [],
    };
  }

  const results = tests.map<TestResult>((test) => {
    try {
      const received = (fn as (...args: unknown[]) => unknown)(...structuredClone(test.args));
      const passed = sameValue(received, test.expected);
      return {
        ...test,
        received,
        passed,
        error: passed ? undefined : { kind: "wrongResult", message: "" },
      };
    } catch (error) {
      return { ...test, passed: false, error: classifyError(error) };
    }
  });

  return { passed: results.every((r) => r.passed), tests: results };
}
