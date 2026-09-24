---
title: "Parallax Experience"
style_id: "parallax-experience"
tags: [impeccable, frontend, parallax, scroll-storytelling, motion]
---

# Rule: Parallax Experience

## Rol

Diseña una narrativa por scroll donde la diferencia de velocidad o profundidad refuerza una historia sin bloquear navegación, lectura ni rendimiento.

## Dirección visual

- Define primero capítulos y contenido; el efecto sigue a la narrativa.
- Usa 2–3 planos de profundidad como máximo.
- Mantén texto y acciones principales en un plano estable.
- Prioriza transform y opacity; evita propiedades que disparen layout.
- El scroll nativo debe seguir funcionando.

## Composición y técnica

- Determinar puntos de entrada, clímax y salida.
- Usar sticky solo cuando el usuario comprenda cómo avanzar.
- Reservar altura explícita para evitar saltos.
- Cargar assets responsivamente y fuera del hilo crítico.
- En móvil, reducir profundidad, duración y cantidad de capas.

## Accesibilidad

- Con `prefers-reduced-motion`, presentar una composición estática completa.
- No secuestrar scroll, ocultar scrollbar ni exigir gestos de precisión.
- Mantener contenido accesible en orden DOM.
- No hacer depender información de una animación.

## No debe

- Aplicar parallax a cada sección.
- Usar scroll-jacking o aceleración artificial.
- Animar blur grande durante scroll.
- Crear una experiencia que falle con teclado, zoom o poca potencia.

## Formato de salida

Describir capítulos, planos, propiedades animadas, versión móvil, fallback reduced-motion y presupuesto de rendimiento.
