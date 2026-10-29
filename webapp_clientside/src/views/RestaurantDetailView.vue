<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">OUR LOCATIONS</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ restaurant ? restaurant.rest_name : 'Restaurant not found' }}</h1>
        <div class="crud-actions">
          <router-link :to="{ name: 'Restaurants' }" class="crud-button crud-button-secondary">Back to restaurants</router-link>
          <router-link v-if="restaurant && isAdmin" :to="{ name: 'RestaurantEdit', params: { id: restaurant.rest_id } }" class="crud-button">Edit</router-link>
        </div>
      </div>

      <section v-if="restaurant" class="crud-panel" aria-label="Restaurant details">
        <dl class="crud-datasheet">
          <dt>Restaurant ID</dt><dd>{{ restaurant.rest_id }}</dd>
          <dt>Name</dt><dd>{{ restaurant.rest_name }}</dd>
          <dt>Address</dt><dd>{{ restaurant.rest_adress }}</dd>
          <dt>Size</dt><dd>{{ restaurant.rest_size }}</dd>
          <dt>Phone</dt><dd>{{ restaurant.rest_phone }}</dd>
          <dt>Opening hours</dt><dd>{{ restaurant.rest_hours }}</dd>
        </dl>
      </section>
      <p v-else class="crud-panel">No restaurant matches this ID. Return to the directory to browse our locations.</p>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'
import { authState } from '@/services/auth'

export default {
  name: 'RestaurantDetailView',
  components: { Navbar },
  computed: {
    restaurant() {
      return restaurantData.Restaurants.find(restaurant => String(restaurant.rest_id) === this.$route.params.id)
    },
    isAdmin() {
      return authState.role === 'admin'
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
