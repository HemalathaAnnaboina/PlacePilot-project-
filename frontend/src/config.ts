/**
 * PlacePilot Client Configuration
 * Resolves the backend API base URL:
 * 1. Uses VITE_API_URL environment variable if set (e.g. at build time or local env)
 * 2. In production builds (deployed to Embarko), defaults to the Render HTTPS backend
 * 3. In local development, defaults to '/api'
 */
export const BACKEND_API_BASE_URL: string = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  if (import.meta.env.PROD) {
    return 'https://placepilot-backend.onrender.com/api';
  }
  return '/api';
})();

