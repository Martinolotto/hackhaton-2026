---
title: "Masonry Layout"
layout_id: "masonry"
tags: [impeccable, layout, masonry, gallery]
---

# Rule: Masonry Layout

## Rol

Distribuye elementos de alturas variables en columnas compactas, apropiado para galerías y colecciones visuales donde el orden estricto no es primordial.

## Estructura

- Usar masonry únicamente cuando la variación de altura aporta valor.
- Mantener ancho de columna consistente y gaps regulares.
- Conservar orden DOM significativo, preferentemente por filas o cronología comprensible.
- Reservar dimensiones de imágenes para evitar reflujo.
- Separar visualmente metadatos y acciones.

## Responsive

- Reducir columnas según el ancho mínimo útil de cada pieza.
- En una columna, volver a flujo documental normal.
- No alterar arbitrariamente el orden para llenar huecos.
- Limitar alturas extremas que produzcan columnas desbalanceadas.

## Debe

- Admitir carga incremental sin saltos severos.
- Proveer filtros u orden si la colección es grande.
- Validar navegación por teclado y lectura de pantalla.
- Considerar grid regular si comparar filas es importante.

## No debe

- Usarlo para tablas, pricing o información secuencial.
- Posicionar items manualmente con coordenadas.
- Recortar todos los assets a ratios incoherentes.
- Hacer que el orden visual contradiga el DOM.

## Formato de salida

Indicar ancho mínimo, columnas, orden semántico, carga incremental y fallback de una columna.
