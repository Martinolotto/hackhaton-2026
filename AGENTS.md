# Hackhaton 2026

Monorepo de un único producto. Martino trabaja principalmente en `backend/` y Gastón en `frontend/`; ambos conservan la autoridad humana final.

- `main` es producción, `develop` integración y `feature/*` trabajo aislado.
- No hacer push sin autorización humana explícita.
- La documentación y los artefactos SDD se redactan en español.
- `frontend/` contiene el cliente y `backend/` la API.
- Supabase resuelve por defecto el CRUD común mediante RLS. Express se reserva para lógica específica, integraciones y operaciones privilegiadas.
- Nunca colocar secretos privados en el frontend.
- Priorizar simplicidad y velocidad de hackathon; evitar sobrearquitectura.
- Antes de implementar una feature gestionada con SDD, consultar sus artefactos correspondientes.
