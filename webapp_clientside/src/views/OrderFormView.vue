<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">ORDER ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'Order not found' : isEdit ? 'Edit order' : 'Add new order' }}</h1>
        <router-link :to="{ name: 'AdminOrders' }" class="crud-button crud-button-secondary">Back to orders</router-link>
      </div>

      <p v-if="loading" class="crud-panel" role="status">Loading...</p>
      <p v-else-if="isMissing" class="crud-panel">No matching order record was found. Use the order directory to select a specific customer and dish record.</p>
      <form v-else class="crud-panel" @submit.prevent="submit">
        <div class="crud-form-grid">
          <div class="crud-field">
            <label for="order-customer">Customer</label>
            <select id="order-customer" v-model="form.user_id" :disabled="isEdit" required>
              <option value="" disabled>Select a customer</option>
              <option v-for="customer in customers" :key="customer.user_id" :value="customer.user_id">{{ customer.user_name }} (ID {{ customer.user_id }})</option>
            </select>
          </div>
          <div class="crud-field">
            <label for="order-dish">Dish</label>
            <select id="order-dish" v-model="form.dish_id" :disabled="isEdit" required>
              <option value="" disabled>Select a dish</option>
              <option v-for="dish in dishes" :key="dish.dish_id" :value="dish.dish_id">{{ dish.dish_name }} (ID {{ dish.dish_id }})</option>
            </select>
          </div>
          <div class="crud-field crud-field-wide">
            <label for="order-id">Order ID</label>
            <input id="order-id" v-model="form.order_id" type="text" required />
          </div>
          <div class="crud-field">
            <label for="order-date">Date</label>
            <input id="order-date" v-model="form.order_date" type="date" required />
          </div>
          <div class="crud-field">
            <label for="order-time">Time</label>
            <input id="order-time" v-model="form.order_hour" type="time" step="1" required />
          </div>
          <div class="crud-field">
            <label for="order-table">Table</label>
            <input id="order-table" v-model="form.order_table" type="number" min="1" step="1" required />
          </div>
          <div class="crud-field">
            <label for="order-total">Total (EUR)</label>
            <input id="order-total" v-model="form.order_finalSum" type="number" min="0" step="0.01" required />
          </div>
          <div class="crud-field crud-field-wide">
            <label for="order-address">Billing address</label>
            <textarea id="order-address" v-model="form.order_AdressBill" rows="3" required></textarea>
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
import { fetchOrderRow, orderLocation } from '@/services/orderRecords'

export default {
  name: 'OrderFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      order: null,
      customers: [],
      dishes: [],
      loading: true,
      saving: false,
      error: ''
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'AdminOrderEdit'
    },
    isMissing() {
      return this.isEdit && !this.loading && !this.order
    },
    cancelLocation() {
      return this.isEdit && this.order
        ? orderLocation('AdminOrderDetail', this.order)
        : { name: 'AdminOrders' }
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
      this.order = null
      try {
        const [users, dishes] = await Promise.all([apiGet('/users'), apiGet('/dishes')])
        // In the database, customers have the user_type "Client".
        this.customers = (users || []).filter(user => user.user_type === 'Client')
        this.dishes = dishes || []
        if (this.isEdit) {
          this.order = await fetchOrderRow(this.$route)
        }
      } catch {
        this.error = 'Unable to load data. Check that the backend is running.'
      }
      // All order fields are scalar values. Never bind inputs to the loaded record.
      this.form = this.isEdit && this.order ? { ...this.order } : {
        user_id: '', dish_id: '', order_id: '', order_date: '', order_hour: '',
        order_table: '', order_AdressBill: '', order_finalSum: ''
      }
      this.loading = false
    },
    async submit() {
      this.saving = true
      this.error = ''
      try {
        if (this.isEdit) {
          await apiSend('PUT', `/orders/${this.order.user_id}/${this.order.dish_id}`, this.form)
        } else {
          await apiSend('POST', '/orders', this.form)
        }
        this.$router.push({ name: 'AdminOrders' })
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