# Quickstart de validación end-to-end

Esta guía se ejecuta después de implementar las tareas. No instala ni configura
servicios nuevos fuera de Vercel, Render, Supabase Auth y Gemini ya aprobados.

## 1. Prerrequisitos

- Node.js 22 o posterior compatible con las versiones fijadas en los lockfiles.
- Una sesión de prueba válida del proyecto Supabase.
- Una API key Gemini con acceso al modelo configurado.
- Dos terminales locales.

No copiar tokens ni API keys a documentación, commits, screenshots o logs.

## 2. Variables de entorno

Backend, únicamente en `backend/.env` local y Render:

```text
PORT
NODE_ENV
CORS_ORIGINS
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
GEMINI_API_KEY
GEMINI_MODEL
```

Valor inicial propuesto de `GEMINI_MODEL`: `gemini-3.8-flash`. Confirmar que la
API key real tiene acceso antes de la demo; no implementar fallback silencioso.

Frontend, únicamente en `frontend/.env` local y Vercel:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_API_URL
```

`VITE_API_URL` local apunta al backend local y en producción al servicio Render.
Nunca crear `VITE_GEMINI_API_KEY`.

## 3. Instalación reproducible y pruebas automáticas

```bash
cd backend
npm ci
npm test
```

Resultados esperados:

- schemas aceptan requests iniciales y de reevaluación válidos;
- requests incompletos o con campos extra terminan en 400;
- token ausente/inválido termina en 401 antes del limitador y Gemini;
- la respuesta mock cumple el contrato completo;
- timeout, cuota o respuesta mock inválida terminan en 503;
- el límite por `userId` termina en 429;
- ninguna prueba requiere base de datos.

```bash
cd ../frontend
npm ci
npm run lint
npm run build
```

## 4. Ejecución local

Terminal backend:

```bash
cd backend
npm run dev
```

Terminal frontend:

```bash
cd frontend
npm run dev
```

Comprobar primero:

```text
GET http://localhost:3000/api/health → 200
```

Luego iniciar sesión mediante la UI existente. La ruta protegida de evaluación
debe ser inaccesible sin sesión.

## 5. Validación del contrato

El contrato normativo está en
[contracts/evaluations.openapi.yaml](contracts/evaluations.openapi.yaml).

### Sin token

Enviar un request válido sin `Authorization`.

Resultado esperado:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Es necesario iniciar sesión nuevamente."
  }
}
```

Status esperado: `401`.

### Evaluación inicial

Con una sesión real, el frontend debe enviar el access token como Bearer y
`verificationResult: null`.

Resultado esperado:

- status `200`;
- `phase: initial`;
- todas las secciones del OpenAPI presentes;
- riesgo e incertidumbre separados;
- ningún porcentaje o confianza numérica;
- URL e identidad etiquetadas sin afirmación de verificación;
- al menos un paso manual priorizado;
- limitación y decisión humana visibles.

### Reevaluación

Desde la evaluación inicial, informar una comprobación y su resultado.

Resultado esperado:

- el request reenvía la interacción original y un solo `verificationResult`;
- status `200` y `phase: reevaluated`;
- la salida refleja lo aportado como `user_reported`, no como verificación del
  sistema;
- el frontend no presenta otra acción de reevaluación después del éxito.

## 6. Fixtures de aceptación

Ejecutar los tres casos definidos en
`docs/paso0/01-entender-problematica.md` y un caso libre adicional:

1. Caso A: oferta laboral en TikTok.
2. Caso B: enlace enviado desde la cuenta conocida de un amigo.
3. Caso C: alerta urgente atribuida a una entidad conocida.
4. Caso libre: interacción distinta, redactada durante la prueba.

No comparar frases exactas. Para cada caso comprobar estructura, trazabilidad de
procedencia, separación riesgo/incertidumbre, verificaciones pertinentes y ausencia
de certificación.

## 7. URL sin inspección automática

Usar en un fixture una URL reservada/no resoluble y comprobar:

- el recorrido puede evaluarse porque la URL es texto;
- no hay Search, URL Context, grounding ni fetch propio;
- la respuesta no afirma haber abierto, analizado o verificado el enlace.

## 8. Fallos controlados

Validar de forma determinística con doubles/mocks de integración:

| Caso | Resultado esperado |
| --- | --- |
| JSON/campos inválidos | `400 INVALID_REQUEST` |
| Token ausente, inválido o expirado | `401 UNAUTHORIZED` |
| Body mayor a 32 KiB | `413 PAYLOAD_TOO_LARGE` |
| Más de diez requests/15 min para el mismo usuario | `429 RATE_LIMITED` y `Retry-After` |
| Timeout, cuota o red Gemini | `503 EVALUATION_UNAVAILABLE` |
| JSON Gemini no parseable o salida que no cumple Zod | `503 EVALUATION_UNAVAILABLE` |
| Error inesperado | `500 INTERNAL_ERROR` sin detalles privados |

En todos los fallos, comprobar que no aparece una evaluación total ni parcial.

## 9. No persistencia

- Confirmar que el request y response no contienen `caseId` ni `evaluationId`.
- Reiniciar backend/frontend: ningún caso debe reaparecer.
- Revisar que no existan writes a Supabase Database, filesystem o store externo.
- Revisar que logs no incluyan body, token, prompt ni respuesta completa.

## 10. Revisión previa a producción

1. Cronometrar al menos un recorrido representativo desde el inicio de la entrada
   hasta la evaluación inicial; debe durar menos de cinco minutos sin contar la
   demora externa del evaluador.
2. Martino y Gastón identifican sin explicación adicional riesgo, incertidumbre,
   una verificación priorizada y decisión humana final.
3. Probar Vercel → Render con CORS productivo.
4. Confirmar `/api/health` y la ruta protegida de evaluación.
5. Ejecutar `git diff --check` y comprobar working tree esperado.
6. Integrar primero en `develop`; promover a `main` solo con validación humana.
