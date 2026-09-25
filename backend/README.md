# Backend

API del monorepo construida con JavaScript ES Modules, Node.js 22+, Express 5,
Supabase Auth, NVIDIA NIM y Gemini. Expone un endpoint de evaluación stateless y
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
únicamente en memoria; no se escribe a disco ni se persiste. NVIDIA la recibe como
`image_url` con data URL y Gemini como su bloque multimodal inline.

## Variables de entorno

- `PORT`: puerto HTTP; por defecto `3000`.
- `NODE_ENV`: entorno de ejecución.
- `CORS_ORIGINS`: uno o más orígenes permitidos separados por coma.
- `SUPABASE_URL`: URL pública del proyecto Supabase.
- `SUPABASE_PUBLISHABLE_KEY`: publishable key de Supabase usada para Auth.
- `NVIDIA_API_KEY`: secreto privado opcional; si falta, se omite NVIDIA.
- `NVIDIA_MODEL`: modelo NVIDIA opcional; si falta, se omite NVIDIA.
- `NVIDIA_TIMEOUT_MS`: máximo por intento NVIDIA; por defecto `5000`.
- `GEMINI_API_KEY`: secreto privado; solo backend/Render.
- `GEMINI_MODEL`: modelo principal configurable.
- `GEMINI_FALLBACK_MODEL`: segundo modelo configurable para un único intento de
  failover ante indisponibilidad o timeout del principal; debe ser distinto.
- `GEMINI_TIMEOUT_MS`: máximo por intento Gemini; por defecto `10000`.
- `EVALUATION_TIMEOUT_MS`: presupuesto global de la cadena; por defecto `25000`.

Nunca versionar `.env`, tokens ni API keys. Ninguna variable de proveedores pertenece
al frontend.

## Validación

Las pruebas usan doubles locales de Supabase, NVIDIA y Gemini; no consumen credenciales ni
cuota real:

```bash
npm ci
npm test
```

Antes de la demo, comprobar NVIDIA con los smokes directos. Ninguno imprime la API
key; el segundo requiere una imagen local pequeña:

```bash
npm run smoke:nvidia:text
npm run smoke:nvidia:image -- /ruta/absoluta/captura.png
```

Cada evaluación intenta, en orden, `NVIDIA_MODEL` —si está configurado—,
`GEMINI_MODEL` y `GEMINI_FALLBACK_MODEL`. Avanza solo ante 429 temporal,
502/503/504, timeout o error de conexión reconocible. NVIDIA tiene hasta 5 segundos;
cada Gemini, hasta 10 segundos; todos respetan el presupuesto global de 25 segundos.
No hay retries del SDK. La
API NVIDIA recibe una instrucción de JSON puro y el JSON Schema; como su referencia
del modelo no confirma `response_format`, la respuesta se parsea y valida con el
mismo Zod contractual antes de responder. Si ningún candidato produce una salida
válida, se responde `503 EVALUATION_UNAVAILABLE` sin evaluación parcial.

## Render

- Root Directory: `backend`
- Runtime: Node.js 22 o posterior compatible
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check: `/api/health`
- Production Branch: `main`

Configurar en Render todas las variables obligatorias enumeradas arriba. Las dos de
NVIDIA son opcionales y deben configurarse juntas para activarlo. Ajustar
`CORS_ORIGINS` al dominio productivo de Vercel antes del smoke test.
