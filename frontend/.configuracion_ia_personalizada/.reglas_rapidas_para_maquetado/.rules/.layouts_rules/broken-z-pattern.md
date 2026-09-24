### <regla_layout_z_roto>
**PATRÓN ZIG-ZAG INTERRUMPIDO (BROKEN Z-PATTERN)**

**CONTEXTO DE ACTIVACIÓN:** 
Aplica esta regla obligatoriamente cuando el usuario solicite un layout en zig-zag que contenga 3 o más filas de contenido, o cuando pida específicamente un "Z-Pattern Roto".

**DIRECTIVAS ESTRUCTURALES Y VISUALES:**

1. **La Regla del Cortafuegos (Pattern Break):**
   - Nunca generes más de dos filas consecutivas con una división simétrica 50/50 (Imagen/Texto). 
   - La tercera o cuarta fila debe romper la cuadrícula. Utiliza un contenedor de ancho completo (`col-12` si empleas Bootstrap 5, o `grid-column: 1 / -1` en CSS Grid puro) para insertar un elemento de pausa visual (ej. una cita, un banner translúcido o un bloque de código).

2. **Radiografía del Modelo de Cajas:**
   - Visualiza la estructura base sin estilos. La interrupción del patrón no debe ensuciar el HTML. Mantén el uso estricto de contenedores de bloque, filas (`row`) y columnas.
   - Si utilizas Flexbox o CSS Grid, asegura que la asimetría se logre manipulando las fracciones (ej. `1fr 2fr`) o las clases utilitarias de tamaño de columna, no mediante márgenes negativos incontrolables.

3. **Asimetría con Frost UI:**
   - Cuando apliques el cortafuegos o una fila asimétrica, aprovecha el espacio extra para expandir el efecto Soft Glass. Un contenedor de cristal más ancho permite mostrar mejor el desenfoque del fondo vibrante subyacente.
   - Aplica superposición (overlapping) controlada: haz que una tarjeta Frost UI se desborde ligeramente de su columna contenedora utilizando `transform: translate()` o posicionamiento relativo, rompiendo la rigidez visual de la caja pero manteniendo la estructura semántica intacta.

4. **Reseteo de Ritmo:**
   - Después del "cortafuegos", puedes reiniciar el patrón en zig-zag estándar si hay más contenido, o finalizar la sección con un layout de múltiples columnas menores (ej. 3 tarjetas en fila).
### </regla_layout_z_roto>