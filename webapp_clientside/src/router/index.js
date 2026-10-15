import { createRouter, createWebHistory } from 'vue-router'
import { authState } from '@/services/auth'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('@/views/HomeView.vue') 
  },
  { 
    path: '/restaurants', 
    name: 'Restaurants', 
    component: () => import('@/views/RestaurantsView.vue') 
  },
  { 
    path: '/dishes', 
    name: 'Dishes', 
    component: () => import('@/views/DishesView.vue') 
  },
  { 
    path: '/servers', 
    name: 'Servers', 
    component: () => import('@/views/ServersView.vue'),
    meta: { role: 'customer' }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersView.vue'),
    meta: { role: 'admin' }
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('@/views/LoginView.vue') 
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    component: () => import('@/views/ProfileView.vue'),
    meta: { role: 'customer' }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('@/views/OrdersView.vue'),
    meta: { role: 'customer' }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('@/views/OrdersView.vue'),
    meta: { role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Frontend navigation rules for the demo. Real authorization must happen on the backend.
router.beforeEach(to => {
  if (!to.meta.role) return true
  if (!authState.isAuthenticated) return { name: 'Login' }
  if (authState.role !== to.meta.role) {
    return { name: authState.role === 'admin' ? 'AdminDashboard' : 'Home' }
  }
  return true
})

export default router