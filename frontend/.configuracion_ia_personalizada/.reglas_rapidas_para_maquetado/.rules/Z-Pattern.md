### <regla_layout_z_shape>
**PATRÓN ZIG-ZAG (Z-PATTERN LAYOUT)**

Cuando el usuario solicite un layout en "Z" (Zig-Zag) o filas de contenido alternado, debes aplicar los siguientes principios de arquitectura estructural y diseño visual:

1. **Radiografía Estructural (Box Model):** 
   - Antes de aplicar el Frost UI, asegura que la base del modelo de cajas sea matemáticamente perfecta. 
   - Utiliza **CSS Grid** o **Flexbox** para crear contenedores de fila (`row`).
   - El HTML debe permanecer semántico y limpio, sin divs anidados innecesarios para forzar la posición.

2. **Lógica de Alternancia:**
   - Para crear el efecto Zig-Zag, debes alternar la dirección visual del contenido (ej. Imagen-Texto, luego Texto-Imagen).
   - **Técnica preferida:** Utiliza la pseudo-clase `:nth-child(even)` en CSS junto con `flex-direction: row-reverse;` (si usas Flexbox) o áreas de cuadrícula inversas (si usas CSS Grid). Esto permite que el HTML mantenga un orden lógico constante (siempre Imagen primero, luego Texto) para la accesibilidad, mientras CSS maneja la inversión visual.

3. **Integración con Frost UI:**
   - Los bloques de texto deben estar contenidos dentro de tarjetas "Soft Glass" (con su respectivo `background` translúcido, `backdrop-filter: blur()`, y borde sutil).
   - Las imágenes o elementos gráficos que acompañan al texto deben flotar sobre el fondo vibrante base, interactuando con las sombras difuminadas de las tarjetas de cristal para generar profundidad espacial.

4. **Comportamiento Responsivo (Mobile-First):**
   - En pantallas pequeñas (breakpoints móviles), el layout en "Z" debe colapsar en una sola columna vertical estándar (apilando Imagen sobre Texto o viceversa, según tu criterio de UX), desactivando el `row-reverse`.
### </regla_layout_z_shape>