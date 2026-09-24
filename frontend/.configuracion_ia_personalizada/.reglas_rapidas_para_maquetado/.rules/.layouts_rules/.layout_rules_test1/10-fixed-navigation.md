---
title: "Layout with Fixed Navigation"
layout_id: "fixed-navigation"
tags: [impeccable, layout, fixed-nav, sticky]
---

# Rule: Layout with Fixed Navigation

## Rol

Mantiene navegación o acciones persistentes cuando su disponibilidad continua reduce esfuerzo en tareas largas o frecuentes.

## Estructura

- Elegir `sticky` antes que `fixed` cuando el contexto lo permita.
- Reservar espacio para evitar que la navegación cubra contenido.
- Definir región: top bar, sidebar o bottom bar móvil.
- Mantener z-index dentro de una escala controlada.
- Reducir la navegación tras scroll solo si sigue siendo descubrible.

## Responsive

- Sidebar puede convertirse en top bar, bottom nav o drawer.
- Respetar safe areas en dispositivos móviles.
- Evitar ocupar una fracción excesiva del viewport.
- Considerar teclado virtual, zoom y orientación horizontal.

## Debe

- Incluir skip link y foco visible.
- Marcar ubicación actual.
- Mantener contenido anclado visible con `scroll-padding`.
- Probar menús, modales y tooltips contra el stacking context.

## No debe

- Fijar navegación extensa que bloquee lectura.
- Ocultar/revelar con movimientos nerviosos.
- Duplicar dos barras persistentes con las mismas acciones.
- Cubrir banners de error o consentimiento.

## Formato de salida

Indicar región persistente, sticky/fixed, dimensiones, transformación móvil y reglas de solapamiento.
