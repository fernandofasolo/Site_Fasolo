const BASE = import.meta.env.VITE_API_BASE ?? ''
export const apiFetch = (path, opts) => fetch(`${BASE}${path}`, opts)
