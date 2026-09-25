# Fase 04 — Trazabilidad

**Estado**: `CERRADA`
**Resultado**: `TRAZABILIDAD COHERENTE`  
**Fecha de auditoría**: 2026-09-24  
**Entrada**: resultados validados de 01, 02 y 03.  
**Fuentes normativas**:
[proceso 04](../../../antes-de-programar/docs/procesos/04-trazabilidad.md)
y [Mermaid 04](../../../antes-de-programar/diagrams/mermaid/04-trazabilidad.mmd).

## 1. Verificación de entrada

- **Problem Gate**: `APROBADO` por Martino y Gastón.
- **Solution Gate**: `APROBADO` por Martino y Gastón.
- **01 · Entender problemática**: `CERRADA`.
- **02 · Ideación de solución**: `CERRADA`.
- **03 · Sistema ideal**: `CERRADA`.
- **Preguntas bloqueantes**: ninguna.

Esta fase audita relaciones existentes. La trazabilidad no es un gate, no
agrega un tercer gate ni introduce una solución nueva.

## 2. Inventario auditado

### Zona A — Origen del problema

- **Actor principal**: persona expuesta.
- **Actor adversario**: persona, grupo, campaña u origen que engaña
  deliberadamente.
- **Problema principal**: dificultad para reconocer y verificar a tiempo la
  legitimidad de interacciones digitales que pueden combinar apariencia
  legítima, presión, confianza e información ambigua o distribuida.
- **Necesidad principal**: evaluar y verificar suficientemente antes de una
  acción potencialmente perjudicial.
- **Necesidad secundaria**: desarrollar preparación y reconocimiento.
- **Insights**: los indicadores pueden quedar eclipsados por legitimidad
  aparente; verificar exige salir del canal y contrastar información; la ayuda
  consultiva depende de que surja sospecha.
- **POV**: la persona necesita evaluar y verificar una interacción dudosa antes
  de actuar; la preparación es complementaria.

### Zona B — Puente hacia la solución

- Cinco HMW cubren evaluación, incertidumbre, identidad/origen, aprendizaje y
  brecha de sospecha.
- C1 es el núcleo seleccionado.
- C2 está integrado en C1.
- C3 y C5 son dimensiones complementarias.
- C4, monitoreo multicanal permanente, quedó fuera como modelo general.

### Zona C — Sistema ideal

- Objetivo: apoyar una evaluación y verificación explicable antes de actuar.
- M1: consulta y reconstrucción contextual.
- M2: evaluación y verificación explicable.
- M3: síntesis de riesgo y apoyo a la decisión.
- M4: preparación y reconocimiento.
- M5: participación y evidencia colaborativa.
- M6: calidad, gobernanza y protección.

### Zona D — Valor producido

- caso contextualizado;
- mapa de indicadores y contradicciones;
- plan de verificación;
- mapa de evidencia con procedencia;
- riesgo estimado e incertidumbre;
- orientación de cautela;
- aprendizaje situado;
- información preventiva;
- aportes y alertas gobernados.

## Matriz de trazabilidad

| Actor/origen | Problema o tensión | Necesidad/insight/POV | HMW | Decisión de solución | Objetivo del sistema | Módulo y capacidad | Salida | Destinatario | Beneficio |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Persona expuesta | Verificación dispersa y costosa | Necesita evaluar y verificar antes de actuar | Ayudar a reunir, interpretar y contrastar evidencia | C1 con C2 integrado | Guiar verificación suficiente | M2 · priorizar comprobaciones independientes y contrastar resultados | Plan de verificación y mapa de evidencia | Persona expuesta | Reduce esfuerzo y permite comprobar antes de actuar |
| Persona expuesta | Contenido aislado no representa la interacción | Necesita interpretar contenido + contexto | Ayudar a evaluar evidencia suficiente | C1 | Reconstruir la interacción | M1 · recuperar canal, identidad, origen, relación y acción solicitada | Caso contextualizado y faltantes | Persona expuesta; M2 | Evita conclusiones basadas en una captura incompleta |
| Persona expuesta | Apariencia legítima e identidad confiable | Origen real e identidad presentada pueden diferir | Hacer visibles inconsistencias de identidad, origen y contexto | C1 + C2 | Distinguir presentación y origen | M1/M2 · contrastar identidad por fuente independiente | Contradicciones y comprobaciones | Persona expuesta | Reduce confianza automática |
| Persona expuesta | Presión para actuar | La urgencia puede adelantar la acción a la verificación | Contrarrestar presión antes de actuar | C1 | Proponer cautela proporcional | M3 · priorizar pausa, consulta o verificación | Orientación de cautela | Persona expuesta | Favorece una decisión anterior al perjuicio |
| Persona expuesta | Evidencia ambigua, faltante o contradictoria | Necesita comprender límites, no una falsa certeza | Comunicar indicadores, evidencia e incertidumbre | C1 | Expresar una conclusión trazable | M2/M3 · separar evidencia, contradicciones, faltantes, riesgo e incertidumbre | Evaluación explicada | Persona expuesta | Permite decidir con límites visibles |
| Persona expuesta | Puede no saber qué observar | Necesidad secundaria de preparación | Convertir evaluaciones en aprendizaje reutilizable | C3 + aprendizaje de C1 | Fortalecer reconocimiento futuro | M3/M4 · aprendizaje situado e información ordenada | Aprendizaje e información preventiva | Personas expuestas | Aumenta capacidad de advertir futuras dudas |
| Persona expuesta | Puede no surgir sospecha | Una ayuda consultiva no se activa sola | Reducir la brecha sin monitoreo universal | C3 + C5 | Reducir parcialmente la brecha | M4/M5 · casos, patrones y alertas | Conocimiento y alertas | Personas expuestas | Puede activar reconocimiento temprano sin prometer cobertura total |
| Persona expuesta/comunidad | Experiencia colectiva dispersa | Antecedentes pueden aportar contexto, no verdad | Explorar conocimiento colectivo | C5 | Incorporar evidencia auxiliar | M5 · recibir reportes y relacionar patrones | Aportes y antecedentes con procedencia | Persona expuesta; M2; M4 | Amplía contexto disponible |
| Persona expuesta/comunidad | Reportes pueden ser falsos, vencidos o abusivos | Popularidad no equivale a evidencia | Comunicar evidencia e incertidumbre sin falsa certeza | Límites aprobados de C5 | Preservar calidad y evitar daño | M6 · moderar, corroborar, fechar y permitir correcciones | Estado, vigencia y trazabilidad | Personas expuestas; participantes | Reduce manipulación y daño reputacional |
| Actor adversario | Busca legitimidad aparente y acción sin verificación | Su estrategia depende de ocultar origen o presión; no es una necesidad que se satisfaga | Visibilizar inconsistencias y contrarrestar presión | C1 + C2 | Exponer contradicciones y facilitar comprobación | M2 · analizar origen, identidad, conducta y evidencia | Indicadores, contradicciones y verificaciones | Persona expuesta | Dificulta que el engaño avance sin examen |
| Persona expuesta | Una conclusión puede volverse incorrecta con evidencia nueva | Necesita reevaluar, no recibir un veredicto irreversible | Comunicar incertidumbre y verificaciones posibles | C1 | Admitir evaluación iterativa | M2/M3 · incorporar comprobaciones y actualizar síntesis | Evaluación actualizada | Persona expuesta | Evita congelar conclusiones desactualizadas |
| Persona expuesta | Puede delegar indebidamente su decisión | Necesita apoyo sin perder agencia | Ayudar a decidir con fundamento | C1 | Orientar sin reemplazar decisión humana | M3 · explicar límites y próximos pasos | Riesgo, incertidumbre y cautelas | Persona expuesta | Conserva agencia y evita autoridad indebida |

## 4. Auditoría hacia adelante

### Necesidad principal → valor

`evaluar/verificar antes de actuar
→ C1 con C2 integrado
→ reconstrucción + análisis + verificación + síntesis
→ evidencia, riesgo, incertidumbre y próximos pasos
→ decisión humana con mayor fundamento`

La cadena está completa y constituye el valor central.

### Necesidad secundaria → valor

`preparación/reconocimiento
→ C3 + aprendizaje situado
→ información preventiva, casos y alertas gobernadas
→ mayor capacidad de advertir cuándo una interacción merece cautela`

La cobertura es deliberadamente parcial: no se promete generar sospecha en
todas las exposiciones.

### Riesgo colaborativo → valor protegido

`participación
→ C5
→ M5 + M6
→ aportes con procedencia, estado y vigencia
→ evidencia auxiliar utilizable sin transformarse en verdad`

La gobernanza no es un agregado huérfano: es condición para que C5 conserve
valor sin contradecir el modelo de evidencia.

## 5. Auditoría hacia atrás

| Elemento del sistema ideal | Origen comprobado | Resultado |
| --- | --- | --- |
| M1 · Reconstrucción contextual | contenido ≠ interacción completa; casos A–C; C1 | Justificado |
| M2 · Evaluación y verificación | necesidad principal; HMW principal; C1+C2 | Justificado |
| M3 · Riesgo y decisión | naturaleza de respuesta aprobada; incertidumbre; agencia humana | Justificado |
| M4 · Preparación | necesidad secundaria; brecha de sospecha; C3 | Justificado |
| M5 · Colaboración | C5 seleccionado como dimensión complementaria | Justificado |
| M6 · Gobernanza | C5 nunca es verdad única; riesgos de reportes, vigencia y abuso | Justificado |
| Nivel estimado de riesgo | decisión humana de Fase 02 | Justificado |
| Incertidumbre separada | Problem Space y decisión humana de Fase 02 | Justificado |
| Verificación independiente | AS-IS, evidencia disponible y C2 integrado | Justificado |
| Monitoreo universal excluido | límites aprobados en 01–03 | Justificado |

## 6. Auditoría de cobertura

- [x] Cada necesidad priorizada tiene cobertura justificable.
- [x] Cada objetivo posee soporte en problema, necesidades y solución.
- [x] Cada módulo respeta límite y alcance.
- [x] Cada módulo tiene origen identificable.
- [x] Cada capacidad relevante produce una salida.
- [x] Cada salida tiene destinatario y beneficio.
- [x] La solución se rastrea hasta POV y HMW.
- [x] Se distingue capacidad, salida y beneficio.
- [x] La persona expuesta aparece como origen y destinataria del valor.
- [x] El actor adversario se utiliza como origen causal, no como beneficiario.
- [x] C2 no se independizó de C1.
- [x] C3 y C5 no desplazaron la necesidad principal.
- [x] Los límites de evidencia y cobertura se conservaron.
- [x] No existen elementos huérfanos conocidos.

## 7. Hallazgos y correcciones

| Hallazgo | Evaluación | Artefacto propietario | Acción | Estado |
| --- | --- | --- | --- | --- |
| M6 no proviene de una necesidad humana separada | No es huérfano: deriva de la incorporación aprobada de C5 y protege su valor | 03 | Ninguna | Cerrado |
| C3 y C5 cubren solo parcialmente la ausencia de sospecha | Límite explícito y coherente, no contradicción | 01–03 | Ninguna | Cerrado |
| Evidencia disponible no demuestra causas universales en todos los canales | Límite heredado; el sistema explica incertidumbre y no depende de causalidad universal | 01–03 | Ninguna | Cerrado |

No se detectaron pérdidas, contradicciones materiales ni elementos sin origen.
No fue necesario reabrir 01, 02 o 03.

## 8. Resultado de trazabilidad

- **Lectura hacia adelante**: comprobada.
- **Lectura hacia atrás**: comprobada.
- **Necesidades sin cobertura**: ninguna; la brecha de no sospecha conserva su
  cobertura parcial explícita.
- **Objetivos sin soporte**: ninguno.
- **Módulos o capacidades huérfanos**: ninguno.
- **Salidas sin destinatario o beneficio**: ninguna.
- **Inconsistencias abiertas**: ninguna.
- **Resultado**: `TRAZABILIDAD COHERENTE`.

## 9. Validación y cierre

- **Cobertura del proceso Markdown**: completa.
- **Cobertura del Mermaid**: zonas A–D y auditoría bidireccional cubiertas.
- **Trazabilidad coherente**: sí.
- **Tercer gate creado**: no.
- **Revisión humana adicional requerida para avanzar**: no; ambos gates ya
  estaban aprobados y 04 es una auditoría.
- **Estado**: `CERRADA`.

La trazabilidad coherente y el sistema ideal validado alimentan
[05 · MVP 24h](05-mvp-24h.md).
