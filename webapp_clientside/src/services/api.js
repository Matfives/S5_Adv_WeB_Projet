/* eslint-env browser */
const API_URL = 'http://localhost:9000/api'

// Returns null on 404, throws on other errors.
export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`)
  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`Request failed (HTTP ${response.status})`)
  }
  return response.json()
}

// POST / PUT / DELETE. Throws an Error carrying the server's message.
export async function apiSend(method, path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  })
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error((data && data.error) || `Request failed (HTTP ${response.status})`)
  }
  return data
}