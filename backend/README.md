# Wildlife Tracking Backend

This is a minimal FastAPI scaffold for the Wildlife Tracking application.

## Features
- OpenAPI/Swagger docs at /docs
- Health endpoint at /health
- Animals endpoints:
  - GET /animals
  - GET /animals/{animal_id}
- In-memory sample data for development

## Running locally

1. Create and activate a virtual environment.
2. Install dependencies:
   pip install -r requirements.txt
3. Start the server:
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

The API docs will be available at:
- Swagger UI: http://localhost:8000/docs
- OpenAPI JSON: http://localhost:8000/openapi.json

## Environment variables

This service uses environment variables via a `.env` file if present.

See `.env.example` for the list of variables the application expects (all optional in this scaffold).
