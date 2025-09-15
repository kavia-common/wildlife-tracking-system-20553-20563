/**
 * Simple auth state management using localStorage.
 * PUBLIC_INTERFACE
 */
import api from "./api";

const TOKEN_KEY = "animal_tracking_token";

// PUBLIC_INTERFACE
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  return Boolean(getToken());
}

// PUBLIC_INTERFACE
export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  api.setToken(token);
}

// PUBLIC_INTERFACE
export async function login({ username, password }) {
  const result = await api.login({ username, password });
  // expecting { access_token: "..." } or similar
  const token = result?.access_token || result?.token || null;
  if (!token) throw new Error("Invalid login response");
  setToken(token);
  return result;
}

// PUBLIC_INTERFACE
export async function logout() {
  try {
    await api.logout();
  } catch {
    // ignore
  }
  setToken(null);
}
