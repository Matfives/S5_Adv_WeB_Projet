<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">USER DIRECTORY</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ user ? user.user_name : 'User not found' }}</h1>
        <div class="crud-actions">
          <router-link :to="{ name: 'Users' }" class="crud-button crud-button-secondary">Back to users</router-link>
          <router-link v-if="user" :to="{ name: 'UserEdit', params: { id: user.user_id } }" class="crud-button">Edit</router-link>
        </div>
      </div>

      <section v-if="user" class="crud-panel" aria-label="User details">
        <dl class="crud-datasheet">
          <dt>User ID</dt><dd>{{ user.user_id }}</dd>
          <dt>Name</dt><dd>{{ user.user_name }}</dd>
          <dt>Type</dt><dd>{{ user.user_type }}</dd>
          <dt>Phone</dt><dd>{{ user.user_phone }}</dd>
          <dt>Birthdate</dt><dd>{{ user.user_birthdate }}</dd>
          <dt>City</dt><dd>{{ user.user_city }}</dd>
          <dt>Restaurant</dt><dd>{{ restaurant ? restaurant.rest_name : 'Unknown restaurant' }} (ID {{ user.rest_id }})</dd>
        </dl>
      </section>
      <p v-else class="crud-panel">No user matches this ID. Return to the directory to select an existing user.</p>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'UserDetailView',
  components: { Navbar },
  computed: {
    user() {
      return restaurantData.Users.find(user => String(user.user_id) === this.$route.params.id)
    },
    restaurant() {
      return this.user
        ? restaurantData.Restaurants.find(restaurant => restaurant.rest_id === this.user.rest_id)
        : null
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
