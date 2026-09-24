---
title: "Abstract Shapes"
style_id: "abstract-shapes"
tags: [impeccable, frontend, abstract, geometry, art-direction]
---

# Rule: Abstract Shapes

## Rol

Construye una identidad visual mediante formas geométricas u orgánicas que apoyen la jerarquía y la marca, sin convertirse en decoración aleatoria.

## Dirección visual

- Define una gramática de 2–3 familias: círculos/arcos, polígonos o blobs orgánicos.
- Asigna función a cada familia: fondo, énfasis, navegación o separación.
- Usa una paleta corta con relaciones claras entre base, tinta y acento.
- Repite radios, ángulos y curvas para que la composición parezca un sistema.
- Prefiere SVG/CSS nativo; raster solo para texturas complejas.

## Composición

- Las formas pueden recortar, enmarcar o guiar hacia contenido, nunca taparlo.
- Alinea puntos de tensión con la grilla aunque las siluetas parezcan libres.
- Mantén una zona tranquila alrededor del texto largo.
- En móvil, recorta o simplifica la composición en vez de escalarla literalmente.

## Movimiento

- Movimiento lento y secundario: rotación, morph o deriva mínima.
- Evita animar simultáneamente más de dos planos.
- Reduce o elimina movimiento según preferencias del usuario.

## Debe

- Comprobar contraste considerando la forma situada detrás del texto.
- Incluir `aria-hidden="true"` en decoración SVG no informativa.
- Evitar saltos de layout mediante dimensiones o aspect-ratio definidos.

## No debe

- Añadir blobs porque el espacio “se ve vacío”.
- Mezclar estilos de ilustración incompatibles.
- Crear formas clicables sin affordance ni etiqueta.
- Usar filtros pesados que degraden scroll o batería.

## Formato de salida

Explicar la gramática de formas, función de cada familia, comportamiento responsive y presupuesto de movimiento.
