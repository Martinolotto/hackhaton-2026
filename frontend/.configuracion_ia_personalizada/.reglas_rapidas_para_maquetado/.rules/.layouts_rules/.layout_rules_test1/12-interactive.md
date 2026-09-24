---
title: "Interactive Layout"
layout_id: "interactive"
tags: [impeccable, layout, interactive, stateful]
---

# Rule: Interactive Layout

## Rol

Permite que la estructura responda a elecciones, manipulación o datos del usuario, manteniendo un modelo mental claro y una alternativa accesible.

## Estructura

- La interacción debe cumplir una tarea, explicar un sistema o permitir exploración.
- Definir estado inicial comprensible y camino de recuperación.
- Mantener controles cerca del resultado que afectan.
- Separar contenido esencial de capas experimentales.
- Reflejar estado importante en URL cuando deba compartirse o recuperarse.

## Estados

- Diseñar idle, hover, focus, active, loading, success, empty y error.
- Evitar cambios de layout inesperados tras acciones.
- Proveer undo para operaciones reversibles importantes.
- Mantener feedback inmediato aun si el resultado tarda.

## Responsive y accesibilidad

- Ofrecer teclado y touch equivalentes.
- No depender de drag; incluir controles alternativos.
- Anunciar actualizaciones relevantes.
- Reducir animación sin eliminar causalidad.

## No debe

- Convertir todo en interacción.
- Ocultar contenido detrás de gestos no indicados.
- Usar canvas sin semántica alternativa.
- Bloquear navegación durante efectos.

## Formato de salida

Describir tarea interactiva, modelo de estado, controles alternativos, persistencia y fallback no animado.
