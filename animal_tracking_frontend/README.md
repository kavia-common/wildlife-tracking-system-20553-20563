# Animal Tracking Frontend (React)

Modern "Ocean Professional" UI for viewing and managing animal tracking data.

## Features
- Header with logo and navigation
- Sidebar with filters (type, location, status)
- Main content: Map view + Tracked animals list
- Detail modal for selected animal
- Auth login modal and token storage
- Theming with blue (#2563EB) and amber (#F59E0B) accents

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Configure environment
- Copy `.env.example` to `.env` and update `REACT_APP_API_BASE` to point to your FastAPI backend.

3. Run the app
```bash
npm start
```

## API Integration

- Base URL: `REACT_APP_API_BASE` (e.g., http://localhost:8000)
- Expected endpoints:
  - `GET /` health (optional)
  - `GET /animals` with optional `?type=&location=&status=` parameters
  - `GET /animals/{id}`
  - `POST /auth/login` -> returns `{ access_token }`
  - `POST /auth/logout`

Adjust src/services/api.js if your backend uses different paths.

## Styling
Global theme variables and layout are in `src/styles/theme.css`.
