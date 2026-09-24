# context-problematics.md — Contexto de problemáticas para Hackathon

## Propósito de este documento

Este archivo resume las problemáticas utilizadas en la edición anterior de la hackathon y extrae de ellas patrones funcionales que pueden repetirse en futuras consignas.

Debe utilizarse como **contexto de referencia para una IA durante la preparación y desarrollo de la hackathon**.

Importante:

- Las problemáticas descriptas aquí corresponden al año anterior.
- No deben asumirse como las problemáticas de la edición actual.
- Su utilidad está en detectar **patrones de producto, componentes, formularios, vistas y funcionalidades reutilizables**.
- Ante una problemática nueva, adaptar las piezas existentes en lugar de intentar forzarla dentro de una de estas categorías.

---

# 1. Problemáticas de la edición anterior

## 1.1 Seguridad Ciudadana

### Problema

La información sobre incidentes delictivos se encuentra dispersa, desactualizada o es difícil de consultar, lo que dificulta que ciudadanos y autoridades puedan reaccionar y tomar decisiones informadas.

### Desafío planteado

Crear una plataforma colaborativa que permita:

- reportar incidentes;
- hacerlo de manera anónima y segura;
- visualizar incidentes en un mapa;
- trabajar con información en tiempo real;
- detectar zonas de riesgo;
- consultar estadísticas;
- recibir alertas;
- ofrecer información útil para ciudadanos y fuerzas de seguridad.

### Funcionalidades identificables

```text
Reporte de incidentes
Mapa
Geolocalización
Alertas
Estadísticas
Dashboard
Filtros
Historial
Anonimato
Roles de usuario
```

### Formularios que podrían aparecer

```text
ReportForm
IncidentForm
LocationForm
SearchFilters
AlertSettingsForm
```

---

# 1.2 Economía y Sociedad

## Problema

Emprendedores con proyectos potencialmente valiosos tienen dificultades para encontrar financiación, mientras que inversores no cuentan con un espacio centralizado para descubrir proyectos adecuados.

## Desafío planteado

Crear una plataforma que conecte emprendedores e inversores.

La solución debía permitir:

### Emprendedores

- publicar proyectos;
- explicar el modelo de negocio;
- indicar necesidades de financiación;
- mostrar potencial de mercado.

### Inversores

- descubrir proyectos;
- buscar;
- filtrar;
- seleccionar según intereses;
- seleccionar según perfil de riesgo;
- comunicarse con emprendedores.

### Funcionalidades identificables

```text
Perfiles
Marketplace/listado
Publicación de proyectos
Búsqueda
Filtros
Detalles de entidad
Favoritos
Mensajería
Roles
Dashboard
```

### Formularios que podrían aparecer

```text
ProjectForm
ProfileForm
SearchFilters
ContactForm
InvestmentInterestForm
FundingRequestForm
```

---

# 1.3 Producción y Ambiente

## Problema

Los establecimientos agropecuarios necesitan manejar muchas variables simultáneamente, como suelo, clima, inventario, cultivos y ganado.

## Desafío planteado

Crear una plataforma integrada de gestión que permita centralizar y monitorear información relevante para la toma de decisiones.

La solución podía incluir:

- humedad del suelo;
- clima;
- estado de cultivos;
- seguimiento de ganado;
- sensores;
- información en tiempo real;
- optimización de recursos;
- reducción del impacto ambiental;
- mejora de rentabilidad.

### Funcionalidades identificables

```text
Dashboard
Métricas
Sensores
Gráficos
Alertas
Inventario
Seguimiento
Geolocalización
Historial
Estados
Datos en tiempo real
```

### Formularios que podrían aparecer

```text
EntityForm
SensorForm
MeasurementForm
InventoryForm
FarmForm
CropForm
AnimalForm
AlertForm
```

---

# 1.4 Educación

## Problema

Un modelo educativo uniforme no se adapta correctamente a las necesidades, ritmos y dificultades individuales de cada estudiante.

## Desafío planteado

Crear una plataforma de tutoría personalizada capaz de:

- conectar estudiantes con tutores;
- considerar necesidades específicas;
- hacer seguimiento del progreso;
- crear planes de estudio;
- recomendar recursos;
- utilizar rendimiento e intereses para personalizar la experiencia;
- fomentar aprendizaje autónomo.

### Funcionalidades identificables

```text
Perfiles
Roles
Matching
Seguimiento
Progreso
Planes
Recomendaciones
Recursos
Dashboard
Calendario
Mensajería
```

### Formularios que podrían aparecer

```text
ProfileForm
TutorRequestForm
StudyPlanForm
ProgressForm
ScheduleForm
ResourceForm
SearchFilters
```

---

# 1.5 Salud

## Problema

Personas con enfermedades crónicas pueden experimentar aislamiento, ansiedad y dificultad para encontrar información fiable y adaptada a su situación.

## Desafío planteado

Crear una comunidad segura que permita:

- conectar usuarios con experiencias similares;
- compartir experiencias;
- brindar apoyo;
- acceder a información validada;
- interactuar con contenido;
- construir comunidad.

### Funcionalidades identificables

```text
Perfiles
Comunidad
Publicaciones
Comentarios
Mensajería
Moderación
Recursos
Roles
Búsqueda
Notificaciones
```

### Formularios que podrían aparecer

```text
ProfileForm
PostForm
CommentForm
MessageForm
ReportForm
SearchFilters
```

---

# 2. Patrones comunes encontrados

Las problemáticas son diferentes en dominio, pero comparten muchas necesidades de software.

Esto es lo más importante para la preparación previa.

---

## 2.1 Autenticación

Muchas plataformas pueden requerir usuarios identificados.

Preparar:

```text
Login
Registro
Cerrar sesión
Recuperar contraseña
Google OAuth
Sesión persistente
```

Componentes posibles:

```text
LoginForm
RegisterForm
AuthLayout
ProtectedRoute
```

---

## 2.2 Usuarios y perfiles

Muchas problemáticas necesitan almacenar información adicional de una persona.

Ejemplos:

```text
Ciudadano
Emprendedor
Inversor
Productor
Estudiante
Tutor
Paciente
Profesional
Administrador
```

Preparar un `ProfileForm` extensible.

Campos base posibles:

```text
name
lastName
email
avatar
phone
bio
location
interests
role
```

Los campos específicos deben poder agregarse fácilmente.

---

# 2.3 Roles

Muchas aplicaciones necesitan usuarios con capacidades diferentes.

Ejemplos extraídos de las problemáticas:

```text
Ciudadano / autoridad
Emprendedor / inversor
Productor / administrador
Estudiante / tutor
Paciente / profesional
```

Preparar arquitectura que permita:

```text
roles
permisos
rutas protegidas
vistas diferentes
acciones diferentes
```

Si se usa Supabase:

```text
Supabase Auth
+
tabla profiles
+
roles
+
Row Level Security
```

---

# 2.4 CRUD de entidades

Este es uno de los patrones más universales.

Una problemática casi siempre incluye alguna entidad principal:

```text
incidente
proyecto
cultivo
animal
sensor
recurso educativo
publicación
usuario
solicitud
evento
```

Preparar:

```text
crear
listar
ver detalle
editar
eliminar
```

Idealmente mediante componentes reutilizables.

---

# 2.5 Formularios dinámicos

Preparar formularios que puedan cambiar rápidamente.

Stack recomendado:

```text
React Hook Form
+
Zod
```

Separación:

```text
React Hook Form
→ estado del formulario

Zod
→ validación

Supabase/API
→ persistencia
```

El objetivo debe ser poder agregar un campo modificando principalmente:

```text
configuración de fields
schema Zod
UI específica si fuera necesaria
```

---

# 2.6 Búsqueda

Una gran parte de las problemáticas puede necesitar encontrar entidades.

Preparar:

```text
SearchBar
debounce opcional
búsqueda por texto
estado vacío
loading
sin resultados
```

Ejemplos:

```text
buscar proyectos
buscar tutores
buscar recursos
buscar publicaciones
buscar incidentes
buscar establecimientos
```

---

# 2.7 Filtros

Muy reutilizables.

Preparar filtros para:

```text
categoría
estado
fecha
ubicación
rango numérico
prioridad
rol
orden
```

Componente sugerido:

```text
SearchFilters
```

---

# 2.8 Listados

Casi cualquier plataforma necesita mostrar colecciones.

Preparar componentes como:

```text
CardList
DataTable
Grid
Pagination
EmptyState
Skeleton
```

Las entidades pueden cambiar; el patrón permanece.

---

# 2.9 Vista de detalle

Preparar un patrón genérico de:

```text
Entidad
├── título
├── descripción
├── estado
├── metadata
├── acciones
├── historial
└── información relacionada
```

Ejemplos:

```text
detalle de proyecto
detalle de incidente
detalle de recurso
detalle de establecimiento
detalle de publicación
```

---

# 2.10 Dashboard

Las problemáticas anteriores frecuentemente implican resumir información.

Preparar:

```text
MetricCard
StatsGrid
ChartCard
RecentActivity
StatusSummary
QuickActions
```

Posibles métricas:

```text
cantidad total
cantidad activa
cantidad pendiente
promedio
variación
últimos registros
```

---

# 2.11 Estados

Muchas entidades tienen ciclo de vida.

Preparar manejo genérico de:

```text
pending
active
inactive
approved
rejected
completed
cancelled
```

No utilizar estos valores como obligatorios; deben adaptarse al dominio.

Preparar:

```text
StatusBadge
StatusFilter
StatusUpdateForm
```

---

# 2.12 Reportes

Varias problemáticas pueden necesitar que el usuario informe algo.

Un `ReportForm` reutilizable puede servir para:

```text
incidente
problema
falla
denuncia
solicitud
contenido inapropiado
observación
```

Campos potenciales:

```text
title
category
description
priority
location
date
attachments
anonymous
```

---

# 2.13 Ubicación

Seguridad y producción son ejemplos claros, pero puede aparecer en muchos dominios.

Preparar:

```text
LocationPicker
Map
latitude
longitude
address
zone
```

No asumir que todas las problemáticas requieren mapa.

Debe poder agregarse como módulo opcional.

---

# 2.14 Mapas

Tener preparada una integración básica puede ahorrar mucho tiempo.

Casos:

```text
incidentes
establecimientos
usuarios
eventos
servicios
recursos
```

Funcionalidades base:

```text
mostrar marcadores
centrar mapa
seleccionar ubicación
popup
filtros
```

---

# 2.15 Archivos e imágenes

Muchos sistemas necesitan evidencias o contenido.

Preparar:

```text
FileUpload
ImageUpload
Preview
RemoveFile
```

Integrable con:

```text
Supabase Storage
```

Casos:

```text
foto de incidente
avatar
documentación
imagen de proyecto
recurso educativo
publicación
```

---

# 2.16 Comentarios y publicaciones

Las plataformas colaborativas pueden necesitar interacción.

Preparar:

```text
PostCard
PostForm
CommentList
CommentForm
```

---

# 2.17 Mensajería

Economía, educación y salud implican comunicación entre personas.

Preparar arquitectura visual para:

```text
ConversationList
ChatWindow
MessageBubble
MessageForm
```

No es obligatorio implementar tiempo real de antemano si eso aumenta mucho la complejidad.

---

# 2.18 Notificaciones

Muy útiles para múltiples dominios.

Ejemplos:

```text
nuevo mensaje
nuevo incidente
cambio de estado
alerta
recordatorio
actualización
```

Preparar:

```text
NotificationBell
NotificationList
UnreadBadge
```

---

# 2.19 Alertas

Especialmente útiles en:

```text
seguridad
agro
sensores
inventario
salud
```

Preparar:

```text
AlertCard
AlertBadge
AlertSettingsForm
```

---

# 2.20 Métricas y gráficos

Muchas problemáticas se benefician de visualizar información.

Preparar:

```text
LineChart
BarChart
Pie/DonutChart
MetricCard
```

No crear gráficos específicos de una problemática.

Debe ser sencillo cambiar:

```text
labels
dataset
title
units
```

---

# 2.21 Historial

Puede servir para:

```text
incidentes
cambios de estado
mediciones
progreso
movimientos
actividad
```

Preparar:

```text
Timeline
ActivityFeed
HistoryTable
```

---

# 2.22 Fechas y calendario

Útiles para:

```text
tutorías
eventos
recordatorios
mediciones
incidentes
seguimiento
```

Preparar:

```text
DatePicker
DateRange
Calendar
ScheduleForm
```

---

# 2.23 Recursos

Muchas plataformas pueden necesitar contenido relacionado.

Ejemplos:

```text
videos
PDF
artículos
enlaces
documentos
guías
```

Preparar:

```text
ResourceCard
ResourceForm
ResourceList
```

---

# 2.24 Favoritos o guardados

Útil en sistemas de descubrimiento.

Ejemplos:

```text
proyectos favoritos
tutores guardados
recursos guardados
publicaciones guardadas
```

Preparar una acción reutilizable:

```text
FavoriteButton
```

---

# 2.25 Administración

Casi cualquier solución puede necesitar alguna vista administrativa.

Preparar:

```text
AdminLayout
UserTable
EntityTable
StatusManagement
ModerationQueue
```

---

# 3. Componentes frontend altamente reutilizables

Estos componentes tienen alta probabilidad de ser útiles independientemente de la problemática.

## Navegación

```text
Navbar
Sidebar
MobileMenu
Breadcrumb
Tabs
```

## Formularios

```text
FormInput
FormTextarea
FormSelect
FormMultiSelect
FormCheckbox
FormRadio
FormSwitch
FormNumber
FormDate
FormDateRange
FormFile
FormImage
FormLocation
FormTags
FormActions
```

## Datos

```text
DataTable
Card
CardGrid
Pagination
SearchBar
SearchFilters
StatusBadge
```

## Feedback

```text
Toast
Alert
Dialog
ConfirmDialog
LoadingSpinner
Skeleton
EmptyState
ErrorState
```

## Dashboard

```text
MetricCard
ChartCard
ActivityFeed
QuickActions
```

## Usuarios

```text
Avatar
UserCard
ProfileHeader
RoleBadge
```

## Contenido

```text
PostCard
Comment
ResourceCard
FilePreview
```

---

# 4. Formularios maestros recomendados

En lugar de crear decenas de formularios rígidos, preparar un conjunto pequeño de formularios altamente configurables.

## AuthForm

Puede adaptarse a:

```text
Login
Registro
Recuperar contraseña
Resetear contraseña
```

---

## EntityForm

Debe servir como formulario CRUD genérico.

Ejemplos:

```text
Proyecto
Cultivo
Sensor
Recurso
Evento
Publicación
Producto
Establecimiento
```

---

## ReportForm

Para:

```text
Incidente
Problema
Solicitud
Falla
Denuncia
Observación
```

---

## ProfileForm

Para cualquier tipo de usuario.

---

## SearchFilters

Para búsquedas complejas.

---

## PostForm

Para contenido generado por usuarios.

---

## RequestForm

Para procesos donde un usuario solicita algo.

---

## MeasurementForm

Para datos cuantitativos.

---

## ScheduleForm

Para fecha y horario.

---

## WizardForm

Para formularios largos divididos en pasos.

---

# 5. Modelo de adaptación recomendado

Ante una problemática nueva:

```text
1. Identificar actores
       ↓
2. Identificar entidades
       ↓
3. Identificar acciones
       ↓
4. Identificar datos
       ↓
5. Mapear necesidades a componentes existentes
       ↓
6. Adaptar schemas y formularios
       ↓
7. Crear solo lo que realmente falta
```

Ejemplo conceptual:

```text
Problemática nueva:
"Gestión de voluntarios"

Actores:
Voluntario
Organización

Entidades:
Usuario
Actividad
Inscripción

Necesidades:
Login
Perfil
Listado
Filtros
Crear actividad
Inscribirse

Componentes reutilizados:
AuthForm
ProfileForm
EntityForm
SearchFilters
CardList
StatusBadge
```

---

# 6. Preguntas que la IA debe responder al recibir una nueva problemática

Antes de implementar, analizar:

```text
¿Quiénes son los actores?

¿Qué puede hacer cada actor?

¿Cuáles son las entidades principales?

¿Cuáles son las relaciones?

¿Qué información necesita cada entidad?

¿Qué acciones CRUD existen?

¿Qué datos necesitan búsqueda?

¿Qué datos necesitan filtros?

¿Qué acciones necesitan formularios?

¿Hay información geográfica?

¿Hay archivos?

¿Hay comunicación entre usuarios?

¿Hay estados?

¿Hay métricas?

¿Hay necesidad de tiempo real?

¿Hay roles o permisos?

¿Qué componentes existentes pueden reutilizarse?
```

---

# 7. Prioridad en una hackathon de 24 horas

No intentar construir todas las funcionalidades posibles.

Priorizar:

```text
1. Flujo principal funcionando
2. Autenticación si es necesaria
3. CRUD principal
4. Formularios
5. Navegación
6. Búsqueda/filtros
7. Dashboard básico
8. Funcionalidad diferenciadora
9. Pulido visual
```

Evitar invertir demasiado tiempo en funcionalidades secundarias antes de tener completo el flujo principal.

---

# 8. Criterio para decidir qué preparar de antemano

Una pieza merece estar prehecha cuando:

```text
puede aparecer en múltiples dominios
+
es costosa de implementar durante la hackathon
+
es sencilla de adaptar
```

Ejemplos con alta reutilización:

```text
Auth
Form system
DataTable
SearchFilters
Modal
Upload
Map
Dashboard cards
Charts
Profile
Status system
Loading/Error/Empty states
```

Ejemplos que conviene construir solo si la problemática los necesita:

```text
algoritmos específicos
matching complejo
lógica de negocio específica
modelos de datos del dominio
workflows particulares
integraciones externas específicas
```

---

# 9. Idea central

Las problemáticas cambian, pero los patrones de software suelen repetirse.

No preparar:

```text
"la aplicación de seguridad"
"la aplicación agrícola"
"la aplicación educativa"
```

Preparar:

```text
autenticación
perfiles
formularios
CRUD
búsqueda
filtros
tablas
cards
dashboards
mapas
uploads
estados
roles
mensajería
notificaciones
gráficos
```

Y luego ensamblarlos según la problemática real.

El objetivo es convertir la hackathon de:

```text
"construir una aplicación completa en 24 horas"
```

en:

```text
"adaptar un conjunto probado de módulos a una nueva problemática".
```
