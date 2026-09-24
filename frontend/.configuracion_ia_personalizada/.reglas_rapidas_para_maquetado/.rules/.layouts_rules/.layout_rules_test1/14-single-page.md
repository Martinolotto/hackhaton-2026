---
title: "Single Page / One-Page Layout"
layout_id: "single-page"
tags: [impeccable, layout, one-page, landing]
---

# Rule: Single Page / One-Page Layout

## Rol

Construye una narrativa o flujo completo dentro de una única página, con navegación por secciones y progresión clara.

## Estructura

- Cada sección responde una pregunta y conduce a la siguiente.
- Orden típico adaptable: propuesta, prueba, funcionamiento, detalles, objeciones, acción.
- Mantener una CTA primaria consistente.
- Usar anclas con IDs estables y headings únicos.
- Evitar secciones de relleno para alargar la página.

## Navegación

- Puede usar índice sticky si hay suficientes secciones.
- Actualizar ubicación activa sin interferir con historial.
- Configurar `scroll-margin` o `scroll-padding`.
- Proveer volver arriba solo cuando aporte valor.

## Responsive y rendimiento

- Cargar medios no críticos de forma diferida.
- Reducir efectos de scroll en móvil y reduced motion.
- Mantener cada sección comprensible sin animación.
- Evitar que una sola página implique un bundle monolítico.

## No debe

- Forzar todo un producto multipágina dentro de un documento.
- Usar scroll-jacking.
- Repetir CTA con textos contradictorios.
- Ocultar contenido crítico en acordeones por defecto.

## Formato de salida

Enumerar secciones, objetivo de cada una, transición narrativa, navegación y estrategia de carga.
