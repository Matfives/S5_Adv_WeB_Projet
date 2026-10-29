<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">USER ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'User not found' : isEdit ? 'Edit user' : 'Add new user' }}</h1>
        <router-link :to="{ name: 'Users' }" class="crud-button crud-button-secondary">Back to users</router-link>
      </div>

      <p v-if="isMissing" class="crud-panel">No user matches this ID. Return to the directory to select an existing user.</p>
      <form v-else class="crud-panel" @submit.prevent="submitPrototype">
        <p class="crud-note">Frontend prototype. This form previews user information; changes are not saved.</p>
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
          <button type="submit" class="crud-button">Submit</button>
          <router-link :to="cancelLocation" class="crud-button crud-button-secondary">Cancel</router-link>
        </div>
        <p v-if="submitted" class="crud-status" role="status">Frontend prototype: data will be saved by the backend later. No changes have been saved.</p>
      </form>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'UserFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      submitted: false,
      restaurants: restaurantData.Restaurants,
      userTypes: [...new Set(restaurantData.Users.map(user => user.user_type))].sort()
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'UserEdit'
    },
    user() {
      return restaurantData.Users.find(user => String(user.user_id) === this.$route.params.id)
    },
    isMissing() {
      return this.isEdit && !this.user
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
        // Database user types are form data, separate from authentication roles.
        // Copy scalar values so editing never changes the imported user record.
        this.form = this.isEdit && this.user ? { ...this.user } : {
          user_name: '', user_type: '', user_phone: '', user_birthdate: '', user_city: '', rest_id: ''
        }
        this.submitted = false
      }
    }
  },
  methods: {
    submitPrototype() {
      this.submitted = true
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
