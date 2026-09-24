# Constitución de Hackhaton 2026

## Principios fundamentales

### I. Autoridad humana

Martino y Gastón conservan la autoridad final sobre alcance, prioridades, cambios y despliegues. Ninguna automatización reemplaza la aprobación humana para decisiones relevantes o para publicar cambios.

### II. Documentación versionada como fuente de verdad

Las decisiones, contratos y artefactos del proyecto se versionan junto al código. Ante una discrepancia, la documentación aprobada del repositorio prevalece sobre supuestos informales.

### III. SDD para features no triviales

Toda feature no trivial se gestiona mediante los artefactos Spec Kit correspondientes antes de implementarse. Para cambios pequeños, evidentes y aislados se permite una implementación directa y documentada en el commit.

### IV. Un único producto, un único monorepo

El repositorio contiene un solo producto. `frontend/` y `backend/` comparten historia, documentación raíz y esta Constitución; no se crean proyectos Spec Kit independientes dentro de ellos.

### V. Separación clara entre frontend y backend

El cliente vive exclusivamente en `frontend/` y la API en `backend/`. Sus contratos son explícitos para toda feature que los conecte, sin duplicar responsabilidades entre ambos lados.

### VI. CRUD común mediante Supabase y RLS

El CRUD común debe resolverse preferentemente con Supabase y Row Level Security. La seguridad de datos se define en las políticas correspondientes antes de exponer acceso a usuarios.

### VII. Express para lógica específica y privilegiada

Express se reserva para lógica de producto específica, integraciones externas y operaciones privilegiadas que no correspondan al CRUD común de Supabase. No se agregan capas o servicios ficticios.

### VIII. Secretos solo en entornos seguros

Los secretos privados se almacenan únicamente en entornos seguros y archivos locales no versionados. El frontend nunca recibe secretos; las variables `VITE_*` se consideran públicas al compilarse para el navegador.

### IX. `main` siempre desplegable

`main` representa producción y debe permanecer desplegable. `develop` concentra integración y pruebas; el trabajo aislado se realiza en `feature/*` antes de integrarse.

### X. Simplicidad de hackathon

Se priorizan velocidad, claridad, deployabilidad y soluciones mínimas sobre arquitectura innecesaria. Cualquier complejidad adicional debe estar justificada por un requisito actual.

### XI. Contratos explícitos entre frontend y backend

Las features que conecten cliente y API definen rutas, métodos, entradas, salidas, errores y requisitos de autenticación antes de implementar ambos extremos.

### XII. SDD en español

Los artefactos SDD propios del proyecto se redactan en español: Constitución, especificaciones, planes, tareas, checklists y decisiones asociadas.

## Reglas de trabajo

- No se hace push sin autorización humana explícita, salvo instrucción explícita posterior que lo habilite.
- Antes de implementar una feature con SDD se consultan sus artefactos vigentes.
- Los cambios deben mantener separadas las responsabilidades del frontend, Supabase y Express.

## Gobernanza

Esta Constitución guía las decisiones técnicas y de proceso del monorepo. Sus enmiendas requieren aprobación humana, actualización versionada de este documento y una justificación breve cuando afecten el flujo de trabajo o la seguridad.

**Versión**: 1.0.0 | **Ratificada**: 2026-09-24 | **Última enmienda**: 2026-09-24
