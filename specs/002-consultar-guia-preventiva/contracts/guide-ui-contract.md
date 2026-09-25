# Contrato de interfaz pública — Guía preventiva

## Propósito

Este contrato fija el comportamiento visible que la implementación frontend debe
preservar. No define un endpoint ni modifica el contrato de evaluaciones de la
feature 001.

## Ruta y acceso

| Aspecto | Contrato |
| --- | --- |
| Ruta canónica | `/aprendizaje` |
| Acceso | Público, con o sin sesión Supabase. |
| Protección de ruta | No debe estar dentro de `ProtectedRoute` ni `PublicOnlyRoute`. |
| Datos solicitados | Ninguno. |
| Dependencias para renderizar | Bundle del frontend; ningún fetch de contenido, backend, Gemini o fuente externa. |

La aplicación puede mantener su `AuthProvider` global para la navegación existente,
pero la carga, error o indisponibilidad de Auth no debe bloquear ni reemplazar el
contenido de la guía.

## Estructura visible obligatoria

En este orden conceptual:

1. introducción, límites y fecha de actualización editorial;
2. navegación interna y búsqueda local sobre contenido estático;
3. selector accesible desde el que puedan consultarse los siete bloques
   preventivos de `content-guide.md`;
4. checklist de cinco preguntas;
5. cierre que diferencia guía y evaluación;
6. CTA “Evaluar una interacción”;
7. explicación de procedencia y catálogo de fuentes.

El orden exacto de CTA y fuentes al final puede adaptarse por legibilidad siempre
que ambos sean claros y que las fuentes no pierdan asociación con los bloques.

## Contrato de cada bloque

Cada bloque 1–7 debe exponer mediante HTML semántico:

- título orientado a una habilidad;
- “Qué mirar”;
- “Por qué importa”;
- “Cómo comprobarlo”;
- “Ejemplo”;
- “Qué no asumir”;
- IDs de fuentes correspondientes.

La navegación interna debe llevar a un encabezado identificable. El selector debe
exponer los siete temas, anunciar cuál está activo y mostrar su contenido completo;
la búsqueda local no puede inventar resultados ni depender de servicios. Ninguna
sección puede asignar score, estado “seguro”, “fraude” o resultado equivalente.

## Contrato especial de patrones en Argentina

Cada patrón debe mostrar:

- modalidad que ilustra;
- organismo;
- ámbito Argentina;
- fecha o período;
- población/contexto cuando corresponda.

El bloque debe declarar visiblemente que la selección es ilustrativa y no
exhaustiva, no es ranking ni estimación nacional, y constituye contenido editorial
estático, no feed, monitoreo ni alerta operativa.

## Fuentes y enlaces

- Cada ID usado por un bloque debe aparecer en el catálogo final.
- Cada fuente debe conservar organismo, título, fecha cuando existe y URL de
  `content-guide.md`.
- No se permiten URLs o fuentes nuevas durante implementación.
- Los enlaces deben tener texto descriptivo y ser alcanzables mediante teclado.
- Una fuente externa inaccesible no debe afectar el contenido ya renderizado.

## CTA e integración con 001

| Aspecto | Contrato |
| --- | --- |
| Etiqueta visible | `Evaluar una interacción` |
| Destino | `/evaluar` |
| Visitante sin sesión | La protección existente redirige a `/login` y conserva el retorno a `/evaluar`. |
| Persona autenticada | Ingresa al recorrido de evaluación existente. |
| Datos transferidos | Ninguno. |
| API | No se llama a `/api/evaluations` desde la guía. |

No se modifican formulario, request, response, errores, autenticación ni número de
reevaluaciones de 001.

## Responsive y accesibilidad

- Todo el contenido y las acciones permanecen disponibles a 375 px y en pantalla
  amplia, sin scroll horizontal de página.
- El contenido es usable a 200 % de zoom.
- El orden de foco sigue el orden visual y todos los enlaces muestran foco visible.
- La jerarquía de encabezados permite recorrer introducción, secciones, checklist
  y fuentes con tecnologías de asistencia.
- Iconos o color, si se usan, son complementarios y nunca transmiten por sí solos
  cautela, autenticidad o resultado.
- No se requiere animación para comprender, localizar o activar ninguna acción.

## Comportamientos expresamente ausentes

No hay búsqueda remota, filtros de amenazas, formularios de caso, escaneo,
análisis, diagnóstico, descarga de fuentes, sincronización, personalización,
historial, alertas ni actualización automática. La búsqueda existente se limita a
filtrar en memoria los siete bloques editoriales cargados con la página.
