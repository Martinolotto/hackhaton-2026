# Backend

API del monorepo construida con JavaScript ES Modules, Node.js 22+, Express 5,
Supabase Auth y Gemini. Expone un endpoint de evaluación stateless y conserva el
health check existente. No usa base de datos, ORM ni persistencia de casos.

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
únicamente en memoria; no se escribe a disco, no se persiste y se envía a Gemini
como un bloque multimodal junto al contexto textual.

## Variables de entorno

- `PORT`: puerto HTTP; por defecto `3000`.
- `NODE_ENV`: entorno de ejecución.
- `CORS_ORIGINS`: uno o más orígenes permitidos separados por coma.
- `SUPABASE_URL`: URL pública del proyecto Supabase.
- `SUPABASE_PUBLISHABLE_KEY`: publishable key de Supabase usada para Auth.
- `GEMINI_API_KEY`: secreto privado; solo backend/Render.
- `GEMINI_MODEL`: modelo principal configurable.
- `GEMINI_FALLBACK_MODEL`: segundo modelo configurable para un único intento de
  failover ante indisponibilidad o timeout del principal; debe ser distinto.

Nunca versionar `.env`, tokens ni API keys. Ninguna variable de Gemini pertenece
al frontend.

## Validación

Las pruebas usan doubles locales de Supabase y Gemini; no consumen credenciales ni
cuota real:

```bash
npm ci
npm test
```

Antes de la demo, comprobar de forma segura que la API key tiene acceso al modelo
configurado. El comando solo consulta metadata y no imprime la key:

```bash
node --input-type=module -e 'import { GoogleGenAI } from "@google/genai"; const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); await ai.models.get({ model: process.env.GEMINI_MODEL }); console.log(`${process.env.GEMINI_MODEL}: accesible`); await ai.models.get({ model: process.env.GEMINI_FALLBACK_MODEL }); console.log(`${process.env.GEMINI_FALLBACK_MODEL}: accesible`);'
```

Cada evaluación realiza como máximo un intento por modelo y usa el fallback solo
ante `503/UNAVAILABLE` o timeout del proveedor. Cada intento tiene un máximo de 20
segundos y ambos comparten un presupuesto total de 30 segundos. No hay retries del
SDK. Si ninguno produce una salida válida, se responde
`503 EVALUATION_UNAVAILABLE` sin evaluación parcial.

## Render

- Root Directory: `backend`
- Runtime: Node.js 22 o posterior compatible
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check: `/api/health`
- Production Branch: `main`

Configurar en Render todas las variables enumeradas arriba. Ajustar
`CORS_ORIGINS` al dominio productivo de Vercel antes del smoke test.
