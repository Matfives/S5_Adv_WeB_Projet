<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-brand">
        <div class="brand">Chez Matking</div>
        <p class="tagline">Good food from local restaurants, delivered to your door.</p>
      </div>

      <nav
        v-for="group in groups"
        :key="group.title"
        class="footer-group"
        :aria-label="group.title"
      >
        <h2 class="group-title">{{ group.title }}</h2>
        <router-link v-for="link in group.links" :key="link.to" :to="link.to">
          {{ link.label }}
        </router-link>
      </nav>
    </div>

    <div class="footer-bottom">
      <span>&copy; {{ year }} Chez Matking. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
import { authState } from '@/services/auth'

export default {
  name: 'AppFooter',
  data() {
    return { auth: authState }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    groups() {
      if (this.auth.role === 'admin') {
        return [
          {
            title: 'Management',
            links: [
              { to: '/admin', label: 'Admin Dashboard' },
              { to: '/admin/orders', label: 'Orders' },
              { to: '/users', label: 'Users' }
            ]
          },
          {
            title: 'Catalog',
            links: [
              { to: '/restaurants', label: 'Restaurants' },
              { to: '/dishes', label: 'Dishes' }
            ]
          }
        ]
      }

      const account =
        this.auth.role === 'customer'
          ? [
              { to: '/my-orders', label: 'My orders' },
              { to: '/profile', label: 'My profile' }
            ]
          : [{ to: '/login', label: 'Login' }]

      return [
        {
          title: 'Discover',
          links: [
            { to: '/', label: 'Home' },
            { to: '/restaurants', label: 'Restaurants' },
            { to: '/dishes', label: 'Our dishes' }
          ]
        },
        { title: 'Account', links: account }
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  padding: 32px 5% 16px;
  background: #ffffff;
  border-top: 1px solid #eae5de;
  font-family: Arial, sans-serif;
  color: #555;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
}

.footer-brand {
  max-width: 280px;
}

.brand {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #292929;
}

.tagline {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.5;
}

.footer-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 120px;
}

.group-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: bold;
  color: #292929;
}

.footer-group a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
}

.footer-group a:hover,
.footer-group a:focus-visible,
.footer-group a.router-link-exact-active {
  color: #292929;
  font-weight: bold;
}

.footer-bottom {
  margin-top: 28px;
  padding-top: 14px;
  border-top: 1px solid #eae5de;
  font-size: 13px;
}

@media (max-width: 600px) {
  .footer-main { gap: 24px; }
  .footer-brand { max-width: 100%; }
}
</style>
