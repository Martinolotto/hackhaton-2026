---
title: "Diagonal Layout"
layout_id: "diagonal"
tags: [impeccable, layout, diagonal, dynamic]
---

# Rule: Diagonal Layout

## Rol

Introduce dirección y energía mediante ejes, recortes o transiciones diagonales sin inclinar el contenido legible ni romper el flujo.

## Estructura

- Elegir un ángulo o familia de ángulos coherente.
- Aplicar diagonales a fondos, separadores, medios o bordes de sección.
- Mantener texto, formularios y controles en ejes horizontales.
- Reservar espacio considerando los extremos del recorte.
- Usar pseudo-elementos, clip-path o SVG sin alterar el DOM semántico.

## Responsive

- Reducir el ángulo o profundidad en pantallas estrechas.
- Evitar recortes que oculten contenido variable.
- Probar zoom y cambios de orientación.
- Ofrecer fallback rectangular si `clip-path` no es viable.

## Debe

- Usar la diagonal para guiar hacia contenido o conectar secciones.
- Mantener hit areas completas aunque la apariencia esté recortada.
- Controlar overflow horizontal.
- Verificar contraste a ambos lados de la transición.

## No debe

- Rotar bloques de texto y luego contrarrotarlos como técnica principal.
- Mezclar varios ángulos sin sistema.
- Crear grandes espacios vacíos accidentales.
- Cortar focus rings, sombras o menús.

## Formato de salida

Indicar ángulo, superficies afectadas, función direccional, reservas de espacio y simplificación móvil.
