import React from "react";
import "../styles/theme.css";

/**
 * Modal for selected animal details
 * PUBLIC_INTERFACE
 */
export default function AnimalDetailModal({ animal, onClose }) {
  if (!animal) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Animal details">
      <div className="modal">
        <div className="modal-header">
          <div className="avatar">🧭</div>
          <div>
            <div className="title-2">{animal.name || `Animal #${animal.id}`}</div>
            <div className="caption">{(animal.type || "unknown").toUpperCase()}</div>
          </div>
          <div className="space" />
          <button className="btn" onClick={onClose} aria-label="Close details">Close</button>
        </div>
        <div className="modal-body">
          <div className="row" style={{ gap: 12, marginBottom: 12 }}>
            <span className="badge">Status: {animal.status || "unknown"}</span>
            <span className="badge">Last Seen: {animal.last_seen_at ? new Date(animal.last_seen_at).toLocaleString() : "N/A"}</span>
          </div>
          <div className="card" style={{ padding: 12, marginBottom: 12 }}>
            <div className="title-3" style={{ marginBottom: 8 }}>Location</div>
            <div className="caption">{animal.last_seen_location || "Unknown"}</div>
            {animal.coordinates && (
              <div className="caption">Lat: {animal.coordinates.lat}, Lng: {animal.coordinates.lng}</div>
            )}
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="title-3" style={{ marginBottom: 8 }}>Metadata</div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(animal.metadata || {}, null, 2)}
            </pre>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
