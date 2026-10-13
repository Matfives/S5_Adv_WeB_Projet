<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">MENU & HISTORY</p>
      <h2>Our dishes & orders</h2>

      <section class="section-block">
        <h3>Dishes menu</h3>
        <div class="dishes-grid">
          <div class="dish-card" v-for="i in 4" :key="i">
            <div class="dish-header">
              <span class="name">dish_name</span>
              <span class="price">dish_price</span>
            </div>
            <p class="type">Type: dish_type</p>
            <p class="ingredients">Ingredients: dish_ingredients</p>
            <span class="calories">dish_calories</span>
          </div>
        </div>
      </section>

      <section class="section-block">
        <h3>Your Past Orders (order_)</h3>
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date & Time</th>
              <th>Table</th>
              <th>Billing Address</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>order_ID</td>
              <td>order_date, order_hour</td>
              <td>order_table</td>
              <td>order_AdressBill</td>
              <td>order_finalSum</td>
            </tr>
            <tr>
              <td>order_ID</td>
              <td>order_date, order_hour</td>
              <td>order_table</td>
              <td>order_AdressBill</td>
              <td>order_finalSum</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'DishesView',
  components: { Navbar }
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

.orders-table { width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden; border: 1px solid #eae5de; font-size: 14px; }
.orders-table th, .orders-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
.orders-table th { background: #f4f0eb; font-weight: 500; color: #444; }
.orders-table tr:last-child td { border-bottom: none; }
</style>