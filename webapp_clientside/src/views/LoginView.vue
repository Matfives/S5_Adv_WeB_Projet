<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">AUTHENTICATION</p>
      <h2>Sign in</h2>

      <div class="form-card">
        <div class="input-group">
          <label>Username or email</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button class="submit-btn">Login</button>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'LoginView',
  components: { Navbar }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 450px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.form-card { background: white; padding: 35px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 20px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-size: 13px; font-weight: 500; color: #555; }
.input-group input { padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }
.input-group input:focus { border-color: #292929; }
.submit-btn { padding: 12px; background: #292929; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; margin-top: 10px; }
.submit-btn:hover { background: #444; }
</style>