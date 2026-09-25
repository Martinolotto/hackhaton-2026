# Plan de implementación: Evaluación guiada de una interacción digital

**Rama**: `feature/mvp-sdd` | **Fecha**: 2026-09-25 | **Spec**: [spec.md](spec.md)

**Entrada**: specification transversal en
`specs/001-evaluar-interaccion-digital/spec.md` y decisiones humanas vigentes.

## Resumen

Construir una vertical web autenticada que reciba una interacción digital y su
contexto, solicite a Gemini una evaluación estructurada, valide íntegramente esa
salida y la muestre sin persistir el caso. React reutiliza Supabase Auth, envía el
access token y mantiene el recorrido en memoria. Express verifica el token con
`supabase.auth.getClaims(token)`, aplica un límite básico por `claims.sub`, valida
el request y encapsula `@google/genai`. Gemini recibe texto y, opcionalmente, una
captura como contexto multimodal, sin herramientas, navegación, grounding ni
búsqueda. La misma operación stateless
atiende evaluación inicial y una reevaluación mediante `verificationResult`.

## Contexto técnico

**Lenguaje/versión**: JavaScript ES Modules; Node.js 22 LTS como runtime objetivo
del backend (desarrollo actual comprobado con Node.js 26.9.0); React 19 en
navegadores modernos.

**Dependencias principales**: React 19, Vite 8, React Router 8, Tailwind CSS 4 y
`@supabase/supabase-js` existentes en frontend; Express 5, CORS y dotenv existentes
en backend; nuevas en backend: `@supabase/supabase-js`, `@google/genai`,
`express-rate-limit`, `multer` y Zod 4.

**Almacenamiento**: ninguno. No hay tablas, archivos de caso, sesiones de backend,
cache persistente ni Supabase Database. El `MemoryStore` del rate limiter conserva
solo contadores efímeros por usuario.

**Testing**: `node:test`, `node:assert` y `fetch` nativos para pruebas unitarias,
de contrato e integración del backend; `npm run lint` y `npm run build` para el
frontend; recorridos end-to-end manuales y cronometrados definidos en
[quickstart.md](quickstart.md).

**Plataforma objetivo**: frontend SPA en Vercel; backend Node.js en una instancia
de Render; Supabase Auth y Gemini Developer API como servicios externos.

**Objetivos de rendimiento**: recorrido representativo hasta evaluación inicial
en menos de cinco minutos excluyendo demoras externas; máximo de 20 segundos por
modelo Gemini dentro de un presupuesto total de 30 segundos; respuesta inmediata y controlada ante autenticación,
validación o rate limit fallidos.

**Restricciones**: body JSON máximo de 32 KiB o multipart con una captura opcional
PNG/JPEG/WEBP de hasta 4 MB; endpoint autenticado; diez requests de evaluación por
usuario cada quince minutos; un intento por modelo y failover solo ante
`503/UNAVAILABLE` o timeout; salida completa o error, nunca parcial; sin logs de
contenido del caso, imagen, base64, token o salida completa de Gemini; URL tratada
solo como texto; ningún secreto `VITE_*`.

**Escala/alcance**: hackathon de dos personas, una operación HTTP, un recorrido de
evaluación y una única reevaluación en la UI, cuatro casos mínimos de aceptación y
una instancia inicial de Render. No se diseña para enforcement distribuido del
rate limit.

## Comprobación de la Constitución

*GATE previo a investigación: PASS. Revalidado después del diseño: PASS.*

| Principio | Comprobación |
| --- | --- |
| Autoridad humana | El plan aplica las decisiones cerradas sobre Auth, Gemini, contrato y acceso autenticado. La decisión posterior sobre sesión prevalece sobre la mención histórica de acceso sin cuenta en Paso 0. |
| Documentación versionada | Specification, investigación, modelo transitorio, contrato y quickstart viven en la feature raíz. |
| SDD para cambios importantes | La capacidad transversal, Auth, integración externa y contrato se planifican antes de implementar. |
| Un producto/monorepo/Spec Kit | No se crean proyectos SDD ni `.specify/` por dominio. |
| Separación y autonomía | El contrato compartido congela el límite; Martino trabaja backend y Gastón frontend sin modificarlo unilateralmente. |
| Supabase-first para CRUD | No hay CRUD ni tablas. Supabase entra al backend únicamente para verificar Auth, como fue aprobado. |
| Express para lógica específica | Auth de API, protección de cuota y evaluación Gemini permanecen en Express. |
| Secretos seguros | `GEMINI_API_KEY` solo existe en Render/backend; ningún secreto llega al frontend. |
| `main` desplegable | El trabajo se integra en `develop`, se valida y recién después se promueve a `main`. |
| Simplicidad de 24 horas | Un endpoint, estado local, MemoryStore y pruebas nativas evitan infraestructura adicional. |
| Contrato explícito | [contracts/evaluations.openapi.yaml](contracts/evaluations.openapi.yaml) fija Auth, inputs, outputs y errores. |
| SDD en español | Todos los artefactos propios están redactados en español. |

No hay violaciones constitucionales que requieran excepción.

## Estructura del proyecto

### Documentación de esta feature

```text
specs/001-evaluar-interaccion-digital/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/
│   └── requirements.md
└── contracts/
    ├── README.md
    └── evaluations.openapi.yaml
```

`tasks.md` se generará posteriormente con `$speckit-tasks`; este plan no lo crea.

### Código fuente previsto

```text
backend/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── cors.js
│   │   ├── supabase.js
│   │   └── gemini.js
│   ├── controllers/
│   │   ├── health.controller.js
│   │   └── evaluation.controller.js
│   ├── middlewares/
│   │   ├── authenticate.js
│   │   ├── evaluationRateLimit.js
│   │   ├── validateEvaluation.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   ├── evaluation.routes.js
│   │   └── index.routes.js
│   ├── schemas/
│   │   └── evaluation.schemas.js
│   ├── services/
│   │   └── evaluation.service.js
│   ├── app.js
│   └── server.js
├── test/
│   ├── fixtures/evaluation-cases.js
│   ├── evaluation.contract.test.js
│   ├── evaluation.schemas.test.js
│   └── authenticate.test.js
├── .env.example
└── package.json

frontend/
├── src/
│   ├── components/evaluation/
│   │   ├── EvaluationForm.jsx
│   │   ├── EvaluationResult.jsx
│   │   └── VerificationForm.jsx
│   ├── lib/
│   │   ├── supabase.js
│   │   └── evaluationsApi.js
│   ├── pages/evaluation/
│   │   └── evaluation-interface.jsx
│   ├── routes/
│   │   └── protectedRoute.jsx
│   └── App.jsx
├── .env.example
└── package.json
```

**Decisión de estructura**: conservar los dos proyectos existentes y añadir solo
las capas que ahora tienen responsabilidad real. `services/` aparece en backend
porque la adaptación a Gemini y la validación semántica ya constituyen lógica
específica; no se crean modelos de persistencia, repositorios ni carpetas vacías.

## Diseño técnico

### Flujo inicial

1. `ProtectedRoute` exige una sesión Supabase vigente.
2. La página recopila la interacción y advierte sobre información sensible.
3. `evaluationsApi.js` obtiene el access token de la sesión actual y envía JSON si
   no hay imagen o multipart (`evaluation` + `image`) si existe captura, junto con
   `Authorization: Bearer <token>` a `VITE_API_URL`.
4. Express procesa: JSON o multipart en memoria → CORS → Auth → rate limit por
   `userId` → validación de archivo y Zod → controller.
5. El servicio serializa los datos variables como JSON no confiable y los envía a
   Gemini con instrucciones invariantes, structured output y `store: false`.
6. El backend hace `JSON.parse`, valida la respuesta completa con Zod y recién
   entonces responde 200. Cualquier fallo del evaluador termina en 503.
7. El frontend renderiza las doce secciones y conserva interacción y evaluación
   únicamente en estado local.

### Reevaluación

El frontend permite un solo envío con `verificationResult` y reenvía la interacción
original y, si existe, la misma captura mientras el `File` continúe disponible.
Conserva en memoria tanto la evaluación inicial como la reevaluación
`phase: reevaluated` y muestra una comparación visible que distingue qué cambió,
qué permaneció, qué incertidumbre continúa y qué información faltante continúa.
Después deshabilita definitivamente otra reevaluación durante ese recorrido. Esta
comparación no agrega persistencia ni modifica el contrato OpenAPI. El backend es
stateless: valida que cada request contenga cero o un resultado, pero no crea un
`caseId` ni intenta contar recorridos entre requests.

### Autenticación y autorización

- Cliente Supabase de backend con `autoRefreshToken: false`,
  `persistSession: false` y `detectSessionInUrl: false`.
- `getClaims(token)` recibe explícitamente el Bearer token.
- Solo se conserva `req.auth = { userId: claims.sub }`.
- Token ausente, malformado, expirado, no verificable o sin `sub`: 401.
- No se usan `getUser()`, JWT propio, JWKS manual, `service_role`, secret key,
  `JWT_SECRET` ni acceso a base de datos.

### Evaluación Gemini

- SDK `@google/genai`, Interactions API y `store: false`.
- Modelos leídos de `GEMINI_MODEL` y `GEMINI_FALLBACK_MODEL`, ambos con capacidad
  multimodal y configurados fuera del código.
- Sin `tools`, Google Search, URL Context, grounding ni funciones externas.
- Zod es la fuente runtime: un schema de contenido sin `phase` genera mediante
  `z.toJSONSchema()` el JSON Schema enviado a Gemini; el backend agrega la fase
  derivada del request y valida después la respuesta contractual completa.
- `system_instruction` contiene reglas invariantes; el caso se envía en `input`
  como JSON etiquetado como dato no confiable. Si existe captura se agrega como
  bloque `image` inline y se aclara que es contexto no verificado.
- Thinking `low`, máximo de salida de 4.096 tokens, 20 segundos por intento y 30
  segundos totales. No hay retries automáticos: solo un failover al segundo modelo
  ante `503/UNAVAILABLE` o timeout. Los fallos del proveedor, parseo o validación
  inválida terminan en 503.

### Protección de cuota

`express-rate-limit` usa su `MemoryStore` después de Auth, con clave
`req.auth.userId`, diez requests cada quince minutos, headers estándar y respuesta
429 contractual. El límite cuenta también solicitudes autenticadas que luego
fallen, porque igualmente protegen el acceso al evaluador. Es protección básica de
una instancia; reinicios o escalado horizontal reinician o multiplican la cuota.

### Captura opcional en memoria

Sin imagen se conserva `application/json` y el input textual existente. Con imagen,
el frontend usa `multipart/form-data` con el campo `evaluation` serializado y un
único archivo `image`. Multer usa `memoryStorage`, valida un máximo de 4 MB y el
backend comprueba MIME y firma PNG/JPEG/WEBP antes de invocar Gemini. El buffer se
convierte temporalmente a base64 únicamente para el bloque multimodal del SDK; no
se escribe a disco, no se persiste, no se registra y no se crea Storage, tabla,
OCR, EXIF ni herramienta externa.

## Responsabilidades para trabajo paralelo

### SHARED

- El OpenAPI y este plan son el límite aprobado.
- Cambios en nombres, enums, Auth, errores o semántica requieren coordinación de
  Martino y Gastón.
- Los fixtures A, B, C y el caso libre se comparten como criterios, no como lógica
  precocinada.

### BACKEND — Martino

- Configuración segura, verificación de JWT, rate limit, schemas, servicio Gemini,
  endpoint, errores y pruebas automáticas.
- No modificar UI ni agregar persistencia.

### FRONTEND — Gastón

- Ruta protegida, formulario, cliente API, render de contrato, manejo de errores y
  estado de una sola reevaluación.
- No conocer `GEMINI_API_KEY`, modelo interno ni lógica del prompt.

### INTEGRATION/TEST — ambos

- Variables Vercel/Render, CORS, tokens reales, fixtures, recorrido libre, fallos,
  cronometraje y validación humana previa a producción.
- Integración primero en `develop`; ninguna rama de dominio cambia el contrato
  unilateralmente.

## Comprobación constitucional posterior al diseño

PASS. El diseño mantiene un único producto y Spec Kit, no crea base de datos,
separa secretos y responsabilidades, conserva `main` desplegable y ofrece un
contrato suficiente para implementación paralela. La integración de Supabase en
backend tiene una necesidad real y limitada: autenticar el endpoint; no introduce
CRUD ni privilegios adicionales.

## Seguimiento de complejidad

No se registran excepciones ni complejidad constitucional pendiente de justificar.
