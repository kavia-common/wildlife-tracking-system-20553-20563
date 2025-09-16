import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

# Load environment variables via .env if python-dotenv is installed.
try:
    from dotenv import load_dotenv  # type: ignore
    load_dotenv()
except Exception:
    # It's okay if python-dotenv isn't installed in some environments.
    pass

APP_TITLE = "Wildlife Tracking API"
APP_DESCRIPTION = (
    "Backend API for tracking animals (e.g., sloth bears) in forest environments. "
    "Provides endpoints for listing animals, fetching details, and monitoring locations. "
    "See the frontend for map visualization and controls."
)
APP_VERSION = "0.1.0"

openapi_tags = [
    {"name": "health", "description": "Service health and diagnostics."},
    {"name": "animals", "description": "Animal listing and details."},
]

app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    openapi_tags=openapi_tags,
)


class Animal(BaseModel):
    """Animal model used for API responses."""
    id: str = Field(..., description="Unique animal identifier.")
    name: str = Field(..., description="Display name of the animal.")
    species: str = Field(..., description="Species name.")
    last_seen_lat: float = Field(..., description="Last seen latitude.")
    last_seen_lng: float = Field(..., description="Last seen longitude.")
    last_seen_ts: str = Field(..., description="ISO timestamp of last sighting.")
    status: Optional[str] = Field(None, description="Status note, e.g., active, resting.")


# In-memory sample datastore for scaffolding purposes only.
SAMPLE_ANIMALS: List[Animal] = [
    Animal(
        id="SLB-001",
        name="Kavi",
        species="Sloth Bear",
        last_seen_lat=12.9141,
        last_seen_lng=77.6387,
        last_seen_ts="2025-09-10T08:35:00Z",
        status="active",
    ),
    Animal(
        id="SLB-002",
        name="Aru",
        species="Sloth Bear",
        last_seen_lat=12.9716,
        last_seen_lng=77.5946,
        last_seen_ts="2025-09-11T12:12:00Z",
        status="resting",
    ),
]


# PUBLIC_INTERFACE
@app.get("/health", tags=["health"], summary="Health check", description="Returns service status for readiness/liveness checks.")
def health():
    """Health check endpoint returning a simple status."""
    return {"status": "ok", "service": APP_TITLE, "version": APP_VERSION}


# PUBLIC_INTERFACE
@app.get(
    "/animals",
    response_model=List[Animal],
    tags=["animals"],
    summary="List animals",
    description="List tracked animals with optional search by species or name.",
)
def list_animals(
    q: Optional[str] = Query(None, description="Search term to match name or species."),
    species: Optional[str] = Query(None, description="Filter by species exactly."),
):
    """Return a list of animals filtered by optional query."""
    result = SAMPLE_ANIMALS
    if species:
        result = [a for a in result if a.species.lower() == species.lower()]
    if q:
        ql = q.lower()
        result = [a for a in result if ql in a.name.lower() or ql in a.species.lower()]
    return result


# PUBLIC_INTERFACE
@app.get(
    "/animals/{animal_id}",
    response_model=Animal,
    tags=["animals"],
    summary="Get animal details",
    description="Fetch a specific animal's details by its identifier.",
)
def get_animal(animal_id: str):
    """Return details for a single animal by ID."""
    for a in SAMPLE_ANIMALS:
        if a.id == animal_id:
            return a
    raise HTTPException(status_code=404, detail="Animal not found")
