---
title: "Bento Grid"
style_id: "bento-grid"
tags: [impeccable, frontend, bento, grid, modular]
---

# Rule: Bento Grid

## Rol

Diseña mosaicos modulares donde el tamaño de cada bloque expresa prioridad real del contenido.

## Dirección visual

- Establece una grilla base coherente; 4–12 columnas según ancho.
- Usa 2–4 tamaños de módulo, no tamaños únicos para cada tarjeta.
- Destaca una pieza primaria; las demás forman ritmo y contraste.
- Diferencia tarjetas mediante contenido y función, no con colores arbitrarios.
- Mantén radios, bordes y padding como tokens compartidos.

## Composición y contenido

- Cada bloque debe tener una función: acción, estado, narrativa, métrica o navegación.
- Evita tarjetas dentro de tarjetas salvo que exista jerarquía interactiva real.
- Agrupa módulos por secuencia de lectura y orden DOM correcto.
- En móvil, reordena por prioridad semántica; no por apariencia de escritorio.
- Los bloques visuales pueden abarcar columnas, pero el texto conserva medida legible.

## Interacción

- Solo una tarjeta completa es clicable si tiene un único destino.
- Distingue claramente tarjetas informativas de interactivas.
- Hover no debe ser la única pista de interacción.

## Debe

- Diseñar estados de contenido desigual y textos largos.
- Evitar alturas rígidas cuando el contenido sea dinámico.
- Probar 320 px, tablet y pantallas anchas.

## No debe

- Convertir todo contenido en tarjeta.
- Repetir el patrón genérico de “título + icono en recuadro + texto”.
- Crear un tablero visual sin una ruta de lectura.
- Sacrificar el orden DOM para lograr el mosaico.

## Formato de salida

Indicar grilla, tamaños permitidos, módulo principal, orden móvil y reglas de interacción.
