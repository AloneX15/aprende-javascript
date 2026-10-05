import { runTests } from "./harness";
import type { ChallengeTest } from "@/content/types";

interface RunRequest {
  code: string;
  functionName: string;
  tests: ChallengeTest[];
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  const { code, functionName, tests } = event.data;
  self.postMessage(runTests(code, functionName, tests));
};
