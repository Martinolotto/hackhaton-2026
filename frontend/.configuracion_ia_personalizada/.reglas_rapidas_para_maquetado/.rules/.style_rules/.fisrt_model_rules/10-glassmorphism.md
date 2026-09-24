---
title: "Glassmorphism"
style_id: "glassmorphism"
tags: [impeccable, frontend, glassmorphism, translucent, depth]
---

# Rule: Glassmorphism

## Rol

Diseña profundidad mediante paneles translúcidos, blur y bordes luminosos, conservando jerarquía, contraste y rendimiento.

## Dirección visual

- Usar un fondo rico pero controlado: gradiente, imagen o formas.
- El vidrio necesita translucidez, blur, borde y separación tonal; no solo opacity.
- Limitar a 1–2 niveles de vidrio.
- Tipografía de alto contraste y sombras de texto solo si son imprescindibles.
- Botón primario preferentemente sólido.

## Composición

- Reservar vidrio para superficies elevadas: nav, card protagonista, modal o control flotante.
- No superponer paneles de igual material.
- El contenido crítico debe conservar lectura si el fondo cambia.
- Mantener el eje y la grilla claros bajo los efectos.

## Debe

- Implementar fallback cuando `backdrop-filter` no esté disponible.
- Probar contraste con fondos claros y oscuros.
- Reducir blur, área afectada y animaciones en móvil.
- Respetar reduced transparency cuando exista una estrategia equivalente.

## No debe

- Usar diez cards transparentes idénticas.
- Añadir orbes morados/azules genéricos por defecto.
- Depender solo de transparencia para separar niveles.
- Aplicar blur a grandes áreas durante scroll si afecta rendimiento.

## Formato de salida

Definir fondo, niveles de vidrio, opacidad/blur, superficies sólidas y fallback accesible.
