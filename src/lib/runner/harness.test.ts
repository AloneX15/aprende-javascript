import { describe, expect, it } from "vitest";
import { runTests } from "./harness";
import { allChallenges } from "@/content/tree";
import { locales } from "@/i18n/config";

describe("runTests", () => {
  const tests = [{ args: [2, 3], expected: 5 }];

  it("pasa con una solución correcta", () => {
    expect(runTests("function sumar(a, b) { return a + b; }", "sumar", tests).passed).toBe(true);
  });

  it("clasifica los errores de sintaxis", () => {
    expect(runTests("function sumar(a, b) { return a + ", "sumar", tests).error?.kind).toBe("SyntaxError");
  });

  it("detecta cuando falta la función", () => {
    expect(runTests("function otra() {}", "sumar", tests).error?.kind).toBe("missingFunction");
  });

  it("marca un resultado incorrecto como error de lógica", () => {
    const result = runTests("function sumar(a, b) { return a - b; }", "sumar", tests);
    expect(result.passed).toBe(false);
    expect(result.tests[0].error?.kind).toBe("wrongResult");
    expect(result.tests[0].received).toBe(-1);
  });

  it("clasifica los errores en tiempo de ejecución", () => {
    const result = runTests("function sumar(a, b) { return noExiste; }", "sumar", tests);
    expect(result.tests[0].error?.kind).toBe("ReferenceError");
  });
});

describe("retos", () => {
  it("tienen identificadores únicos", () => {
    const ids = allChallenges.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const challenge of allChallenges) {
    for (const locale of locales) {
      it(`${challenge.id} (${locale}): la solución pasa y el código inicial no`, () => {
        const name = challenge.functionName[locale];
        expect(runTests(challenge.solution[locale], name, challenge.tests).passed).toBe(true);
        expect(runTests(challenge.starter[locale], name, challenge.tests).passed).toBe(false);
      });
    }
  }
});
