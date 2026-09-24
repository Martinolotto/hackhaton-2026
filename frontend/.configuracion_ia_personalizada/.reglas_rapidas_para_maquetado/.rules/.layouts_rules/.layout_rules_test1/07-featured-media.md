---
title: "Featured Image or Video Layout"
layout_id: "featured-media"
tags: [impeccable, layout, image, video, media]
---

# Rule: Featured Image or Video Layout

## Rol

Hace que una imagen o video principal establezca contexto, emoción o demostración sin relegar el mensaje ni la acción.

## Estructura

- Definir si el medio es contenido, demostración o atmósfera.
- Reservar espacio con `aspect-ratio` para impedir layout shift.
- Situar título y CTA fuera de zonas visualmente ruidosas.
- Usar overlay solo con capa de contraste medida.
- Mantener controles de video accesibles y visibles.

## Responsive y rendimiento

- Proveer tamaños y crops por breakpoint.
- Preservar focal point con `object-position`.
- Usar poster optimizado y no autoplay con audio.
- Lazy-load cuando el medio no sea LCP; priorizarlo cuando sí lo sea.
- En móvil, reducir altura antes que ocultar el contenido.

## Debe

- Proveer alt adecuado o transcripción/captions para video.
- Diseñar fallback si el medio falla.
- Mantener CTA comprensible sin depender de la imagen.

## No debe

- Usar video de fondo como información esencial.
- Poner párrafos largos sobre imágenes.
- Permitir que controles queden bajo overlays.
- Descargar assets desktop innecesarios en móvil.

## Formato de salida

Definir rol del medio, ratio, crop, overlay, estrategia LCP, accesibilidad y fallback.
