<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">OUR LOCATIONS</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ restaurant ? restaurant.rest_name : loading ? 'Loading...' : 'Restaurant not found' }}</h1>
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
      <p v-else-if="loading" class="crud-panel" role="status">Loading restaurant...</p>
      <p v-else-if="error" class="crud-panel" role="alert">{{ error }}</p>
      <p v-else class="crud-panel">No restaurant matches this ID. Return to the directory to browse our locations.</p>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { authState } from '@/services/auth'
import { apiGet } from '@/services/api'

export default {
  name: 'RestaurantDetailView',
  components: { Navbar },
  data() {
    return { restaurant: null, loading: true, error: '' }
  },
  computed: {
    isAdmin() {
      return authState.role === 'admin'
    }
  },
  async mounted() {
    try {
      this.restaurant = await apiGet(`/restaurants/${encodeURIComponent(this.$route.params.id)}`)
    } catch {
      this.error = 'Unable to load this restaurant. Check that the backend is running.'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>