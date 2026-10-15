<template>
  <header class="navbar">
    <div class="brand">Chez Matking</div>
    <nav class="nav-links" aria-label="Main navigation">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="{ 'login-link': link.to === '/login' }"
      >
        {{ link.label }}
      </router-link>
      <button v-if="auth.isAuthenticated" type="button" class="login-link logout-button" @click="signOut">
        Logout
      </button>
    </nav>
  </header>
</template>

<script>
import { authState, logout } from '@/services/auth'

export default {
  name: 'AppNavbar',
  data() {
    return { auth: authState }
  },
  computed: {
    links() {
      if (this.auth.role === 'admin') {
        return [
          { to: '/admin', label: 'Admin Dashboard' },
          { to: '/restaurants', label: 'Restaurants' },
          { to: '/users', label: 'Users' },
          { to: '/dishes', label: 'Dishes' },
          { to: '/admin/orders', label: 'Orders' }
        ]
      }

      const links = [
        { to: '/', label: 'Home' },
        { to: '/restaurants', label: 'Restaurants' },
        { to: '/dishes', label: 'Our dishes' }
      ]

      if (this.auth.role === 'customer') {
        links.push(
          { to: '/my-orders', label: 'My orders' },
          { to: '/profile', label: 'My profile' }
        )
      } else {
        links.push({ to: '/login', label: 'Login' })
      }

      return links
    }
  },
  methods: {
    signOut() {
      logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  min-height: 70px;
  padding: 12px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: #ffffff;
  border-bottom: 1px solid #eae5de;
  font-family: Arial, sans-serif;
}

.brand {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #292929;
}

.nav-links {
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: #292929;
  font-weight: bold;
}

.login-link {
  padding: 8px 16px;
  background: #292929;
  color: white !important;
  border-radius: 4px;
}

.logout-button {
  border: none;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .nav-links { gap: 12px; }
}
</style>