# Backend

API del monorepo construida con JavaScript ES Modules, Node.js 22+, Express 5,
Supabase Auth, Ollama Cloud y Gemini. Expone un endpoint de evaluación stateless y
conserva el health check existente. No usa base de datos, ORM ni persistencia de
casos.

## Desarrollo local

```bash
npm install
cp .env.example .env
npm run dev
```

Comandos disponibles:

- `npm run dev`: inicia con `node --watch src/server.js`.
- `npm start`: inicia con `node src/server.js`.
- `npm test`: ejecuta las pruebas con `node --test`.

Endpoints:

- `GET /api/health`: disponibilidad del servicio.
- `POST /api/evaluations`: evaluación inicial o reevaluación stateless; requiere
  `Authorization: Bearer <Supabase access token>`. Acepta el JSON existente o
  multipart con `evaluation` (JSON serializado) e `image` opcional.

La captura opcional admite PNG, JPEG o WEBP de hasta 4 MB. Multer la conserva
únicamente en memoria; no se escribe a disco ni se persiste. Gemini la recibe como
su bloque multimodal inline. Ollama Cloud permanece limitado a texto hasta verificar
formalmente su contrato multimodal en este endpoint.

## Variables de entorno

- `PORT`: puerto HTTP; por defecto `3000`.
- `NODE_ENV`: entorno de ejecución.
- `CORS_ORIGINS`: uno o más orígenes permitidos separados por coma.
- `SUPABASE_URL`: URL pública del proyecto Supabase.
- `SUPABASE_PUBLISHABLE_KEY`: publishable key de Supabase usada para Auth.
- `OLLAMA_API_KEY`: secreto privado opcional; si falta, se omite Ollama Cloud.
- `OLLAMA_MODEL`: modelo Ollama opcional; el ejemplo usa `gemma4:31b`.
- `OLLAMA_TIMEOUT_MS`: máximo por intento Ollama Cloud; por defecto `15000`.
- `GEMINI_API_KEY`: secreto privado; solo backend/Render.
- `GEMINI_MODEL`: modelo principal configurable.
- `GEMINI_FALLBACK_MODEL`: segundo modelo configurable para un único intento de
  failover ante indisponibilidad o timeout del principal; debe ser distinto.
- `GEMINI_TIMEOUT_MS`: máximo por intento Gemini; por defecto `10000`.
- `EVALUATION_TIMEOUT_MS`: presupuesto global de la cadena; por defecto `35000`.

Nunca versionar `.env`, tokens ni API keys. Ninguna variable de proveedores pertenece
al frontend.

## Validación

Las pruebas usan doubles locales de Supabase, Ollama Cloud y Gemini; no consumen credenciales ni
cuota real:

```bash
npm ci
npm test
```

Antes de la demo, comprobar Ollama Cloud con el smoke directo. No imprime la API key:

```bash
npm run smoke:ollama:text
```

Las evaluaciones textuales intentan, en orden, `OLLAMA_MODEL` —si está configurado—,
`GEMINI_MODEL` y `GEMINI_FALLBACK_MODEL`. Las evaluaciones con imagen usan Gemini
principal y fallback para preservar el flujo multimodal existente. Avanza solo ante
429, 502/503/504, timeout o error de conexión reconocible. Ollama Cloud tiene hasta
15 segundos y cada Gemini hasta 10, siempre dentro del presupuesto global de 35
segundos. No hay retries internos. Ollama recibe una instrucción de JSON puro y el
JSON Schema; su salida se parsea y valida con el mismo Zod contractual antes de
responder. Si un proveedor devuelve JSON inválido o incompatible, no se lo sustituye
silenciosamente. Si ningún candidato produce una salida válida, se responde
`503 EVALUATION_UNAVAILABLE` sin evaluación parcial.

## Render

- Root Directory: `backend`
- Runtime: Node.js 22 o posterior compatible
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check: `/api/health`
- Production Branch: `main`

Configurar en Render todas las variables obligatorias enumeradas arriba. Las dos de
Ollama Cloud es opcional y requiere configurar ambas variables para activarlo. Ajustar
`CORS_ORIGINS` al dominio productivo de Vercel antes del smoke test.
