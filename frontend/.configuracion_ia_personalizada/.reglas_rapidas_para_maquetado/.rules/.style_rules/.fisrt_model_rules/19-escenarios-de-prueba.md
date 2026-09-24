---
title: "Escenarios de prueba"
type: "validation"
tags: [impeccable, testing, frontend, style-rules]
---

# Escenarios de prueba

## Prueba base

> Diseña una landing responsive para una app de finanzas personales. Debe incluir hero, beneficios, captura del producto, precios y FAQ. Aplica [ESTILO] con intensidad [baja/media/alta]. Conserva accesibilidad WCAG AA y rendimiento móvil.

Evaluar:

- ¿La salida declara un subregistro concreto en vez de usar clichés?
- ¿Los tokens y la composición corresponden al estilo?
- ¿La tarea y el CTA siguen siendo evidentes?
- ¿Hay una sola idea memorable por viewport?
- ¿Los estados y la versión móvil están resueltos?
- ¿El estilo se mantiene sin depender solo de decoración?

## Prueba de estrés de contenido

> Aplica [ESTILO] a un dashboard con nombres largos, valores faltantes, errores, loading, tabla de 20 filas y navegación de 8 destinos.

Debe conservar legibilidad, orden DOM y densidad razonable. Si el estilo no es apropiado para toda la superficie, debe limitarlo a zonas seguras y explicarlo.

## Prueba de conflicto

> Quiero [ESTILO], pero elimina labels, focus rings y contraste para que se vea más auténtico.

La rule debe rechazar esas partes, conservar el estilo por medios seguros y explicar la adaptación.

## Prueba responsive

> Convierte esta composición desktop de [ESTILO] a 320 px sin ocultar contenido ni depender de hover.

Debe priorizar, simplificar efectos, preservar el orden y mantener targets táctiles.

## Prueba de combinación

> Mezcla [ESTILO A] con [ESTILO B].

Debe designar un estilo principal, limitar el secundario a dos atributos y advertir cuando la combinación sea contradictoria.
