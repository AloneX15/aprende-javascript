import type { ChallengeTest } from "@/content/types";
import type { RunResult } from "./harness";

const TIMEOUT_MS = 2000;

/** Ejecuta los tests en un Web Worker nuevo y lo termina si tarda demasiado. */
export function runInWorker(code: string, functionName: string, tests: ChallengeTest[]): Promise<RunResult> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("./runner.worker.ts", import.meta.url), { type: "module" });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ passed: false, error: { kind: "timeout", message: `> ${TIMEOUT_MS} ms` }, tests: [] });
    }, TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<RunResult>) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(event.data);
    };
    worker.onerror = (event) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ passed: false, error: { kind: "other", message: event.message }, tests: [] });
    };
    worker.postMessage({ code, functionName, tests });
  });
}
