import type { Locale } from "./config";

const es = {
  motto: "El error no es un fracaso; es un dato.",
  tagline:
    "Aprende JavaScript desde cero hasta avanzado resolviendo retos reales. Aquí no se premia la velocidad: se premia superar errores.",
  signIn: "Entrar con GitHub",
  signOut: "Salir",
  start: "Empezar el camino",
  nav: { tree: "Árbol", profile: "Perfil" },
  tree: {
    title: "Tu árbol de aprendizaje",
    intro:
      "Cada rama se desbloquea al dominar la anterior. Empieza por Fundamentos.",
    locked: "Bloqueado",
    available: "Disponible",
    comingSoon: "Próximamente",
    solved: "Resuelto",
  },
  challenge: {
    run: "Ejecutar tests",
    running: "Ejecutando…",
    hint: "Ver pista",
    reset: "Restaurar código",
    allPassed: "¡Todos los tests pasan!",
    recovered:
      "Has convertido un error en un dato: este reto te costó y lo superaste.",
    next: "Siguiente reto",
    back: "Volver al árbol",
    tests: "Tests",
    expected: "Esperado",
    received: "Recibido",
    signInToSave: "Entra con GitHub para guardar tu progreso.",
    debugBadge: "Reto de depuración",
    summary: "{passed} de {total} tests pasan",
  },
  errors: {
    SyntaxError:
      "Error de sintaxis: JavaScript no puede leer el código. Revisa llaves, paréntesis, comillas y comas.",
    ReferenceError:
      "Error de referencia: usas un nombre que no existe. Revisa si la variable está declarada y bien escrita.",
    TypeError:
      "Error de tipo: haces algo que ese valor no permite, como llamar a algo que no es una función o reasignar una constante.",
    RangeError:
      "Error de rango: un valor está fuera de lo permitido, a menudo por una recursión infinita.",
    missingFunction:
      "No encuentro la función que pide el reto. Comprueba que el nombre coincide exactamente.",
    wrongResult:
      "El código se ejecuta, pero el resultado no es el esperado. Es un error de lógica: compara lo esperado con lo recibido.",
    timeout:
      "El código tardó demasiado. Puede que haya un bucle que nunca termina.",
    other: "Ha ocurrido un error inesperado al ejecutar el código.",
  },
  profile: {
    title: "Tu perfil",
    solved: "Retos resueltos",
    recovered: "Errores superados",
    attempts: "Intentos totales",
    note: "Un intento fallido no resta nada: es un dato sobre lo que te falta practicar.",
    signInFirst: "Entra con GitHub para ver tu perfil.",
  },
  language: "English",
};

export type Dictionary = typeof es;

const en: Dictionary = {
  motto: "An error is not a failure; it is data.",
  tagline:
    "Learn JavaScript from zero to advanced by solving real challenges. Speed earns nothing here: overcoming errors does.",
  signIn: "Sign in with GitHub",
  signOut: "Sign out",
  start: "Start the path",
  nav: { tree: "Tree", profile: "Profile" },
  tree: {
    title: "Your learning tree",
    intro:
      "Each branch unlocks once you master the one before it. Start with Fundamentals.",
    locked: "Locked",
    available: "Available",
    comingSoon: "Coming soon",
    solved: "Solved",
  },
  challenge: {
    run: "Run tests",
    running: "Running…",
    hint: "Show hint",
    reset: "Reset code",
    allPassed: "All tests pass!",
    recovered:
      "You turned an error into data: this challenge was hard and you got through it.",
    next: "Next challenge",
    back: "Back to the tree",
    tests: "Tests",
    expected: "Expected",
    received: "Received",
    signInToSave: "Sign in with GitHub to save your progress.",
    debugBadge: "Debugging challenge",
    summary: "{passed} of {total} tests pass",
  },
  errors: {
    SyntaxError:
      "Syntax error: JavaScript cannot read the code. Check braces, parentheses, quotes and commas.",
    ReferenceError:
      "Reference error: you used a name that does not exist. Check that the variable is declared and spelled right.",
    TypeError:
      "Type error: you did something that value does not allow, such as calling something that is not a function or reassigning a constant.",
    RangeError:
      "Range error: a value is out of bounds, often because of infinite recursion.",
    missingFunction:
      "I cannot find the function this challenge asks for. Check that the name matches exactly.",
    wrongResult:
      "The code runs, but the result is not the expected one. That is a logic error: compare expected and received.",
    timeout: "The code took too long. There may be a loop that never ends.",
    other: "Something unexpected went wrong while running the code.",
  },
  profile: {
    title: "Your profile",
    solved: "Challenges solved",
    recovered: "Errors overcome",
    attempts: "Total attempts",
    note: "A failed attempt costs nothing: it is data about what you still need to practise.",
    signInFirst: "Sign in with GitHub to see your profile.",
  },
  language: "Español",
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
