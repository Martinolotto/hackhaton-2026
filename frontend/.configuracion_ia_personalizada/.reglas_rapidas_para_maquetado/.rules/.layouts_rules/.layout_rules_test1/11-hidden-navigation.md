---
title: "Layout with Hidden Navigation"
layout_id: "hidden-navigation"
tags: [impeccable, layout, hidden-nav, immersive]
---

# Rule: Layout with Hidden Navigation

## Rol

Oculta la navegación global detrás de un control cuando la inmersión o el espacio lo justifican, sin volver invisibles las rutas principales.

## Estructura

- Usar un trigger etiquetado y reconocible.
- Mostrar marca, ubicación o salida aun con el menú cerrado.
- El panel abierto debe presentar arquitectura clara, no una nube de links.
- Elegir drawer, overlay o popover según cantidad y profundidad.
- Cerrar con botón, Escape y acción explícita fuera cuando sea seguro.

## Accesibilidad

- Gestionar foco al abrir/cerrar.
- Bloquear interacción con el fondo cuando sea modal.
- Exponer estado con `aria-expanded` y relación con el panel.
- No usar hover como único disparador.

## Responsive

- No asumir que oculto significa “solo móvil”.
- Puede revelarse en escritorio si mejora descubrimiento.
- Mantener áreas táctiles y safe areas.

## Debe

- Reservarlo para navegación secundaria, experiencias inmersivas o espacio limitado.
- Mantener una salida evidente.
- Probar teclado, lector de pantalla e historial.

## No debe

- Ocultar navegación crítica en productos complejos sin razón.
- Usar icono ambiguo sin label.
- Anidar múltiples paneles ocultos.
- Perder scroll o foco al cerrar.

## Formato de salida

Justificar ocultamiento, definir trigger, patrón de panel, gestión de foco y cambio por breakpoint.
