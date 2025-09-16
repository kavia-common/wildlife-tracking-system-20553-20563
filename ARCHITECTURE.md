# Architecture Overview

This repository contains a minimal scaffold to begin development of the Wildlife Tracking application.

## Components

- Backend (FastAPI)
  - Provides REST API for listing animals and fetching details.
  - In-memory sample data for now (to be replaced with a DB).
  - OpenAPI documentation and tagging prepared for expansion.
- Frontend (Static HTML/CSS/JS)
  - Consumes the backend API.
  - Implements search and filter UI, details panel, and Ocean Professional theme.

## Environment & Config

- Backend reads environment variables using `python-dotenv` if available.
- `.env.example` lists variables to consider:
  - LOG_LEVEL
  - DATABASE_URL
  - CORS_ORIGINS

## Planned Enhancements

- Database integration with proper models and migrations.
- CORS configuration and security hardening.
- Real-time updates via WebSocket (position updates).
- Map visualization (Leaflet or Mapbox GL).
- Production-ready frontend (React + Vite) with routing and state management.
- CI/CD pipeline and containerization (Docker).
