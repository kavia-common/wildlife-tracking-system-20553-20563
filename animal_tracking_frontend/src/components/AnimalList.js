import React from "react";
import "../styles/theme.css";

/**
 * List of animals with quick info
 * PUBLIC_INTERFACE
 */
export default function AnimalList({ animals = [], onSelect }) {
  return (
    <section className="card" aria-label="Tracked animals" style={{ padding: 16 }}>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="title-3">Tracked Animals</div>
        <div className="space" />
        <span className="caption">{animals.length} total</span>
      </div>
      <div className="list" role="list">
        {animals.map((a) => (
          <div
            key={a.id}
            role="listitem"
            className="list-item"
            onClick={() => onSelect?.(a)}
          >
            <div className="avatar">🧭</div>
            <div style={{ display: "grid", gap: 4 }}>
              <div className="row" style={{ gap: 8 }}>
                <div className="title-3">{a.name || `Animal #${a.id}`}</div>
                <span className="badge">{(a.type || "unknown").toUpperCase()}</span>
              </div>
              <div className="caption">
                {a.last_seen_location || "Unknown location"} • {a.status || "unknown"} • {a.last_seen_at ? new Date(a.last_seen_at).toLocaleString() : "time N/A"}
              </div>
            </div>
            <div className="space" />
            <div className="caption">ID: {a.id}</div>
          </div>
        ))}
        {animals.length === 0 && (
          <div className="caption" style={{ padding: 12 }}>
            No animals match the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
