# A tiempo — Reglas de página: Análisis

**Hereda de:** `../MASTER.md`  
**Prioridad:** esta página prevalece únicamente cuando define una excepción explícita

## Objetivo

Ayudar a una persona bajo presión a aportar una interacción digital, recuperar el contexto que falta y recibir un diagnóstico breve y explicable antes de actuar.

La experiencia debe reducir carga cognitiva. No debe parecer un escáner automático, un chatbot abierto ni un formulario técnico.

## Acceso

- Una persona sin cuenta puede completar el asistente y ver un resultado básico.
- Guardar el análisis, seguir cambios o convertirlo en reporte comunitario requiere autenticación.
- La solicitud de cuenta aparece después de entregar valor y nunca bloquea la lectura del resultado ya generado.

## Estructura del asistente

El flujo tiene cuatro pasos estables:

1. **Tipo de entrada:** URL, texto o captura.
2. **Contenido:** pegar la URL o texto, o adjuntar la captura.
3. **Contexto:** canal, identidad presentada, relación previa, acción solicitada y presencia de urgencia o presión.
4. **Revisión:** resumen editable, aviso sobre tratamiento de datos y confirmación para analizar.

Reglas:

- Mostrar “Paso X de 4” y una barra de progreso accesible.
- Permitir volver sin perder información.
- Mantener una sola pregunta principal por vista en móvil.
- En escritorio se pueden agrupar campos estrechamente relacionados, sin mostrar pasos futuros completos.
- Conservar un borrador local durante la sesión. No prometer persistencia o eliminación del contenido si el comportamiento real no está implementado.
- Avisar antes de subir capturas que pueden contener información personal y ofrecer una recomendación breve para ocultarla.

## Entrada y validación

### URL

- Aceptar una URL pegada y mostrar el dominio normalizado antes de continuar.
- El enlace proporcionado se representa como texto; no debe abrirse automáticamente.
- URLs largas deben envolver sin deformar el layout.

### Texto

- Mostrar contador y límite reales.
- Conservar saltos de línea y permitir pegar contenido.
- No analizar mientras la persona todavía escribe.

### Captura

- Aceptar únicamente formatos y tamaños realmente soportados.
- Mostrar miniatura, nombre, tamaño, estado de carga y acción para reemplazar o eliminar.
- Reservar el espacio de la miniatura antes de cargarla.
- El error debe explicar formato/tamaño permitido y permitir reintento.

### Errores

- Validar al salir del campo o al intentar avanzar.
- Mantener el mensaje junto al campo y enlazarlo mediante `aria-describedby`.
- Con varios errores, enfocar un resumen al inicio del paso con enlaces a cada problema.
- Nunca usar únicamente un borde rojo o un toast.

## Procesamiento

El análisis muestra etapas reales, no porcentajes inventados:

1. **Revisando la entrada**
2. **Contrastando señales y contexto**
3. **Preparando la explicación**

- Marcar una etapa como completa solo cuando el sistema haya finalizado el trabajo correspondiente.
- Anunciar cambios importantes con una única región `aria-live="polite"`.
- Permitir cancelar cuando técnicamente sea posible.
- Si falla una fuente externa, distinguir entre resultado parcial, reintento posible y fallo total.
- Nunca mostrar hallazgos parciales como definitivos.

## Resultado

Orden obligatorio:

1. **Nivel de cautela:** baja, media o alta.
2. **Resumen en lenguaje cotidiano.**
3. **Evidencia observada:** hechos detectables en la entrada.
4. **Elementos favorables:** aspectos que apoyan legitimidad sin probarla.
5. **Contradicciones o indicadores de riesgo.**
6. **Información faltante e incertidumbre.**
7. **Próximos pasos de verificación**, ordenados por impacto y esfuerzo.
8. **Límites del diagnóstico.**

### Tratamiento visual

- El nivel ocupa una cabecera clara dentro del panel de resultado, no una pantalla oscura ni un velocímetro.
- Cautela baja usa azul informativo; media usa ámbar; alta usa rojo. Todos incluyen icono y etiqueta.
- El turquesa se reserva para evidencia favorable y pasos completados, no para decir “seguro”.
- Evidencia, interpretación e incertidumbre deben usar secciones visualmente distintas.
- El CTA principal será la siguiente comprobación concreta; guardar o compartir tendrán menor jerarquía.

### Copy obligatorio

- “Cautela baja” no significa que la interacción sea segura.
- “No encontramos señales” debe ir acompañado de los límites del material analizado.
- “Cautela alta” debe explicar qué evidencia produjo el nivel y qué acción conviene pausar.
- Evitar porcentajes de confianza salvo que exista un modelo calibrado y documentado.

## Ilustración

Usar **capas de evidencia**:

- fragmentos de URL, mensaje, identidad y acción como piezas separadas;
- conexiones suaves entre observación y conclusión;
- entrada dispersa que se ordena visualmente durante el flujo.

La ilustración nunca debe competir con el formulario ni simular resultados reales.

## Estados que deben diseñarse

- Sin entrada.
- Entrada parcialmente completa.
- Captura cargando, cargada y rechazada.
- Validación fallida.
- Procesamiento activo y cancelado.
- Resultado completo, parcial y no concluyente.
- Error recuperable y error sin resultado.
- Sesión anónima y solicitud de cuenta posterior al resultado.

## Criterios de aceptación

- El flujo completo puede realizarse con teclado y lector de pantalla.
- La persona conoce siempre el paso actual, lo que falta y cómo volver.
- Refrescar o volver atrás no borra silenciosamente el paso actual durante la misma sesión.
- Un resultado no puede interpretarse correctamente usando solo su color.
- El resultado separa hechos, interpretaciones, incertidumbre y acciones.

