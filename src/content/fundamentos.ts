import type { Challenge } from "./types";

export const fundamentos: Challenge[] = [
  {
    id: "sumar",
    kind: "build",
    title: { es: "Tu primera suma", en: "Your first sum" },
    prompt: {
      es: "Escribe la función `sumar(a, b)` que devuelva la suma de dos números.",
      en: "Write the function `add(a, b)` that returns the sum of two numbers.",
    },
    hint: {
      es: "Usa el operador `+` y la palabra `return`.",
      en: "Use the `+` operator and the `return` keyword.",
    },
    functionName: { es: "sumar", en: "add" },
    starter: {
      es: "function sumar(a, b) {\n  // Tu código aquí\n}\n",
      en: "function add(a, b) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function sumar(a, b) {\n  return a + b;\n}\n",
      en: "function add(a, b) {\n  return a + b;\n}\n",
    },
    tests: [
      { args: [2, 3], expected: 5 },
      { args: [-1, 1], expected: 0 },
      { args: [0.5, 0.25], expected: 0.75 },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Addition",
  },
  {
    id: "area-rectangulo",
    kind: "build",
    title: { es: "Área de un rectángulo", en: "Area of a rectangle" },
    prompt: {
      es: "Escribe `areaRectangulo(base, altura)` que devuelva el área (base por altura).",
      en: "Write `rectangleArea(width, height)` that returns the area (width times height).",
    },
    hint: {
      es: "La multiplicación en JavaScript se escribe con `*`.",
      en: "Multiplication in JavaScript is written with `*`.",
    },
    functionName: { es: "areaRectangulo", en: "rectangleArea" },
    starter: {
      es: "function areaRectangulo(base, altura) {\n  // Tu código aquí\n}\n",
      en: "function rectangleArea(width, height) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function areaRectangulo(base, altura) {\n  return base * altura;\n}\n",
      en: "function rectangleArea(width, height) {\n  return width * height;\n}\n",
    },
    tests: [
      { args: [3, 4], expected: 12 },
      { args: [10, 0], expected: 0 },
      { args: [2.5, 2], expected: 5 },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Multiplication",
  },
  {
    id: "es-par",
    kind: "build",
    title: { es: "¿Par o impar?", en: "Even or odd?" },
    prompt: {
      es: "Escribe `esPar(n)` que devuelva `true` si `n` es par y `false` si no.",
      en: "Write `isEven(n)` that returns `true` if `n` is even and `false` otherwise.",
    },
    hint: {
      es: "El operador resto `%` te dice qué sobra al dividir. Un número par entre 2 no deja resto.",
      en: "The remainder operator `%` tells you what is left after dividing. An even number divided by 2 leaves nothing.",
    },
    functionName: { es: "esPar", en: "isEven" },
    starter: {
      es: "function esPar(n) {\n  // Tu código aquí\n}\n",
      en: "function isEven(n) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function esPar(n) {\n  return n % 2 === 0;\n}\n",
      en: "function isEven(n) {\n  return n % 2 === 0;\n}\n",
    },
    tests: [
      { args: [4], expected: true },
      { args: [7], expected: false },
      { args: [0], expected: true },
      { args: [-3], expected: false },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Remainder",
  },
  {
    id: "celsius-fahrenheit",
    kind: "build",
    title: { es: "De Celsius a Fahrenheit", en: "Celsius to Fahrenheit" },
    prompt: {
      es: "Escribe `aFahrenheit(celsius)` usando la fórmula `celsius * 9 / 5 + 32`.",
      en: "Write `toFahrenheit(celsius)` using the formula `celsius * 9 / 5 + 32`.",
    },
    hint: {
      es: "JavaScript respeta la precedencia de operadores: primero `*` y `/`, luego `+`.",
      en: "JavaScript follows operator precedence: `*` and `/` first, then `+`.",
    },
    functionName: { es: "aFahrenheit", en: "toFahrenheit" },
    starter: {
      es: "function aFahrenheit(celsius) {\n  // Tu código aquí\n}\n",
      en: "function toFahrenheit(celsius) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function aFahrenheit(celsius) {\n  return celsius * 9 / 5 + 32;\n}\n",
      en: "function toFahrenheit(celsius) {\n  return celsius * 9 / 5 + 32;\n}\n",
    },
    tests: [
      { args: [0], expected: 32 },
      { args: [100], expected: 212 },
      { args: [-40], expected: -40 },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Operator_precedence",
  },
  {
    id: "tipo-de",
    kind: "build",
    title: { es: "¿De qué tipo es?", en: "What type is it?" },
    prompt: {
      es: "Escribe `tipoDe(valor)` que devuelva el tipo del valor como texto, por ejemplo `\"number\"` o `\"string\"`.",
      en: "Write `typeOf(value)` that returns the value's type as text, for example `\"number\"` or `\"string\"`.",
    },
    hint: {
      es: "Existe un operador que hace exactamente esto: `typeof`.",
      en: "There is an operator that does exactly this: `typeof`.",
    },
    functionName: { es: "tipoDe", en: "typeOf" },
    starter: {
      es: "function tipoDe(valor) {\n  // Tu código aquí\n}\n",
      en: "function typeOf(value) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function tipoDe(valor) {\n  return typeof valor;\n}\n",
      en: "function typeOf(value) {\n  return typeof value;\n}\n",
    },
    tests: [
      { args: [42], expected: "number" },
      { args: ["hola"], expected: "string" },
      { args: [true], expected: "boolean" },
      { args: [null], expected: "object" },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/typeof",
  },
  {
    id: "nombre-completo",
    kind: "build",
    title: { es: "Nombre completo", en: "Full name" },
    prompt: {
      es: "Escribe `nombreCompleto(nombre, apellido)` que devuelva ambos separados por un espacio.",
      en: "Write `fullName(first, last)` that returns both joined by a space.",
    },
    hint: {
      es: "Prueba con una plantilla de texto: `${nombre} ${apellido}` entre comillas invertidas.",
      en: "Try a template literal: `${first} ${last}` between backticks.",
    },
    functionName: { es: "nombreCompleto", en: "fullName" },
    starter: {
      es: "function nombreCompleto(nombre, apellido) {\n  // Tu código aquí\n}\n",
      en: "function fullName(first, last) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function nombreCompleto(nombre, apellido) {\n  return `${nombre} ${apellido}`;\n}\n",
      en: "function fullName(first, last) {\n  return `${first} ${last}`;\n}\n",
    },
    tests: [
      { args: ["Ada", "Lovelace"], expected: "Ada Lovelace" },
      { args: ["Grace", "Hopper"], expected: "Grace Hopper" },
    ],
    mdnPath: "Web/JavaScript/Reference/Template_literals",
  },
  {
    id: "mayor-de-edad",
    kind: "build",
    title: { es: "¿Mayor de edad?", en: "Is an adult?" },
    prompt: {
      es: "Escribe `esMayorDeEdad(edad)` que devuelva `true` si la edad es 18 o más.",
      en: "Write `isAdult(age)` that returns `true` if the age is 18 or more.",
    },
    hint: {
      es: "Cuidado con el límite: 18 también cuenta. ¿`>` o `>=`?",
      en: "Watch the boundary: 18 counts too. `>` or `>=`?",
    },
    functionName: { es: "esMayorDeEdad", en: "isAdult" },
    starter: {
      es: "function esMayorDeEdad(edad) {\n  // Tu código aquí\n}\n",
      en: "function isAdult(age) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function esMayorDeEdad(edad) {\n  return edad >= 18;\n}\n",
      en: "function isAdult(age) {\n  return age >= 18;\n}\n",
    },
    tests: [
      { args: [20], expected: true },
      { args: [18], expected: true },
      { args: [17], expected: false },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Greater_than_or_equal",
  },
  {
    id: "ultimo-caracter",
    kind: "build",
    title: { es: "El último carácter", en: "The last character" },
    prompt: {
      es: "Escribe `ultimoCaracter(texto)` que devuelva el último carácter del texto.",
      en: "Write `lastCharacter(text)` that returns the last character of the text.",
    },
    hint: {
      es: "Las posiciones empiezan en 0, así que la última es `texto.length - 1`. También existe `texto.at(-1)`.",
      en: "Positions start at 0, so the last one is `text.length - 1`. There is also `text.at(-1)`.",
    },
    functionName: { es: "ultimoCaracter", en: "lastCharacter" },
    starter: {
      es: "function ultimoCaracter(texto) {\n  // Tu código aquí\n}\n",
      en: "function lastCharacter(text) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function ultimoCaracter(texto) {\n  return texto[texto.length - 1];\n}\n",
      en: "function lastCharacter(text) {\n  return text[text.length - 1];\n}\n",
    },
    tests: [
      { args: ["hola"], expected: "a" },
      { args: ["JavaScript"], expected: "t" },
      { args: ["x"], expected: "x" },
    ],
    mdnPath: "Web/JavaScript/Reference/Global_Objects/String/length",
  },
  {
    id: "igualdad-estricta",
    kind: "build",
    title: { es: "== frente a ===", en: "== versus ===" },
    prompt: {
      es: "Escribe `sonIguales(a, b)` que devuelva `true` solo si `a` y `b` son iguales en valor y en tipo.",
      en: "Write `areEqual(a, b)` that returns `true` only if `a` and `b` match in both value and type.",
    },
    hint: {
      es: "`1 == \"1\"` es `true` porque convierte tipos. La igualdad estricta no convierte.",
      en: "`1 == \"1\"` is `true` because it converts types. Strict equality does not.",
    },
    functionName: { es: "sonIguales", en: "areEqual" },
    starter: {
      es: "function sonIguales(a, b) {\n  // Tu código aquí\n}\n",
      en: "function areEqual(a, b) {\n  // Your code here\n}\n",
    },
    solution: {
      es: "function sonIguales(a, b) {\n  return a === b;\n}\n",
      en: "function areEqual(a, b) {\n  return a === b;\n}\n",
    },
    tests: [
      { args: [1, 1], expected: true },
      { args: [1, "1"], expected: false },
      { args: [0, false], expected: false },
      { args: ["js", "js"], expected: true },
    ],
    mdnPath: "Web/JavaScript/Reference/Operators/Strict_equality",
  },
  {
    id: "depura-constante",
    kind: "debug",
    title: { es: "Depura: la constante rebelde", en: "Debug: the stubborn constant" },
    prompt: {
      es: "Este código está roto a propósito. `incrementar(n)` debería devolver `n + 1`, pero lanza un error. Ejecútalo, lee el error y arréglalo.",
      en: "This code is broken on purpose. `increment(n)` should return `n + 1`, but it throws an error. Run it, read the error and fix it.",
    },
    hint: {
      es: "Una variable declarada con `const` no se puede reasignar. ¿Qué otra palabra permite cambiar su valor?",
      en: "A variable declared with `const` cannot be reassigned. Which other keyword lets its value change?",
    },
    functionName: { es: "incrementar", en: "increment" },
    starter: {
      es: "function incrementar(n) {\n  const resultado = n;\n  resultado = resultado + 1;\n  return resultado;\n}\n",
      en: "function increment(n) {\n  const result = n;\n  result = result + 1;\n  return result;\n}\n",
    },
    solution: {
      es: "function incrementar(n) {\n  let resultado = n;\n  resultado = resultado + 1;\n  return resultado;\n}\n",
      en: "function increment(n) {\n  let result = n;\n  result = result + 1;\n  return result;\n}\n",
    },
    tests: [
      { args: [1], expected: 2 },
      { args: [-1], expected: 0 },
      { args: [41], expected: 42 },
    ],
    mdnPath: "Web/JavaScript/Reference/Statements/const",
  },
];
