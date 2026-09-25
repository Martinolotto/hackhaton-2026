# Tareas: Consultar una guía preventiva mínima

**Entrada**: artefactos de diseño en `specs/002-consultar-guia-preventiva/`

**Prerrequisitos**: `plan.md`, `spec.md`, `content-guide.md`, `research.md`,
`data-model.md`, `contracts/guide-ui-contract.md` y `quickstart.md`.

**Organización**: las tareas se agrupan por historia de usuario y preservan el
frontend real de Gastón. No hay tareas backend, Supabase Database ni API.

## Formato: `[ID] [P?] [Historia] Descripción`

- **[P]**: puede realizarse en paralelo porque toca archivos distintos y no
  depende de una tarea incompleta.
- **[US1]**, **[US2]**, **[US3]**: historia de usuario correspondiente.

## Fase 1: Preparación visual local

**Propósito**: aislar las extensiones de la guía sin modificar estilos compartidos
por evaluación o foro.

- [X] T001 [P] Crear `frontend/src/pages/Educacion preventiva/educacion.css` con el namespace `.education-page` e importarlo después de `frontend/src/pages/app-sections.css` en `frontend/src/pages/Educacion preventiva/educacion.jsx`, conservando sin cambios `Nav`, `DotField`, sidebar, hero, selector, cards, tokens y responsive actuales.

---

## Fase 2: Base editorial estática

**Propósito**: establecer una única fuente implementable, trazable y común para
las tres historias.

**⚠️ CRÍTICO**: esta fase debe completarse antes de renderizar historias.

- [X] T002 [P] Crear `frontend/src/content/preventive-guide.js` como transcripción estructurada de `specs/002-consultar-guia-preventiva/content-guide.md`: fecha, introducción, exactamente siete secciones con “qué mirar / por qué importa / cómo comprobarlo / ejemplo / qué no asumir / fuentes”, cuatro patrones argentinos con organismo/ámbito/período/contexto, checklist de cinco preguntas, cierre, CTA y catálogo completo de fuentes/URLs; no agregar afirmaciones, estadísticas, diagnóstico ni contenido remoto (RF-002–RF-017, RF-021, RF-025–RF-027; CE-002, CE-003, CE-005, CE-010).

**Checkpoint**: contenido editorial local disponible, sin requests ni persistencia.

---

## Fase 3: Historia de usuario 1 — Consultar orientación preventiva (P1) 🎯 MVP

**Objetivo**: una persona sin sesión puede consultar los siete bloques completos,
sus límites y sus fuentes dentro de la experiencia visual actual.

**Prueba independiente**: abrir `/aprendizaje` sin sesión ni backend, buscar y
seleccionar cada tema y comprobar introducción, siete bloques, fecha y fuentes.

- [X] T003 [US1] Reemplazar en `frontend/src/pages/Educacion preventiva/educacion.jsx` los grupos editoriales no normativos por los datos de `frontend/src/content/preventive-guide.js`, manteniendo el shell actual y actualizando sidebar, hero e introducción para reflejar la guía aprobada y su fecha editorial (RF-001–RF-006, RF-013–RF-017, RF-021, RF-023–RF-026; CE-001, CE-002, CE-005, CE-008, CE-009).
- [X] T004 [US1] Adaptar la búsqueda y el selector maestro-detalle existentes en `frontend/src/pages/Educacion preventiva/educacion.jsx` para exponer los siete temas y renderizar en cada selección “Qué mirar”, “Por qué importa”, “Cómo comprobarlo”, “Ejemplo”, “Qué no asumir” e IDs de fuentes, con estado vacío local y sin evaluar casos (RF-003–RF-016, RF-021, RF-024, RF-025; CE-002–CE-005).
- [X] T005 [US1] Implementar en `frontend/src/pages/Educacion preventiva/educacion.jsx` la sección “Acerca de esta guía y sus fuentes” con fecha, procedencia y enlaces descriptivos del catálogo estático, y presentar los patrones de Argentina con modalidad, organismo, ámbito, fecha/período, contexto y aviso ilustrativo/no exhaustivo (RF-005, RF-016, RF-017, RF-026, RF-027; CE-005, CE-010).
- [X] T006 [US1] Completar en `frontend/src/pages/Educacion preventiva/educacion.css` los estilos locales de detalle, ejemplo, límites, patrones y fuentes reutilizando colores, tipografía, superficies, radios y espaciados actuales, sin cambiar `frontend/src/pages/app-sections.css` ni `frontend/src/pages/Foro/foro.jsx` (RF-004, RF-021, RF-022; CE-004, CE-007).

**Checkpoint**: US1 funciona sin autenticación ni servicios externos y puede
validarse independientemente.

---

## Fase 4: Historia de usuario 2 — Aplicar pasos preventivos generales (P2)

**Objetivo**: la guía convierte señales en acciones concretas y ofrece una pausa
de decisión que conserva la agencia humana.

**Prueba independiente**: localizar una situación de presión, una identidad
aparente y una acción sensible; en cada caso encontrar una comprobación segura y
completar las cinco preguntas del checklist sin recibir un veredicto.

- [X] T007 [US2] Añadir en `frontend/src/pages/Educacion preventiva/educacion.jsx` el checklist estático de cinco preguntas, el principio transversal de verificación independiente y las aclaraciones de que una señal aislada no prueba engaño y la ausencia de señales no garantiza seguridad (RF-007–RF-010, RF-012–RF-017, RF-021; CE-003–CE-005).
- [X] T008 [US2] Estilizar en `frontend/src/pages/Educacion preventiva/educacion.css` el checklist, las acciones numeradas y los callouts de cautela como cards coherentes con el frontend actual, sin semáforos, scores, estados “seguro/fraude” ni información dependiente solo del color (RF-012–RF-017, RF-021, RF-022; CE-003, CE-005, CE-007).

**Checkpoint**: US1 y US2 funcionan conjuntamente y la guía sigue siendo
orientación general, no detector.

---

## Fase 5: Historia de usuario 3 — Pasar de prevención a evaluación (P3)

**Objetivo**: una persona con un caso concreto puede entrar al recorrido 001 sin
que la guía modifique su autenticación ni contrato.

**Prueba independiente**: activar “Evaluar una interacción” con y sin sesión;
confirmar `/evaluar` o redirección existente a `/login` y retorno posterior.

- [X] T009 [US3] Integrar en `frontend/src/pages/Educacion preventiva/educacion.jsx` el cierre aprobado y un CTA visible con etiqueta “Evaluar una interacción” hacia `/evaluar`, sin transportar contenido, parámetros ni estado de la guía (RF-011, RF-018–RF-020; CE-006).
- [X] T010 [US3] Verificar en `frontend/src/App.jsx`, `frontend/src/routes/protectedRoute.jsx` y `frontend/src/routes/publicOnlyRoute.jsx` que `/aprendizaje` continúa pública y `/evaluar` conserva autenticación y retorno existentes; no modificar esos archivos salvo una regresión comprobada (RF-001, RF-019, RF-020, RF-023; CE-001, CE-006, CE-008).

**Checkpoint**: las tres historias están completas y el contrato de 001 permanece
sin cambios.

---

## Fase 6: Pulido y validación transversal

**Propósito**: comprobar accesibilidad, responsive, trazabilidad editorial y
ausencia de regresiones antes de la validación humana.

- [X] T011 Revisar y corregir en `frontend/src/pages/Educacion preventiva/educacion.jsx` nombres accesibles, jerarquía de encabezados, `aria-pressed`/estado activo, `aria-live`, foco visible, navegación por teclado y comportamiento de búsqueda vacía, sin que `DotField` ni iconos transmitan información necesaria (RF-021, RF-022; CE-004, CE-007).
- [X] T012 Ejecutar la revisión editorial completa de `frontend/src/content/preventive-guide.js` contra `specs/002-consultar-guia-preventiva/content-guide.md`: siete secciones, cinco preguntas, fecha 25 de septiembre de 2026, todos los IDs/URLs, límites de HTTPS/identidad/voz/publicidad y metadatos argentinos, sin afirmaciones descartadas (RF-005–RF-017, RF-025–RF-027; CE-002, CE-003, CE-005, CE-010).
- [X] T013 Ejecutar `npm run lint` y `npm run build` desde `frontend/` y corregir únicamente fallos atribuibles a esta feature en `frontend/src/pages/Educacion preventiva/`, `frontend/src/content/preventive-guide.js` o imports directos.
- [X] T014 Ejecutar los seis escenarios de `specs/002-consultar-guia-preventiva/quickstart.md` en desktop y mobile, incluyendo acceso público, búsqueda/selector, cronometraje menor a dos minutos con ambos integrantes, fuentes, CTA con/sin sesión, `/evaluar` y smoke test visual de `/foro`; documentar cualquier pendiente real sin modificar backend ni comunidad (CE-001–CE-010).

---

## Dependencias y orden de ejecución

### Dependencias por fase

- **Fase 1** y **Fase 2**: pueden comenzar en paralelo porque T001 y T002 tocan
  archivos diferentes.
- **US1 (Fase 3)**: depende de T001 y T002.
- **US2 (Fase 4)**: depende de US1 porque amplía la misma página y su contenido.
- **US3 (Fase 5)**: depende de US1; puede verificarse después de integrar el
  cierre de US2 para evitar conflictos en `educacion.jsx`.
- **Pulido (Fase 6)**: depende de las tres historias completas.

### Dependencias por historia

- **US1 (P1)**: incremento mínimo demostrable de lectura pública.
- **US2 (P2)**: agrega aplicación práctica sobre la base de US1.
- **US3 (P3)**: conecta la guía con 001 sin cambiar sus contratos.

### Oportunidades de paralelo

```text
T001 (CSS local e import) ─┐
                           ├─> US1 -> US2 -> US3 -> validación
T002 (contenido estático) ─┘
```

Después de la base, las tareas sobre `educacion.jsx` se mantienen secuenciales
para no mezclar cambios visuales y editoriales sobre el mismo archivo. La revisión
editorial T012 puede prepararse en paralelo con la revisión accesible T011, pero
ambas deben terminar antes de lint/build y validación manual.

## Estrategia de implementación

### MVP primero

1. Completar T001 y T002.
2. Completar US1 (T003–T006).
3. Validar lectura pública de los siete bloques y fuentes.
4. Agregar US2 y US3 sin reconstruir la superficie.
5. Ejecutar pulido y quickstart.

### Límites operativos

- No tocar `backend/`, contratos de evaluations, Supabase Database ni Gemini.
- No modificar foro/comunidad ni estilos compartidos salvo que una regresión
  comprobada lo exija; los estilos nuevos pertenecen a `educacion.css`.
- `content-guide.md` manda sobre cualquier copy previo de `/aprendizaje`.
- No agregar dependencias, CMS, feed, monitoreo, alertas, imágenes ni APIs.
