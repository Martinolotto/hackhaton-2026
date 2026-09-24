---
title: "Holy Grail Layout"
layout_id: "holy-grail"
tags: [impeccable, layout, holy-grail, three-column]
---

# Rule: Holy Grail Layout

## Rol

Organiza header, footer y una zona central de tres columnas con contenido principal y dos laterales, manteniendo flexibilidad y orden semántico.

## Estructura

- DOM recomendado: header, main con contenido principal y complementos semánticos, footer.
- La columna central recibe el espacio flexible.
- Sidebars usan límites mínimos y máximos; no porcentajes rígidos.
- La página puede crecer más allá del viewport.
- Footer al final del contenido o del viewport cuando el contenido sea corto, sin posición fija.

## Responsive

- Colapsar primero la sidebar de menor prioridad.
- Reubicar complementos según relación con el contenido.
- En móvil, una columna con orden semántico claro.
- Convertir utilidades en disclosure solo si siguen siendo descubribles.

## Debe

- Usar landmarks apropiados.
- Evitar que sidebars compitan con la tarea principal.
- Diseñar overflow y elementos sticky de forma independiente.
- Probar contenido central corto y extremadamente largo.

## No debe

- Fijar alturas de header/main/footer innecesariamente.
- Usar tablas para layout.
- Mantener tres columnas ilegibles en tablet.
- Mover visualmente sidebars contra el orden de tabulación.

## Formato de salida

Indicar landmarks, límites de columnas, prioridad de colapso, orden móvil y conducta del footer.
