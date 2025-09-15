import React from "react";
import "../styles/theme.css";

/**
 * MapView: Displays a map placeholder and markers for animals.
 * Replace with a real map library if needed.
 * PUBLIC_INTERFACE
 */
export default function MapView({ animals = [], onSelect }) {
  return (
    <section className="card map-view" aria-label="Map view">
      <div className="map-fallback">
        <div style={{ textAlign: "center" }}>
          <div className="title-2" style={{ marginBottom: 6 }}>Map View</div>
          <div className="caption">Integrate a real map later (e.g., MapLibre/Leaflet)</div>
        </div>
      </div>
      {/* Render lightweight marker chips at the top (visual hint) */}
      <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {animals.slice(0, 8).map((a) => (
          <button
            key={a.id}
            className="badge"
            style={{ cursor: "pointer", background: "rgba(245,158,11,0.12)", color: "#B45309", borderColor: "rgba(245,158,11,0.36)" }}
            onClick={() => onSelect?.(a)}
            title={`${a.name || a.id} (${a.type || "unknown"})`}
          >
            {a.name || `#${a.id}`}
          </button>
        ))}
      </div>
    </section>
  );
}
