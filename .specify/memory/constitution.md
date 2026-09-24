# Constitución de Hackhaton 2026

## Principios fundamentales

### I. Autoridad humana

Martino y Gastón conservan la autoridad final sobre alcance, prioridades, cambios y
despliegues. Ninguna automatización reemplaza la aprobación humana para decisiones
relevantes o para publicar cambios. Una decisión humana explícita y vigente puede
modificar una decisión anterior; si cambia una regla constitucional, esta Constitución
DEBE actualizarse para restaurar la coherencia normativa.

### II. Documentación versionada como fuente de verdad

Las decisiones, contratos y artefactos del proyecto se versionan junto al código. Para
determinar qué DEBERÍA hacer el producto mandan los artefactos normativos aprobados. Para
determinar qué HACE realmente el software, el código ejecutable es evidencia del estado
actual. Toda contradicción entre ambos estados DEBE señalarse y no puede resolverse
silenciosamente ni por inferencia del agente.

### III. SDD para cambios importantes

Una feature o cambio DEBE utilizar SDD cuando introduce o modifica de manera relevante al
menos uno de estos aspectos:

- una capacidad visible del producto;
- datos, esquema, relaciones, RLS, permisos o autenticación;
- un contrato frontend/backend o un contrato relevante frontend/Supabase;
- una integración externa, infraestructura o deployment;
- lógica de negocio significativa o una decisión arquitectónica compartida;
- comportamiento que afecta múltiples partes del producto.

No se exige un ciclo SDD completo para correcciones de texto, cambios visuales pequeños,
bugs triviales y localizados, refactors locales sin cambio de comportamiento, limpieza o
cambios internos reversibles que no alteren contratos, datos, seguridad ni comportamiento
compartido. SDD DEBE reducir incertidumbre, errores y retrabajo; no debe convertirse en
burocracia que ralentice innecesariamente la hackathon.

### IV. Un único producto, un único monorepo y un único Spec Kit

El repositorio contiene un solo producto. `frontend/` y `backend/` comparten historia,
documentación raíz y esta Constitución. Existe una única infraestructura Spec Kit en la
raíz: no se crean `frontend/.specify/` ni `backend/.specify/`. Los dominios pueden tener
ciclos y artefactos SDD separados cuando resulte útil, pero siempre dentro del proyecto
Spec Kit raíz y sin imponer una estructura de paths adicional a la soportada por la
herramienta.

### V. Separación clara y autonomía por dominio

El cliente vive exclusivamente en `frontend/` y la API en `backend/`. Martino trabaja
principalmente sobre backend y Gastón sobre frontend. Cada uno posee autonomía operativa
dentro de su dominio para decisiones locales, reversibles e internas que respeten la
specification y los contratos aprobados y que no cambien comportamiento compartido.

La organización interna de componentes, helpers, refactors locales y detalles de
implementación que respeten el contrato no requieren acuerdo conjunto. Sí requieren
coordinación los cambios sobre comportamiento funcional compartido, contratos, datos,
RLS, autenticación o autorización, seguridad, responsabilidades entre frontend, Supabase
y Express, integración o deployment compartido, o alcance aprobado de la feature.

### VI. CRUD común mediante Supabase y RLS

El CRUD común debe resolverse preferentemente con Supabase y Row Level Security. La
seguridad de datos se define en las políticas correspondientes antes de exponer acceso a
usuarios.

### VII. Express para lógica específica y privilegiada

Express se reserva para lógica de producto específica, integraciones externas y
operaciones privilegiadas que no correspondan al CRUD común de Supabase. No se agregan
capas o servicios ficticios.

### VIII. Secretos solo en entornos seguros

Los secretos privados se almacenan únicamente en entornos seguros y archivos locales no
versionados. El frontend nunca recibe secretos; las variables `VITE_*` se consideran
públicas al compilarse para el navegador.

### IX. `main` siempre desplegable

`main` representa producción y DEBE permanecer desplegable. `develop` concentra
integración y pruebas; `feature/*` contiene trabajo aislado. El flujo válido durante la
hackathon es `feature/*` → `develop` → validación humana → `main` → Vercel/Render. Esta
regla no exige que cada commit cuente con un pipeline CI sofisticado.

### X. Simplicidad bajo una restricción activa de 24 horas

Este producto se desarrolla durante una hackathon de 24 horas que ya está en curso. El
tiempo restante es una restricción real para arquitectura, documentación, SDD,
implementación, integración y testing. Cuando existan varias soluciones suficientemente
correctas, se elige la más simple que cumpla los requisitos, mantenga seguridad razonable,
preserve los contratos, pueda integrarse y pueda completarse dentro del tiempo disponible.

La simplicidad y la presión temporal nunca autorizan romper contratos, ignorar seguridad
relevante, inventar decisiones humanas ni eliminar requisitos aprobados. Toda complejidad
adicional DEBE justificarse por una necesidad actual.

### XI. Contratos explícitos entre dominios

Toda feature que conecte frontend y backend DEBE partir de una definición funcional
compartida y, antes del trabajo independiente, de un contrato común suficientemente claro
y aprobado. Según corresponda, el contrato define responsabilidad de cada lado,
operación, inputs, outputs, errores, autenticación, autorización y supuestos compartidos.
Ningún ciclo de dominio puede modificar unilateralmente un contrato o comportamiento
compartido aprobado.

### XII. SDD en español

Los artefactos SDD propios del proyecto se redactan en español: Constitución,
especificaciones, planes, tareas, checklists, contratos y decisiones asociadas.

## Flujo SDD y autonomía por dominio

Para una feature importante limitada al frontend, Gastón puede ejecutar el ciclo SDD de
frontend. Para una feature importante limitada al backend, Martino puede ejecutar el ciclo
SDD de backend.

Una feature transversal sigue este orden obligatorio:

1. definición funcional compartida;
2. contrato compartido aprobado cuando corresponda;
3. ciclos SDD independientes de frontend y backend, que pueden avanzar en paralelo;
4. integración en `develop`;
5. pruebas y validación humana;
6. integración en `main` y producción.

Los ciclos por dominio pertenecen al único SDD raíz del monorepo y no pueden cambiar de
forma unilateral el alcance, contrato o comportamiento compartido aprobado.

## Reglas de trabajo

- No se hace push sin autorización humana explícita, salvo instrucción explícita posterior
  que lo habilite.
- Antes de implementar una feature con SDD se consultan sus artefactos vigentes.
- Los cambios DEBEN mantener separadas las responsabilidades del frontend, Supabase y
  Express.
- La validación humana en `develop` es suficiente para promover a `main` durante la
  hackathon; una infraestructura CI compleja no es requisito constitucional.

## Jerarquía normativa

Ante contradicciones se aplica, de mayor a menor autoridad:

1. decisión humana explícita y vigente;
2. esta Constitución;
3. specification activa aprobada de la feature;
4. contratos aprobados de esa feature;
5. `AGENTS.md`;
6. README y documentación operativa;
7. implementación actual;
8. documentación histórica, tooling o inferencias.

Codex y otros agentes no pueden alterar este orden según cuál fuente parezca más reciente.
Una nueva decisión humana puede modificar una anterior, pero si afecta una regla
constitucional la Constitución DEBE actualizarse. Una discrepancia entre lo normativo y el
comportamiento ejecutable DEBE informarse de forma explícita.

## Gobernanza

Esta Constitución guía las decisiones técnicas y de proceso del monorepo. Toda enmienda
requiere aprobación humana, actualización versionada y una justificación breve cuando
afecte flujo de trabajo, contratos o seguridad. La revisión de una feature o promoción a
`main` DEBE comprobar el cumplimiento de los principios que correspondan a su alcance.

El versionado sigue SemVer:

- MAJOR para cambios incompatibles, eliminación o redefinición de principios;
- MINOR para principios o secciones nuevas y ampliaciones normativas materiales;
- PATCH para aclaraciones sin cambio normativo, redacción o correcciones.

**Versión**: 1.1.0 | **Ratificada**: 2026-09-24 | **Última enmienda**: 2026-09-24
