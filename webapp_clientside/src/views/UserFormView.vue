<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">USER ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'User not found' : isEdit ? 'Edit user' : 'Add new user' }}</h1>
        <router-link :to="{ name: 'Users' }" class="crud-button crud-button-secondary">Back to users</router-link>
      </div>

      <p v-if="loading" class="crud-panel" role="status">Loading...</p>
      <p v-else-if="isMissing" class="crud-panel">No user matches this ID. Return to the directory to select an existing user.</p>
      <form v-else class="crud-panel" @submit.prevent="submit">
        <div class="crud-form-grid">
          <div class="crud-field">
            <label for="user-name">Name</label>
            <input id="user-name" v-model="form.user_name" type="text" required />
          </div>
          <div class="crud-field">
            <label for="user-type">User type</label>
            <select id="user-type" v-model="form.user_type" required>
              <option value="" disabled>Select a user type</option>
              <option v-for="type in userTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="crud-field">
            <label for="user-phone">Phone</label>
            <input id="user-phone" v-model="form.user_phone" type="tel" required />
          </div>
          <div class="crud-field">
            <label for="user-birthdate">Birthdate</label>
            <input id="user-birthdate" v-model="form.user_birthdate" type="date" required />
          </div>
          <div class="crud-field">
            <label for="user-city">City</label>
            <input id="user-city" v-model="form.user_city" type="text" required />
          </div>
          <div class="crud-field">
            <label for="user-restaurant">Restaurant</label>
            <select id="user-restaurant" v-model="form.rest_id" required>
              <option value="" disabled>Select a restaurant</option>
              <option v-for="restaurant in restaurants" :key="restaurant.rest_id" :value="restaurant.rest_id">{{ restaurant.rest_name }} (ID {{ restaurant.rest_id }})</option>
            </select>
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
  name: 'UserFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      users: [],
      restaurants: [],
      loading: true,
      saving: false,
      error: ''
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'UserEdit'
    },
    user() {
      return this.users.find(user => String(user.user_id) === this.$route.params.id)
    },
    userTypes() {
      // Database user types are form data, separate from authentication roles.
      return [...new Set(this.users.map(user => user.user_type))].filter(Boolean).sort()
    },
    isMissing() {
      return this.isEdit && !this.loading && !this.user
    },
    cancelLocation() {
      return this.isEdit && this.user
        ? { name: 'UserDetail', params: { id: this.user.user_id } }
        : { name: 'Users' }
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
        const [users, restaurants] = await Promise.all([apiGet('/users'), apiGet('/restaurants')])
        this.users = users || []
        this.restaurants = restaurants || []
      } catch {
        this.error = 'Unable to load data. Check that the backend is running.'
      }
      // Copy scalar values so editing never changes the loaded record.
      this.form = this.isEdit && this.user ? { ...this.user } : {
        user_name: '', user_type: '', user_phone: '', user_birthdate: '', user_city: '', rest_id: ''
      }
      this.loading = false
    },
    async submit() {
      this.saving = true
      this.error = ''
      try {
        if (this.isEdit) {
          await apiSend('PUT', `/users/${this.user.user_id}`, this.form)
        } else {
          await apiSend('POST', '/users', this.form)
        }
        this.$router.push({ name: 'Users' })
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