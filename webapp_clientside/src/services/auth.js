/* eslint-env browser */
import { reactive, readonly } from 'vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

// Temporary frontend demo only. Replace this with backend authentication later.
// The localStorage role and router guards do not provide real security.
const SESSION_KEY = 'matking-demo-session'
const session = reactive({
  isAuthenticated: false,
  currentUser: null,
  role: 'visitor'
})

export const authState = readonly(session)
export const demoCustomers = restaurantData.Users.filter(user => user.user_type === 'Client')

function startSession(role, user) {
  session.isAuthenticated = true
  session.currentUser = user
  session.role = role

  try {
    // Save only the role and ID; restore customer details from the JSON.
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      role,
      userId: role === 'customer' ? user.user_id : null
    }))
  } catch {
    // If browser storage is disabled, the demo works until the page is refreshed.
  }
}

export function loginCustomer(userId) {
  const user = demoCustomers.find(customer => String(customer.user_id) === String(userId))
  if (!user) return false

  startSession('customer', user)
  return true
}

export function loginAdmin() {
  // This demo role is separate from customer records; no real admin account exists yet.
  startSession('admin', { user_name: 'Demo administrator', user_type: 'Administrator' })
}

export function logout() {
  session.isAuthenticated = false
  session.currentUser = null
  session.role = 'visitor'

  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // The in-memory session is cleared even when browser storage is unavailable.
  }
}

export function restoreSession() {
  try {
    const savedSession = JSON.parse(localStorage.getItem(SESSION_KEY))

    if (savedSession && savedSession.role === 'customer') {
      if (!loginCustomer(savedSession.userId)) logout()
    } else if (savedSession && savedSession.role === 'admin') {
      loginAdmin()
    } else {
      logout()
    }
  } catch {
    // Discard malformed or unavailable storage instead of blocking the website.
    logout()
  }
}
