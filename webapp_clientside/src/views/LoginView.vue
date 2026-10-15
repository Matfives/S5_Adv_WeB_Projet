<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">AUTHENTICATION</p>
      <h2>Sign in</h2>

      <p class="demo-notice">
        Demo login for this frontend prototype. Choose a sample customer or the
        administrator role. No password is required.
      </p>

      <div class="form-card">
        <form @submit.prevent="signInCustomer">
          <h3>Customer demo</h3>
          <div class="form-field">
            <label for="customer-login">Customer</label>
            <select id="customer-login" v-model="selectedCustomerId" required>
              <option value="" disabled>Select a customer</option>
              <option v-for="customer in customers" :key="customer.user_id" :value="customer.user_id">
                {{ customer.user_name }}
              </option>
            </select>
          </div>
          <p v-if="error" class="error-message" role="alert">{{ error }}</p>
          <button type="submit" class="submit-btn">Login as customer</button>
        </form>

        <div class="admin-demo">
          <h3>Administrator demo</h3>
          <p>Browse the sample restaurant, user, dish and order records.</p>
          <button type="button" class="submit-btn" @click="signInAdmin">Enter administrator demo</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { demoCustomers, loginCustomer, loginAdmin } from '@/services/auth'

export default {
  name: 'LoginView',
  components: { Navbar },
  data() {
    return {
      customers: demoCustomers,
      selectedCustomerId: '',
      error: ''
    }
  },
  methods: {
    signInCustomer() {
      this.error = ''
      if (!loginCustomer(this.selectedCustomerId)) {
        this.error = 'Please select an existing customer.'
        return
      }
      this.$router.push('/profile')
    },
    signInAdmin() {
      loginAdmin()
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 450px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.demo-notice { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 25px; }
.form-card { background: white; padding: 35px; border-radius: 6px; border: 1px solid #eae5de; }
h3 { font-size: 18px; font-weight: 500; margin-bottom: 15px; }
.form-field { display: flex; flex-direction: column; gap: 8px; }
.form-field label { font-size: 13px; font-weight: 500; color: #555; }
.form-field select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; font-size: 14px; background: white; color: #292929; }
.form-field select:focus { outline: 2px solid #292929; outline-offset: 2px; }
.submit-btn { width: 100%; padding: 12px; background: #292929; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; margin-top: 15px; }
.submit-btn:hover { background: #444; }
.admin-demo { border-top: 1px solid #eae5de; margin-top: 25px; padding-top: 25px; }
.admin-demo p { font-size: 13px; color: #777; line-height: 1.5; }
.error-message { color: #a53333; font-size: 13px; margin-top: 12px; }
</style>