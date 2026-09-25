# A tiempo — Sistema de diseño maestro

**Estado:** aprobado para implementación  
**Versión:** 1.0  
**Actualizado:** 2026-09-24  
**Producto:** asistente de evaluación, comunidad de reportes y biblioteca de prevención

## 1. Autoridad y uso

Este documento es la fuente de verdad visual y de interacción de **A tiempo**.

Orden de precedencia:

1. La regla específica de `pages/<pagina>.md`.
2. Este documento maestro.
3. Los componentes y estilos existentes en el repositorio.
4. Documentos de inspiración o referencias visuales anteriores.

La referencia `DESIGN_mas_adaptada_a_nuestro_caso.md` puede inspirar composición y ritmo, pero no define la paleta, las superficies oscuras, la tipografía ni los componentes del producto. Ante cualquier conflicto se aplica este sistema.

Antes de diseñar o implementar una página:

1. Leer este documento completo.
2. Comprobar si existe una regla en `pages/`.
3. Usar exclusivamente tokens semánticos; no introducir valores aislados en componentes.

## 2. Principios de producto

### Personalidad

A tiempo debe sentirse:

- sereno y confiable;
- riguroso sin resultar burocrático;
- tecnológico sin recurrir a estética cyberpunk, terminales o neón;
- protector sin alarmismo ni paternalismo;
- expresivo mediante composición e ilustración, no mediante ruido visual.

### Jerarquía funcional

1. **Analizar** es la acción principal y debe permanecer fácilmente localizable.
2. **Comunidad** aporta evidencia colectiva, no veredictos.
3. **Prevención** profundiza el aprendizaje mediante contenido editorial.

### Promesa responsable

La interfaz ayuda a interpretar evidencia y decidir el siguiente paso. No promete certeza total, monitoreo universal ni que un sitio o interacción es definitivamente seguro.

## 3. Color

El sistema es **claro como único tema base**. No se diseñarán grandes bandas oscuras. El azul noche se reserva para texto, bordes de énfasis, símbolos, pequeños controles y nodos ilustrativos.

### Tokens base

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-canvas` | `#F8FAFC` | Fondo general ligeramente frío |
| `--color-surface` | `#FFFFFF` | Tarjetas, formularios y elementos elevados |
| `--color-surface-subtle` | `#F1F5F9` | Bloques secundarios y estados neutros |
| `--color-surface-accent` | `#F0FDFA` | Selecciones o bloques informativos turquesa |
| `--color-ink` | `#0F172A` | Texto principal y detalles oscuros |
| `--color-ink-muted` | `#475569` | Texto secundario y metadatos |
| `--color-border` | `#CBD5E1` | Separadores y bordes decorativos |
| `--color-border-strong` | `#64748B` | Límites de controles cuando el borde comunica estado |
| `--color-primary` | `#2563EB` | Acción principal, enlace y selección activa |
| `--color-primary-hover` | `#1D4ED8` | Hover de la acción principal |
| `--color-accent` | `#0F766E` | Evidencia favorable, progreso y acento tecnológico |
| `--color-accent-hover` | `#115E59` | Hover del acento |
| `--color-caution` | `#B45309` | Cautela media y advertencias |
| `--color-critical` | `#B91C1C` | Cautela alta, errores y acciones destructivas |
| `--color-focus` | `#2563EB` | Indicador global de foco |

### Combinaciones verificadas

- `#0F172A` sobre `#F8FAFC`: contraste aproximado `17.06:1`.
- `#475569` sobre `#F8FAFC`: contraste aproximado `7.24:1`.
- blanco sobre `#2563EB`: contraste aproximado `5.17:1`.
- blanco sobre `#0F766E`: contraste aproximado `5.47:1`.
- blanco sobre `#B45309`: contraste aproximado `5.02:1`.
- blanco sobre `#B91C1C`: contraste aproximado `6.47:1`.

### Reglas semánticas

- El azul indica navegación, selección o acción; no significa seguridad.
- El turquesa indica evidencia favorable o avance; nunca debe rotularse como “sitio seguro”.
- El ámbar comunica cautela media o información que requiere revisión.
- El rojo se reserva para cautela alta, errores o consecuencias graves.
- Todo estado combina color, icono, texto y, cuando corresponda, explicación.
- No se utiliza rojo y verde como única oposición entre fraude y seguridad.
- Los fondos de estado serán tintes claros; los colores intensos se usarán para texto, iconos, bordes y acciones.

## 4. Tipografía y contenido

### Familia

Usar **Geist Variable**, ya incluida en el proyecto, con estos fallbacks:

```css
font-family: "Geist Variable", Geist, ui-sans-serif, system-ui, sans-serif;
```

No mezclar familias tipográficas salvo una decisión futura documentada en este archivo.

### Escala

| Rol | Tamaño | Interlineado | Peso |
| --- | --- | --- | --- |
| Display | `clamp(2.5rem, 5vw, 3.5rem)` | `1.05` | `550` |
| Título de página | `clamp(2rem, 4vw, 2.5rem)` | `1.1` | `600` |
| Título de sección | `2rem` | `1.2` | `600` |
| Título de tarjeta | `1.25rem` | `1.3` | `600` |
| Cuerpo destacado | `1.125rem` | `1.55` | `400` |
| Cuerpo | `1rem` | `1.5` | `400` |
| Etiqueta | `0.875rem` | `1.4` | `600` |
| Metadato | `0.75rem` | `1.5` | `500` |

Reglas:

- El cuerpo nunca será menor de 16 px.
- Los 12–14 px se reservan para etiquetas o metadatos prescindibles, con contraste suficiente.
- El ancho de prosa general no superará `68ch`; los artículos no superarán `70ch`.
- No forzar saltos de línea en títulos. Usar `text-wrap: balance` con un ancho máximo y probar todos los breakpoints.
- Evitar mayúsculas sostenidas en frases; se admiten en etiquetas breves con espaciado moderado.

### Voz

- Usar español neutro, claro y directo: “Detente”, “Revisa”, “Compara”.
- Explicar términos técnicos la primera vez que aparezcan.
- Evitar culpabilizar: no usar “deberías haberlo notado” o equivalentes.
- Evitar absolutismos: “no encontramos señales” no equivale a “es seguro”.
- Los errores explican qué ocurrió y cómo recuperarse.
- Las llamadas a la acción describen el resultado: “Analizar interacción”, “Ver evidencia”, “Guardar reporte”.

## 5. Espaciado, forma y elevación

### Espaciado

Base de 4 px:

```text
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96
```

- Separación mínima entre objetivos táctiles: 8 px.
- Padding estándar de controles: 12 px vertical y 16 px horizontal.
- Padding de tarjetas: 16 px en móvil; 24 px desde tablet.
- Secciones de aplicación: 48–64 px.
- Secciones editoriales o de marketing: 64–96 px.

### Radios

| Elemento | Radio |
| --- | --- |
| Campos y botones | `8px` |
| Tarjetas | `12px` |
| Panel protagonista | `16px` |
| Etiquetas y filtros | `999px` solo cuando funcionan como píldora |

### Bordes y sombras

- Preferir bordes a elevación.
- Sombra base: `0 1px 2px rgb(15 23 42 / 0.06)`.
- Sombra flotante: `0 12px 32px rgb(15 23 42 / 0.10)` para menús, popovers y diálogos.
- No usar sombras coloreadas, resplandores de neón ni glassmorphism en formularios.
- Hover y pressed no deben cambiar las dimensiones del componente.

## 6. Layout y navegación

### Contenedores

| Contexto | Ancho máximo |
| --- | --- |
| Aplicación general | `1200px` |
| Asistente y formularios | `720px` |
| Artículos | `70ch` |
| Diálogos | `560px` salvo contenido excepcional |

Gutters:

- móvil: 16 px;
- tablet: 24 px;
- escritorio: 32 px.

Breakpoints de referencia: `640`, `768`, `1024` y `1280` px. El diseño comienza en 375 px y escala hacia arriba; ningún componente puede depender de un ancho fijo para funcionar.

### Navegación superior adaptable

- Cabecera de 64 px, sticky cuando aporte contexto.
- Marca a la izquierda; navegación y cuenta a la derecha.
- “Analizar” utiliza el mayor énfasis visual.
- La ubicación activa se comunica mediante texto, peso e indicador, no solo color.
- En móvil, los destinos secundarios se trasladan a un menú desplegable accesible; Analizar permanece visible si el ancho lo permite.
- El botón de menú puede usar azul noche como microacento, con objetivo táctil mínimo de 44×44 px, nombre accesible y estado `aria-expanded`.
- Aplicar `scroll-padding-top` para que la cabecera no oculte anclas ni foco.
- Tras cambiar de ruta, mover el foco al contenido principal sin romper el botón Atrás ni el scroll restaurado.

## 7. Componentes y estados

### Botones

- Primario: azul, texto blanco, un único primario por región.
- Secundario: superficie blanca, borde fuerte y texto azul noche.
- Terciario: texto o icono, sin competir con la acción principal.
- Destructivo: rojo únicamente cuando la acción es realmente destructiva.
- Altura mínima: 44 px; en controles móviles de uso principal, 48 px.
- Estados obligatorios: default, hover, pressed, focus-visible, disabled y loading.
- Durante una acción asíncrona, desactivar envíos duplicados sin perder la etiqueta contextual.

### Campos

- Etiqueta visible asociada programáticamente; el placeholder solo aporta ejemplo.
- Ayuda y requisitos antes del error cuando sea posible.
- Validar al salir del campo para la mayoría de entradas; no interrumpir cada pulsación.
- Error específico debajo del campo y conectado mediante `aria-describedby`.
- Con varios errores, incluir un resumen enfocable al inicio con enlaces a cada campo y conservar los mensajes inline.
- Permitir pegar en campos de contraseña, URL y contenido.
- URLs y contenido comunitario usan `overflow-wrap: anywhere`; nunca provocar scroll horizontal.

### Tarjetas y etiquetas

- Una tarjeta debe representar una unidad accionable o informativa, no envolver contenido arbitrariamente.
- No anidar más de dos niveles de tarjetas.
- Las etiquetas sirven para estado, categoría o filtro; no sustituyen títulos.
- Las etiquetas de estado incluyen texto e icono cuando la distinción sea crítica.

### Iconos

- Usar Lucide con trazos consistentes.
- Tamaños normalizados: 16, 20 y 24 px; 32 px solo para vacíos o encabezados.
- Iconos decorativos junto a texto visible: `aria-hidden="true"`.
- Botones de solo icono: nombre accesible y estado anunciado cuando aplique.
- No usar emoji como iconografía estructural.

## 8. Ilustración

### Capas de evidencia

Firma visual de Análisis y Prevención:

- tarjetas, documentos y fragmentos superpuestos;
- líneas que conectan origen, contexto, solicitud y acción;
- composición que pasa de información dispersa a lectura ordenada;
- seguridad expresada mediante claridad y estructura, no mediante escudos gigantes.

### Red de señales

Firma exclusiva de Comunidad:

- nodos pequeños que representan reportes, fuentes o patrones;
- líneas tenues y agrupaciones comprensibles;
- movimiento muy lento u ocasional, nunca detrás de texto largo;
- ningún nodo debe parecer un dato en tiempo real si no proviene de información actual.

Los SVG decorativos deben ignorarse para tecnologías asistivas. Una visualización informativa necesita alternativa textual equivalente.

## 9. Movimiento

| Token | Duración | Uso |
| --- | --- | --- |
| `--motion-instant` | `120ms` | Press, checkbox y feedback directo |
| `--motion-fast` | `180ms` | Hover, foco y menús breves |
| `--motion-base` | `240ms` | Popovers y cambios de componente |
| `--motion-step` | `360ms` | Avance del asistente y entrada de paneles |
| `--motion-page` | `440ms` | Aparición principal de página, solo cuando aporte continuidad |

Easing de entrada: `cubic-bezier(0.16, 1, 0.3, 1)`. Las salidas usan aproximadamente 60–70 % de la duración de entrada.

Reglas:

- Animar `transform` y `opacity`; evitar `width`, `height`, `top` y `left`.
- Cada animación explica causa, jerarquía o continuidad espacial.
- No animar más de uno o dos elementos protagonistas por vista.
- No usar parallax, glitch, scanlines ni rotaciones decorativas constantes en flujos de trabajo.
- Con `prefers-reduced-motion: reduce`, eliminar desplazamiento, escala, parallax y loops; presentar el estado final con un fade opcional máximo de 150 ms.
- Los indicadores de actividad indeterminada deben detenerse cuando finaliza la operación y anunciar el nuevo estado.

## 10. Accesibilidad AA+

Obligatorio:

- WCAG 2.2 AA como base.
- Contraste de texto normal mínimo 4.5:1; texto grande y UI significativa, 3:1.
- Foco visible con perímetro mínimo de 2 px, offset de 2 px y contraste de estado 3:1.
- Toda la interacción disponible con teclado.
- Orden de foco igual al orden visual y lógico.
- Objetivos táctiles mínimos de 44×44 px y separación mínima de 8 px.
- Zoom al 200 % sin pérdida de contenido o funcionalidad.
- Movimiento reducido sin información ausente.
- Estados asíncronos anunciados con una única región contextual `aria-live` cuando sea necesaria.
- La cabecera, toasts y overlays nunca ocultan completamente el control enfocado.
- Modales con foco contenido, cierre accesible y retorno del foco al disparador.
- Imágenes informativas con texto alternativo; imágenes decorativas con alternativa vacía o fuera del árbol accesible.

## 11. Rendimiento y calidad

- Reservar dimensiones de imágenes y capturas para mantener CLS menor de 0.1.
- Preferir AVIF o WebP y lazy loading debajo del fold.
- Dividir rutas o recursos pesados de Comunidad y Prevención.
- Virtualizar listas comunitarias a partir de 50 elementos visibles.
- Para esperas mayores de un segundo usar skeleton o etapas reales; evitar spinners prolongados sin explicación.
- No etiquetar datos como “en vivo” sin fuente actual, hora de actualización y estado de obsolescencia.

## 12. Contratos de estado

Estos nombres forman parte del contrato de interfaz y deben mantenerse consistentes:

```text
InputType: url | text | image
CautionLevel: low | medium | high
ReportFreshness: current | under_review | outdated
AuthorVisibility: public | anonymous
AsyncState: idle | validating | processing | success | error | cancelled
```

Etiquetas visibles en español neutro:

```text
low          → Cautela baja
medium       → Cautela media
high         → Cautela alta
current      → Vigente
under_review → En revisión
outdated     → Desactualizado
```

Estos contratos describen estados de UI, no una API de backend. Cualquier cambio de nombre requiere actualizar el maestro y todas las páginas que lo consuman.

## 13. Criterios de aceptación globales

- No hay hexadecimales ad hoc dentro de componentes.
- La interfaz funciona a 375, 768, 1024 y 1440 px y en orientación horizontal.
- No existe scroll horizontal por URLs, etiquetas o contenido comunitario.
- Todos los controles tienen estados de teclado, puntero, touch, carga y deshabilitado.
- La experiencia conserva significado sin color, iconos decorativos ni animación.
- Todo el copy está en español neutro y evita falsa certeza.
- Las pruebas cubren teclado, lector de pantalla, movimiento reducido, zoom al 200 % y errores de red.

