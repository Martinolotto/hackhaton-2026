---
title: "Two-column Layout"
layout_id: "two-column"
tags: [impeccable, layout, two-column, responsive]
---

# Rule: Two-column Layout

## Rol

Organiza dos regiones relacionadas pero jerárquicamente distintas, como contenido + sidebar, formulario + contexto o listado + detalle.

## Estructura

- Define si las columnas son simétricas o principal/secundaria.
- Usa proporciones intencionales: 1:1, 2:1, 3:2 o límites con `minmax()`.
- Aplica `gap` como separación; evita márgenes compensatorios.
- Cada columna debe tener una responsabilidad clara.
- Limita el ancho de lectura del texto aunque la columna crezca.

## Responsive

- Apila cuando el contenido deja de respirar, no en un breakpoint arbitrario.
- Conserva el orden DOM según prioridad móvil.
- Una sidebar puede pasar debajo, arriba o a drawer solo si su función lo justifica.
- Evita que una columna quede demasiado estrecha antes del apilado.

## Debe

- Alinear inicios y ritmos verticales cuando facilite comparación.
- Diseñar contenido desigual y alturas independientes.
- Mantener acciones críticas visibles sin recurrir obligatoriamente a sticky.

## No debe

- Forzar 50/50 cuando una región contiene mucho más.
- Usar dos columnas para información sin relación.
- Duplicar contenido al adaptar a móvil.
- Fijar ambas alturas al viewport si hay contenido dinámico.

## Formato de salida

Indicar roles de columna, proporción, límites, orden DOM y condición exacta de apilado.
