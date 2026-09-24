---
title: "Rules de layouts web para Impeccable"
version: "1.0.0"
language: "es"
type: "layout-rule-router"
tags: [impeccable, frontend, layout, responsive, rules]
---

# Rules de layouts web para Impeccable

## Propósito

Estas rules gobiernan la estructura espacial, el flujo de lectura, la adaptación responsive y la relación entre regiones. Deben combinarse con una rule estética del paquete de estilos sin sustituirla.

## Separación de responsabilidades

| Capa | Decide |
|---|---|
| Layout rule | Regiones, grilla, orden, proporciones, scroll y breakpoints |
| Style rule | Color, tipografía expresiva, textura, bordes, material y movimiento visual |
| Sistema existente | Tokens, componentes, convenciones y restricciones del producto |
| Impeccable | Calidad, coherencia, accesibilidad, validación e iteración |

Si dos reglas chocan, conservar primero contenido, semántica, accesibilidad y tarea principal; después el layout; finalmente el adorno.

## Enrutamiento

| Intención | Rule |
|---|---|
| contenido principal + lateral | `01-two-column.md` |
| dos mitades con igual presencia | `02-split-screen.md` |
| tensión y pesos desiguales | `03-asymmetrical.md` |
| lectura rápida de contenido denso | `04-f-shape.md` |
| recorrido visual alternado | `05-z-shape.md` |
| colección de unidades discretas | `06-card-block.md` |
| medio protagonista | `07-featured-media.md` |
| piezas de altura variable | `08-masonry.md` |
| portada editorial compleja | `09-magazine.md` |
| navegación siempre disponible | `10-fixed-navigation.md` |
| navegación deliberadamente oculta | `11-hidden-navigation.md` |
| interacción como estructura | `12-interactive.md` |
| header + tres columnas + footer | `13-holy-grail.md` |
| narrativa completa en una página | `14-single-page.md` |
| operación y datos frecuentes | `15-dashboard-admin.md` |
| primera impresión dominante | `16-hero.md` |
| sistema de columnas reutilizable | `17-grid-system.md` |
| proporciones continuas | `18-fluid-liquid.md` |
| cortes o ejes diagonales | `19-diagonal.md` |

## Protocolo de aplicación

Antes de implementar:

1. Identificar tarea primaria, jerarquía de contenido y orden semántico.
2. Declarar layout principal, regiones, ancho máximo y estrategia responsive.
3. Diseñar desde el contenido real y sus extremos, no desde cajas vacías.
4. Mantener el DOM en orden lógico aunque CSS altere la presentación.
5. Definir comportamiento en móvil, tablet, escritorio y zoom 200 %.
6. Diseñar loading, vacío, error, overflow y contenido largo.
7. Evitar breakpoints basados en dispositivos específicos; introducirlos cuando la composición deje de funcionar.

## Combinación de layouts

- Elegir un layout de página principal.
- Usar otros patrones solo dentro de regiones delimitadas.
- No mezclar dos modelos de navegación global.
- Un Hero puede abrir casi cualquier layout, pero no debe ocultar el propósito.
- Grid System es infraestructura y puede sostener otros layouts.
- Fluid describe comportamiento dimensional y puede combinarse con cualquier estructura si conserva límites legibles.

## Contrato de salida

Al finalizar, informar:

1. Layout elegido y razón funcional.
2. Regiones, proporciones y orden DOM.
3. Breakpoints determinados por contenido.
4. Tratamiento de overflow, estados y contenido extremo.
5. Adaptaciones accesibles y archivos modificados.
