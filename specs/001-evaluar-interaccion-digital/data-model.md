# Modelo de datos transitorio

Esta feature no agrega almacenamiento. Las entidades siguientes son valores
transitorios del request, la respuesta y el estado local del frontend; no son
tablas, modelos ORM ni documentos persistentes.

## Actor autenticado

Identidad mínima derivada de un access token Supabase ya verificado.

| Campo | Tipo | Regla |
| --- | --- | --- |
| `userId` | string | Obligatorio, no vacío, tomado exclusivamente de `claims.sub`. |

No se conservan email, metadata, roles, token ni sesión en `req.auth`.

## Interacción

| Campo | Tipo | Regla de validación |
| --- | --- | --- |
| `description` | string | Obligatorio, trim, 1–10.000 caracteres. |
| `url` | string o null | Opcional, trim, máximo 2.048 caracteres. Se trata como texto y no se recupera. |
| `channel` | string | Obligatorio, trim, 1–100 caracteres. |
| `presentedIdentity` | string | Obligatorio, trim, 1–200 caracteres. |
| `observableOrigin` | string o null | Opcional/desconocido, trim, máximo 500 caracteres. |
| `priorRelationship` | string | Obligatorio, trim, 1–500 caracteres. Puede declarar que no existe o no se conoce. |
| `requestedAction` | string | Obligatorio, trim, 1–1.000 caracteres. |
| `doubtReason` | string | Obligatorio, trim, 1–1.000 caracteres. |

El objeto es estricto: no admite propiedades adicionales. Los límites mantienen el
request dentro del body máximo de 32 KiB y reducen abuso accidental sin restringir
el texto libre a fixtures.

## Captura opcional

| Campo interno | Tipo | Regla |
| --- | --- | --- |
| `buffer` | Buffer en memoria | Opcional, máximo 4 MB; nunca se escribe a disco. |
| `mimeType` | enum | `image/png`, `image/jpeg` o `image/webp`, coherente con la firma binaria. |

La captura viaja como parte `image` solo en multipart. No se agrega al objeto
`interaction`, no aparece en la respuesta y no posee id, URL persistente ni ruta.

## Resultado de verificación

| Campo | Tipo | Regla de validación |
| --- | --- | --- |
| `verificationPerformed` | string | Obligatorio cuando el objeto existe, trim, 1–1.000 caracteres. |
| `observedResult` | string | Obligatorio cuando el objeto existe, trim, 1–2.000 caracteres. |

`verificationResult` es `null` para la evaluación inicial o un único objeto para
la reevaluación. No se admite una lista de resultados.

## Solicitud de evaluación

| Campo | Tipo | Regla |
| --- | --- | --- |
| `interaction` | Interacción | Obligatoria y válida. |
| `verificationResult` | Resultado de verificación o null | Obligatorio como propiedad; determina la fase solicitada. |

No contiene `caseId`, `evaluationId`, user id ni modelo. La identidad proviene del
token, nunca del body. El mismo objeto usa JSON cuando no hay captura; con captura
se serializa en el campo multipart `evaluation` y el archivo viaja por separado.

## Evaluación

### Campos raíz

| Campo | Tipo | Regla |
| --- | --- | --- |
| `phase` | enum | `initial` o `reevaluated`; debe coincidir con la presencia de `verificationResult`. |
| `summary` | string | 1–2.000 caracteres. |
| `indicators` | Indicador[] | 0–12 elementos. |
| `apparentLegitimacy` | Señal de legitimidad[] | 0–12 elementos. |
| `evidence` | Evidencia[] | 0–12 elementos. |
| `contradictions` | string[] | 0–12 elementos; cada texto 1–1.000 caracteres. |
| `missingInformation` | string[] | 0–12 elementos; cada texto 1–1.000 caracteres. |
| `risk` | Riesgo | Obligatorio. |
| `uncertainty` | Incertidumbre | Obligatoria e independiente del riesgo. |
| `verificationSteps` | Paso de verificación[] | 1–5 elementos priorizados. |
| `cautionGuidance` | string[] | 1–8 elementos. |
| `learning` | string | 1–1.500 caracteres. |
| `limitations` | string[] | 1–8 elementos; debe conservar límites y decisión humana. |

Todos los objetos son estrictos. Todas las secciones existen incluso si una lista
válida está vacía.

### Indicador y señal de legitimidad

| Campo | Tipo | Valores/regla |
| --- | --- | --- |
| `statement` | string | 1–1.000 caracteres. |
| `basis` | enum | `user_provided` o `inferred`. |

### Evidencia

| Campo | Tipo | Valores/regla |
| --- | --- | --- |
| `statement` | string | 1–1.000 caracteres. |
| `origin` | enum | `user_input` o `reported_verification_result`. |
| `effect` | enum | `supports_legitimacy`, `raises_concern` o `neutral`. |
| `verificationStatus` | enum | `not_independently_verified` o `user_reported`. |

No existe estado `verified`: el sistema no realiza comprobaciones externas.

### Riesgo

| Campo | Tipo | Valores/regla |
| --- | --- | --- |
| `level` | enum | `low`, `medium`, `high` o `undetermined`. |
| `explanation` | string | 1–2.000 caracteres; no contiene porcentajes ni certificación. |

Etiquetas de UI: `bajo`, `medio`, `alto`, `no determinable`.

### Incertidumbre

| Campo | Tipo | Valores/regla |
| --- | --- | --- |
| `level` | enum | `low`, `medium` o `high`. |
| `explanation` | string | 1–2.000 caracteres e independiente del riesgo. |

Etiquetas de UI: `baja`, `media`, `alta`.

### Paso de verificación

| Campo | Tipo | Regla |
| --- | --- | --- |
| `priority` | entero | 1–5, sin repetición dentro de la respuesta. |
| `action` | string | 1–1.000 caracteres; comprobación manual e independiente. |
| `reason` | string | 1–1.000 caracteres. |

Los pasos se ordenan ascendentemente por `priority`. Ningún paso afirma que el
sistema ya realizó la comprobación.

## Estado del recorrido en frontend

```text
editing
  → submitting_initial
  → evaluated_initial
  → submitting_reevaluation
  → evaluated_final
```

Transiciones de error:

- `submitting_initial → editing` con error visible y sin evaluación fabricada.
- `submitting_reevaluation → evaluated_initial` con error visible; conserva la
  evaluación inicial para permitir corregir/reintentar mientras no haya éxito.
- un 401 redirige o guía a reautenticación sin enviar una nueva evaluación.
- después de `evaluated_final` no existe transición a otra reevaluación.

El refresh o salida de la página descarta todo el estado. No hay restauración ni
historial. Si existe una captura, el mismo `File` se conserva solo en este estado
para reenviarlo durante la única reevaluación.

## Reglas transversales

1. El backend deriva `phase`; no confía en una fase enviada por el cliente.
2. Riesgo e incertidumbre se validan por separado.
3. La URL nunca cambia de texto a recurso recuperado.
4. La respuesta no contiene probabilidad, porcentaje ni confianza numérica.
5. Error y evaluación son mutuamente excluyentes.
6. Request, respuesta, user id y captura no se escriben en almacenamiento de aplicación.
