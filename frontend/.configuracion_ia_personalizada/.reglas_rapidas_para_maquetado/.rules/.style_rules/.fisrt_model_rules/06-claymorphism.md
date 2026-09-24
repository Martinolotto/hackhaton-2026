---
title: "Claymorphism / Soft 3D"
style_id: "claymorphism"
tags: [impeccable, frontend, claymorphism, soft-3d, tactile]
---

# Rule: Claymorphism (Soft 3D)

## Rol

Crea superficies suaves y volumétricas como objetos de arcilla o goma, con controles legibles y una profundidad moderada.

## Dirección visual

- Formas redondeadas, volumen amplio y materiales mate.
- Paleta clara o pastel con tinta suficientemente oscura.
- Sombras exteriores dobles y, con moderación, una luz interior.
- Mantén una fuente sans limpia para equilibrar el volumen.
- Usa un nivel dominante de elevación y otro para interacción.

## Componentes

- Reservar el volumen fuerte para botones primarios, avatares, ilustraciones y cards destacadas.
- Inputs deben conservar borde, etiqueta y estado de error explícitos.
- No aplicar el mismo relieve a fondo, card, botón e icono.
- Separar superficies por contraste además de sombra.

## Movimiento

- Press: leve reducción de escala y profundidad.
- Hover: cambio sutil de elevación; duración breve.
- No usar rebotes continuos.

## Debe

- Funcionar sin sombras en high-contrast mode.
- Mantener estados disabled y focus visibles.
- Reducir blur y complejidad en dispositivos modestos.

## No debe

- Usar sombras enormes y turbias.
- Hacer que todo parezca inflable.
- Depender del relieve para diferenciar controles.
- Reducir el contraste para lograr “suavidad”.

## Formato de salida

Especificar material, niveles de elevación, componentes autorizados a usar volumen y fallback sin sombras.
