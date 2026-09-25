# Plan de implementación: Consultar una guía preventiva mínima

**Rama**: `feature/next-sdd` | **Fecha**: 2026-09-25 | **Spec**: [spec.md](spec.md)

**Entrada**: specification de frontend en
`specs/002-consultar-guia-preventiva/spec.md`, contenido aprobado en
`content-guide.md` y decisiones humanas vigentes.

## Resumen

Convertir la superficie pública existente `/aprendizaje` en una guía preventiva
estática, escaneable y adaptable a pantallas angostas y amplias. React renderizará
el contenido curado de [content-guide.md](content-guide.md) desde una estructura
local versionada, con navegación por secciones, siete bloques de habilidad,
checklist, fuentes y fecha editorial. El CTA “Evaluar una interacción” enlazará a
la ruta protegida `/evaluar`; `ProtectedRoute` y Supabase Auth conservarán el
comportamiento ya implementado por la feature 001. No habrá llamadas para obtener
el contenido, persistencia, endpoints ni cambios en backend.

## Contexto técnico

**Lenguaje/versión**: JavaScript ES Modules; React 19.2 sobre Vite 8.3; Node.js
22 o superior para tooling local, coherente con los manifests y README actuales.

**Dependencias principales**: React, React DOM, React Router 8, Lucide React y el
sistema de estilos existente. No se incorpora ninguna dependencia nueva.

**Almacenamiento**: ninguno. El contenido se versiona como datos estáticos del
frontend; no hay Supabase Database, archivos generados en runtime, CMS, caché ni
historial de lectura.

**Testing**: `npm run lint` y `npm run build` en `frontend/`; validación manual
funcional, responsive y de accesibilidad descrita en
[quickstart.md](quickstart.md). El frontend no dispone actualmente de un runner
de pruebas automatizadas y esta feature no justifica agregar uno durante la
hackathon.

**Plataforma objetivo**: SPA React desplegada en Vercel y navegadores modernos de
desktop y mobile. La guía debe seguir renderizando aunque backend, Gemini o
servicios externos no estén disponibles.

**Objetivos de rendimiento**: contenido completo disponible con la carga inicial
de la ruta, sin requests de contenido ni espera de backend; sin imágenes pesadas,
widgets remotos o lógica de búsqueda. La navegación entre bloques debe responder
de inmediato en el navegador.

**Restricciones**: acceso público; contenido editorial estático y común; ninguna
evaluación de casos; ningún dato solicitado o almacenado; fuentes, ámbito y
período preservados; CTA hacia `/evaluar` sin alterar su Auth ni contrato; diseño
legible a 375 px, 200 % de zoom y con teclado; no agregar endpoints, tablas,
Gemini, feed, alertas ni assets complejos.

**Escala/alcance**: una ruta pública existente, siete bloques preventivos, una
introducción, un checklist, un cierre con CTA y un catálogo de fuentes. Equipo de
dos personas bajo restricción activa de hackathon; la implementación corresponde
principalmente al dominio frontend.

## Comprobación de la Constitución

*GATE previo a investigación: PASS. Revalidado después del diseño: PASS.*

| Principio | Comprobación |
| --- | --- |
| Autoridad humana | El plan aplica la decisión aprobada de construir C3 como siguiente incremento y no reabre alcance ni prioridades. |
| Documentación versionada | Specification, investigación editorial, guía, plan, modelo estático, contrato UI y quickstart viven en la feature raíz. |
| SDD para cambios importantes | La nueva capacidad visible se planifica antes de implementar. |
| Un producto/monorepo/Spec Kit | Se conserva el monorepo y la única infraestructura Spec Kit raíz. |
| Separación y autonomía | La feature queda en frontend; backend y Supabase no reciben responsabilidades ficticias. |
| Supabase-first para CRUD | No existe CRUD ni persistencia; Supabase Database no interviene. |
| Express para lógica específica | No existe lógica de servidor que justifique Express ni un endpoint nuevo. |
| Secretos seguros | No se agregan variables ni secretos; las fuentes son URLs públicas y estáticas. |
| `main` desplegable | La implementación futura se validará en la rama de feature y luego seguirá el flujo de integración humano aprobado. |
| Simplicidad de 24 horas | Se reutilizan `/aprendizaje`, `Nav`, estilos y `/evaluar`; no se agrega CMS, parser Markdown, buscador ni dependencia nueva. |
| Contratos explícitos | El contrato UI documenta acceso, contenido y transición hacia 001; no hay contrato frontend/backend nuevo. |
| SDD en español | Todos los artefactos propios de esta feature están redactados en español. |

No hay violaciones constitucionales ni aclaraciones pendientes.

## Estructura del proyecto

### Documentación de esta feature

```text
specs/002-consultar-guia-preventiva/
├── spec.md
├── content-research.md
├── content-guide.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/
│   └── requirements.md
└── contracts/
    └── guide-ui-contract.md
```

`tasks.md` se generará posteriormente con `$speckit-tasks`; este plan no lo crea.

### Código fuente previsto

```text
frontend/
├── src/
│   ├── App.jsx                                  # conserva /aprendizaje pública y /evaluar protegida
│   ├── components/
│   │   ├── guide/
│   │   │   └── GuideSection.jsx                # plantilla semántica repetida para bloques 1–7
│   │   └── navegation/
│   │       └── nav.jsx                         # acceso existente “Aprendizaje”
│   ├── content/
│   │   └── preventive-guide.js                 # contenido curado, fuentes y metadatos estáticos
│   └── pages/
│       └── Educacion preventiva/
│           ├── educacion.jsx                   # composición de guía, índice, checklist, fuentes y CTA
│           └── educacion.css                   # estilos específicos responsive y de lectura
└── package.json

backend/                                        # sin cambios para esta feature
```

**Decisión de estructura**: conservar la ruta y página de aprendizaje ya
integradas para evitar una segunda superficie equivalente. Separar el texto
curado en un módulo estático facilita verificar su fidelidad contra
`content-guide.md`, mientras un único componente compartido evita duplicar la
estructura “qué mirar / por qué / cómo / ejemplo / qué no asumir / fuentes”. Los
estilos propios quedan junto a la página para no ampliar el CSS común. No se
crean capas de servicio, modelos persistentes ni carpetas backend.

## Diseño técnico

### Flujo público de lectura

1. Una persona entra desde landing, navegación principal o URL directa a
   `/aprendizaje`.
2. `App.jsx` mantiene esa ruta fuera de `ProtectedRoute`; el contenido se muestra
   con o sin sesión.
3. La página presenta introducción y fecha editorial, seguida de un índice de
   enlaces internos que permite saltar a cada habilidad.
4. `GuideSection` renderiza los bloques 1–7 con jerarquía semántica consistente y
   las seis partes editoriales definidas. El bloque argentino conserva organismo,
   ámbito, período/contexto y carácter ilustrativo no exhaustivo.
5. La página muestra el checklist como pausa de decisión y termina con las
   fuentes completas y el CTA hacia evaluación.

El módulo `preventive-guide.js` será una transcripción fiel y estructurada de
`content-guide.md`, no una nueva redacción. No habrá fetch, generación dinámica,
filtrado ni buscador: la persona puede localizar secciones mediante el índice y
los encabezados visibles.

### Integración con la feature 001

- El CTA visible conserva exactamente la intención “Evaluar una interacción” y
  navega a `/evaluar`.
- `/evaluar` permanece dentro de `ProtectedRoute`. Una visita sin sesión redirige
  a `/login` con `location.state.from`; al autenticarse, `PublicOnlyRoute` devuelve
  a la evaluación existente.
- La guía no precarga casos, no envía contenido, no llama a
  `POST /api/evaluations` y no modifica inputs, outputs, errores, autenticación o
  estado en memoria de 001.
- Si backend o Gemini fallan, la lectura sigue disponible; solo el recorrido al
  que apunta el CTA puede verse afectado según su comportamiento actual.

### Contenido y procedencia

- Cada bloque mantiene sus IDs de fuente y la sección final resuelve esos IDs a
  organismo, recurso, fecha cuando existe y URL ya aprobada.
- La actualización editorial se muestra de forma visible y se conserva como dato
  estático versionado.
- Los patrones de Argentina se presentan como modalidades documentadas, nunca
  como ranking ni estimación nacional. UFECI permanece limitado a “reportes
  recibidos por UFECI durante 2024”; CNV y MPBA conservan sus fechas y contexto.
- Enlaces, correo, QR, archivos, publicidad y deepfakes siguen siendo ejemplos
  dentro de los siete bloques, no herramientas ni módulos separados.
- Actualizar contenido exige modificar y revisar los artefactos editoriales y el
  módulo estático en una versión posterior; no existe publicación desde la UI.

### Experiencia visual y accesibilidad

- Reutilizar `Nav`, tipografía Geist, tokens, superficies, botones y anchos del
  sistema existente; no agregar imágenes ni animaciones necesarias para entender
  el contenido.
- Mantener prosa en una columna de lectura acotada y usar tarjetas/callouts solo
  para diferenciar acciones, ejemplos y límites sin convertir indicadores en
  estados de riesgo.
- El índice usa enlaces internos nativos; encabezados, listas, ejemplos y fuentes
  conservan semántica HTML y orden lógico sin JavaScript.
- Los enlaces externos tienen texto descriptivo; el foco es visible; ninguna
  información depende solo de color o iconos; el contenido sigue usable con
  teclado, 200 % de zoom y ancho de 375 px.
- En pantallas angostas, índice y bloques fluyen en una sola columna sin ocultar
  texto. No se planifica índice sticky, carrusel ni disclosure obligatorio para
  evitar complejidad y pérdida accidental de contenido.

## Responsabilidades

### FRONTEND — Gastón

- Transcribir `content-guide.md` al módulo estático sin alterar afirmaciones,
  fuentes, fechas ni cautelas.
- Reemplazar el placeholder actual de `/aprendizaje`, implementar la presentación
  responsive, los enlaces internos y el CTA, y validar lint/build.
- No agregar búsqueda simulada, llamadas API, persistencia ni lógica de detección.

### BACKEND — Martino

- No se requiere implementación. Puede apoyar la revisión de que no existan
  requests, endpoints o cambios contractuales y en el smoke test de regresión de
  `/evaluar`.

### INTEGRACIÓN/VALIDACIÓN — ambos

- Comparar el contenido implementado con `content-guide.md`, validar fuentes y
  metadatos temporales, probar mobile/desktop/teclado y confirmar que la guía
  funciona con servicios externos indisponibles.
- Verificar que el CTA respeta el flujo autenticado actual y que 001 no cambió.

## Riesgos y decisiones importantes

| Riesgo | Mitigación planificada |
| --- | --- |
| Divergencia entre `content-guide.md` y el texto renderizado | Un único módulo de contenido, revisión bloque por bloque e IDs de fuente explícitos. |
| Convertir la guía en biblioteca, buscador o feed | Una sola página, índice interno y contenido fijo; eliminar el buscador y las tarjetas de “guías recientes” del placeholder. |
| Que el diseño sugiera detección o certeza | No usar puntajes, semáforos ni etiquetas “seguro/fraude”; mantener “qué no asumir” en cada bloque. |
| Ocultar contexto temporal argentino | Modelar y mostrar fuente, organismo, ámbito, período/contexto y aviso no exhaustivo junto a los patrones. |
| Romper el flujo de 001 | Enlazar a la ruta existente y cubrir redirección/autenticación en el smoke test, sin tocar API ni formularios. |
| Sobrecargar mobile con contenido largo | Columna de lectura, índice con anclas, párrafos breves y bloques apilados; prueba a 375 px y 200 % de zoom. |
| Depender accidentalmente de servicios externos | Empaquetar todo el contenido en el frontend y probar la ruta con backend/Gemini no disponibles. |

## Comprobación constitucional posterior al diseño

**PASS.** El diseño queda limitado al frontend, reutiliza rutas y componentes
existentes, no introduce persistencia, secretos, integraciones ni contratos de
servicio, y conserva explícitamente el límite con la feature 001. La estructura
estática y un solo componente repetible son proporcionales al tiempo de
hackathon. No existen excepciones constitucionales que requieran justificación.

## Seguimiento de complejidad

No se registran violaciones ni complejidad constitucional pendiente de justificar.
