<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">OUR MENU</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ dish ? dish.dish_name : 'Dish not found' }}</h1>
        <div class="crud-actions">
          <router-link :to="{ name: 'Dishes' }" class="crud-button crud-button-secondary">Back to dishes</router-link>
          <router-link v-if="dish && isAdmin" :to="{ name: 'DishEdit', params: { id: dish.dish_id } }" class="crud-button">Edit</router-link>
        </div>
      </div>

      <section v-if="dish" class="crud-panel" aria-label="Dish details">
        <dl class="crud-datasheet">
          <dt>Dish ID</dt><dd>{{ dish.dish_id }}</dd>
          <dt>Name</dt><dd>{{ dish.dish_name }}</dd>
          <dt>Type</dt><dd>{{ dish.dish_type }}</dd>
          <dt>Price</dt><dd>{{ dish.dish_price.toFixed(2) }} EUR</dd>
          <dt>Calories</dt><dd>{{ dish.dish_calories }} kcal</dd>
          <dt>Ingredients</dt><dd>{{ dish.dish_ingredients }}</dd>
        </dl>
      </section>
      <p v-else class="crud-panel">No dish matches this ID. Return to the menu to browse our dishes.</p>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'
import { authState } from '@/services/auth'

export default {
  name: 'DishDetailView',
  components: { Navbar },
  computed: {
    dish() {
      return restaurantData.dish.find(dish => String(dish.dish_id) === this.$route.params.id)
    },
    isAdmin() {
      return authState.role === 'admin'
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
