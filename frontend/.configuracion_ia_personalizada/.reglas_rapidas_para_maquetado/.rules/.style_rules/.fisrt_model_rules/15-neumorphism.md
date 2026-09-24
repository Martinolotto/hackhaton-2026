---
title: "Neumorphism / Soft UI"
style_id: "neumorphism"
tags: [impeccable, frontend, neumorphism, soft-ui, embossed]
---

# Rule: Neumorphism (Soft UI)

## Rol

Usa luz y sombra para sugerir controles extruidos o hundidos sobre una superficie continua, sin sacrificar contraste ni affordance.

## Dirección visual

- Una superficie base estable y una dirección de luz global.
- Dos sombras complementarias: clara y oscura, de intensidad moderada.
- Radios suaves y tipografía de alto contraste.
- Acento cromático para estados y acciones, no solo relieve.
- Limitar el efecto a controles o módulos destacados.

## Componentes

- Raised para acciones; inset para campos o estados seleccionados solo cuando sea inequívoco.
- Añadir borde sutil cuando la sombra no asegure separación.
- Focus visible mediante outline de color independiente del relieve.
- Error, success y disabled necesitan señal cromática/textual.

## Debe

- Cumplir contraste en texto, iconos y límites de control.
- Funcionar en modo alto contraste o con sombras desactivadas.
- Mantener targets táctiles y labels.
- Definir una alternativa para dark mode, no invertir sombras mecánicamente.

## No debe

- Aplicarlo a interfaces con alta densidad o muchas jerarquías.
- Diferenciar estado exclusivamente por inset/raised.
- Usar superficies casi idénticas que oculten botones.
- Mezclar múltiples direcciones de luz.

## Formato de salida

Declarar superficie base, luz, sombras, componentes autorizados, señal de foco y fallback accesible.
