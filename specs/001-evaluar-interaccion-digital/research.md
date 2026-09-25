# Investigación técnica: Evaluación guiada de una interacción digital

**Fecha**: 2026-09-25
**Estado**: decisiones resueltas; sin aclaraciones pendientes.

## 1. Verificación de Supabase Auth en Express

**Decisión**: crear un cliente backend de `@supabase/supabase-js` con
`SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`, desactivar persistencia, refresh y
detección de URL, y verificar cada Bearer token mediante
`supabase.auth.getClaims(token)`. Autorizar únicamente si `claims.sub` es un string
no vacío y conservar solo `req.auth.userId`.

**Justificación**: la signing key ES256 puede validarse con la clave pública de
JWKS administrada por Supabase. `getClaims()` acepta el JWT explícito y evita una
consulta de usuario remota en cada request cuando la clave puede verificarse
localmente. La publishable key identifica al componente; el usuario se autentica
con su access token.

**Alternativas consideradas**:

- `getUser()`: descartado por decisión humana y por requerir una llamada Auth.
- JWKS manual o `JWT_SECRET`: descartados; duplican lógica y contradicen la clave
  asimétrica aprobada.
- `service_role` o secret key: descartados; no existe operación privilegiada ni de
  base de datos.
- JWT propio: descartado; Supabase Auth ya es la autoridad de identidad.

**Riesgos aceptados**: un JWT emitido puede continuar válido hasta `exp` después
de un sign-out; JWKS tiene ventanas de caché durante rotaciones. El middleware
falla cerrado con 401 si el token no puede validarse.

**Fuentes oficiales**:

- [Supabase getClaims](https://supabase.com/docs/reference/javascript/auth-getclaims)
- [Configuración Auth server-side](https://supabase.com/docs/reference/javascript/auth)
- [JWT de Supabase](https://supabase.com/docs/guides/auth/jwts)
- [Signing keys y ES256](https://supabase.com/docs/guides/auth/signing-keys)
- [Publishable y secret keys](https://supabase.com/docs/guides/getting-started/api-keys)

## 2. SDK y operación de Gemini

**Decisión**: usar `@google/genai` con Gemini Developer API mediante
`ai.interactions.create(...)`, `store: false` y sin
`previous_interaction_id`. Los modelos se obtienen de `GEMINI_MODEL` y
`GEMINI_FALLBACK_MODEL`; cada uno se intenta como máximo una vez y el segundo solo
se utiliza ante `503/UNAVAILABLE` o timeout.

**Justificación**: Interactions es la interfaz actual recomendada para proyectos
nuevos. `store: false` mantiene la operación stateless también del lado de esa API.
El nombre del modelo queda fuera del contrato del producto y puede cambiar por
configuración controlada.

**Alternativas consideradas**:

- `generateContent`: soportado, pero relegado como interfaz legacy para una
  integración nueva.
- Interactions stateful: descartado; no hay sesión ni persistencia de caso.
- Alias `gemini-flash-latest`: descartado por ser mutable y reducir
  reproducibilidad.
- AnythingLLM: fuera del alcance y retirado del producto.

**Comprobación operativa pendiente**: el preflight de despliegue debe confirmar
que la API key tiene acceso a ambos modelos configurados y que ambos aceptan la
misma entrada multimodal, sin registrar ni exponer la key.

**Fuentes oficiales**:

- [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview)
- [Catálogo de modelos](https://ai.google.dev/gemini-api/docs/models)
- [SDK oficial JavaScript](https://github.com/googleapis/js-genai)

## 3. Structured output y validación runtime

**Decisión**: definir request y response con Zod 4. Un schema estricto del
contenido de evaluación, sin la fase controlada por el servidor, genera mediante
`z.toJSONSchema()` el JSON Schema entregado a `response_format.schema`. Después se
procesa `interaction.output_text` con `JSON.parse()` y `safeParse()`, se agrega la
fase derivada de `verificationResult` y se valida la respuesta final. Solo una
salida íntegramente válida puede producir HTTP 200.

**Justificación**: structured output garantiza forma JSON, no corrección semántica
ni valores aceptables. Zod permite validar input y output con una dependencia y
evita mantener dos schemas ejecutables divergentes. La conversión estable es de
Zod a JSON Schema.

**Alternativas consideradas**:

- `z.fromJSONSchema()`: Google muestra este patrón, pero Zod lo declara
  experimental; descartado.
- Ajv más JSON Schema manual: válido, pero menos directo para la validación y los
  refinamientos pequeños de este MVP.
- Confiar únicamente en Gemini: descartado; una respuesta inválida nunca debe
  llegar al frontend.

**Fuentes oficiales**:

- [Structured output de Gemini](https://ai.google.dev/gemini-api/docs/structured-output)
- [Conversión JSON Schema de Zod](https://zod.dev/json-schema)
- [Referencia de Interactions](https://ai.google.dev/api/interactions-api-v1)

## 4. Prompt, herramientas y contenido no confiable

**Decisión**: colocar reglas invariantes en `system_instruction` y serializar
`interaction` más `verificationResult` como JSON dentro de `input`, declarado como
contenido no confiable. Omitir `tools` por completo.

**Justificación**: el texto analizado puede contener instrucciones o intentos de
prompt injection. Separarlo de la instrucción del sistema, negar herramientas y
validar la salida reduce el impacto. La URL se transmite solo como string; Gemini
no recibe medios para abrirla.

**Alternativas consideradas**: Google Search, URL Context, grounding, funciones y
scraping fueron descartados expresamente por alcance.

## 5. Timeout, reintentos y errores del evaluador

**Decisión**: ningún retry automático. La cadena NVIDIA → Gemini principal → Gemini
fallback usa 5 segundos para NVIDIA, 10 para cada Gemini y 25 segundos globales.
Cada candidato recibe el mínimo entre su propio límite y el presupuesto restante.
Timeout, red, error del SDK, cuota de proveedor, JSON inválido o fallo Zod se mapean
a `503 EVALUATION_UNAVAILABLE`. Un 429 externo nunca se propaga como 429 del producto.

**Justificación**: evita multiplicar costo y latencia en un recorrido de
hackathon. El 429 público queda reservado al rate limit propio. No se devuelve
salida parcial.

**Alternativas consideradas**: backoff exponencial y un retry sobre 503 pueden ser
útiles a futuro, pero consumen el presupuesto temporal y pueden superar el tiempo
del recorrido. Se difieren hasta contar con métricas reales.

**Fuentes oficiales**:

- [Errores de Gemini API](https://ai.google.dev/gemini-api/docs/api-errors)
- [Troubleshooting y retries](https://ai.google.dev/gemini-api/docs/troubleshooting)
- [Request options del SDK](https://googleapis.github.io/js-genai/release_docs/types/gaos_lib_sdks.RequestOptions.html)

## 6. Rate limit por usuario autenticado

**Decisión**: usar `express-rate-limit` con `MemoryStore`, diez requests por
`req.auth.userId` cada quince minutos, aplicado después de Auth y antes de
validación/Gemini. Usar headers estándar, desactivar legacy headers y responder el
429 contractual mediante un handler propio.

**Justificación**: protege la cuota por identidad verificada sin depender de IP ni
configurar proxies. Diez requests permiten cuatro recorridos inicial+reevaluación y
dos reintentos manuales. MemoryStore es suficiente para la instancia inicial.

**Alternativas consideradas**:

- Mapa propio: descartado; recrea expiración, limpieza y headers.
- Redis/store distribuido: descartado; añade servicio y credenciales sin necesidad
  demostrada.
- Límite por IP: descartado; es injusto detrás de NAT y depende de `trust proxy`.

**Limitación conocida**: los contadores se reinician al reiniciar Node y no se
comparten entre instancias. Es protección best-effort, no un límite financiero
fuerte. Si Render escala horizontalmente, puede cambiarse solo el store sin alterar
el contrato.

**Fuentes oficiales**:

- [Configuración de express-rate-limit](https://express-rate-limit.mintlify.app/reference/configuration)
- [Stores](https://express-rate-limit.mintlify.app/reference/stores)
- [Límites de MemoryStore](https://express-rate-limit.mintlify.app/overview)

## 7. Estado y única reevaluación

**Decisión**: el frontend conserva en memoria la interacción, la evaluación y el
flag de reevaluación consumida. El backend procesa cero o un
`verificationResult` por request y deriva `phase`; no crea identidad de caso.

**Justificación**: satisface el recorrido aprobado sin persistencia. Un endpoint
stateless no puede impedir que un cliente HTTP hostil repita requests; el requisito
de una sola reevaluación pertenece a la experiencia del producto y se prueba en la
UI.

**Alternativas consideradas**: tabla, cache, sesión Express y caseId se descartan
por decisión humana y por no aportar al demo.

## 8. Estrategia de pruebas

**Decisión**: usar capacidades nativas de Node para backend y validación manual
guiada para la integración visual. El backend expondrá una composición testeable
con dependencias sustituibles para simular Auth y Gemini sin red.

**Justificación**: evita incorporar un framework de test al frontend durante la
hackathon, pero permite probar contrato, schemas, 401, 400, 413, 429, 503, fase y
ausencia de persistencia. El build/lint y los recorridos A–C más un caso libre
cubren la vertical.

**Alternativas consideradas**: Vitest/Testing Library y browser E2E automatizado
son valiosos, pero no son necesarios para la vertical mínima y se difieren.

## 9. Ampliación aprobada para captura opcional

**Decisión**: transportar un único PNG, JPEG o WEBP opcional de hasta 4 MB mediante
multipart y Multer `memoryStorage`; enviar su base64 inline únicamente al input
multimodal de Interactions.

**Justificación**: conserva exactamente JSON y texto cuando no hay captura, valida
MIME y firma, permite reenviar el mismo `File` en la reevaluación y evita Storage,
tablas, filesystem, OCR, EXIF y herramientas externas.

## 10. NVIDIA primario y failover entre proveedores

**Decisión**: usar `openai` contra `https://integrate.api.nvidia.com/v1` con
`NVIDIA_MODEL` como primer candidato. Ante un error transitorio clasificado se
intentan una vez `GEMINI_MODEL` y luego `GEMINI_FALLBACK_MODEL`. Los tres comparten
25 segundos; NVIDIA recibe como máximo 5 y cada Gemini 10. Si falta
`NVIDIA_API_KEY` o `NVIDIA_MODEL`, NVIDIA se omite y Gemini comienza la cadena.

**Justificación**: la indisponibilidad real intermitente de Gemini pone en riesgo la
demo. NVIDIA documenta `z-ai/glm-5.3-flash` como modelo de texto e imagen y su NIM
expone Chat Completions OpenAI-compatible. Para imagen se usa el arreglo estándar
`text` + `image_url` con data URL. La referencia específica no documenta
`response_format`; por eso se exige JSON puro y el resultado continúa pasando por
el mismo `JSON.parse` y Zod. No se altera el contrato HTTP ni el frontend.

**Failover**: únicamente 429 temporal, 502/503/504, timeout o conexión temporal
reconocida activan el candidato siguiente. Un error interno, request del proveedor
no válido o salida que incumple el schema no se ocultan mediante cascada.

**Fuentes oficiales**:

- [Modelo GLM-5.3-Flash en NVIDIA](https://build.nvidia.com/z-ai/glm-5-3-flash/modelcard)
- [API específica del modelo](https://docs.api.nvidia.com/nim/reference/z-ai-glm-5-3-flash-infer)
- [API NIM para entrada multimodal](https://docs.nvidia.com/nim/large-language-models/latest/api-reference.html)
