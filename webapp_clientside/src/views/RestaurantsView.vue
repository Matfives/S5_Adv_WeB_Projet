<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">OUR LOCATIONS</p>
      <h2>Restaurants</h2>
      
      <div class="grid">
        <div class="card" v-for="i in 3" :key="i">
          <h3>rest_name</h3>
          <p class="info"><strong>Address:</strong>rest_address</p>
          <p class="info"><strong>Capacity (Size):</strong>rest_size</p>
          <p class="info"><strong>Phone:</strong>rest_phone</p>
          <p class="hours"><strong>Opening Hours:</strong>rest_hours</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'RestaurantsView',
  components: { Navbar }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 900px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.grid { display: grid; gap: 20px; }
.card { background: white; padding: 25px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 8px; }
.card h3 { margin: 0 0 10px 0; font-weight: 500; font-size: 18px; }
.info { font-size: 14px; color: #555; margin: 0; }
.hours { font-size: 13px; color: #888; margin-top: 5px; }
</style>