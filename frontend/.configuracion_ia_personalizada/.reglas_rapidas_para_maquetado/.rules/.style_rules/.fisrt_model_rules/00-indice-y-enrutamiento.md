---
title: "Rules de estilos web para Impeccable"
version: "1.0.0"
language: "es"
type: "style-rule-router"
tags: [impeccable, frontend, web-design, design-system, rules]
---

# Rules de estilos web para Impeccable

## Propósito

Estas reglas complementan Impeccable. No sustituyen sus controles de accesibilidad, responsive, semántica, rendimiento ni consistencia con el producto.

## Orden de prioridad

1. Requisitos explícitos del usuario y contenido real.
2. Sistema visual existente del proyecto y `DESIGN.md`.
3. Accesibilidad, usabilidad, responsive y rendimiento.
4. Rule de estilo seleccionada.
5. Preferencias estéticas genéricas de Impeccable.

Si una regla estética perjudica la comprensión, el contraste, el foco, la interacción o el rendimiento, reducir su intensidad sin abandonar su lenguaje visual.

## Enrutamiento

Carga una rule principal por pantalla. Puede combinarse con una segunda únicamente si el usuario pide una mezcla y se declara qué aporta cada una.

| Petición o intención | Rule |
|---|---|
| 90s, arcade, VHS, consola clásica | `01-90s-retro.md` |
| formas orgánicas, geometría expresiva | `02-abstract-shapes.md` |
| mosaico modular, bloques editoriales | `03-bento-grid.md` |
| composición asimétrica, solapamientos | `04-broken-grid.md` |
| crudo, directo, anti-pulido | `05-brutalism.md` |
| objetos blandos 3D, plastilina | `06-claymorphism.md` |
| reducción radical, una acción central | `07-extreme-minimalism.md` |
| sistema plano, producto funcional | `08-flat-material-design.md` |
| vidrio suave y sobrio | `09-frost-ui.md` |
| capas translúcidas y profundidad | `10-glassmorphism.md` |
| narrativa mediante ilustración | `11-illustration-focused.md` |
| abundancia controlada, collage | `12-maximalism.md` |
| sobrio, limpio, esencial | `13-minimalist-ui.md` |
| brutalismo amigable, bordes y sombras | `14-neo-brutalism.md` |
| controles extruidos blandos | `15-neumorphism.md` |
| relato por desplazamiento | `16-parallax-experience.md` |
| metáforas de objetos reales | `17-skeuomorphism.md` |
| web temprana, chrome, techno-pop | `18-y2k-cyber-retro.md` |

## Protocolo de aplicación

Antes de implementar:

- Inferir producto, audiencia, tarea principal y densidad de información.
- Declarar en 3–5 líneas la dirección visual: estilo, intensidad, rasgo dominante, rasgo secundario y límites.
- Elegir tokens antes de diseñar componentes.
- Definir una sola idea memorable por viewport.
- Mantener estados completos: default, hover, focus-visible, active, disabled, loading, empty y error cuando correspondan.
- No inventar datos, marcas, testimonios ni funcionalidades.
- Preservar componentes y tokens existentes salvo que el usuario pida rediseño.

## Combinaciones

- Una rule manda; la secundaria aporta como máximo dos atributos.
- No combinar estilos por mera novedad.
- Mezclas compatibles: Bento + Minimalism; Broken Grid + Illustration; Y2K + 90s; Neo-Brutalism + Maximalism moderado; Frost UI + Minimalism.
- Mezclas de alto riesgo: Brutalism + Glassmorphism; Neumorphism + Extreme Minimalism; Skeuomorphism + Flat Design. Usarlas solo con una jerarquía explícita.

## Contrato de salida

Al finalizar, informar brevemente:

1. Dirección aplicada.
2. Tokens o decisiones estructurales principales.
3. Adaptaciones responsive y accesibles.
4. Qué se evitó para no caricaturizar el estilo.
5. Archivos modificados y validaciones ejecutadas.
