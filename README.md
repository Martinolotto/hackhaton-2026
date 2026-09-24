# Hackhaton 2026

Repositorio base para la hackathon de Martino y Gastón.

## Estructura

- `frontend/`: aplicación React, Vite, Tailwind y Supabase.
- `backend/`: pendiente de implementación.

## Workflow Git

- `main`: producción y Vercel.
- `develop`: integración y pruebas.
- `feature/*`: desarrollo por feature.

Flujo: `feature/*` → `develop` → `main`.

## Frontend local

```bash
cd frontend
npm install
npm run dev
```

Validaciones:

```bash
npm run lint
npm run build
```

## Vercel

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Production Branch: `main`

Configurar en Vercel las variables de entorno `VITE_*` requeridas por el frontend.
