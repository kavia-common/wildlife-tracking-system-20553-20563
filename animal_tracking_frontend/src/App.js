import React, { useEffect, useMemo, useState } from "react";
import "./styles/theme.css";
import "./App.css";
import Header from "./components/Header";
import SidebarFilters from "./components/SidebarFilters";
import MapView from "./components/MapView";
import AnimalList from "./components/AnimalList";
import AnimalDetailModal from "./components/AnimalDetailModal";
import LoginModal from "./components/LoginModal";
import api from "./services/api";
import { getToken } from "./services/auth";

/**
 * Root application with Ocean Professional theme and main layout.
 * PUBLIC_INTERFACE
 */
function App() {
  const [filters, setFilters] = useState({});
  const [animals, setAnimals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [error, setError] = useState("");

  // Initialize API with saved token if present
  useEffect(() => {
    const token = getToken();
    if (token) {
      api.setToken(token);
    }
  }, []);

  // Fetch animals when filters change
  useEffect(() => {
    let active = true;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const params = {};
        if (filters.type) params.type = filters.type;
        if (filters.location) params.location = filters.location;
        if (filters.status) params.status = filters.status;
        const data = await api.listAnimals(params);
        if (!active) return;
        // Data shape fallback
        const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        setAnimals(items);
      } catch (err) {
        if (!active) return;
        setError(err?.message || "Failed to load animals");
        setAnimals([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [filters]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="card" style={{ padding: 16 }}>
          <div className="title-3">Loading...</div>
          <div className="caption">Fetching latest tracked animals</div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="card" style={{ padding: 16, borderColor: "rgba(239,68,68,0.3)" }}>
          <div className="title-3" style={{ color: "#B91C1C" }}>Failed to load data</div>
          <div className="caption">{error}</div>
        </div>
      );
    }
    return (
      <div className="main-content">
        <MapView animals={animals} onSelect={setSelected} />
        <AnimalList animals={animals} onSelect={setSelected} />
      </div>
    );
  }, [animals, loading, error]);

  return (
    <div className="layout">
      <div className="header">
        <Header onLoginClick={() => setLoginOpen(true)} />
      </div>
      <div className="sidebar">
        <SidebarFilters onChange={setFilters} />
      </div>
      <main className="main">
        {content}
      </main>
      <AnimalDetailModal animal={selected} onClose={() => setSelected(null)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}

export default App;
