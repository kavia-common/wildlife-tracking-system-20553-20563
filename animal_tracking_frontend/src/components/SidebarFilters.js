import React, { useState, useEffect } from "react";
import "../styles/theme.css";

/**
 * Sidebar filters panel
 * PUBLIC_INTERFACE
 */
export default function SidebarFilters({ initial = {}, onChange }) {
  const [type, setType] = useState(initial.type || "");
  const [location, setLocation] = useState(initial.location || "");
  const [status, setStatus] = useState(initial.status || "");

  useEffect(() => {
    onChange?.({ type, location, status });
  }, [type, location, status, onChange]);

  return (
    <aside className="sidebar sidebar-panel" aria-label="Filters">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="title-3">Filters</div>
        <span className="badge">Live</span>
      </div>
      <div>
        <label className="caption">Animal Type</label>
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Animal Type"
        >
          <option value="">All</option>
          <option value="bear">Sloth Bear</option>
          <option value="tiger">Tiger</option>
          <option value="elephant">Elephant</option>
          <option value="leopard">Leopard</option>
        </select>
      </div>
      <div>
        <label className="caption">Location</label>
        <input
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Bandipur"
          aria-label="Location"
        />
      </div>
      <div>
        <label className="caption">Status</label>
        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Status"
        >
          <option value="">Any</option>
          <option value="active">Active</option>
          <option value="resting">Resting</option>
          <option value="missing">Missing</option>
        </select>
      </div>
      <div className="row">
        <button
          className="btn"
          onClick={() => {
            setType(""); setLocation(""); setStatus("");
          }}
        >
          Reset
        </button>
        <div className="space" />
        <span className="caption">Tip: Filters auto-apply</span>
      </div>
    </aside>
  );
}
