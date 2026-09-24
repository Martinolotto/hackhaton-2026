# form-fields-system.md — Sistema dinámico de campos

## Objetivo

Construir un sistema reutilizable de formularios para una hackathon con:

- React
- React Hook Form
- Zod
- `@hookform/resolvers/zod`

La idea es separar:

```text
fields[]
   ↓
FieldRenderer
   ↓
Componente primitivo
   ↓
React Hook Form
   ↓
Zod
```

Así, para crear un formulario nuevo, normalmente solo habrá que definir:

- `fields`
- schema Zod
- `defaultValues`
- `onSubmit`

---

# 1. Estructura general

```text
FORM SYSTEM

config/fields/
    projectFields.js
    reportFields.js

components/forms/
    core/
        DynamicForm.jsx
        FieldRenderer.jsx
        FormField.jsx
        FormActions.jsx

    fields/
        FormInput.jsx
        FormTextarea.jsx
        FormSelect.jsx
        FormNumber.jsx
        FormCheckbox.jsx
        FormDate.jsx
        FormFile.jsx
        FormImage.jsx

    presets/
        EntityForm.jsx
        ReportForm.jsx
        ProfileForm.jsx
        RequestForm.jsx

schemas/
    projectSchema.js
    reportSchema.js
```

---

# 2. Qué es un field

Un `field` es un objeto que describe qué campo debe renderizarse.

Ejemplo:

```js
{
  name: "title",
  label: "Título",
  type: "text",
  placeholder: "Ingrese un título"
}
```

Propiedades recomendadas:

```js
{
  name,
  label,
  type,
  placeholder,
  description,
  options,
  disabled,
  required,
  className,
  props
}
```

No todas tienen que existir en todos los fields.

---

# 3. Tipos soportados

El sistema debería poder crecer hasta soportar:

```text
text
email
password
textarea
number
select
multiselect
checkbox
radio
switch
date
daterange
file
image
location
tags
slider
```

Prioridad inicial:

```text
text
email
password
textarea
number
select
checkbox
date
file
```

---

# 4. Ejemplo de fields

```js
export const projectFields = [
  {
    name: "name",
    label: "Nombre del proyecto",
    type: "text",
    placeholder: "Ej: AgroTrack"
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    placeholder: "Describa el proyecto"
  },
  {
    name: "category",
    label: "Categoría",
    type: "select",
    options: [
      { value: "technology", label: "Tecnología" },
      { value: "agriculture", label: "Agro" },
      { value: "education", label: "Educación" }
    ]
  },
  {
    name: "funding",
    label: "Financiación requerida",
    type: "number"
  }
];
```

---

# 5. Regla de las piezas primitivas

Las piezas primitivas:

```text
FormInput
FormTextarea
FormSelect
FormNumber
FormCheckbox
...
```

NO deben crear su propio `useForm()`.

El formulario padre controla React Hook Form.

Preferir `FormProvider` y `useFormContext()` para evitar pasar `register`, `errors` y `control` manualmente por props.

---

# 6. FormField

Crear un wrapper común:

```jsx
export function FormField({
  label,
  description,
  error,
  children
}) {
  return (
    <div>
      {label && <label>{label}</label>}

      {description && (
        <small>{description}</small>
      )}

      {children}

      {error && (
        <p>{error}</p>
      )}
    </div>
  );
}
```

Su responsabilidad es compartir:

```text
label
descripción
error
layout básico
```

---

# 7. FormInput

```jsx
import { useFormContext } from "react-hook-form";
import { FormField } from "../core/FormField";

export function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  description,
  disabled
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormField
      label={label}
      description={description}
      error={errors[name]?.message}
    >
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
      />
    </FormField>
  );
}
```

`FormInput` debe poder reutilizarse para:

```text
text
email
password
```

---

# 8. FormTextarea

```jsx
import { useFormContext } from "react-hook-form";
import { FormField } from "../core/FormField";

export function FormTextarea({
  name,
  label,
  placeholder,
  description,
  disabled
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormField
      label={label}
      description={description}
      error={errors[name]?.message}
    >
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
      />
    </FormField>
  );
}
```

---

# 9. FormSelect

```jsx
import { useFormContext } from "react-hook-form";
import { FormField } from "../core/FormField";

export function FormSelect({
  name,
  label,
  options = [],
  description,
  disabled
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormField
      label={label}
      description={description}
      error={errors[name]?.message}
    >
      <select
        disabled={disabled}
        {...register(name)}
      >
        <option value="">
          Seleccionar
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
```

---

# 10. FormNumber

Los inputs HTML entregan el valor como string.

Para números usar:

```jsx
{...register(name, {
  valueAsNumber: true
})}
```

Ejemplo:

```jsx
import { useFormContext } from "react-hook-form";
import { FormField } from "../core/FormField";

export function FormNumber({
  name,
  label,
  placeholder
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormField
      label={label}
      error={errors[name]?.message}
    >
      <input
        type="number"
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: true
        })}
      />
    </FormField>
  );
}
```

---

# 11. FieldRenderer

Esta pieza une `fields[]` con los componentes primitivos.

```jsx
import { FormInput } from "../fields/FormInput";
import { FormTextarea } from "../fields/FormTextarea";
import { FormSelect } from "../fields/FormSelect";
import { FormNumber } from "../fields/FormNumber";

const fieldMap = {
  text: FormInput,
  email: FormInput,
  password: FormInput,
  textarea: FormTextarea,
  select: FormSelect,
  number: FormNumber
};

export function FieldRenderer({ field }) {
  const Component = fieldMap[field.type];

  if (!Component) {
    console.warn(
      `Field type "${field.type}" no soportado`
    );

    return null;
  }

  return (
    <Component
      {...field}
      type={field.type}
    />
  );
}
```

El flujo queda:

```text
field.type = "textarea"
        ↓
fieldMap.textarea
        ↓
FormTextarea
```

---

# 12. DynamicForm

Esta es la pieza que crea `useForm()` y une React Hook Form con Zod.

```jsx
import {
  FormProvider,
  useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldRenderer } from "./FieldRenderer";

export function DynamicForm({
  fields,
  schema,
  defaultValues,
  onSubmit,
  submitText = "Guardar"
}) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Guardando..."
            : submitText}
        </button>
      </form>
    </FormProvider>
  );
}
```

---

# 13. Schema Zod

Ejemplo:

```js
import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio"),

  description: z
    .string()
    .min(10, "Mínimo 10 caracteres"),

  category: z
    .string()
    .min(1, "Seleccione una categoría"),

  funding: z
    .number()
    .positive("Debe ser mayor a cero")
});
```

Los `name` de los fields y las propiedades del schema deben coincidir.

Ejemplo:

```text
field:
name = "category"

schema:
category: z.string(...)
```

---

# 14. Unión final

```jsx
import { DynamicForm } from "./DynamicForm";
import { projectFields } from "../../../config/fields/projectFields";
import { projectSchema } from "../../../schemas/projectSchema";

function CreateProjectPage() {
  const handleCreateProject = async (data) => {
    console.log(data);

    // Supabase/API aquí
  };

  return (
    <DynamicForm
      fields={projectFields}
      schema={projectSchema}
      defaultValues={{
        name: "",
        description: "",
        category: "",
        funding: 0
      }}
      onSubmit={handleCreateProject}
      submitText="Crear proyecto"
    />
  );
}
```

La unión conceptual completa es:

```text
projectFields
       │
       ▼
DynamicForm
       │
       ├── useForm()
       ├── zodResolver(projectSchema)
       └── FormProvider
               │
               ▼
          FieldRenderer
               │
               ▼
            fieldMap
        ┌──────┼─────────┐
        ▼      ▼         ▼
     Input  Textarea   Select
        │      │         │
        └──────┴─────────┘
               │
               ▼
       React Hook Form
               │
               ▼
          handleSubmit
               │
               ▼
           onSubmit
               │
               ▼
         Supabase / API
```

---

# 15. Formularios especializados

Un formulario especializado puede ser simplemente un wrapper de `DynamicForm`.

Ejemplo:

```jsx
export function ReportForm({
  onSubmit
}) {
  return (
    <DynamicForm
      fields={reportFields}
      schema={reportSchema}
      defaultValues={reportDefaults}
      onSubmit={onSubmit}
      submitText="Enviar reporte"
    />
  );
}
```

Esto permite construir:

```text
EntityForm
ReportForm
ProfileForm
RequestForm
MeasurementForm
ScheduleForm
```

sobre el mismo motor.

---

# 16. Agregar un nuevo field

Para agregar `priority`:

## Paso 1 — fields

```js
{
  name: "priority",
  label: "Prioridad",
  type: "select",
  options: [
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" }
  ]
}
```

## Paso 2 — Zod

```js
priority: z.enum([
  "low",
  "medium",
  "high"
])
```

No debería ser necesario modificar `DynamicForm`.

---

# 17. Agregar un nuevo TIPO de field

Si todavía no existe `tags`:

## Paso 1

Crear:

```text
FormTags.jsx
```

## Paso 2

Agregarlo al registry:

```js
const fieldMap = {
  ...
  tags: FormTags
};
```

A partir de ahí puede usarse:

```js
{
  name: "skills",
  label: "Habilidades",
  type: "tags"
}
```

---

# 18. Componentes controlados

Algunos componentes personalizados no funcionan correctamente con `register()`.

Ejemplos:

```text
MultiSelect
DatePicker
Slider
LocationPicker
Map
```

Para ellos usar:

```text
Controller
```

o:

```text
useController
```

de React Hook Form.

No forzar `register()` cuando el componente necesita `value` + `onChange`.

---

# 19. Archivos

`FormFile` y `FormImage` solo deben encargarse de seleccionar/mostrar archivos.

La subida a:

```text
Supabase Storage
API
otro servicio
```

debe realizarse fuera del primitive, normalmente desde `onSubmit` o un servicio.

---

# 20. Reglas de responsabilidad

## Primitive field

Debe:

```text
renderizar el control
conectarse a RHF
mostrar label
mostrar error
aceptar configuración
```

No debe:

```text
llamar Supabase
navegar
guardar datos
decidir el schema
decidir qué otros fields existen
```

## DynamicForm

Debe:

```text
crear useForm
conectar Zod
crear FormProvider
recorrer fields
manejar submit
mostrar submitting
```

No debe conocer el dominio.

No debe saber qué significa:

```text
proyecto
incidente
cultivo
usuario
sensor
```

## Formulario especializado

Debe configurar:

```text
fields
schema
defaultValues
submitText
```

y agregar lógica específica solo cuando sea realmente necesaria.

---

# 21. Criterio de éxito

Durante la hackathon, crear un formulario debería ser principalmente:

```text
1. definir fields[]
2. definir schema Zod
3. definir defaultValues
4. definir onSubmit
5. renderizar DynamicForm
```

Ejemplo:

```jsx
<DynamicForm
  fields={fields}
  schema={schema}
  defaultValues={defaults}
  onSubmit={handleSubmit}
/>
```

El sistema central NO debe reconstruirse para cada problemática.

La filosofía es:

> Los fields describen QUÉ mostrar.
> FieldRenderer decide QUÉ componente usar.
> Las primitivas saben CÓMO renderizarse.
> React Hook Form administra el estado.
> Zod valida los datos.
> onSubmit decide qué hacer con ellos.
