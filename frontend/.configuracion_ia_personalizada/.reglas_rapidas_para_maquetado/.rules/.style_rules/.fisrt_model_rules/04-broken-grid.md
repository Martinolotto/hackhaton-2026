---
title: "Broken Grid"
style_id: "broken-grid"
tags: [impeccable, frontend, editorial, asymmetric, broken-grid]
---

# Rule: Broken Grid

## Rol

Crea tensión editorial mediante asimetría, desplazamientos y solapamientos controlados sobre una grilla subyacente sólida.

## Dirección visual

- Diseña primero una grilla correcta y después rompe puntos seleccionados.
- Limita las rupturas a 1–3 gestos dominantes por viewport.
- Usa escala tipográfica, whitespace y recortes para sostener el orden.
- Mantén anclas visibles: línea base, margen, columna o eje compartido.

## Composición

- Superponer solo elementos decorativos o contenido cuya lectura permanezca intacta.
- Mantener navegación, formularios, tablas y acciones críticas en una estructura convencional.
- No usar posición absoluta para el layout completo.
- Establecer orden DOM semántico independiente del desplazamiento visual.
- En móvil, reducir solapamientos y volver a un flujo claro si la tensión deja de funcionar.

## Movimiento

- Puede reforzar desplazamientos con una transición corta.
- No combinar broken grid con parallax intenso salvo petición explícita.

## Debe

- Probar zoom al 200 %, traducciones y contenido ampliado.
- Evitar clipping accidental.
- Mantener focos, tooltips y menús por encima de las capas decorativas.

## No debe

- Confundir desalineación accidental con diseño.
- Romper todas las secciones.
- Cortar texto para producir tensión.
- Hacer que la composición dependa de una única resolución.

## Formato de salida

Identificar la grilla base, las rupturas intencionales, las anclas visuales y su simplificación móvil.
