<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">{{ isAdmin ? 'ORDER DIRECTORY' : 'MY ACCOUNT' }}</p>
      <div class="crud-toolbar">
        <h2>{{ isAdmin ? 'Orders' : 'My orders' }}</h2>
        <router-link v-if="isAdmin" :to="{ name: 'AdminOrderNew' }" class="crud-button">Add new order</router-link>
      </div>
      <p class="record-count">
        {{ orderRows.length }} order record{{ orderRows.length === 1 ? '' : 's' }}
      </p>

      <p v-if="orderRows.length === 0" class="empty-state">
        {{ isAdmin ? 'No orders to display.' : 'You have no orders yet.' }}
      </p>
      <div v-else class="table-wrapper" role="region" aria-label="Orders table" tabindex="0">
        <table class="orders-table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th v-if="isAdmin" scope="col">Customer</th>
              <th scope="col">Dish</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Table</th>
              <th scope="col">Billing address</th>
              <th scope="col">Total</th>
              <th v-if="isAdmin" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orderRows" :key="`${order.order_id}-${order.user_id}-${order.dish_id}`">
              <td>{{ order.order_id }}</td>
              <td v-if="isAdmin">{{ order.customerName }}</td>
              <td>{{ order.dishName }}</td>
              <td>{{ order.order_date }}</td>
              <td>{{ order.order_hour }}</td>
              <td>{{ order.order_table }}</td>
              <td>{{ order.order_AdressBill }}</td>
              <td>{{ order.order_finalSum.toFixed(2) }} EUR</td>
              <td v-if="isAdmin">
                <div class="crud-actions">
                  <router-link :to="orderLocation('AdminOrderDetail', order)" class="crud-button crud-button-secondary">Show</router-link>
                  <router-link :to="orderLocation('AdminOrderEdit', order)" class="crud-button crud-button-secondary">Edit</router-link>
                  <button type="button" class="crud-button crud-button-secondary" disabled title="Deletion is unavailable in this frontend prototype">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { authState } from '@/services/auth'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'
import { orderLocation, resolveOrderNames } from '@/services/orderRecords'

export default {
  name: 'OrdersView',
  components: { Navbar },
  data() {
    return {
      auth: authState,
      orders: restaurantData.order_
    }
  },
  computed: {
    isAdmin() {
      return this.auth.role === 'admin'
    },
    orderRows() {
      let visibleOrders = []
      if (this.isAdmin) {
        visibleOrders = this.orders
      } else if (this.auth.role === 'customer' && this.auth.currentUser) {
        visibleOrders = this.orders.filter(order => order.user_id === this.auth.currentUser.user_id)
      }

      return visibleOrders.map(resolveOrderNames)
    }
  },
  methods: {
    orderLocation
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 1100px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin: 0; }
.record-count { font-size: 13px; color: #777; margin-bottom: 15px; }
.empty-state { background: white; padding: 25px; border: 1px solid #eae5de; border-radius: 6px; color: #777; font-size: 14px; }
.table-wrapper { width: 100%; overflow-x: auto; background: white; border: 1px solid #eae5de; border-radius: 6px; }
.orders-table { width: 100%; min-width: 850px; border-collapse: collapse; font-size: 14px; }
.orders-table th, .orders-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; white-space: nowrap; }
.orders-table th { background: #f4f0eb; font-weight: 500; color: #444; }
.orders-table tbody tr:last-child td { border-bottom: none; }
.orders-table tbody tr:hover { background: #faf8f5; }
.orders-table .crud-actions { flex-wrap: nowrap; }
</style>
