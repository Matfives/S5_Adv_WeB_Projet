<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">ORDER ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'Order not found' : isEdit ? 'Edit order' : 'Add new order' }}</h1>
        <router-link :to="{ name: 'AdminOrders' }" class="crud-button crud-button-secondary">Back to orders</router-link>
      </div>

      <p v-if="isMissing" class="crud-panel">No matching order record was found. Use the order directory to select a specific customer and dish record.</p>
      <form v-else class="crud-panel" @submit.prevent="submitPrototype">
        <p class="crud-note">Frontend prototype. This form previews order information; changes are not saved.</p>
        <div class="crud-form-grid">
          <div class="crud-field">
            <label for="order-customer">Customer</label>
            <select id="order-customer" v-model="form.user_id" required>
              <option value="" disabled>Select a customer</option>
              <option v-for="customer in customers" :key="customer.user_id" :value="customer.user_id">{{ customer.user_name }} (ID {{ customer.user_id }})</option>
            </select>
          </div>
          <div class="crud-field">
            <label for="order-dish">Dish</label>
            <select id="order-dish" v-model="form.dish_id" required>
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
import { findOrderRow, orderLocation } from '@/services/orderRecords'

export default {
  name: 'OrderFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      submitted: false,
      customers: restaurantData.Users.filter(user => user.user_type === 'Customer'),
      dishes: restaurantData.dish
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'AdminOrderEdit'
    },
    order() {
      return findOrderRow(this.$route)
    },
    isMissing() {
      return this.isEdit && !this.order
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
        // All order fields are scalar values. Never bind inputs to the JSON row.
        this.form = this.isEdit && this.order ? { ...this.order } : {
          user_id: '', dish_id: '', order_id: '', order_date: '', order_hour: '',
          order_table: '', order_AdressBill: '', order_finalSum: ''
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
