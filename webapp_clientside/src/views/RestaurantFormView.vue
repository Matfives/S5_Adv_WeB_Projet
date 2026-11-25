<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">LOCATION ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'Restaurant not found' : isEdit ? 'Edit restaurant' : 'Add new restaurant' }}</h1>
        <router-link :to="{ name: 'Restaurants' }" class="crud-button crud-button-secondary">Back to restaurants</router-link>
      </div>

      <p v-if="loading" class="crud-panel" role="status">Loading...</p>
      <p v-else-if="isMissing" class="crud-panel">No restaurant matches this ID. Return to the directory to select an existing restaurant.</p>
      <form v-else class="crud-panel" @submit.prevent="submit">
        <div class="crud-form-grid">
          <div class="crud-field crud-field-wide">
            <label for="restaurant-name">Restaurant name</label>
            <input id="restaurant-name" v-model="form.rest_name" type="text" required />
          </div>
          <div class="crud-field crud-field-wide">
            <label for="restaurant-address">Address</label>
            <textarea id="restaurant-address" v-model="form.rest_adress" rows="3" required></textarea>
          </div>
          <div class="crud-field">
            <label for="restaurant-size">Size</label>
            <select id="restaurant-size" v-model="form.rest_size" required>
              <option value="" disabled>Select a size</option>
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="crud-field">
            <label for="restaurant-phone">Phone</label>
            <input id="restaurant-phone" v-model="form.rest_phone" type="tel" inputmode="numeric" pattern="[0-9]*" required />
          </div>
          <div class="crud-field crud-field-wide">
            <label for="restaurant-hours">Opening hours</label>
            <input id="restaurant-hours" v-model="form.rest_hours" type="text" placeholder="e.g. 09:00-23:00" required />
          </div>
        </div>
        <div class="crud-actions">
          <button type="submit" class="crud-button" :disabled="saving">{{ saving ? 'Saving...' : 'Submit' }}</button>
          <router-link :to="cancelLocation" class="crud-button crud-button-secondary">Cancel</router-link>
        </div>
        <p v-if="error" class="crud-status" role="alert">{{ error }}</p>
      </form>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { apiGet, apiSend } from '@/services/api'

export default {
  name: 'RestaurantFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      restaurants: [],
      loading: true,
      saving: false,
      error: ''
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'RestaurantEdit'
    },
    restaurant() {
      return this.restaurants.find(restaurant => String(restaurant.rest_id) === this.$route.params.id)
    },
    sizes() {
      return [...new Set(this.restaurants.map(restaurant => restaurant.rest_size))].filter(Boolean).sort()
    },
    isMissing() {
      return this.isEdit && !this.loading && !this.restaurant
    },
    cancelLocation() {
      return this.isEdit && this.restaurant
        ? { name: 'RestaurantDetail', params: { id: this.restaurant.rest_id } }
        : { name: 'Restaurants' }
    }
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler() {
        this.load()
      }
    }
  },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      try {
        this.restaurants = (await apiGet('/restaurants')) || []
      } catch {
        this.error = 'Unable to load data. Check that the backend is running.'
      }
      // All restaurant fields are scalar values; inputs use a separate copy.
      this.form = this.isEdit && this.restaurant ? { ...this.restaurant } : {
        rest_name: '', rest_adress: '', rest_size: '', rest_phone: '', rest_hours: ''
      }
      this.loading = false
    },
    async submit() {
      this.saving = true
      this.error = ''
      try {
        if (this.isEdit) {
          await apiSend('PUT', `/restaurants/${this.restaurant.rest_id}`, this.form)
        } else {
          await apiSend('POST', '/restaurants', this.form)
        }
        this.$router.push({ name: 'Restaurants' })
      } catch (e) {
        this.error = e.message
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>