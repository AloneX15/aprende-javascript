import type { Localized } from "@/i18n/config";

export interface ChallengeTest {
  args: unknown[];
  expected: unknown;
}

export interface Challenge {
  id: string;
  /** "build": escribir la función. "debug": arreglar código roto a propósito. */
  kind: "build" | "debug";
  title: Localized;
  prompt: Localized;
  hint: Localized;
  /** Nombre de la función que los tests llaman, en cada idioma. */
  functionName: Localized;
  starter: Localized;
  /** Solución de referencia; los tests del repo comprueban que pasa. */
  solution: Localized;
  tests: ChallengeTest[];
  /** Fuente del corpus de la que sale la explicación (ruta de MDN tras /docs/). */
  mdnPath: string;
}

export interface SkillNode {
  id: string;
  title: Localized;
  summary: Localized;
  requires: string[];
  challenges: Challenge[];
}
