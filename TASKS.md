# Tasks and Issues

Current state:
- No previous app code existed; scaffold created for backend (FastAPI) and frontend (static).

Immediate next actions:
1. Backend
   - Add CORS middleware using `CORS_ORIGINS` env var.
   - Replace in-memory sample data with a database; define SQLAlchemy models.
   - Introduce pagination on `/animals`.
   - Add POST/PUT endpoints for ingesting telemetry (if required).
   - Add WebSocket endpoint for real-time location updates and document it in OpenAPI.

2. Frontend
   - Transition to Vite + React following the Ocean Professional theme.
   - Integrate a map library (Leaflet or Mapbox GL) to display animal locations.
   - Add a detail panel with recent movement history.

3. Tooling
   - Add Dockerfiles and docker-compose for local dev.
   - Add CI (linting, type checks, basic API tests).

Environment:
- Provide `.env` based configuration; ensure secrets are never committed.
