# specs.md — Formularios reutilizables para Hackathon

## Objetivo

Construir un sistema de formularios reutilizables para una hackathon de 24 horas usando **React + Vite**, **React Hook Form** y **Zod**.

La prioridad es poder adaptar rápidamente la interfaz a problemáticas distintas sin rehacer la lógica de formularios desde cero.

Las problemáticas pueden involucrar, por ejemplo:

- reporte de incidentes o solicitudes;
- publicación y edición de proyectos;
- perfiles de usuarios;
- carga de información productiva o educativa;
- búsqueda y filtrado de entidades;
- carga de imágenes o documentos;
- formularios de contacto o comunicación.

La implementación debe favorecer **reutilización, claridad, velocidad de adaptación y separación de responsabilidades**.

---

## Stack obligatorio

Usar:

- React
- Vite
- React Hook Form
- Zod
- `@hookform/resolvers`
- JavaScript o TypeScript según el proyecto

Para formularios:

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Principios generales

### 1. React Hook Form administra el formulario

Usar React Hook Form para:

- registrar campos;
- manejar el submit;
- manejar errores;
- controlar estado del formulario;
- manejar valores iniciales;
- resetear formularios;
- observar valores cuando sea necesario.

La forma base debe usar:

```js
useForm()
register()
handleSubmit()
formState.errors
```

Y cuando corresponda:

```js
reset()
watch()
setValue()
getValues()
control
```

---

### 2. Zod administra la validación

Las reglas de validación no deben quedar dispersas dentro del JSX cuando el formulario tenga una complejidad moderada o alta.

Crear schemas de Zod separados.

Ejemplo:

```js
import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio"),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),

  category: z
    .string()
    .min(1, "Seleccione una categoría"),
});
```

Conectar Zod con React Hook Form usando:

```js
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(projectSchema),
});
```

---

## Separación de responsabilidades

Mantener esta división:

```text
React Hook Form
→ estado y comportamiento del formulario

Zod
→ validación y estructura de los datos

Componente React
→ presentación y composición del formulario

Supabase / API
→ persistencia, autenticación y operaciones remotas

Base de datos
→ integridad final de los datos
```

La validación del frontend nunca debe considerarse una medida de seguridad suficiente.

---

# Arquitectura recomendada

Usar una estructura similar a:

```text
src/
├── components/
│   └── forms/
│       ├── FormInput.jsx
│       ├── FormTextarea.jsx
│       ├── FormSelect.jsx
│       ├── FormCheckbox.jsx
│       ├── FormRadio.jsx
│       ├── FormDate.jsx
│       ├── FormFile.jsx
│       ├── FormError.jsx
│       └── FormActions.jsx
│
├── features/
│   ├── auth/
│   │   └── LoginForm.jsx
│   │
│   ├── reports/
│   │   └── ReportForm.jsx
│   │
│   ├── entities/
│   │   └── EntityForm.jsx
│   │
│   ├── profiles/
│   │   └── ProfileForm.jsx
│   │
│   └── search/
│       └── SearchFilters.jsx
│
└── schemas/
    ├── loginSchema.js
    ├── reportSchema.js
    ├── entitySchema.js
    └── profileSchema.js
```

No es obligatorio mantener exactamente estos nombres, pero sí la separación conceptual.

---

# Componentes base

Crear componentes reutilizables para los tipos de campo más frecuentes.

## FormInput

Debe soportar como mínimo:

- `name`
- `label`
- `type`
- `placeholder`
- `register`
- `error`
- `disabled`
- atributos HTML adicionales

Ejemplo de uso:

```jsx
<FormInput
  label="Nombre"
  name="name"
  register={register}
  error={errors.name}
/>
```

---

## FormTextarea

Para:

- descripciones;
- observaciones;
- detalles;
- comentarios;
- contenido largo.

---

## FormSelect

Debe permitir recibir opciones dinámicamente.

Ejemplo:

```jsx
<FormSelect
  name="category"
  label="Categoría"
  options={[
    { value: "security", label: "Seguridad" },
    { value: "education", label: "Educación" },
  ]}
  register={register}
  error={errors.category}
/>
```

---

## FormCheckbox

Útil para:

- reportes anónimos;
- aceptación de términos;
- estados booleanos;
- configuración de preferencias.

---

## FormFile

Útil para:

- imágenes;
- documentación;
- evidencias;
- archivos relacionados con reportes.

No asumir que React Hook Form o Zod realizan el upload.

El formulario obtiene el archivo; la subida debe delegarse a Supabase Storage, una API u otro servicio.

---

# Formularios reutilizables prioritarios

## 1. LoginForm

Campos mínimos:

```text
email
password
```

Responsabilidades:

- validación;
- mostrar errores;
- enviar datos mediante `onSubmit`;
- mostrar estado de carga;
- permitir integrar Supabase Auth.

No acoplar internamente el formulario a una URL específica.

Preferir:

```jsx
<LoginForm onSubmit={handleLogin} />
```

---

## 2. EntityForm

Debe ser el formulario genérico principal.

Tiene que poder adaptarse a:

```text
Proyecto
Incidente
Establecimiento
Cultivo
Alumno
Tutor
Recurso
Publicación
Solicitud
Producto
Evento
```

No crear un formulario completamente distinto para cada entidad si comparten la misma estructura.

Siempre que sea razonable, permitir recibir configuración de campos.

Ejemplo conceptual:

```jsx
<EntityForm
  title="Crear proyecto"
  fields={fields}
  schema={projectSchema}
  onSubmit={handleCreateProject}
/>
```

Ejemplo de `fields`:

```js
const fields = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
  },
  {
    name: "category",
    label: "Categoría",
    type: "select",
    options: categories,
  },
];
```

Evitar hacer el sistema excesivamente abstracto si eso aumenta mucho la complejidad.

La prioridad durante la hackathon es velocidad y mantenibilidad.

---

## 3. ReportForm

Crear una base adaptable para reportar eventos, problemas o solicitudes.

Campos posibles:

```text
title
category
description
date
priority
location
image
anonymous
```

No todos deben ser obligatorios.

El formulario debe poder adaptarse quitando o agregando campos.

Casos de uso posibles:

```text
reportar incidente ciudadano
reportar problema en cultivo
reportar falla
crear solicitud de soporte
crear denuncia
informar evento
```

---

## 4. ProfileForm

Debe permitir completar información adicional después del registro.

Campos comunes:

```text
name
lastName
avatar
bio
phone
interests
role
location
```

Los campos específicos de negocio deben almacenarse fuera de Supabase Auth cuando corresponda.

No mezclar credenciales de autenticación con toda la información de perfil.

---

## 5. SearchFilters

Construir un formulario compacto de búsqueda y filtrado.

Soportar combinaciones de:

```text
texto libre
categoría
estado
fecha
rango
orden
ubicación
```

Ejemplo:

```jsx
<SearchFilters
  onSubmit={handleFilters}
/>
```

Debe ser fácil agregar o remover filtros según la problemática.

---

# Patrón obligatorio para formularios

Preferir esta estructura:

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ExampleForm({
  schema,
  defaultValues,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* campos */}

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
```

---

# Estados de interfaz

Los formularios deben contemplar como mínimo:

```text
estado normal
campo inválido
campo deshabilitado
formulario enviándose
envío exitoso
error del servidor
```

Usar:

```js
formState.errors
formState.isSubmitting
formState.isDirty
```

cuando sean relevantes.

---

# Errores

Distinguir entre:

## Error de validación

Ejemplo:

```text
"El email no es válido"
```

Proviene normalmente de Zod.

---

## Error del servidor

Ejemplo:

```text
"Ya existe un usuario con este email"
```

Proviene de Supabase, API o backend.

No tratar ambos tipos de error como si fueran iguales.

Ejemplo conceptual:

```jsx
{errors.email && (
  <p>{errors.email.message}</p>
)}

{serverError && (
  <p>{serverError}</p>
)}
```

---

# Default values

Siempre que el formulario sea editable, soportar `defaultValues`.

Ejemplo:

```jsx
useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    name: project?.name ?? "",
    description: project?.description ?? "",
  },
});
```

Esto debe permitir reutilizar el mismo formulario para:

```text
Crear
Editar
```

cuando sea conveniente.

---

# Submit

El componente de formulario no debe decidir necesariamente qué API o servicio usar.

Preferir inversión de control mediante props.

Ejemplo:

```jsx
<ProjectForm
  onSubmit={handleCreateProject}
/>
```

Y fuera:

```js
async function handleCreateProject(data) {
  // llamada a Supabase o API
}
```

Esto facilita reutilizar la UI.

---

# Supabase

Cuando se utilice Supabase:

```text
React Hook Form
↓
Zod
↓
onSubmit(data)
↓
Supabase
```

Los schemas de Zod sirven para validación del frontend, pero no reemplazan:

```text
Row Level Security
constraints SQL
permisos
políticas
validación del backend
```

Nunca depender exclusivamente del frontend para seguridad o autorización.

---

# Estilos

Los estilos internos deben pertenecer al componente.

Ejemplo:

```text
Input
Button
Error message
Gap
Label
Border
```

La página padre debe encargarse principalmente del layout externo.

Ejemplo:

```text
centrado
posición
ancho máximo del contenedor
fondo de la página
disposición con otras secciones
```

Regla:

```text
apariencia interna
→ componente

posición dentro de la página
→ padre
```

---

# Reutilización

Antes de crear un formulario nuevo, comprobar si puede construirse combinando:

```text
FormInput
FormTextarea
FormSelect
FormCheckbox
FormFile
FormDate
FormActions
```

y uno de los formularios base:

```text
EntityForm
ReportForm
ProfileForm
SearchFilters
```

No duplicar componentes con diferencias mínimas.

---

# Evitar

La implementación NO debe:

- manejar cada input mediante un `useState` separado sin necesidad;
- duplicar las mismas validaciones en múltiples componentes;
- colocar schemas grandes de Zod dentro del JSX;
- acoplar componentes visuales directamente a una tabla específica si no es necesario;
- hacer abstracciones enormes que vuelvan lento adaptar el sistema;
- mezclar la lógica de Supabase con todos los componentes de input;
- confiar en Zod del frontend como mecanismo de seguridad;
- recrear componentes básicos si ya existe uno reutilizable adecuado.

---

# Prioridad de desarrollo

Durante la preparación previa a la hackathon:

```text
1. Componentes base
2. LoginForm
3. EntityForm
4. ReportForm
5. SearchFilters
6. ProfileForm
7. Upload / ubicación
```

Durante la hackathon:

```text
1. Identificar entidades de la problemática
2. Elegir formulario base
3. Crear schema Zod
4. Definir campos
5. Conectar onSubmit
6. Integrar Supabase/API
7. Ajustar diseño
```

---

# Criterio de éxito

La implementación es correcta si una nueva problemática puede adaptarse principalmente mediante:

```text
cambiar labels
cambiar campos
cambiar opciones
crear/modificar schema Zod
cambiar función onSubmit
```

sin tener que reconstruir desde cero:

```text
validación
manejo de errores
estado de formulario
componentes de input
submit
layout interno
```

El objetivo final es que crear un formulario nuevo durante la hackathon sea una tarea de **configuración y adaptación**, no de reconstrucción completa.
