import axios from 'axios'

// In dev, we proxy /api to http://localhost:8082 via Vite (vite.config.ts)
// In prod, set VITE_PACKS_API_URL to the absolute backend URL.
const baseURL = import.meta.env.VITE_PACKS_API_URL ?? ''

export const http = axios.create({ baseURL })


