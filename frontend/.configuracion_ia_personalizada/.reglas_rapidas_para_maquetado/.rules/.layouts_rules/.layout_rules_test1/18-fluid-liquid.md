---
title: "Fluid / Liquid Layout"
layout_id: "fluid-liquid"
tags: [impeccable, layout, fluid, liquid, responsive]
---

# Rule: Fluid / Liquid Layout

## Rol

Permite que dimensiones y espacios respondan continuamente al viewport, manteniendo límites que protejan lectura, interacción y composición.

## Estructura

- Usar porcentajes, fr, `minmax()`, `clamp()` y container queries con propósito.
- Todo valor fluido necesita mínimo y máximo razonables.
- Mantener measure de texto, tamaños táctiles y densidad dentro de rangos.
- Definir regiones full-bleed y contained conscientemente.
- Preferir adaptación local por contenedor para componentes reutilizables.

## Responsive

- La fluidez no elimina breakpoints: introducir cambios estructurales cuando sean necesarios.
- Probar anchos intermedios, no solo tres dispositivos.
- Considerar zoom, orientación y ventanas estrechas de escritorio.
- Prevenir overflow por palabras, tablas, medios y controles.

## Debe

- Reservar dimensiones de assets.
- Usar tipografía fluida con límites conservadores.
- Verificar ultrawide y 320 px.
- Mantener layout estable ante contenido dinámico.

## No debe

- Usar `vw` sin límites para texto o espacio.
- Permitir líneas de texto extremadamente largas.
- Escalar todos los elementos al mismo ritmo.
- Confundir fluido con ausencia de diseño.

## Formato de salida

Declarar propiedades fluidas, límites, container queries, cambios estructurales y pruebas de extremos.
