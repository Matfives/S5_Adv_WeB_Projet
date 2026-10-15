<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">OUR MENU</p>
      <h2>Our dishes</h2>

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
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'DishesView',
  components: { Navbar },
  data() {
    return { dishes: restaurantData.dish }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 900px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.section-block { margin-bottom: 40px; }
.section-block h3 { font-size: 18px; font-weight: 500; margin-bottom: 15px; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 8px; }

.dishes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 15px; }
.dish-card { background: white; padding: 20px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 8px; }
.dish-header { display: flex; justify-content: space-between; align-items: center; }
.name { font-weight: 500; font-size: 16px; }
.price { font-weight: bold; color: #292929; }
.type, .ingredients, .calories { font-size: 13px; color: #666; margin: 0; }
.calories { font-style: italic; color: #888; }

</style>