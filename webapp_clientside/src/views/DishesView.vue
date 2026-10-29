<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">OUR MENU</p>
      <div class="crud-toolbar">
        <h2>Our dishes</h2>
        <router-link v-if="isAdmin" :to="{ name: 'DishNew' }" class="crud-button">Add new dish</router-link>
      </div>

      <section class="section-block">
        <h3>Dishes menu</h3>
        <div class="dishes-grid">
          <div class="dish-card" v-for="dish in dishes" :key="dish.dish_id">
            <div class="dish-header">
              <span class="name">{{ dish.dish_name }}</span>
              <span class="price">{{ dish.dish_price.toFixed(2) }} EUR</span>
            </div>
            <p class="type">Type: {{ dish.dish_type }}</p>
            <p class="ingredients">Ingredients: {{ dish.dish_ingredients }}</p>
            <span class="calories">{{ dish.dish_calories }} kcal</span>
            <div class="crud-actions dish-actions">
              <router-link :to="{ name: 'DishDetail', params: { id: dish.dish_id } }" class="crud-button crud-button-secondary">Show</router-link>
              <template v-if="isAdmin">
                <router-link :to="{ name: 'DishEdit', params: { id: dish.dish_id } }" class="crud-button crud-button-secondary">Edit</router-link>
                <button type="button" class="crud-button crud-button-secondary" disabled title="Deletion is unavailable in this frontend prototype">Delete</button>
              </template>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'
import { authState } from '@/services/auth'

export default {
  name: 'DishesView',
  components: { Navbar },
  data() {
    return { dishes: restaurantData.dish }
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
.section-block { margin-bottom: 40px; }
.section-block h3 { font-size: 18px; font-weight: 500; margin-bottom: 15px; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 8px; }

.dishes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 15px; }
.dish-card { background: white; padding: 20px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 8px; }
.dish-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.name { font-weight: 500; font-size: 16px; }
.price { font-weight: bold; color: #292929; white-space: nowrap; }
.type, .ingredients, .calories { font-size: 13px; color: #666; margin: 0; }
.calories { font-style: italic; color: #888; }
.dish-actions { margin-top: auto; padding-top: 12px; }

</style>
