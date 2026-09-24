---
title: "Grid System Layout"
layout_id: "grid-system"
tags: [impeccable, layout, grid-system, columns]
---

# Rule: Grid System Layout

## Rol

Establece una infraestructura de columnas, gutters y márgenes que alinea múltiples tipos de contenido de forma consistente.

## Estructura

- Definir container, número de columnas, gutter y márgenes por rango.
- Preferir CSS Grid; usar subgrid cuando el soporte objetivo lo permita.
- Los elementos pueden abarcar columnas, pero deben compartir líneas de alineación.
- Establecer anchos máximos de contenido y texto.
- Crear tokens, no valores dispersos.

## Responsive

- Reducir columnas cuando los módulos alcancen su mínimo funcional.
- Los breakpoints emergen de la composición.
- Permitir regiones fluidas entre límites.
- No exigir que todas las secciones usen cada columna.

## Debe

- Separar grid de página y grid interno de componentes.
- Verificar RTL si el producto lo requiere.
- Mantener consistencia de gutters y alineaciones.
- Documentar excepciones intencionales full-bleed.

## No debe

- Usar una grilla de 12 columnas por costumbre.
- Traducir diseño impreso literalmente.
- Resolver cada alineación con spans únicos.
- Crear wrappers anidados sin función.

## Formato de salida

Indicar container, columnas, gutters, breakpoints, spans recurrentes y excepciones full-bleed.
