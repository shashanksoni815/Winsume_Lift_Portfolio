const DEFAULT_API = "http://localhost:5000/api";

/** Vite: VITE_API_URL. CRA-style: REACT_APP_API_URL (via vite envPrefix). Docker: `/api` (same origin). */
function readApiBase(): string | undefined {
  const vite = import.meta.env.VITE_API_URL as string | undefined;
  const cra = (import.meta.env as { REACT_APP_API_URL?: string }).REACT_APP_API_URL;
  return vite ?? cra;
}

/** API base including `/api`, e.g. `http://localhost:5000/api` or relative `/api` */
export const API_ROOT = (readApiBase() ?? DEFAULT_API).replace(/\/$/, "");

/**
 * Origin for `/uploads` and full `/api/...` paths.
 * Empty string when API is same-origin (relative `/api`) so `/uploads/...` stays on the site host.
 */
export const BACKEND_ORIGIN = API_ROOT.startsWith("http")
  ? API_ROOT.replace(/\/api\/?$/, "") || API_ROOT
  : "";

/**
 * Build a request URL. Paths under the API mount, e.g. `/auth/login` → `/api/auth/login`.
 * Paths already starting with `/api/` are prefixed with BACKEND_ORIGIN (empty when same-origin).
 */
export function apiUrl(path: string): string {
  if (!path) return API_ROOT;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith("/api/") || p === "/api") {
    return `${BACKEND_ORIGIN}${p}`;
  }
  return `${API_ROOT}${p}`;
}

export function assetUrl(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads")) return `${BACKEND_ORIGIN}${path}`;
  return path;
}

/** @deprecated use BACKEND_ORIGIN */
export const API_BASE_URL = BACKEND_ORIGIN || "";
