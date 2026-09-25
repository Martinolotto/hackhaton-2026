# Tareas: Evaluación guiada de una interacción digital

**Fuentes**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md),
[data-model.md](data-model.md), [quickstart.md](quickstart.md),
[evaluations.openapi.yaml](contracts/evaluations.openapi.yaml), Constitución y
`AGENTS.md`.

**Formato**: `[ID] [P?] [Story?] Descripción con path concreto`.

- `[P]` indica que la tarea puede ejecutarse en paralelo con otras tareas
  desbloqueadas que no modifican los mismos archivos.
- `[US1]`, `[US2]` y `[US3]` mantienen trazabilidad con las historias de la
  specification aunque las fases estén organizadas por dominio para maximizar el
  trabajo simultáneo de Martino y Gastón.
- Las tareas de tests se escriben antes de la implementación correspondiente.

## Phase 1 — SHARED / Preparación mínima

**Objetivo**: congelar y compartir el mismo contrato antes de abrir ramas de
implementación. No se agrega documentación nueva.

- [ ] T001 Versionar únicamente los artefactos aprobados de `specs/001-evaluar-interaccion-digital/` e integrarlos en `develop`, verificando que `spec.md`, `plan.md` y `contracts/evaluations.openapi.yaml` queden en el mismo commit compartido y sin hacer push sin autorización humana.
- [ ] T002 Crear desde ese mismo commit de `develop` las ramas `feature/backend-evaluation` para Martino y `feature/frontend-evaluation` para Gastón, y confirmar en ambas que `specs/001-evaluar-interaccion-digital/contracts/evaluations.openapi.yaml` es idéntico.

**Checkpoint**: T001–T002 completas. Backend y frontend pueden comenzar de forma
simultánea sin esperar implementación del otro dominio.

---

## Phase 2 — BACKEND / Martino

**Objetivo**: entregar el endpoint autenticado y stateless completo, con Gemini,
errores contractuales y pruebas, conservando `GET /api/health`.

**Prueba independiente**: con doubles de Supabase/Gemini y un servidor efímero,
`POST /api/evaluations` rechaza acceso inválido, acepta un caso libre autenticado,
produce el contrato completo para fase inicial y reevaluada y nunca devuelve una
evaluación ante fallo.

- [ ] T003 Agregar `@supabase/supabase-js`, `@google/genai`, `express-rate-limit` y `zod`, fijar Node.js 22+ y el script `npm test` con `node --test` en `backend/package.json` y `backend/package-lock.json`.
- [ ] T004 [P] Ampliar la validación de entorno para `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `GEMINI_API_KEY` y `GEMINI_MODEL`, sin valores secretos ni variables prohibidas, en `backend/src/config/env.js` y `backend/.env.example`.
- [ ] T005 [P] [US1] Crear fixtures backend para los casos A, B y C de Paso 0 y un caso libre, sin respuestas precocinadas de producción, en `backend/test/fixtures/evaluation-cases.js`.
- [ ] T006 [P] [US3] Escribir primero pruebas fallidas de Bearer ausente, malformado, inválido, expirado, claims sin `sub` y token válido reducido a `req.auth.userId` en `backend/test/authenticate.test.js`.
- [ ] T007 [P] [US1] Escribir primero pruebas fallidas del request estricto en `backend/test/evaluation.schemas.test.js`: `description` 1–10.000, `url` null o máximo 2.048, `channel` 1–100, `presentedIdentity` 1–200, `observableOrigin` null o máximo 500, `priorRelationship` 1–500, `requestedAction` 1–1.000, `doubtReason` 1–1.000, y `verificationResult` null o textos 1–1.000/1–2.000 sin propiedades extra.
- [ ] T008 [P] [US1] Añadir en `backend/test/evaluation.schemas.test.js` pruebas fallidas de la respuesta estricta: todas las secciones obligatorias, enums exactos, listas de máximo 12, `verificationSteps` 1–5 con prioridades 1–5, `cautionGuidance`/`limitations` 1–8 y ausencia de porcentaje o confianza numérica.
- [ ] T009 [P] [US1] Escribir primero pruebas HTTP fallidas de `POST /api/evaluations` para initial/reevaluated y errores 400, 401, 413, 429, 503 y 500, comprobando que los fallos no contienen evaluación parcial, en `backend/test/evaluation.contract.test.js`.
- [ ] T010 [P] [US3] Crear el cliente Supabase server-side sin persistencia/autorefresh/detección de URL y el middleware `requireAuth` basado en `supabase.auth.getClaims(token)`, conservando solo `{ userId: claims.sub }`, en `backend/src/config/supabase.js` y `backend/src/middlewares/authenticate.js`.
- [ ] T011 [P] [US1] Crear el cliente `@google/genai` configurado por entorno para Interactions, sin tools, Search, URL Context ni grounding, en `backend/src/config/gemini.js`.
- [ ] T012 [US1] Implementar schemas Zod estrictos de request, contenido Gemini y response final, derivar el JSON Schema con `z.toJSONSchema()` y refinar fase/prioridades según `data-model.md`, en `backend/src/schemas/evaluation.schemas.js`.
- [ ] T013 [US3] Implementar validación de request, rate limit de 10 requests por `req.auth.userId` cada 15 minutos después de Auth, body máximo 32 KiB y envelopes exactos 400/401/413/429/500 en `backend/src/middlewares/validateEvaluation.js`, `backend/src/middlewares/evaluationRateLimit.js`, `backend/src/middlewares/errorHandler.js` y `backend/src/app.js`.
- [ ] T014 [US1] Implementar la evaluación inicial en `backend/src/services/evaluation.service.js`: system instruction invariante, input JSON no confiable, Interactions con `store: false`, thinking low, máximo 4.096 tokens, timeout 20 s, parseo y validación completa sin loguear contenido.
- [ ] T015 [US2] Extender `backend/src/services/evaluation.service.js` para reevaluación stateless con la interacción original y un único `verificationResult`, derivar `phase: reevaluated` y mapear cuota, timeout, red, parseo o salida inválida de Gemini a `503 EVALUATION_UNAVAILABLE` sin retry ni respuesta parcial.
- [ ] T016 [US1] Implementar controller y ruta `POST /api/evaluations` con orden `requireAuth → evaluationRateLimit → validateEvaluation → controller`, conectarlos en el router y preservar `GET /api/health` en `backend/src/controllers/evaluation.controller.js`, `backend/src/routes/evaluation.routes.js`, `backend/src/routes/index.routes.js` y `backend/src/app.js`.
- [ ] T017 Ejecutar y completar `npm test` en `backend/`, arrancar `npm start`, comprobar `GET /api/health` y el contrato mock de `POST /api/evaluations`, y corregir únicamente los archivos backend implicados hasta que todo pase.
- [ ] T018 [P] Documentar Node 22+, comandos Render, variables backend, health check, ausencia de DB y preflight seguro de acceso a `GEMINI_MODEL` en `backend/README.md`, manteniendo secretos fuera del repositorio.

**Checkpoint backend**: T003–T018 completas. El backend puede validarse sin frontend
y sin llamadas reales durante los tests.

---

## Phase 3 — FRONTEND / Gastón

**Objetivo**: entregar el recorrido autenticado completo usando exclusivamente el
contrato congelado y sin depender del avance de backend para construir la UI.

**Prueba independiente**: con un fixture local idéntico al OpenAPI, una sesión
existente permite completar la entrada, renderizar todas las secciones, aportar una
verificación y bloquear una segunda reevaluación; un error nunca genera resultado.

- [ ] T019 [P] [US1] Crear un fixture local de respuesta initial y otro reevaluated que respeten exactamente `contracts/evaluations.openapi.yaml`, únicamente para desarrollo visual y nunca como fallback de API, en `frontend/src/mocks/evaluation.fixture.js`.
- [ ] T020 [P] [US1] Implementar el cliente de `POST /api/evaluations` basado en `VITE_API_URL`, token Bearer recibido desde la sesión y parsing de response/error contractual, sin fallback fabricado, en `frontend/src/lib/evaluationsApi.js` y agregar solo `VITE_API_URL` en `frontend/.env.example`.
- [ ] T021 [P] [US1] Implementar el formulario con `description`, URL opcional, canal, identidad presentada, origen observable opcional, relación previa, acción solicitada y motivo de duda, respetando los máximos del contrato y mostrando la advertencia de no incluir secretos, en `frontend/src/components/evaluation/EvaluationForm.jsx`.
- [ ] T022 [P] [US1] Implementar el render accesible de summary, indicators, apparentLegitimacy, evidence, contradictions, missingInformation, risk, uncertainty, verificationSteps, cautionGuidance, learning y limitations, con riesgo e incertidumbre visualmente separados, en `frontend/src/components/evaluation/EvaluationResult.jsx`.
- [ ] T023 [P] [US2] Implementar el formulario de un único `verificationResult` con `verificationPerformed` 1–1.000 y `observedResult` 1–2.000, asociado a las verificaciones priorizadas, en `frontend/src/components/evaluation/VerificationForm.jsx`.
- [ ] T024 [US1] Componer el recorrido inicial `editing → submitting_initial → evaluated_initial` usando temporalmente los fixtures para desarrollo visual y manteniendo interacción/evaluación solo en estado local, en `frontend/src/pages/evaluation/evaluation-interface.jsx`.
- [ ] T025 [P] [US3] Agregar la ruta protegida `/evaluar`, conservar landing/login/registro públicos y actualizar el CTA/redirect autenticado sin crear un dashboard nuevo, en `frontend/src/App.jsx`, `frontend/src/pages/home/home.jsx`, `frontend/src/components/navegation/nav.jsx` y los handlers existentes bajo `frontend/src/components/services/`.
- [ ] T026 [US1] Conectar `frontend/src/pages/evaluation/evaluation-interface.jsx` con `session.access_token` y `frontend/src/lib/evaluationsApi.js`, retirar el uso runtime del fixture y mostrar estados loading/error/result sin inventar evaluación.
- [ ] T027 [US2] Implementar `submitting_reevaluation → evaluated_final`, reenviar la interacción original con un solo resultado, conservar en memoria la evaluación inicial y la reevaluación, mostrar una comparación visible que distinga qué cambió, qué permaneció, qué incertidumbre continúa y qué información faltante continúa, y ocultar/deshabilitar definitivamente otra reevaluación exitosa, en `frontend/src/pages/evaluation/evaluation-interface.jsx`.
- [ ] T028 [US3] Mapear 400, 401, 413, 429 con espera indicada, 503 y error de red a mensajes accionables; ante 401 guiar a reautenticación y conservar el principio de respuesta o error mutuamente excluyentes, en `frontend/src/lib/evaluationsApi.js` y `frontend/src/pages/evaluation/evaluation-interface.jsx`.
- [ ] T029 Ejecutar `npm run lint` y `npm run build` en `frontend/`, probar el recorrido con `frontend/src/mocks/evaluation.fixture.js`, verificar que no existe fallback mock en producción y documentar `VITE_API_URL` de Vercel en `frontend/README.md`.

**Checkpoint frontend**: T019–T029 completas. El frontend está listo para sustituir
el fixture por el backend real sin cambiar inputs, outputs ni errores.

---

## Phase 4 — INTEGRATION / TEST

**Objetivo**: integrar ambas ramas en `develop` y demostrar la vertical real antes
de preparar producción.

- [ ] T030 Integrar `feature/backend-evaluation` y `feature/frontend-evaluation` en `develop`, resolver solo conflictos mecánicos y comprobar que `specs/001-evaluar-interaccion-digital/contracts/evaluations.openapi.yaml` no cambió.
- [ ] T031 [P] Configurar localmente `frontend/.env` con `VITE_API_URL` y `backend/.env` con `CORS_ORIGINS` para la URL Vite; si el backend no es alcanzable usar Cloudflare Quick Tunnel solo como transporte temporal y no versionar sus URLs ni secretos.
- [ ] T032 [P] Validar autenticación end-to-end desde `frontend/src/pages/evaluation/evaluation-interface.jsx` hasta `backend/src/middlewares/authenticate.js`: sesión válida funciona y requests sin token, con token inválido y con token expirado terminan en 401.
- [ ] T033 Ejecutar desde el frontend los casos A, B y C de `docs/paso0/01-entender-problematica.md` y un caso libre; comprobar response completa, riesgo/incertidumbre separados, verificaciones priorizadas y URL no inspeccionada conforme a `specs/001-evaluar-interaccion-digital/quickstart.md`.
- [ ] T034 Ejecutar una evaluación inicial y exactamente una reevaluación desde `frontend/src/pages/evaluation/evaluation-interface.jsx`, verificando `phase`, resultado `user_reported`, ausencia de un segundo ciclo y una comparación visible entre ambas respuestas que identifique qué cambió, qué permaneció, qué incertidumbre continúa y qué información faltante continúa.
- [ ] T035 [P] Forzar con doubles/configuración controlada Gemini indisponible, timeout/salida inválida, payload mayor a 32 KiB, rate limit y error de red; comprobar 413/429/503 y ausencia total de evaluación parcial según `backend/test/evaluation.contract.test.js` y `frontend/src/lib/evaluationsApi.js`.
- [ ] T036 [P] Comprobar que no hay writes ni nuevos artefactos de DB/ORM/Storage, que la URL no activa fetch/tools, que logs no contienen body/token/prompt/salida y que `GET /api/health` continúa funcionando, revisando `backend/src/`, `backend/package.json` y `frontend/src/`.
- [ ] T037 Ejecutar `npm test` en `backend/`, `npm run lint` y `npm run build` en `frontend/`, `git diff --check` en la raíz y un recorrido real frontend→backend cronometrado menor a cinco minutos conforme a `specs/001-evaluar-interaccion-digital/quickstart.md`.

**Checkpoint integración**: T030–T037 completas y `develop` validado humanamente.

---

## Phase 5 — PRODUCTION

**Objetivo**: desplegar exactamente la vertical validada y mantener `main`
desplegable.

- [ ] T038 Configurar en Render Node 22+, `npm ci`, `npm start`, `/api/health`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL` y `CORS_ORIGINS`, validar un deploy candidato y verificar acceso real al modelo sin exponer secretos usando `backend/README.md`.
- [ ] T039 [P] Configurar `VITE_API_URL` productiva y las variables Supabase existentes en Vercel, validar un preview de `frontend/` y confirmar que landing, login y registro siguen públicos y `/evaluar` protegido usando `frontend/README.md`.
- [ ] T040 Ajustar `CORS_ORIGINS` al dominio Vercel definitivo y ejecutar smoke preproducción de health, login, evaluación inicial, reevaluación, 401 y fallo controlado siguiendo `specs/001-evaluar-interaccion-digital/quickstart.md`.
- [ ] T041 Realizar la revisión humana previa a producción de CE-005 y CE-007 siguiendo `specs/001-evaluar-interaccion-digital/quickstart.md`: Martino y Gastón identifican riesgo, incertidumbre, una verificación priorizada y decisión final humana, y cronometran al menos un recorrido representativo menor a cinco minutos.
- [ ] T042 Con autorización humana explícita, promover el commit validado de `develop` a `main`, verificar despliegues Vercel/Render y repetir el smoke mínimo definido en `specs/001-evaluar-interaccion-digital/quickstart.md`; no hacer force push.

## Ampliación aprobada — Captura opcional

- [x] T043 [SHARED] Actualizar `spec.md`, `plan.md` y `contracts/evaluations.openapi.yaml` para congelar multipart opcional sin cambiar la respuesta.
- [x] T044 [BACKEND] Aceptar un único PNG/JPEG/WEBP de hasta 4 MB mediante memoria en `backend/src/middlewares/evaluationImage.js`, enviarlo a Gemini y conservar JSON textual compatible.
- [x] T045 [FRONTEND] Incorporar selector, preview, reemplazo/eliminación, aviso de privacidad y reenvío en la única reevaluación en `frontend/src/components/evaluation/EvaluationForm.jsx`, `frontend/src/lib/evaluationsApi.js` y `frontend/src/pages/evaluation/evaluation-interface.jsx`.
- [x] T046 [TEST] Cubrir formatos, tamaño, input multimodal, structured output, failover, reevaluación y ausencia de persistencia en `backend/test/evaluation.image.test.js` y `backend/test/evaluation.failover.test.js`.
- [x] T047 [INTEGRATION] Ejecutar `backend: npm test`, `frontend: npm run lint`, `frontend: npm run build` y `git diff --check`.

## Resiliencia aprobada — NVIDIA primario

- [x] T048 [SHARED] Documentar la decisión de NVIDIA primario y el failover sin cambiar OpenAPI ni respuesta contractual en `plan.md`, `research.md` y `quickstart.md`.
- [x] T049 [BACKEND] Agregar el cliente NVIDIA y adaptadores mínimos en `backend/src/config/nvidia.js` y `backend/src/services/providers/`, conservando Gemini.
- [x] T050 [BACKEND] Orquestar NVIDIA → Gemini principal → Gemini fallback con un intento por candidato y presupuesto global en `backend/src/services/evaluation.service.js`.
- [x] T051 [TEST] Cubrir texto, imagen, salida Zod, reevaluación, fallos transitorios, error interno y presupuesto sin loops en `backend/test/`.
- [ ] T052 [INTEGRATION] Ejecutar tests backend, lint/build frontend, `git diff --check` y los smokes NVIDIA reales documentados en `backend/README.md`.

## Dependencias y orden de ejecución

### Dependencias por fase

```text
T001 → T002
         ├─ Phase 2 BACKEND (Martino)
         └─ Phase 3 FRONTEND (Gastón)
                 ↓
             T030–T037
                 ↓
             T038–T042
```

- Phase 2 y Phase 3 comienzan simultáneamente después de T002.
- T030 requiere los checkpoints backend y frontend.
- Producción requiere el checkpoint completo de integración.

### Dependencias backend

- T003 desbloquea imports de T010–T014.
- T005–T009 se escriben antes de la implementación y pueden prepararse en
  paralelo por archivos.
- T010 y T011 pueden avanzar en paralelo.
- T012 desbloquea T013–T15.
- T014 depende de T011–T012; T015 depende de T014.
- T016 depende de T010, T013 y T015.
- T017 valida toda la rama; T018 puede avanzar en paralelo sin tocar código.

### Dependencias frontend

- T019–T023 pueden comenzar en paralelo porque modifican archivos distintos.
- T024 depende de T019, T021 y T022.
- T025 puede avanzar mientras se construye T024.
- T026 depende de T020 y T024.
- T027 depende de T023 y T026.
- T028 depende de T026; T029 valida la rama completa.

### Dependencias por historia

- **US1 — evaluación inicial**: funcional después de Auth y de las tareas US1 de
  ambas ramas; es el primer checkpoint vertical desplegable.
- **US2 — reevaluación**: depende de una evaluación inicial válida, pero backend y
  frontend pueden preparar sus piezas de US2 en paralelo.
- **US3 — acceso y resguardos**: Auth backend es requisito técnico de US1; landing,
  mensajes y manejo de fallos frontend avanzan en paralelo.

## Oportunidades de paralelismo

Inmediatamente después de T002:

```text
Martino: T003 y, por archivos separados, T004–T009
Gastón:  T019–T023 y T025
```

Después de instalar dependencias backend:

```text
T010 Supabase/Auth  ||  T011 Gemini  ||  T012 schemas
```

Durante integración:

```text
T032 Auth E2E  ||  T035 fallos  ||  T036 no persistencia/health
```

## Criterios de prueba independientes

- **US1**: una persona autenticada envía un caso libre y recibe las doce secciones
  contractuales, riesgo e incertidumbre separados y verificaciones manuales, sin
  navegación de URL.
- **US2**: desde una evaluación inicial se aporta una comprobación, se recibe una
  respuesta `reevaluated` completa y no se habilita una segunda reevaluación.
- **US3**: landing/login/registro permanecen públicos; `/evaluar` y el endpoint
  requieren sesión; advertencia sensible y errores controlados nunca fabrican una
  evaluación.

## Camino crítico

```text
T001 → T002
→ T003 → T011/T012 → T014 → T015 → T016 → T017
                 en paralelo con
→ T019–T023 → T024 → T026 → T027 → T028 → T029
→ T030 → T033 → T034 → T037
→ T038/T039 → T040 → T041 → T042
```

El primer checkpoint útil es Auth + US1. El MVP completo de la hackathon requiere
también US2, integración real y producción; no se inicia C3 ni C5.

## Reglas de ejecución

- No cambiar el OpenAPI desde una rama de dominio sin acuerdo humano compartido.
- No introducir DB, tablas, ORM, Redis, JWT propio, perfiles, historial, Storage,
  OCR, EXIF, C3 o C5.
- No colocar secretos en archivos versionados ni en variables `VITE_*`.
- No usar el fixture frontend como fallback ante errores reales.
- No hacer push ni promover ramas sin autorización humana explícita.
