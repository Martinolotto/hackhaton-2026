---
title: "Frost UI / Soft Glass"
style_id: "frost-ui"
tags: [impeccable, frontend, frost-ui, soft-glass, subtle]
---

# Rule: Frost UI (Soft Glass)

## Rol

Crea una apariencia translúcida suave y contenida, con capas lechosas más legibles y menos espectaculares que el glassmorphism clásico.

## Dirección visual

- Superficies casi opacas con blur moderado y saturación controlada.
- Paleta fría o neutral; acento reducido.
- Bordes claros muy sutiles y sombras suaves de corto alcance.
- Radios medios, tipografía limpia y densidad calmada.
- Fondo con variación suficiente para revelar el material, sin competir.

## Componentes

- Aplicar frost a barras, paneles flotantes o overlays; no a toda superficie.
- Texto largo sobre una capa estabilizada y suficientemente opaca.
- Botones primarios sólidos para conservar jerarquía.
- Modales y menús deben distinguirse claramente del fondo.

## Debe

- Proveer fallback opaco para `backdrop-filter`.
- Verificar contraste sobre las zonas extremas del fondo.
- Limitar blur para rendimiento y legibilidad.
- Mantener bordes/foco visibles.

## No debe

- Apilar varias capas translúcidas sin necesidad.
- Poner texto tenue sobre fondos fotográficos.
- Usar reflejos fuertes o brillos decorativos abundantes.
- Confundir Frost UI con Glassmorphism: aquí domina la calma y la opacidad.

## Formato de salida

Indicar superficies frost autorizadas, opacidad, blur, fallback y estrategia de contraste.
