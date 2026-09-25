# Decisiones técnicas consolidadas

Este documento corresponde a la fase de investigación técnica de `$speckit-plan`.
No agrega investigación factual ni reemplaza
[content-research.md](content-research.md) o
[content-guide.md](content-guide.md). Las decisiones se basan en esos artefactos,
la specification y la arquitectura ejecutable actual.

## 1. Superficie frontend estática

**Decisión**: implementar la guía íntegramente en React como contenido local
versionado y entregado con el bundle del frontend.

**Fundamento**: RF-023 y RF-025 exigen disponibilidad sin servicios externos y
contenido común no generado dinámicamente. La guía no procesa entradas, no
persiste datos y no tiene lógica privilegiada. Una implementación local cumple el
alcance con el menor costo y riesgo.

**Alternativas consideradas**:

- Endpoint Express para entregar contenido: rechazado porque añade una dependencia
  de red y una interfaz de servicio prohibida sin aportar valor.
- Supabase Database o Storage: rechazado porque no existe CRUD, personalización ni
  publicación dinámica.
- CMS: rechazado expresamente por alcance y por costo de hackathon.

## 2. Reutilizar `/aprendizaje`

**Decisión**: convertir la página existente `/aprendizaje` en la guía preventiva,
sin agregar una ruta paralela.

**Fundamento**: la SPA ya expone `/aprendizaje` como ruta pública, la landing y
`Nav` ya enlazan a ella, y el placeholder existente representa la intención de
prevención. Reutilizarla evita enlaces duplicados, redirects y cambios de
navegación innecesarios.

**Alternativas consideradas**:

- Crear `/guia-preventiva`: rechazado porque duplicaría la superficie pública y
  exigiría decidir alias o migración sin un beneficio funcional aprobado.
- Publicar bloques como múltiples artículos: rechazado porque convertiría el
  incremento mínimo en una biblioteca y complicaría navegación y mantenimiento.

## 3. Contenido estructurado en un módulo JavaScript

**Decisión**: transcribir `content-guide.md` a un único módulo de datos estáticos
que contenga metadatos, bloques, checklist, patrones y catálogo de fuentes; la UI
lo renderiza sin modificar su significado.

**Fundamento**: una estructura local separa contenido y presentación, permite
comprobar IDs y metadatos, y evita repetir manualmente la plantilla de siete
bloques. Sigue siendo contenido editorial fijo y versionado.

**Alternativas consideradas**:

- JSX monolítico: viable, pero dificulta revisar consistencia de fuentes y
  estructura repetida.
- Importar/renderizar Markdown en runtime: rechazado porque exige un parser o
  transformación adicional y complica controlar la semántica y el diseño.
- JSON remoto: rechazado porque reintroduce red y actualización dinámica.

## 4. Un componente repetible para bloques

**Decisión**: usar un solo `GuideSection` para la plantilla “qué mirar / por qué
importa / cómo comprobarlo / ejemplo / qué no asumir / fuentes”; la página compone
introducción, índice, checklist, cierre y fuentes finales.

**Fundamento**: es la única abstracción repetida con responsabilidad real. Reduce
errores de omisión sin fragmentar la página en componentes triviales.

**Alternativas consideradas**:

- Un componente por tema: rechazado por sobrearquitectura y porque los temas no
  tienen comportamiento propio.
- Ningún componente: posible, pero aumenta la duplicación de markup y el riesgo de
  jerarquías inconsistentes.

## 5. Navegación simple mediante anclas nativas

**Decisión**: ofrecer un índice visible que enlaza a identificadores estables de
los bloques en la misma página.

**Fundamento**: RF-021 exige localizar una categoría sin leer todo. Las anclas
nativas funcionan con teclado, no dependen de estado ni de servicios y degradan
correctamente.

**Alternativas consideradas**:

- Buscador o filtros: rechazados porque la colección es pequeña, añaden estado y
  el placeholder actual simula una capacidad no requerida.
- Acordeones: rechazados como mecanismo principal porque pueden ocultar cautelas y
  complicar navegación y accesibilidad.
- Índice sticky: no se requiere en el incremento mínimo; puede generar problemas
  de foco o espacio en mobile.

## 6. Integración por enlace con la evaluación existente

**Decisión**: el CTA navega a `/evaluar` y deja que `ProtectedRoute` gestione la
sesión y la redirección existente.

**Fundamento**: cumple RF-018 a RF-020 sin acoplar la guía a Auth ni a la API. El
código actual ya conserva la ubicación de origen y devuelve a la evaluación tras
el login.

**Alternativas consideradas**:

- Autenticar dentro de la guía: rechazado porque la lectura debe ser pública.
- Insertar el formulario de evaluación en la guía: rechazado porque mezclaría
  orientación general con evaluación de un caso concreto.
- Precargar datos al navegar: rechazado porque la guía no recopila casos.

## 7. Fuentes como datos estáticos y enlaces salientes

**Decisión**: mantener IDs de fuente por bloque y resolverlos en una sección final
con organismo, recurso, fecha y URL aprobada; las URLs son enlaces normales
activados solo por la persona.

**Fundamento**: satisface RF-026 y mantiene trazabilidad sin consultar las fuentes
en runtime. Los datos temporales argentinos se presentan junto con ámbito,
período/contexto y límite no exhaustivo según RF-027.

**Alternativas consideradas**:

- Consultar o validar URLs automáticamente: rechazado por alcance y porque haría
  depender la guía de servicios externos.
- Ocultar todas las fuentes detrás de una interacción compleja: rechazado porque
  reduce la identificabilidad de la procedencia.

## 8. Estilos locales y activos existentes

**Decisión**: reutilizar tokens, tipografía, `Nav`, botones y convenciones visuales
existentes, con una hoja de estilos específica para la página. No agregar imágenes
ni animaciones necesarias para comprender el contenido.

**Fundamento**: preserva coherencia visual y mantiene los cambios aislados. La
jerarquía debe seguir siendo comprensible sin decoración.

**Alternativas consideradas**:

- Ampliar `app-sections.css` con todos los detalles de la guía: rechazado porque
  aumentaría el acoplamiento entre páginas.
- Assets o visualizaciones nuevas: rechazados porque no son necesarios para el
  alcance mínimo y agregan tiempo y peso.

## 9. Validación proporcional al repositorio

**Decisión**: usar lint y build existentes más recorridos manuales reproducibles
para acceso público, contenido, responsive, teclado, indisponibilidad externa y
regresión del CTA.

**Fundamento**: no existe runner de tests frontend y agregarlo solo para una página
estática no es proporcional a la restricción de 24 horas. Los criterios de éxito
son directamente observables mediante el quickstart.

**Alternativas consideradas**:

- Incorporar una suite E2E o unit runner: útil a futuro, pero rechazada para este
  incremento por configuración y mantenimiento sin comportamiento complejo.
- Validación exclusivamente visual: rechazada porque no cubre acceso, foco,
  enlaces, fuentes ni el límite con 001.

## Resultado de investigación

No quedan decisiones técnicas abiertas. Backend, Supabase Database, Gemini y
contratos API no participan. El único contrato nuevo es el contrato de interfaz
pública de la guía, documentado para alinear contenido, navegación y transición a
001.
