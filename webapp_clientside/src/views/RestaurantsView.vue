<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">OUR LOCATIONS</p>
      <div class="crud-toolbar">
        <h2>Restaurants</h2>
        <router-link v-if="isAdmin" :to="{ name: 'RestaurantNew' }" class="crud-button">Add new restaurant</router-link>
      </div>

      <div class="location-directory">
        <article class="location-card" v-for="restaurant in restaurants" :key="restaurant.rest_id">
          <div class="location-information">
            <h3>{{ restaurant.rest_name }}</h3>
            <p class="location-address"><strong>Address:</strong> {{ restaurant.rest_adress }}</p>
            <dl class="location-facts">
              <div><dt>Capacity (Size)</dt><dd>{{ restaurant.rest_size }}</dd></div>
              <div><dt>Phone</dt><dd>{{ restaurant.rest_phone }}</dd></div>
              <div><dt>Opening hours</dt><dd>{{ restaurant.rest_hours }}</dd></div>
            </dl>
          </div>
          <div class="crud-actions location-actions">
            <router-link :to="{ name: 'RestaurantDetail', params: { id: restaurant.rest_id } }" class="crud-button crud-button-secondary">Show</router-link>
            <template v-if="isAdmin">
              <router-link :to="{ name: 'RestaurantEdit', params: { id: restaurant.rest_id } }" class="crud-button crud-button-secondary">Edit</router-link>
              <button type="button" class="crud-button crud-button-secondary" disabled title="Deletion is unavailable in this frontend prototype">Delete</button>
            </template>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'
import { authState } from '@/services/auth'

export default {
  name: 'RestaurantsView',
  components: { Navbar },
  data() {
    return { restaurants: restaurantData.Restaurants }
  },
  computed: {
    isAdmin() {
      return authState.role === 'admin'
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 900px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin: 0; }
.location-directory { display: grid; gap: 20px; }
.location-card { background: white; padding: 28px; border-radius: 6px; border: 1px solid #eae5de; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 24px; }
.location-card h3 { margin: 0 0 12px; font-weight: 500; font-size: 22px; overflow-wrap: anywhere; }
.location-address { font-size: 14px; color: #555; margin: 0; line-height: 1.6; overflow-wrap: anywhere; }
.location-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin: 24px 0 0; font-size: 14px; }
.location-facts dt { color: #777; font-size: 12px; margin-bottom: 8px; }
.location-facts dd { margin: 0; overflow-wrap: anywhere; }
.location-actions { flex-direction: column; align-items: stretch; justify-content: center; border-left: 1px solid #eae5de; padding-left: 24px; }
@media (max-width: 700px) {
  .location-card { grid-template-columns: minmax(0, 1fr); padding: 22px; }
  .location-facts { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
  .location-actions { flex-direction: row; justify-content: flex-start; border-left: none; border-top: 1px solid #eae5de; padding: 20px 0 0; }
}
</style>
