export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  'https://winsume-lift-backend01.onrender.com';

export function apiUrl(path: string) {
  if (!path) return API_BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (!path.startsWith('/')) return `${API_BASE_URL}/${path}`;
  return `${API_BASE_URL}${path}`;
}

export function assetUrl(path?: string) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`;
  return path;
}

