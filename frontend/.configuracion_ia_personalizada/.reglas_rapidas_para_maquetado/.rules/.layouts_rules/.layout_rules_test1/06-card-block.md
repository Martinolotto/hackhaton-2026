---
title: "Card or Block Layout"
layout_id: "card-block"
tags: [impeccable, layout, cards, blocks, collection]
---

# Rule: Card or Block Layout

## Rol

Presenta una colección de unidades discretas que pueden explorarse, compararse o accionarse de manera independiente.

## Estructura

- Usar cards solo cuando cada unidad posea límites conceptuales reales.
- Definir variantes por función, no por decoración.
- Mantener estructura interna consistente: medio, título, metadatos, acción.
- Usar grid para colecciones regulares y lista para contenido denso.
- Evitar cards dentro de cards.

## Responsive

- Elegir columnas con `repeat(auto-fit|auto-fill, minmax())` cuando proceda.
- Establecer un ancho mínimo basado en contenido.
- Preservar orden de relevancia.
- Permitir listas en móvil cuando reduzcan scroll y mejoren comparación.

## Interacción

- Card completa clicable solo con un destino único.
- Acciones múltiples requieren controles independientes.
- Hover complementa, nunca define, la interacción.

## Debe

- Resolver títulos largos, ausencia de imagen y diferentes alturas.
- Distinguir selección, foco, disabled y loading.
- Mantener áreas clicables sin enlaces anidados.

## No debe

- Encapsular cada párrafo en una card.
- Igualar alturas cortando información.
- Repetir CTA redundantes.
- Usar sombras para sustituir agrupación y espacio.

## Formato de salida

Indicar unidad conceptual, variantes, ancho mínimo, conducta responsive y modelo de clic.
