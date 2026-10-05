import { describe, expect, it } from "vitest";
import { profileStats, recordAttempt, solvedChallengeIds, upsertUser } from "./db";

describe("progreso", () => {
  it("cuenta un error superado cuando se resuelve tras fallar", () => {
    upsertUser({ githubId: 1, login: "ada" });
    expect(recordAttempt(1, "sumar", false).recovered).toBe(false);
    expect(recordAttempt(1, "sumar", true).recovered).toBe(true);
    expect(recordAttempt(1, "sumar", true).recovered).toBe(false);
    expect(recordAttempt(1, "es-par", true).recovered).toBe(false);

    expect(solvedChallengeIds(1)).toEqual(new Set(["sumar", "es-par"]));
    expect(profileStats(1)).toEqual({ solved: 2, recovered: 1, attempts: 4 });
  });

  it("un perfil sin intentos empieza en cero", () => {
    upsertUser({ githubId: 2, login: "grace" });
    expect(profileStats(2)).toEqual({ solved: 0, recovered: 0, attempts: 0 });
  });
});
