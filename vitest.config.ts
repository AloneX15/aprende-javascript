import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": src(""),
      // "server-only" solo existe dentro de Next; en los tests lo sustituimos por un módulo vacío.
      "server-only": src("test/server-only-stub.ts"),
    },
  },
  test: { include: ["src/**/*.test.ts"], env: { DATABASE_PATH: ":memory:" } },
});
