<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">ADMINISTRATION</p>
      <h2>Admin Dashboard</h2>
      <p class="demo-note">Administrator demo. Browse the available sample records.</p>

      <div class="dashboard-grid">
        <router-link v-for="card in cards" :key="card.label" :to="card.to" class="dashboard-card">
          <h3>{{ card.label }}</h3>
          <p>{{ card.count }} records</p>
          <span>View {{ card.label.toLowerCase() }}</span>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'AdminDashboardView',
  components: { Navbar },
  data() {
    return {
      cards: [
        { label: 'Restaurants', count: restaurantData.Restaurants.length, to: '/restaurants' },
        { label: 'Users', count: restaurantData.Users.length, to: '/users' },
        { label: 'Dishes', count: restaurantData.dish.length, to: '/dishes' },
        { label: 'Orders', count: restaurantData.order_.length, to: '/admin/orders' }
      ]
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 1100px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.demo-note { font-size: 14px; color: #777; margin-bottom: 25px; }
.dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.dashboard-card { display: block; background: white; padding: 25px; border-radius: 6px; border: 1px solid #eae5de; color: #292929; text-decoration: none; }
.dashboard-card:hover { border-color: #292929; }
.dashboard-card h3 { margin: 0 0 10px; font-size: 18px; font-weight: 500; }
.dashboard-card p { font-size: 26px; margin-bottom: 15px; }
.dashboard-card span { font-size: 13px; color: #777; }
</style>
