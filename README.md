# Wildlife Tracking System

An application for tracking animals such as sloth bears in forest environments, providing a frontend interface for users to view, search, and monitor animal movements, with backend services and a database for storing animal tracking data.

## Monorepo structure

- `frontend/` — Minimal static frontend (HTML/CSS/JS) consuming the API.
- `backend/` — FastAPI-based backend service exposing REST endpoints.

## Quickstart

### Backend
1. cd backend
2. python -m venv .venv && source .venv/bin/activate
3. pip install -r requirements.txt
4. uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Open http://localhost:8000/docs for API docs.

### Frontend
Open `frontend/index.html` via a static file server (e.g., VS Code Live Server) or any HTTP server. By default it calls the backend at `http://localhost:8000`.

To point the frontend to another API base, inject a global before `main.js`:
```html
<script>window.API_BASE_URL = "https://your-api-host";</script>
<script src="main.js"></script>
```

## Next steps
- Replace in-memory data with a real database.
- Add authentication/authorization.
- Integrate a map (Leaflet/Mapbox) to visualize locations.
- Build a modern frontend framework (e.g., Vite + React) following the Ocean Professional theme.
