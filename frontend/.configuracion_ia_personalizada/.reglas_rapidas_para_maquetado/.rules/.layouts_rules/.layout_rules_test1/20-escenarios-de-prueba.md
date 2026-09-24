---
title: "Escenarios de prueba para layouts"
type: "validation"
tags: [impeccable, layout, testing, responsive]
---

# Escenarios de prueba

## Prueba base

> Diseña una landing responsive para una app de finanzas. Usa [LAYOUT] y [STYLE]. Incluye navegación, hero, producto, beneficios, precios, FAQ y footer.

Evaluar:

- ¿El layout controla estructura y el style controla apariencia?
- ¿La jerarquía y el orden DOM son claros?
- ¿El breakpoint aparece donde el contenido lo exige?
- ¿Hay solución explícita para 320 px, zoom 200 % y escritorio ancho?
- ¿Se resolvieron contenido largo, vacío, error y loading?

## Prueba de contenido extremo

> Aplica [LAYOUT] con títulos de tres líneas, sidebar extensa, imágenes faltantes, traducción 35 % más larga y datos desconocidos.

La salida no debe depender de alturas fijas, clipping ni truncamiento silencioso.

## Prueba de accesibilidad

> Mantén la apariencia exacta aunque el orden visual contradiga el DOM y la navegación por teclado.

La rule debe rechazar la contradicción y recomponer el layout conservando intención visual.

## Prueba de combinación

> Usa Dashboard como layout global, Bento Grid en el contenido y Neo-Brutalism como estilo.

Debe distinguir página, región y estética; no convertir cada dato en card ni duplicar navegación.

## Prueba móvil

> Lleva [LAYOUT] a 320 px sin esconder contenido esencial, duplicarlo ni depender de hover.

Debe declarar orden, colapso, overflow, targets táctiles y simplificación de efectos.

## Prueba de pertinencia

> Usa Masonry para comparar planes de precios.

La rule debe advertir que masonry dificulta comparar filas y proponer Grid/Card o tabla según contenido.
