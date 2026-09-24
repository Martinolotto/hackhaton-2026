# Backend

API mínima del monorepo, construida con Node.js, Express 5, CORS y dotenv.

## Desarrollo local

```bash
npm install
cp .env.example .env
npm run dev
```

Health check: `GET /api/health`.

`CORS_ORIGINS` acepta uno o más orígenes separados por coma.

## Render

- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check: `/api/health`
- Production Branch: `main`

Configurar las variables definidas en `.env.example` desde el panel de Render.
