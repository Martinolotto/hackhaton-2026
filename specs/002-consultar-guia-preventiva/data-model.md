# Modelo de contenido estático

## Alcance del modelo

La feature no introduce entidades persistentes, tablas, RLS, almacenamiento ni
estado de servidor. Este documento modela únicamente la estructura editorial que
el frontend renderiza desde archivos versionados.

## Entidades

### Guía preventiva

Representa la página pública completa.

| Campo | Tipo conceptual | Reglas |
| --- | --- | --- |
| `title` | texto | Identifica la guía preventiva sin prometer detección. |
| `editorialUpdatedAt` | fecha legible | Debe coincidir con `content-guide.md` y mostrarse a la persona. |
| `introduction` | bloques de texto | Incluye indicador ≠ prueba, apariencia ≠ autenticidad, ausencia de señales ≠ seguridad y decisión humana. |
| `sections` | lista de `Sección preventiva` | Exactamente los siete bloques editoriales aprobados, en el orden de la guía. |
| `checklist` | lista de `Pregunta de pausa` | Conserva las cinco preguntas validadas. |
| `closing` | bloque de texto | Diferencia orientación general de evaluación concreta. |
| `evaluationCta` | `Acceso a evaluación` | Enlace visible al recorrido existente. |
| `sources` | catálogo de `Fuente editorial` | Resuelve todos los IDs usados por los bloques. |

### Sección preventiva

Unidad repetible que enseña una habilidad.

| Campo | Tipo conceptual | Reglas |
| --- | --- | --- |
| `id` | identificador de ancla | Único, estable, legible y utilizable desde el índice. |
| `title` | texto | Orientado a una habilidad, no a un veredicto. |
| `whatToLookFor` | 2–4 señales observables | Ninguna señal se presenta como prueba. |
| `whyItMatters` | texto breve | Explica el riesgo sin alarmismo. |
| `howToCheck` | 2–4 acciones | Acciones concretas, seguras y generales. |
| `example` | texto o ejemplo estructurado | Solo contenido aprobado por `content-guide.md`; no analiza casos ingresados por usuarios. |
| `whatNotToAssume` | texto breve | Aclara límites y evita falsa certeza. |
| `sourceIds` | 1–3 IDs | Cada ID debe existir en el catálogo de fuentes. |
| `patterns` | lista opcional de `Patrón situado` | Solo se usa en el bloque argentino. |

Las secciones corresponden a:

1. revisar adónde lleva;
2. revisar quién contacta;
3. detectar presión;
4. proteger acciones sensibles;
5. no confiar solo en el formato;
6. verificar identidad aunque voz o imagen parezcan conocidas;
7. contextualizar patrones observados en Argentina.

### Patrón situado

Modalidad editorial estática vinculada a tiempo y geografía.

| Campo | Tipo conceptual | Reglas |
| --- | --- | --- |
| `title` | texto | Nombra la modalidad, no su frecuencia. |
| `modality` | texto | Explica qué comportamiento ilustra. |
| `organizations` | lista de organismos | Solo organismos aprobados por la guía. |
| `geography` | texto | Debe indicar Argentina. |
| `periodAndContext` | texto | Conserva fecha/período, población o contexto y sus límites. |

El bloque que contiene estos patrones debe mostrar además que la selección es
ilustrativa, no exhaustiva, no es ranking, no estima prevalencia nacional y no es
feed, monitoreo ni alerta.

### Pregunta de pausa

Elemento del checklist previo a una decisión.

| Campo | Tipo conceptual | Reglas |
| --- | --- | --- |
| `question` | texto | Una de las cinco preguntas aprobadas. |
| `prompt` | texto breve | Convierte la pregunta en una comprobación concreta. |

Orden obligatorio:

1. ¿Quién me lo pide?
2. ¿Adónde me lleva?
3. ¿Me están apurando?
4. ¿La acción es sensible?
5. ¿Estoy verificando por una fuente independiente?

### Fuente editorial

Procedencia identificable de afirmaciones y ejemplos documentales.

| Campo | Tipo conceptual | Reglas |
| --- | --- | --- |
| `id` | texto | ID ya definido en `content-research.md`. |
| `organization` | texto | Organismo o proveedor responsable. |
| `resourceTitle` | texto | Título aprobado del recurso. |
| `date` | texto opcional | Se muestra cuando la fuente tiene fecha o actualización conocida. |
| `urls` | una o más URLs | Exclusivamente URLs presentes en `content-guide.md`. |

Todos los `sourceIds` de secciones deben resolverse. No se agregan URLs, fuentes o
afirmaciones durante implementación.

### Acceso a evaluación

Transición desde aprendizaje preventivo hacia el recorrido 001.

| Campo | Valor contractual |
| --- | --- |
| Etiqueta | `Evaluar una interacción` |
| Destino | `/evaluar` |
| Acceso | La guía no exige sesión; el destino conserva `ProtectedRoute`. |
| Datos transmitidos | Ninguno. |

## Relaciones

```text
Guía preventiva
├── contiene 7 Secciones preventivas
│   ├── referencia 1–3 Fuentes editoriales
│   └── la sección Argentina contiene Patrones situados
├── contiene 5 Preguntas de pausa
├── contiene un catálogo de Fuentes editoriales
└── ofrece un Acceso a evaluación existente
```

## Validaciones de integridad

- Los siete IDs de sección son únicos y todos aparecen en el índice.
- Cada sección contiene al menos una acción concreta y todas las partes de la
  plantilla editorial.
- Cada ID de fuente referenciado existe y conserva sus metadatos y URL aprobados.
- Todo patrón situado tiene modalidad, organismo, Argentina, fecha/período y
  contexto; el bloque incluye el carácter ilustrativo y no exhaustivo.
- El texto conserva explícitamente los límites de HTTPS, identidad aparente,
  indicadores aislados, ausencia de señales, voz/imagen y anuncios patrocinados.
- No existen campos para input de casos, score, diagnóstico, estado de amenaza,
  personalización, historial o contenido remoto.
- El CTA no transporta estado ni parámetros hacia la evaluación.

## Estado y transiciones

No existe ciclo de vida persistente. La única transición funcional es navegación:

```text
lectura pública de /aprendizaje
        │
        └── CTA “Evaluar una interacción”
                    │
                    └── /evaluar → Auth existente de 001 cuando corresponda
```

Los saltos entre bloques son navegación local por anclas y no alteran datos.
