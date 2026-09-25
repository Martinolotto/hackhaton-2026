# Frontend — A tiempo

Cliente React/Vite del recorrido de evaluación guiada de interacciones digitales.

## Requisitos

- Node.js 22 o superior.
- Un proyecto Supabase con Auth habilitado.
- El backend que expone `POST /api/evaluations` según el contrato compartido.

## Configuración local

1. Instala dependencias con `npm ci`.
2. Copia `.env.example` a `.env` y configura:

   ```dotenv
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=tu-clave-publicable
   VITE_API_URL=http://localhost:3000
   ```

   `VITE_API_URL` es la URL base del backend, sin incluir `/api/evaluations`.
   En Vercel debe configurarse con la URL pública de Render correspondiente al
   ambiente. Las variables `VITE_*` son públicas: no coloques secretos allí.

3. Inicia Vite con `npm run dev`.

La landing, `/login` y `/register` son públicas. `/evaluar` requiere una sesión
Supabase válida y envía `session.access_token` como Bearer token.

## Fixture visual de desarrollo

Si el backend todavía no está disponible, inicia sesión y abre:

```text
http://localhost:5173/evaluar?fixture=1
```

Este modo existe únicamente durante `vite dev`, muestra un aviso visible y usa
respuestas locales con la misma forma que OpenAPI. No se activa ante errores de
red y no funciona en builds de producción; la aplicación nunca sustituye un
fallo real por una evaluación fabricada.

## Validación

```bash
npm run lint
npm run build
```

Para una prueba manual completa, valida: acceso público, redirección de
`/evaluar` al login sin sesión, evaluación inicial, manejo de errores, una sola
reevaluación, comparación inicial/final y ausencia de un segundo formulario de
reevaluación.
