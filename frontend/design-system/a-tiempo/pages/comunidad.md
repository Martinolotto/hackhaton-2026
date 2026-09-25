# A tiempo — Reglas de página: Comunidad

**Hereda de:** `../MASTER.md`  
**Prioridad:** esta página prevalece únicamente cuando define una excepción explícita

## Objetivo

Permitir consultar y aportar experiencias sobre dominios, cuentas y patrones de engaño sin convertir popularidad, reputación o cantidad de reportes en prueba automática.

## Arquitectura

La página combina dos modos complementarios:

1. **Búsqueda directa:** dominio, cuenta, entidad o patrón.
2. **Exploración:** categorías y tendencias recientes.

Orden recomendado:

1. Buscador protagonista.
2. Categorías por canal o tipo de interacción.
3. Resultados o tendencias con fecha y estado.
4. Explicación visible de cómo interpretar los reportes.
5. Acción secundaria para publicar un reporte.

Un feed cronológico puede existir dentro de una categoría, pero no domina la portada.

## Búsqueda y filtros

- El buscador debe aceptar dominios, nombres de cuenta y palabras clave.
- Mostrar ejemplos en texto de ayuda, no como única etiqueta del campo.
- Los filtros principales serán: canal, tipo de interacción, estado de vigencia y fecha.
- Los filtros activos deben ser visibles y removibles individualmente.
- Conservar consulta, filtros y posición de scroll al abrir un reporte y volver.
- En móvil, los filtros pueden abrirse en sheet; el foco debe quedar contenido y volver al disparador al cerrar.

## Tarjeta de reporte

Cada tarjeta muestra, en este orden:

1. Entidad, dominio o identificador reportado.
2. Resumen descriptivo, sin titular sensacionalista.
3. Canal y categoría.
4. Estado: Vigente, En revisión o Desactualizado.
5. Fecha del reporte y última corroboración disponible.
6. Cantidad de experiencias relacionadas, rotulada como volumen y no como veracidad.
7. Fuentes o evidencias disponibles.

No mostrar únicamente avatar, votos y comentario como en una red social tradicional.

## Vigencia

Contrato visual:

- **Vigente:** hay actividad o corroboración reciente según la política real del producto.
- **En revisión:** falta validación, existen contradicciones o se está moderando.
- **Desactualizado:** superó el umbral de vigencia o la información cambió.

Reglas:

- La fecha siempre acompaña al estado.
- Los reportes desactualizados siguen siendo consultables, pero pierden prominencia en resultados y tendencias.
- No definir en UI un plazo de caducidad hasta que exista una política real documentada.
- Una actualización asíncrona del estado se anuncia como frase completa, no como un badge numérico aislado.

## Publicación e identidad

- Una persona autenticada puede elegir en cada reporte entre identidad pública y publicación anónima.
- La opción no se hereda silenciosamente de un reporte anterior.
- Antes de publicar se muestra una vista previa con identidad, evidencia y datos visibles.
- La publicación anónima oculta la identidad pública, pero la interfaz no debe prometer anonimato técnico absoluto si la cuenta permanece vinculada internamente.
- Solicitar únicamente la información necesaria y advertir sobre datos personales en texto o capturas.

## Confianza y moderación

- Los reportes son piezas de evidencia comunitaria.
- Los votos o reacciones, si existen, ordenan utilidad; no determinan verdad.
- Diferenciar claramente: aporte original, corroboración independiente, comentario y acción de moderación.
- Mostrar fuentes, fecha, contradicciones y estado de revisión antes que reputación del autor.
- Las tendencias se basan en criterios reales y explicables. No etiquetar “tendencia” por simple decoración.
- Las acciones de reportar abuso, corregir o aportar evidencia deben ser visibles en el detalle.

## Firma visual

Comunidad es la única sección que usa **red de señales**:

- nodos pequeños para reportes, fuentes y patrones;
- agrupaciones para categorías, no para inferir relaciones no verificadas;
- líneas tenues que nunca compiten con la lectura;
- animación opcional lenta y detenida con movimiento reducido.

La red es decorativa salvo que exista una visualización de datos real. En ese caso necesita leyenda, alternativa textual y navegación por teclado.

## Vacíos y errores

### Sin resultados

- Repetir la consulta realizada.
- Explicar que ausencia de reportes no prueba legitimidad.
- Proponer ampliar términos, cambiar filtros o iniciar un análisis.

### Sin tendencias

- No inventar actividad ni usar placeholders que parezcan datos reales.
- Ofrecer categorías estables o contenido preventivo relacionado.

### Error de carga

- Mantener consulta y filtros.
- Explicar si puede reintentarse y no reemplazar toda la página por un toast.

## Rendimiento

- Paginar o virtualizar a partir de 50 resultados visibles.
- Reservar espacio para tarjetas y miniaturas.
- Detener animaciones y actualización de visualizaciones fuera del viewport.
- No refrescar automáticamente la lista mientras la persona lee sin preservar su posición.

## Criterios de aceptación

- La búsqueda es utilizable en 375 px sin scroll horizontal.
- Fechas e identificadores se formatean según locale y las URLs largas se envuelven.
- Estado, vigencia y cantidad de reportes se comprenden sin color.
- Volver desde un detalle conserva búsqueda, filtros y scroll.
- Publicar anónimamente requiere una confirmación explícita y reversible antes del envío.
- La interfaz nunca equipara volumen comunitario con certeza.

