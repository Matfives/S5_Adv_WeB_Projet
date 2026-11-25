<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">ORDER ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ order ? `Order ${order.order_id}` : loading ? 'Loading...' : 'Order not found' }}</h1>
        <div class="crud-actions">
          <router-link :to="{ name: 'AdminOrders' }" class="crud-button crud-button-secondary">Back to orders</router-link>
          <router-link v-if="order" :to="editLocation" class="crud-button">Edit</router-link>
        </div>
      </div>

      <section v-if="order" class="crud-panel" aria-label="Order details">
        <dl class="crud-datasheet">
          <dt>Order ID</dt><dd>{{ order.order_id }}</dd>
          <dt>Customer name</dt><dd>{{ order.customerName }}</dd>
          <dt>Customer / User ID</dt><dd>{{ order.user_id }}</dd>
          <dt>Dish name</dt><dd>{{ order.dishName }}</dd>
          <dt>Dish ID</dt><dd>{{ order.dish_id }}</dd>
          <dt>Date</dt><dd>{{ order.order_date }}</dd>
          <dt>Time</dt><dd>{{ order.order_hour }}</dd>
          <dt>Table</dt><dd>{{ order.order_table }}</dd>
          <dt>Billing address</dt><dd>{{ order.order_AdressBill }}</dd>
          <dt>Total</dt><dd>{{ order.order_finalSum.toFixed(2) }} EUR</dd>
        </dl>
      </section>
      <p v-else-if="loading" class="crud-panel" role="status">Loading order...</p>
      <p v-else-if="error" class="crud-panel" role="alert">{{ error }}</p>
      <p v-else class="crud-panel">No matching order record was found. Use the order directory to select a specific customer and dish record.</p>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { fetchOrderRow, orderLocation } from '@/services/orderRecords'

export default {
  name: 'OrderDetailView',
  components: { Navbar },
  data() {
    return { order: null, loading: true, error: '' }
  },
  computed: {
    editLocation() {
      return this.order ? orderLocation('AdminOrderEdit', this.order) : null
    }
  },
  async mounted() {
    try {
      this.order = await fetchOrderRow(this.$route)
    } catch {
      this.error = 'Unable to load this order. Check that the backend is running.'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>