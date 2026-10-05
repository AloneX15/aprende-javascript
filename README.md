# Aprende JavaScript

> «El error no es un fracaso; es un dato.»

Plataforma para aprender JavaScript desde cero hasta avanzado. Entras con tu cuenta de GitHub, recorres un árbol de habilidades y resuelves retos escribiendo código real en el navegador. Aquí no se premia la velocidad: se premia superar errores.

Disponible en español e inglés (`/es` y `/en`).

## Qué incluye la Fase 1

- Login con GitHub (solo permiso de identidad, `read:user`).
- Árbol de aprendizaje con 12 nodos; la rama **Fundamentos** tiene 10 retos, uno de ellos de depuración.
- Editor de código (CodeMirror) y ejecución de los tests dentro de un Web Worker del navegador, con límite de 2 segundos para cortar bucles infinitos. El código del alumno nunca se ejecuta en el servidor.
- Explicación en lenguaje claro de cada tipo de error (sintaxis, referencia, tipo, lógica…).
- Perfil con retos resueltos, intentos y **errores superados** (retos resueltos después de haber fallado).
- Cada reto enlaza a su fuente en MDN.

## Autoalojarlo

Todo corre en tu máquina: la base de datos es un fichero SQLite (el módulo `node:sqlite` incluido en Node), sin servicios de pago.

### 1. Crea una OAuth App en GitHub

En <https://github.com/settings/developers> → **New OAuth App**:

- **Homepage URL:** `http://localhost:3000` (o tu dominio)
- **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

Copia el *Client ID* y genera un *Client secret*.

### 2. Configura las variables

```bash
cp .env.example .env
npx auth secret   # escribe AUTH_SECRET en .env.local; cópialo a .env
```

Rellena `AUTH_GITHUB_ID` y `AUTH_GITHUB_SECRET` en `.env`.

### 3a. Con Docker

```bash
docker compose up -d --build
```

La web queda en <http://localhost:3000> y la base de datos en el volumen `aprende-data`.

### 3b. Sin Docker (Node 22.13 o superior)

```bash
npm ci
npm run build
npm start
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tests de retos, ejecutor y base de datos
npm run typecheck
```

### Añadir un reto

Los retos viven en `src/content/`. Cada uno tiene enunciado, pista, código inicial y solución en los dos idiomas, más una lista de tests (`args` y `expected`). Los tests del repositorio comprueban automáticamente que la solución pasa y que el código inicial no.

## Estructura

```
src/
  app/[locale]/        páginas (inicio, árbol, reto, perfil)
  app/api/             login (Auth.js) y registro de progreso
  content/             árbol de habilidades y retos
  i18n/                textos en español e inglés
  lib/runner/          ejecución de tests en un Web Worker
  lib/db.ts            SQLite: usuarios y progreso
```

## Próximas fases

2. **Flow:** moneda «Datos» por superar errores, bitácora, colección de errores y dificultad adaptativa.
3. **Árbol completo y corpus:** todas las ramas, ingesta de PDFs y enlaces, pistas con IA que citan sus fuentes.
4. **GitHub como portafolio:** repositorio personal del alumno y retos avanzados por pull request.
