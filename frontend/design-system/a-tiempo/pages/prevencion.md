# A tiempo — Reglas de página: Prevención

**Hereda de:** `../MASTER.md`  
**Prioridad:** esta página prevalece únicamente cuando define una excepción explícita

## Objetivo

Ofrecer una biblioteca editorial que ayude a reconocer patrones y adoptar hábitos de verificación sin desplazar al análisis como función principal del producto.

## Arquitectura

Orden recomendado:

1. Encabezado editorial con propuesta breve y buscador.
2. Guía destacada basada en relevancia real, no en rotación automática.
3. Categorías por canal, tipo de engaño o acción sensible.
4. Artículos recientes o actualizados.
5. Acceso persistente y discreto a “Analizar una interacción”.

Categorías iniciales de navegación:

- mensajes y correo;
- sitios y enlaces;
- ofertas y marketplaces;
- cuentas e identidades;
- solicitudes de dinero o datos;
- presión, urgencia y autoridad.

Las categorías son de contenido y pueden evolucionar; no deben presentarse como una taxonomía exhaustiva de amenazas.

## Tarjeta editorial

Cada tarjeta muestra:

1. Categoría.
2. Título descriptivo.
3. Resumen de dos o tres líneas.
4. Tiempo estimado de lectura.
5. Fecha de actualización.
6. Indicación de fuentes cuando corresponda.

No usar titulares de miedo, contadores de ataques ni imágenes genéricas de hackers.

## Página de artículo

Estructura:

1. Título y bajada.
2. Fecha de revisión y autoría o responsabilidad editorial.
3. Resumen de acciones principales.
4. Desarrollo en secciones con subtítulos informativos.
5. Lista de comprobación reutilizable.
6. Fuentes y límites.
7. Contenidos relacionados y acceso a Análisis.

Reglas de lectura:

- Ancho máximo `70ch`.
- Cuerpo de 18 px en artículos extensos cuando el espacio lo permita.
- Interlineado mínimo 1.6 para prosa larga.
- Párrafos breves, listas solo cuando mejoran el escaneo y subtítulos cada bloque temático.
- Enlaces descriptivos; nunca “haz clic aquí”.
- Tablas deben tener alternativa móvil y encabezados semánticos.

## Ilustración

Usar **capas de evidencia** con un tratamiento más editorial:

- fragmentos de conversaciones, dominios o perfiles representados de forma ficticia;
- llamadas visuales que explican qué observar;
- fondos claros y tintes suaves;
- azul noche únicamente en trazos, bordes y nodos pequeños.

Las ilustraciones nunca deben reproducir marcas o datos reales sin autorización y contexto.

## Actualidad y fuentes

- Mostrar fecha de última revisión en cada artículo.
- Diferenciar guía estable, alerta temporal y análisis de caso.
- Una alerta temporal necesita fuente, fecha y estado de vigencia.
- Contenido vencido puede conservarse como archivo, pero debe perder prominencia y rotularse.
- No presentar estadísticas sin fuente y periodo temporal.

## Navegación y continuidad

- Conservar categoría y scroll al volver de un artículo.
- El índice de un artículo puede ser sticky en escritorio, pero nunca ocultar contenido o foco.
- En móvil el índice se convierte en disclosure accesible.
- “Analizar una interacción” permanece accesible sin interrumpir la lectura.
- No usar carruseles automáticos. Una colección horizontal necesita controles, teclado y alternativa de lista.

## Vacíos y errores

- Sin resultados: repetir la consulta, sugerir categorías y ofrecer limpiar filtros.
- Artículo no disponible: explicar el motivo si se conoce y ofrecer contenidos relacionados.
- Contenido desactualizado: mostrar el aviso junto al título, no solo al final.
- Fallo de red: conservar consulta, filtros y posición; permitir reintentar.

## Rendimiento

- Cargar imágenes editoriales debajo del fold de forma diferida.
- Usar AVIF/WebP y reservar dimensiones.
- Dividir la ruta editorial si el editor, buscador o contenido enriquecido añade peso relevante.
- No bloquear la lectura por widgets comunitarios o recomendaciones remotas.

## Criterios de aceptación

- El artículo se mantiene legible a 200 % de zoom y en 375 px.
- La jerarquía funciona sin ilustraciones.
- Fechas, fuentes y vigencia son visibles antes de confiar en contenido temporal.
- El índice, enlaces y listas de comprobación funcionan con teclado y lector de pantalla.
- Ningún patrón editorial compite visualmente con la acción principal de Análisis.
- Todo el contenido utiliza español neutro, lenguaje no culpabilizante y acciones concretas.

