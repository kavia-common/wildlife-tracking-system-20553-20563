import React, { useState } from "react";
import "../styles/theme.css";
import { login } from "../services/auth";

/**
 * Login modal for authentication
 * PUBLIC_INTERFACE
 */
export default function LoginModal({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login({ username, password });
      onClose?.();
      window.location.reload();
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Login">
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <div className="logo">🔐</div>
          <div className="title-2">Sign in</div>
          <div className="space" />
          <button className="btn" onClick={onClose} aria-label="Close login">Close</button>
        </div>
        <form className="modal-body" onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <label className="caption">Username</label>
              <input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="caption">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <div className="card" style={{ padding: 10, borderColor: "rgba(239,68,68,0.3)" }}>
                <div className="caption" style={{ color: "#B91C1C" }}>{error}</div>
              </div>
            )}
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
