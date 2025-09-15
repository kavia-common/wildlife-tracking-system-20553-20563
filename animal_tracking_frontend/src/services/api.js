/**
 * Lightweight API client to talk to FastAPI backend.
 * Uses environment variables for configuration.
 * PUBLIC_INTERFACE
 */
export class ApiClient {
  /**
   * Create a new ApiClient
   * @param {Object} options custom options
   */
  constructor(options = {}) {
    /** Base URL for backend API. Use REACT_APP_API_BASE if provided. */
    this.baseUrl =
      options.baseUrl ||
      process.env.REACT_APP_API_BASE ||
      "http://localhost:8000"; // Note: can be overridden via .env
    this.authToken = options.authToken || null;
  }

  setToken(token) {
    this.authToken = token || null;
  }

  // Build headers with optional auth
  _headers(extra = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...extra,
    };
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async _handle(res) {
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json().catch(() => ({})) : await res.text();
    if (!res.ok) {
      const detail = typeof payload === "string" ? payload : payload?.detail || res.statusText;
      throw new Error(detail || `Request failed: ${res.status}`);
    }
    return payload;
  }

  // PUBLIC_INTERFACE
  async health() {
    const res = await fetch(`${this.baseUrl}/`, { headers: this._headers() });
    return this._handle(res);
  }

  // PUBLIC_INTERFACE
  async listAnimals(params = {}) {
    const search = new URLSearchParams(params).toString();
    const res = await fetch(`${this.baseUrl}/animals${search ? `?${search}` : ""}`, {
      headers: this._headers(),
    });
    return this._handle(res);
  }

  // PUBLIC_INTERFACE
  async getAnimal(id) {
    const res = await fetch(`${this.baseUrl}/animals/${id}`, {
      headers: this._headers(),
    });
    return this._handle(res);
  }

  // PUBLIC_INTERFACE
  async login(credentials) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify(credentials),
    });
    return this._handle(res);
  }

  // PUBLIC_INTERFACE
  async logout() {
    const res = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers(),
    });
    return this._handle(res);
  }
}

const api = new ApiClient();
export default api;
