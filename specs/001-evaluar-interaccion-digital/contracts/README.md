# Contrato compartido frontend/backend

El contrato normativo de esta feature es
[evaluations.openapi.yaml](evaluations.openapi.yaml).

## Responsabilidades congeladas

Frontend:

- obtiene el access token de la sesión Supabase existente;
- envía el request exactamente como está definido;
- interpreta únicamente respuestas y errores contractuales;
- mantiene interacción, evaluación y reevaluación en memoria;
- impide una segunda reevaluación dentro del recorrido;
- nunca conoce el proveedor, modelo, prompt ni API key de Gemini.

Backend:

- valida el Bearer token y conserva solo `claims.sub`;
- limita cuota por usuario autenticado;
- valida estrictamente request y response;
- deriva `phase` de `verificationResult`;
- usa Gemini como detalle privado reemplazable;
- no navega URLs, no usa herramientas y no persiste el caso;
- devuelve una evaluación completa o un error completo, nunca contenido parcial.

## Gobernanza

Inputs, outputs, enums, autenticación, status codes y códigos de error no pueden
cambiarse unilateralmente desde una rama frontend o backend. Un cambio requiere
acuerdo humano compartido y actualización de este contrato antes de integrar en
`develop`.

La implementación puede organizar componentes, helpers y servicios libremente
mientras preserve el contrato.

## Semántica de reevaluación stateless

- `verificationResult: null` solicita fase `initial`.
- Un único objeto `verificationResult` solicita fase `reevaluated`.
- El frontend controla que el recorrido permita una sola reevaluación exitosa.
- El backend no crea `caseId`, no mantiene sesión y no puede contar recorridos
  repetidos de un cliente HTTP fuera de la experiencia oficial.

## Fuente de verdad ejecutable

El backend implementará schemas Zod equivalentes al OpenAPI y generará desde el
schema Zod de respuesta el JSON Schema entregado a Gemini. Las pruebas de contrato
deben detectar cualquier divergencia antes de integrar.
