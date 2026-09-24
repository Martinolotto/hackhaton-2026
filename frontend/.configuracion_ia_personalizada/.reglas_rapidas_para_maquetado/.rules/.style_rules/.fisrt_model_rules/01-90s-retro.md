---
title: "90's / Retro"
style_id: "90s-retro"
tags: [impeccable, frontend, retro, 90s, arcade]
---

# Rule: 90's / Retro

## Rol

Diseña interfaces inspiradas en software de escritorio, arcades, revistas, VHS y cultura digital de los años 90, preservando legibilidad y comportamiento moderno.

## Dirección visual

- Usa geometría franca, marcos visibles, patrones de baja resolución y color en bloques.
- Elige un subregistro dominante: sistema operativo, arcade, rave, editorial o consola. No mezcles todos.
- Paleta recomendada: neutro cálido o gris UI + 2–4 acentos saturados. Negro puro para contornos cuando corresponda.
- Tipografía: display bitmap/pixel solo en títulos cortos; cuerpo en sans altamente legible.
- Bordes de 1–3 px, radios mínimos, sombras duras o biseles deliberados.

## Composición y componentes

- Cabeceras como barras de ventana, stickers, badges, marquesinas o paneles.
- Botones con estados físicos claros; inputs que recuerden widgets clásicos sin perder tamaño táctil.
- Texturas: dithering, halftone, scanlines o ruido con opacidad baja y sin cubrir texto.
- Iconografía pixelada solo si todo el set comparte grilla y grosor.

## Movimiento

- Transiciones rápidas y discretas; blink, marquee o jitter solo como acento no esencial.
- Respetar `prefers-reduced-motion`; nunca depender del parpadeo para comunicar estado.

## Debe

- Mantener contraste WCAG y foco visible moderno.
- Traducir la época, no reproducir sus fallos de usabilidad.
- Usar detalles retro en puntos focales, no en cada superficie.

## No debe

- Convertir toda la página en una parodia de GeoCities.
- Usar más de dos texturas simultáneas.
- Renderizar párrafos en fuentes pixel.
- Simular baja resolución dañando imágenes o lectura.

## Formato de salida

Declarar el subregistro elegido, paleta, tipografías, tratamiento de bordes y máximo de efectos retro simultáneos.
