import { fundamentos } from "./fundamentos";
import type { Challenge, SkillNode } from "./types";
import type { Locale } from "@/i18n/config";

/** Árbol de habilidades. En la Fase 1 solo Fundamentos tiene retos. */
export const tree: SkillNode[] = [
  {
    id: "fundamentos",
    title: { es: "Fundamentos", en: "Fundamentals" },
    summary: { es: "Variables, tipos, operadores", en: "Variables, types, operators" },
    requires: [],
    challenges: fundamentos,
  },
  {
    id: "control-de-flujo",
    title: { es: "Control de flujo", en: "Control flow" },
    summary: { es: "if, switch, bucles", en: "if, switch, loops" },
    requires: ["fundamentos"],
    challenges: [],
  },
  {
    id: "funciones",
    title: { es: "Funciones", en: "Functions" },
    summary: { es: "Parámetros, return, scope", en: "Parameters, return, scope" },
    requires: ["fundamentos"],
    challenges: [],
  },
  {
    id: "arrays-objetos",
    title: { es: "Arrays y objetos", en: "Arrays and objects" },
    summary: { es: "Métodos, desestructuración", en: "Methods, destructuring" },
    requires: ["control-de-flujo", "funciones"],
    challenges: [],
  },
  {
    id: "dom",
    title: { es: "DOM y eventos", en: "DOM and events" },
    summary: { es: "Página interactiva", en: "Interactive page" },
    requires: ["arrays-objetos"],
    challenges: [],
  },
  {
    id: "asincronia",
    title: { es: "Asincronía", en: "Asynchrony" },
    summary: { es: "Promesas, async/await", en: "Promises, async/await" },
    requires: ["arrays-objetos"],
    challenges: [],
  },
  {
    id: "clases",
    title: { es: "Clases y prototipos", en: "Classes and prototypes" },
    summary: { es: "Herencia, this", en: "Inheritance, this" },
    requires: ["arrays-objetos"],
    challenges: [],
  },
  {
    id: "depuracion",
    title: { es: "Depuración", en: "Debugging" },
    summary: { es: "try/catch, debugger", en: "try/catch, debugger" },
    requires: ["arrays-objetos"],
    challenges: [],
  },
  {
    id: "herramientas",
    title: { es: "Módulos y herramientas", en: "Modules and tooling" },
    summary: { es: "npm, ESLint, bundlers", en: "npm, ESLint, bundlers" },
    requires: ["dom", "asincronia", "clases", "depuracion"],
    challenges: [],
  },
  {
    id: "testing",
    title: { es: "Testing", en: "Testing" },
    summary: { es: "Tests automáticos con Vitest", en: "Automated tests with Vitest" },
    requires: ["dom", "asincronia", "clases", "depuracion"],
    challenges: [],
  },
  {
    id: "node",
    title: { es: "Node.js y APIs", en: "Node.js and APIs" },
    summary: { es: "Servidor, fetch, REST", en: "Server, fetch, REST" },
    requires: ["dom", "asincronia", "clases", "depuracion"],
    challenges: [],
  },
  {
    id: "proyecto-final",
    title: { es: "Proyecto final", en: "Final project" },
    summary: { es: "App completa en tu GitHub", en: "Full app on your GitHub" },
    requires: ["herramientas", "testing", "node"],
    challenges: [],
  },
];

export const allChallenges: Challenge[] = tree.flatMap((node) => node.challenges);

export function findChallenge(id: string): { challenge: Challenge; next?: Challenge } | undefined {
  const index = allChallenges.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  return { challenge: allChallenges[index], next: allChallenges[index + 1] };
}

export function mdnUrl(path: string, locale: Locale): string {
  const lang = locale === "es" ? "es" : "en-US";
  return `https://developer.mozilla.org/${lang}/docs/${path}`;
}
